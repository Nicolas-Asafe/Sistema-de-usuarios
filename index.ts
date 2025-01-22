console.log('Script rodando')

import express from 'express'
import {PrismaClient} from '@prisma/client'


let Userdb 

const User = new PrismaClient()

const API = {
    App:express(),
    door:3000,
    NameApi:'Users'
}

API.App.use(express.json());

API.App.get('/Users',async (req,res)=>{
    Userdb = await  User.user.findMany()
    res.send(Userdb)
})

API.App.post('/Users', async (req,res)=>{
    const {Name,Email,Password} = req.body;
    await User.user.create({data:{Name,Email,Password}})
    res.status(201).send('Usuario criado com sucesso')
})

API.App.delete('/Users/:Password', async (req,res)=>{
    await User.user.delete({
        where:{
            Password:req.params.Password
        }
    })
    res.status(204).send('Sucesso ao deletar o usuario')
})

API.App.put('/Users/:id', async (req,res)=>{
    const {Name,Email,Password} = req.body
    await User.user.update({
        where:{
            id:req.params.id
        },
        data:{
            Name:Name,
            Password:Password,
            Email:Email,
        }
    })
    res.status(200).send('Sucesso ao editar o usuário')
})


API.App.listen(3000,()=>{
    console.log('https://localhost:3000')
})


//Banco de dados ficticio
interface User {
    Nome: string,
    Email: string,
    Password: string
}

let Users: User[] = []

const CreateUser = (Nome: string, Email: string, Password: string) => {
    const isDuplicate =
        Users.some(u => u.Nome === Nome) || 
        Users.some(u => u.Email === Email) || 
        Users.some(u => u.Password === Password)

    if (isDuplicate){
        console.log('Erro ao criar usuário: Usuário com dados duplicados encontrado.')
    }else {
        console.log('Criando usuário...')
        const User = { Nome, Email, Password }
        Users.push(User)
        console.log('Usuário criado: ', User)
        console.log('Usuário adicionado na lista Users: ', Users)
    }
}

const DeleteUser = (Password:string) =>{
    console.log('Procurando usuário...')
    const User_For_Delete = Users.findIndex(u=>u.Password===Password)
    if(User_For_Delete !== -1){
        console.log('Usuário deletado: ',Users[User_For_Delete]) 
        Users.splice(User_For_Delete,1)
    }else{
        console.log('Usuário não encontrado')
    }
}


 