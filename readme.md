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

# Como funciona o cluster Kubernetes nesse setup

## 1. Iniciar os kubernetes

```bash
    # Subir o banco de dados
    kubectl apply -f mysql-deployment.yaml
    
    # Subir o backend
    kubectl apply -f backend-deployment.yaml
    
    # Subir o frontend
    kubectl apply -f frontend-deployment.yaml
    
    # Aplicar o configMap
    kubectl apply -f frontend-configmap.yaml
```

## 1. Pods

### No Kubernetes, cada app roda dentro de um pod, que é a menor unidade de execução:

- MySQL pod: roda o banco de dados.
- Backend pod: roda a API Node.js/NestJS.
- Frontend pod: roda o Nginx servindo o app React/Vite.
- Cada pod tem um IP interno dentro do cluster e é acessível por outros pods via Service.

## 2. Services

### Os pods são efêmeros, então os Services criam um ponto fixo para acessar os pods:

- MySQL Service: expõe a porta 3306 internamente no cluster. O backend conecta usando esse Service (mysql:3306).
- Backend Service: expõe a porta 3000 internamente. O frontend acessa /api/... via Nginx usando o Service backend:3000.
- Frontend Service: opcionalmente expõe o pod via NodePort ou LoadBalancer para acessar pelo navegador de fora do cluster.

### 3. ConfigMap do Frontend

### O ConfigMap contém:

- default.conf do Nginx: define o proxy /api/ para http://backend:3000.
- env.js: define a variável VITE_API_URL dinamicamente no navegador para que o frontend saiba onde está a API.
- O Nginx do frontend usa esse proxy para redirecionar chamadas de /api para o backend sem precisar que o navegador conheça o IP interno do backend.

## 4. Fluxo de requisições

- Usuário acessa no navegador http://<NodeIP>:<NodePort>/.
- O Nginx serve o app frontend.
- O app faz requisição fetch("/api/products").
- O Nginx intercepta /api e faz proxy para http://backend:3000/products.
- O backend processa a requisição e busca dados no MySQL (via Service mysql:3306).
- A resposta volta pelo backend → Nginx → navegador.

## 5. Port-Forward

- Se você não quer usar NodePort/LoadBalancer, pode usar port-forward:
- Banco de dados: kubectl port-forward mysql-pod 3306:3306
- Backend: kubectl port-forward backend-pod 3000:3000
- Frontend: kubectl port-forward frontend-pod 8080:80
- Isso permite acessar localmente como se estivesse rodando tudo na sua máquina.

## 6. Vantagens

- Cada app isolado em seu pod.
- Configuração de rede estável via Services.
- Nginx faz proxy sem expor IP interno do backend.
- Fácil de trocar backend ou frontend sem mudar URLs externas, só atualiza ConfigMap.