import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Testes de Rotas de Autor', () => {
    let userToken = '';

    beforeAll(async () => {
        const randomSuffix = Math.floor(Math.random() * 1000000);
        const response = await request(app)
            .post('/api/register')
            .send({
                nome: 'Autor Tester',
                email: `autor-tester${randomSuffix}@teste.com`,
                password: 'senhafortissima'
            });
        userToken = response.body.token;
    });

    it('deve retornar status 200 ao buscar autores na rota GET /api/autor', async () => {
        const response = await request(app).get('/api/autor');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve retornar erro 400 ao tentar criar um autor sem nome', async () => {
        const response = await request(app)
            .post('/api/autor')
            .set('Authorization', `Bearer ${userToken}`)
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Nome do autor inválido');
    });
});
