const express = require('express'); //import express
const cors = require('cors'); // requisidar o cors
const site = express(); // Criação de uma intância do express
const {Sequelize, DataTypes} = require('sequelize');

site.use(cors({
    origin: '*', // libera para qualquer lugar
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-type']
}));

site.use(express.json());

const sequelize = new Sequelize('banco_apiExpress', 'root', '', 
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306',
        define: {
            timestamps: false
        }
    }
);

const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
}, {
    tableName: 'usuarios'
});

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

//Rota do Banco

site.get('/usuarios', async (req, res) => {
    try{
        const usuariosBanco = await User.findAll();
        res.json(usuariosBanco);
    }catch(error){
        res.status(500).json({error: 'Erro ao buscar dados: ' + error.message});
    }
})

// Rota do INSERT
site.post('/usuarios', async (req, res) => {
  try {
    const { name, email, status} = req.body;
    const novoUsuario = await User.create({ name, email, status});
    return res.status(201).json(novoUsuario); 
  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: error.message });
  }
});




//Inicializa o servidor do site
//Sempre fica no final do código
// site.listen(4000, (error) => {
//     if(error){
//         console.log('Seu lixo imundo', error);
//     }else{
//         console.log('funcionou seu MISERAVEL');
//     }
// })

sequelize.authenticate()
.then(() => {
    console.log('conexão sucedida');

    site.listen(4000, () => {
        console.log('serviodor funcionando')
    });
})
.catch((error) => {
    console.error('não foi possivel conectar com o banco', error);
});