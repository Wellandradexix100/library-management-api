import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Testes de Integração E2E (Fluxo Completo)', () => {
    let userToken = '';
    let userId = '';
    let autorId = '';
    let livroId = '';

    const randomSuffix = Math.floor(Math.random() * 1000000);
    const testEmail = `junior${randomSuffix}@teste.com`;
    const livroTitulo = `O Código Da Vinci ${randomSuffix}`;

    it('1. deve registrar um usuário normal e retornar um token', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                nome: 'Júnior Desenvolvedor',
                email: testEmail,
                password: 'senhafortissima'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body.user).toHaveProperty('id');

        userToken = response.body.token;
        userId = response.body.user.id;
    });

    it('2. NÃO deve permitir que um usuário normal crie um admin (Erro 403)', async () => {
        const response = await request(app)
            .post('/api/register-admin')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                nome: 'Hacker Invasor',
                email: `hacker${randomSuffix}@teste.com`,
                password: 'senhafortissima'
            });

        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Apenas administradores podem criar outros administradores');
    });

    it('3. deve criar um autor com sucesso', async () => {
        const response = await request(app)
            .post('/api/autor')
            .set('Authorization', `Bearer ${userToken}`)
            .send({ nome: `Dan Brown ${randomSuffix}` });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        autorId = response.body.id;
    });

    it('4. deve criar um livro vinculando o autor recém-criado', async () => {
        const response = await request(app)
            .post('/api/livros')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                titulo: livroTitulo,
                autorId: autorId,
                anoPublicacao: new Date().toISOString()
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        livroId = response.body.id;
    });

    it('5. deve criar um empréstimo vinculando o usuário e o livro', async () => {
        const response = await request(app)
            .post('/api/emprestimo')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                livroId: livroId,
                usuarioId: userId
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.livroId).toBe(livroId);
        expect(response.body.userId).toBe(userId);

        (global as any).emprestimoId = response.body.id;
    });

    it('6. deve devolver o empréstimo criado', async () => {
        const empId = (global as any).emprestimoId;
        const response = await request(app)
            .put(`/api/emprestimo/${empId}`)
            .set('Authorization', `Bearer ${userToken}`)
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('dataDevolucao');
        expect(response.body.dataDevolucao).not.toBeNull();
    });
});
