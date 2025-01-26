import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const User = new PrismaClient();

const API = {
    App: express(),
    door: 3000,
    NameApi: 'Users'
};

API.App.use(express.json());

// GET all users
API.App.get('/Users', async (req: Request, res: Response) => {
    try {
        const users = await User.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
});

// POST create a user
API.App.post('/Users', async (req: Request, res: Response) => {
    const { Name, Email, Password } = req.body;
    try {
        const newUser = await User.user.create({
            data: { Name, Email, Password }
        });
        res.status(201).json({ message: 'Usuário criado com sucesso', newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});

// DELETE user by ID
API.App.delete('/Users/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id);
    try {
        await User.user.delete({
            where: { id }
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
});

// PUT update a user
API.App.put('/Users/:id', async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { Name, Email, Password } = req.body;
    try {
        const updatedUser = await User.user.update({
            where: { id },
            data: { Name, Email, Password }
        });
        res.status(200).json({ message: 'Usuário atualizado com sucesso', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar usuário.' });
    }
});

// Iniciar o servidor
API.App.listen(API.door, () => {
    console.log(`API rodando em http://localhost:${API.door}`);
});
