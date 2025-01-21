"use strict";
console.log('Script rodando');
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
CreateUser('Nicolas', 'NicolasAsafe45@gmail.com', '70250810S');
DeleteUser('70250810S');
