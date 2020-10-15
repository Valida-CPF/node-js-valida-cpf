exports.correctJSON = function (jsonTable) {
    for (var indice in jsonTable) {
        var cpf = jsonTable[indice].CPF;
        
        cpf = cpf.trim();
        cpf = cpf.replace(/\./g, '');
        cpf = cpf.replace('-', '');
        cpf = cpf.replace(/\D/g,'');

        jsonTable[indice].CPF_CHECK = cpf;

        if(cpf.length === 11){
            jsonTable[indice].status = "Correto";
        }else{
            jsonTable[indice].status = "Errado";
        }
    }

    return jsonTable;
}