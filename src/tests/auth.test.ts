import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../app';
import { prisma } from '../../lib/prisma';

describe('Testes de Autenticação e Autorização', () => {
    let adminToken = '';
    let userToken = '';

    beforeAll(async () => {
        const randomSuffix = Math.floor(Math.random() * 1000000);
        const userRes = await request(app)
            .post('/api/register')
            .send({
                nome: 'Usuário Comum',
                email: `comum${randomSuffix}@teste.com`,
                password: 'senhafortissima'
            });
        userToken = userRes.body.token;

        const adminEmail = `admin${randomSuffix}@teste.com`;
        const bcrypt = require('bcrypt');
        const hashedPassword = await bcrypt.hash('senhaadmin', 10);
        await prisma.user.create({
            data: {
                nome: 'Admin Supremo',
                email: adminEmail,
                senha: hashedPassword,
                funcao: 'ADMIN'
            }
        });

        const adminLoginRes = await request(app)
            .post('/api/login')
            .send({
                email: adminEmail,
                password: 'senhaadmin'
            });
        adminToken = adminLoginRes.body.token;
    });

    it('deve retornar 401 ao tentar acessar rota protegida sem token', async () => {
        const response = await request(app).get('/api/usuarios');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Token não fornecido ou inválido');
    });

    it('deve retornar 403 ao tentar acessar a rota de usuários com um usuário comum', async () => {
        const response = await request(app)
            .get('/api/usuarios')
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.status).toBe(403);
    });

    it('deve retornar a lista de usuários com sucesso usando token de ADMIN', async () => {
        const response = await request(app)
            .get('/api/usuarios')
            .set('Authorization', `Bearer ${adminToken}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).not.toHaveProperty('senha');
    });
});
