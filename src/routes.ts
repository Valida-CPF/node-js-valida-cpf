import express from 'express';
import path from 'path';

const xlsx = require('xlsx');
const checker = require('./checkdata');
const routes = express.Router();
const moveFile = require('move-file');
const multer = require('multer');
const fs = require('fs');

routes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

routes.get('/checkfile', (request, response) => {
    var workbook = xlsx.readFile(path.resolve(__dirname, './uploads/Data.xlsx'));
    var sheetNameList = workbook.SheetNames;
    var worksheet = workbook.Sheets[sheetNameList[0]];    

    var jsonTable = checker.correctJSON(xlsx.utils.sheet_to_json(worksheet));
    
    try {
        fs.unlinkSync(path.resolve(__dirname, './uploads/Data.xlsx'));
    } catch (error) {
        
    }
    response.json(jsonTable);
});

routes.post('/downloadfile', async (request, response) => {    
    var headers = ['Nome', 'Sobrenome', 'CPF', 'CPF_CHECK', 'status'];
    var data = request.body; 
    
    var worksheet = xlsx.utils.json_to_sheet(data, {header: headers});
    var workbook = xlsx.utils.book_new();

    xlsx.utils.book_append_sheet(workbook, worksheet, "CPF checked");
    var name = "export";
    var exportFileName = `${name}.xlsx`.trim();

    xlsx.writeFile(workbook, exportFileName);

    var pathFrom = path.resolve(__dirname, '../');
    var pathTo = path.resolve(__dirname, '../downloads');
    
    (async () => {
        await moveFile(`${pathFrom}/${exportFileName}`, `${pathTo}/${exportFileName}`);
    })();

    response.json({
        fileName: exportFileName,
        filePath:`http://localhost:3333/downloads/${exportFileName}`,
    });

    // const res = await axios({
    //     mothod: 'GET',
    //     url: `http://localhost:3333/downloads/${exportFileName}`,
    //     responseType: 'stream'
    // });

    // res.data.pipe(response);
    // response.setHeader("Content-Disposition", "attachment; filename=ExportData.svg");
    // response.setHeader("Content-Type", 'application/octet-stream; charset=utf-8');

    // return new Promise ((resolve, reject) => {
    //     res.data.on('end', () => {
    //         resolve();
    //     });

    //     res.data.on('error', (err: any) => {
    //         reject(err);
    //     });
    // });        
});

routes.post('/upload', (request, response) => {
    var storage = multer.diskStorage({
            destination: function (req: any, file: any, cb: (arg0: null, arg1: string) => void) {
            cb(null, path.resolve(__dirname, './uploads'))
        },
        filename: function (req: any, file: { originalname: string; }, cb: (arg0: null, arg1: string) => void) {
            cb(null, 'Data.xlsx')
        }
    })

    var upload = multer({ storage: storage }).single('file');

    upload(request, response, function (err: any) {
        if (err instanceof multer.MulterError) {
            return response.status(500).json(err)
        } else if (err) {
            return response.status(500).json(err)
        }
    return response.status(200);

    })
});

export default routes;