const express = require('express'); //import express
const site = express(); // Criação de uma intância do express


site.get('/', (req, res)=>{
    res.send('Tela inicial')
})

site.get('/sobre', (req, res)=>{
    res.send('Sobre esse site maravilhoso')
})

site.get('/dados', (req, res)=>{
    res.json({message: 'Dado da mensagem', 
    truco: 'PEDE 6'})
})

site.get('/lista', (req, res)=>{
    const lista = [
        {id: 1, nome: "item 1"},
        {id: 2, nome: "item 2"},
        {id: 3, nome: "item 3"}
    ];
    console.log('Alguém acessou a lista');
    res.json(lista);
})


//Inicializa o servidor do site
//Sempre fica no final do código
site.listen(4000, (error) => {
    if(error){
        console.log('Seu lixo imundo', error);
    }else{
        console.log('funcionou seu MISERAVEL');
    }
})