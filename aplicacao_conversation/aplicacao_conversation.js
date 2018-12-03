//watson eu quero usar a sua api
//requerimento para essa api
var ConversationV1 = require('watson-developer-cloud/conversation/v1');
var prompt = require('prompt-sync')();

//Onde acessar?
//Nome de usuario, senha, workspace, data de versão
var conversation = new ConversationV1({
    version: '2018-09-20',
    username: 'a24c1312-b454-4f57-888b-0d507dfd2886',
    password: '4gZpAVFMZHLT',
    url: 'https://gateway.watsonplatform.net/assistant/api'

});



//Mensagem de boas vidas, envia uma mensagem vazia
conversation.message({
    workspace_id: 'd45c1355-868e-429c-8ba7-5b951d96fddc',
    input: {
        'text': ''
    }

}, processarResposta);



// O que é essa resposta, quero ver essa resposta
function processarResposta(erro, response) {

    if (erro) console.log(erro);

    var encerrarConversa = false;
    if (response.output.acao === 'encerrar') {
        //Fazer prompt parar de pedir mensagens
        console.log(response.output.text[0])
        encerrarConversa = true;
    } else {
        if (response.output.text.length != 0) console.log(response.output.text[0]);
    }

    // Se não encerrar a conversa então continua a conversa
    if (!encerrarConversa) {
        var novaMensagemUsuario = prompt('>> ');
        conversation.message({
            workspace_id: 'd45c1355-868e-429c-8ba7-5b951d96fddc',
            input: {
                'text': novaMensagemUsuario
            },
            context: response.context
        }, processarResposta);
    }

};
