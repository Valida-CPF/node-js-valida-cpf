exports.correctJSON = function (jsonTable) {
    for (var indice in jsonTable) {
        var cpf = jsonTable[indice].CPF;        
        
        cpf = cpf.trim();
        cpf = cpf.replace(/\./g, '');
        cpf = cpf.replace('-', '');

        var aux = cpf.length;

        cpf = cpf.replace(/\D/g,'');

        jsonTable[indice].CPF_CHECK = cpf;

        if(cpf.length === 11){
            if(aux > cpf.length){
                jsonTable[indice].status = "Corrigido";
            }else{
                jsonTable[indice].status = "Correto";
            }            
        }else{
            jsonTable[indice].status = "Errado";
        }
    }

    return jsonTable;
}