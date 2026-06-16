# 📚 API de Gerenciamento de Biblioteca

Uma API RESTful robusta desenvolvida em Node.js para o gerenciamento de uma biblioteca. O sistema permite o controle de livros, autores, usuários, empréstimos e reservas de exemplares, implementando boas práticas de engenharia de software, arquitetura em camadas (Controller-Service) e forte esquema de validação e segurança.

## 🚀 Tecnologias e Bibliotecas Utilizadas

O projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

- **Node.js & Express:** Base da aplicação e roteamento HTTP.
- **TypeScript:** Tipagem estática para garantir segurança em tempo de desenvolvimento.
- **Prisma ORM:** Modelagem do banco de dados e consultas seguras.
- **PostgreSQL:** Banco de dados relacional.
- **Zod:** Validação e parsing de esquemas de dados de entrada.
- **Bcrypt:** Hashing de senhas.
- **JsonWebToken (JWT):** Autenticação stateless e controle de permissões por roles.

### 🔮 Futuras Implementações

Para as próximas atualizações, o projeto integrará:
- **Helmet:** Proteção de cabeçalhos HTTP contra vulnerabilidades comuns (XSS, etc).
- **Express-Rate-Limit:** Prevenção contra ataques de força bruta (DDoS) limitando requisições em rotas públicas.

## 📂 Arquitetura

O projeto adota o padrão **Controller-Service** para separação de responsabilidades:
- **Rotas:** Definem os endpoints.
- **Middlewares:** Validam tokens e níveis de acesso (Admin).
- **Controllers:** Lidam estritamente com as requisições e respostas HTTP.
- **Services:** Concentram a regra de negócio e consultas ao banco de dados.

## 🔗 Endpoints Principais

### Autenticação (`/api`)
- `POST /login` - Autentica usuário e retorna JWT.
- `POST /register` - Registra um usuário comum (`USER`).
- `POST /register-admin` - Registra um administrador (Requer token com role `ADMIN`).

### Livros (`/api`)
- `GET /livros` - Retorna a lista de todos os livros.
- `POST /livros` - Adiciona um novo livro ao acervo.
- `DELETE /livros/:id` - Deleta um livro do acervo.

### Autores (`/api`)
- `GET /autor` - Lista os autores e seus respectivos livros.
- `POST /autor` - Adiciona um novo autor.
- `DELETE /autor/:id` - Remove um autor do banco.

### Empréstimos (`/api`)
- `GET /emprestimo` - Lista todos os empréstimos.
- `POST /emprestimo` - Registra um novo empréstimo vinculando um usuário a um livro físico.

## 🛠 Como Executar o Projeto Localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   DATABASE_URL="postgres://usuario:senha@localhost:5432/banco"
   JWT_SECRET="sua_chave_secreta"
   PORT=3000
   ```
3. Sincronize o banco de dados via Prisma:
   ```bash
   npx prisma db push
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
