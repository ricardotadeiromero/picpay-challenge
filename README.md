# PicPay Challenge - API

## Visão Geral📚

Esta API foi desenvolvida em NestJS, utilizando mySQL como banco de dados e a biblioteca Prisma como ORM para fazer as solicitações de acesso a banco. O código possui sistema de autenticação em JWT e utilizar dos **guards** para fazer a restrição de acesso para rotas protegidas.

## Pré-Requisitos para rodar a API

- [Node.js](https://nodejs.org/en/docs)
- [Docker](https://www.docker.com/) (opcional)

# Informações Técnicas🛠️

Esta seção é destinada a desenvolvedores.

## Instalação do framework e suas depedências⚙️

- Primeiramente após clonar o projeto use o comando:

```
cd picpay-challenge
```

- Ao entrar no projeto utilize o comando para instalar as dependências.

```
npm install
```

- Em seguida será necessário criar um arquivo **.env** para as credenciais do banco de dados. Dentro do arquivo **.env** insira esta linha com as suas credenciais:

```
DATABASE_URL=mysl://USER:PASSWORD@HOST:PORT/DATABASE
```

- Será necessário também adicionar um segredo para o os tokens de autenticação presentes na API. Para isso no arquivo **.env** adicione esta linha:

```
JWT_SECRET=segredo
```

- Será necessário utilizar o Prisma para fazer o mapeamento do banco de dados. Para isso você pode fazer uma migration desses respectivos bancos, utilizando este comando:

```
npx prisma migrate dev --name [nome do migrate]
```

- Para finalizar será necessário gerar de fato o cliente Prisma para utilizá-lo no projeto. Fazemos isso com esse comando:

```
npm install @prisma/client
```

## Rodando o projeto 🚀

- Para inciar o projeto como desenvolvedor basta utilizar o comando:

```
npm run start:dev
```

- Ele começará a rodar a API no localhost na porta 3000.

## Docker 📦

- A API possui um Dockerfile, ou seja, caso deseje colocar em ambiente de produção, seria muito interessante utilizar do Docker.
- Para isso primeiramente é necessário tê-lo em sua máquina. Para baixar basta entrar no site [Docker](https://www.docker.com/) e ver como instalá-lo em sua máquina.
- Após instalar o Docker e configurar o prisma basta rodar o comando abaixo para subir a aplicação:

```
docker-compose up
```

> Com isso a API estará rodando na porta 3000.
