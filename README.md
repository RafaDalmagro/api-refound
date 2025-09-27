# 🚀 API - Solicitação de Reembolsos

API desenvolvida para o gerenciamento e solicitação de reembolsos, permitindo que usuários registrem, consultem e acompanhem pedidos, com autenticação, níveis de acesso e histórico detalhado das operações.

---

## 🧾 Descrição

Esta API possibilita que colaboradores realizem solicitações de reembolso, acompanhem o status do pedido. O sistema foca em segurança, integridade dos dados e facilidade de uso para administradores e solicitantes.

**Funcionalidades principais:**
- Cadastro e autenticação de usuários via JWT
- Registro, consulta, edição e remoção de solicitações de reembolso
- Classificação dos pedidos por status e prioridade
- Histórico de alterações das solicitações
- Permissões diferenciadas por tipo de usuário (admin e colaborador)

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express** (v4.19.2)
- **Prisma Client** (v6.2.1)
- **PostgreSQL** (sugestão de banco de dados)
- **TypeScript** (v5.7.3)
- **JWT (jsonwebtoken)** (v9.0.2)
- **Zod** (v3.24.1) - Validação de dados
- **Multer** (v1.4.5-lts.1) - Upload de arquivos
- **bcrypt** (v5.1.1) - Hash de senha
- **CORS** (v2.8.5) - Segurança de acesso
- **express-async-errors** (v3.1.1) - Tratamento de erros
- **Jest** (sugestão para testes)
- **Docker** (sugestão para containerização)
- **tsx** (v4.19.2)
- **ts-node** (v10.9.2)

---

## ⚙️ Funcionalidades

### 🔐 Autenticação e Autorização

- Cadastro de novos usuários e login
- Autenticação via **JWT**
- Níveis de acesso: admin (gestão total) e colaborador (acesso limitado à própria solicitação)

### 📄 Solicitação de Reembolso

- CRUD completo de solicitações
- Upload de comprovantes (Multer)

---

## ▶️ Comandos Úteis

```

# Instalar dependências

npm install

# Rodar o servidor em desenvolvimento

npm run dev

# Executar testes

npm run test

# Executar migrations do Prisma

npx prisma migrate dev

# Gerar tipos do Prisma

npx prisma generate

```

---

## 🌐 Deploy

O projeto pode ser publicado em ambientes como Render, com suporte para PostgreSQL e configuração de variáveis de ambiente via painel.

---

## ✍️ Autor e créditos

- 📘 Desafio proposto por: [Rocketseat](https://www.rocketseat.com.br/)
- 💻 Desenvolvido por: **Rafael Lima Dalmagro**
- 📝 Projeto independente para gestão de reembolsos

---

```

