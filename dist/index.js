"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Script rodando');
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
let Userdb;
const User = new client_1.PrismaClient();
const API = {
    App: (0, express_1.default)(),
    door: 3000,
    NameApi: 'Users'
};
API.App.use(express_1.default.json());
API.App.get('/Users', async (req, res) => {
    Userdb = await User.user.findMany();
    res.send(Userdb);
});
API.App.post('/Users', async (req, res) => {
    const { Name, Email, Password } = req.body;
    await User.user.create({
        data: { Name, Email, Password }
    });
    res.status(201).send('Usuario criado com sucesso');
});
API.App.listen(3000, () => {
    console.log('https://localhost:3000');
});
let Users = [];
const CreateUser = (Nome, Email, Password) => {
    const isDuplicate = Users.some(u => u.Nome === Nome) ||
        Users.some(u => u.Email === Email) ||
        Users.some(u => u.Password === Password);
    if (isDuplicate) {
        console.log('Erro ao criar usuário: Usuário com dados duplicados encontrado.');
    }
    else {
        console.log('Criando usuário...');
        const User = { Nome, Email, Password };
        Users.push(User);
        console.log('Usuário criado: ', User);
        console.log('Usuário adicionado na lista Users: ', Users);
    }
};
const DeleteUser = (Password) => {
    console.log('Procurando usuário...');
    const User_For_Delete = Users.findIndex(u => u.Password === Password);
    if (User_For_Delete !== -1) {
        console.log('Usuário deletado: ', Users[User_For_Delete]);
        Users.splice(User_For_Delete, 1);
    }
    else {
        console.log('Usuário não encontrado');
    }
};
