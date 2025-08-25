# Desafio Backend - Monorepo

Este repositório contém o **backend (NestJS)**, **frontend (Vite/React)** e o **banco de dados MySQL**, organizados em um monorepo.  

O objetivo deste README é mostrar como rodar o projeto completo usando **Docker Compose**, além de fornecer referências para os READMEs específicos de cada subprojeto.

---

## Estrutura do repositório

desafio-backend/   
│   
├─ backend/ # Backend NestJS    
├─ frontend/ # Frontend Vite/React   
├─ docker-compose.yml   
├─ .env.example    
└─ README.md   


---

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- (Opcional) Node.js e npm/yarn se quiser rodar localmente sem Docker

---

## Configuração do ambiente

1. Copie o arquivo `.env.example` para `.env`:

```bash
    cp .env.example .env
```

Preencha as variáveis com os valores do seu ambiente, como credenciais do banco de dados e URL do backend para o frontend.

Rodando o projeto com Docker
No diretório raiz do monorepo:

```bash
    docker-compose up --build
```

Isso vai:

- Subir o MySQL.
- Subir o backend NestJS.
- Subir o frontend Vite/React.

## Acessando os serviços

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- MySQL: host localhost:3306, usuário e senha conforme seu .env

O frontend acessa o backend via variável VITE_API_URL definida no .env.

## Referências internas
Cada subprojeto tem seu próprio README detalhado:

- [Backend README](backend/README.md)

Contém instruções de setup, scripts, banco de dados e endpoints da API.

- [Frontend README](frontend/README.md)

Contém instruções de desenvolvimento, build e variáveis de ambiente do Vite.

Comandos úteis do Docker
Parar todos os containers:

```bash
    docker-compose down
```

## Visualizar logs:

```bash
    docker-compose logs -f
```
Listar containers em execução:

```bash
    docker ps
```

# Observações

- O .env não deve ser commitado, apenas o .env.example.
- Para comunicação entre containers, use os nomes dos serviços do Docker Compose como host:
- Backend acessa MySQL via mysql:3306
- Frontend acessa backend via backend:3000 (dentro do container)
- Para acesso do navegador, use localhost:porta conforme mapeamento das portas.

Estrutura recomendada para o .env
```bash
    # MySQL
    MYSQL_ROOT_PASSWORD=
    MYSQL_DATABASE=
    MYSQL_USER=
    MYSQL_PASSWORD=

    # Backend
    NODE_ENV=
    HOST=
    PORT=
    DB_HOST=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=

    # Frontend
    VITE_API_URL=
```

Feito para que qualquer pessoa possa clonar o repositório e rodar o projeto completo sem precisar configurar manualmente cada serviço.