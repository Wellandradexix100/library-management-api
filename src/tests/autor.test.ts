import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Testes de Rotas de Autor', () => {
    it('deve retornar status 200 ao buscar autores na rota GET /api/autor', async () => {
        const response = await request(app).get('/api/autor');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('deve retornar erro 400 ao tentar criar um autor sem nome', async () => {
        const response = await request(app)
            .post('/api/autor')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Nome do autor inválido');
    });
});
