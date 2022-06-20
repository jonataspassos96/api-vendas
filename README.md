# API-Vendas

<div align="right">
  <img alt="inProgress" src="https://img.shields.io/badge/inProgress-black?style=for-the-badge" />
</div>

Desenvolvendo uma API RESTful de gestão de vendas com diversas funcionalidades

## :pushpin: Back-end

### Habilidades

Principais recursos implementados no desenvolvimento projeto:

- Realizar o CRUD da aplicação com TypeORM com o padrão Repository
- Relacionamento Many-to-Many
- Aplicar tratamento de erros nas rotas com celebrate
- Utilizar Filesystem/upload de arquivos com o Multer
- Armazenar arquivos em Bucket Amazon S3
- Envir email fake (dev env) e email profissional com o Zoho Mail e Amazon SES
- Confirmar a autenticidade do cliente com JWT Token.
- Configurar cache na API com o Redis
- Proteção contra ataque DDoS
- Qualidade em código com Design Patterns com Domain Driven Design (DDD) e Princípios SOLID
- Criar Testes Automatizados com Jest
- Realizar o deploy em produção na Digital Ocean
- Desenvolver arquitetura de softwares, utilizando o modelo MSC(Model, Controller and Services)


Principais tecnologias utilizadas no desenvolvimento do projeto:

- Node.js
- Express
- Typescript
- TypeORM
- Postgres através de container Docker
- Redis através de container Docker
- Amazon S3
- Amazon SES


### Desenvolvimento

Foi construida uma aplicação backend para gestão de vendas com funcionalidades para criação de cadastro de produtos, cadastro de clientes, pedidos de compras e uma completa gestão de usuários da aplicação, com autenticação via Token JWT, recuperação de senha por email, atualização de perfil, atualização de avatar, e muito mais. Através do TypeORM foi implementado Entidades e Repositórios para cada recurso a ser consumido na API.

### Como acessar o projeto

1. Realize o clone do projeto.
2. No terminal deve executar os comandos:
- `npm install`
- `docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`
