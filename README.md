# ⚙️ Backend - Catálogo de Produtos

## 1. Introdução
API do catálogo de produtos, desenvolvida em **NestJS + TypeScript + TypeORM**.  
Fornece endpoints para consulta, cadastro e gerenciamento de produtos.

---

## 2. Tecnologias utilizadas
- NestJS
- TypeScript
- TypeORM
- MySQL
- Swagger (documentação de rotas)
- Class Validator / Class Transformer
- Docker (opcional)

---

## 3. Estrutura de pastas

src/   
├─ common/   
│  ├─ enums/        # Enum de métodos HTTP e constantes    
│  ├─ utils/        # Helpers e tratamento de erros           
├─ config/          # Configurações (DB, variáveis de ambiente)    
├─ products/        # Módulo principal de produtos (controllers, services, entidades)      
├─ app.module.ts    # Módulo raiz    
└─ main.ts          # Bootstrap da aplicação

---

## 4. Módulos principais

### Products
- **Controller:** Define rotas REST (`/products`)  
- **Service:** Contém a lógica de negócios (busca, filtros, criação)  
- **Entity:** Mapeamento da tabela `products` no banco via TypeORM  

---

## 5. Fluxo de dados

### Exemplo de fluxo: busca de produtos
1. Cliente → `GET /products`  
2. Controller → chama `ProductsService.findAll()`  
3. Service → consulta o banco via `ProductRepository`  
4. Response → retorna JSON padronizado com lista de produtos  

---

## 6. Endpoints

### `GET /products`
- Retorna todos os produtos
- **Parâmetros opcionais:** `?name=`, `?category=`

**Exemplo de request:**
```http
GET /products?name=camisa
```

## 7. 🔒 Tratamento de Erros - Função `handleUnexpectedError`

O backend utiliza uma função utilitária chamada `handleUnexpectedError` para **padronizar o tratamento de erros inesperados** dentro dos services.

### 📌 Objetivo
- Garantir que **erros esperados** (`HttpException`) sejam propagados normalmente para o cliente.
- Capturar **erros inesperados** (ex.: falhas de conexão, exceções genéricas) e:
- **Logar** o erro no console com contexto (classe + método).
- **Retornar** uma resposta genérica com status 500 para o cliente.
- Evitar expor detalhes técnicos sensíveis para o cliente final.

---

### 🧠 Estrutura da função

```ts
  export function handleUnexpectedError(
    error: unknown,
    className: string,
    method: MethodEnum,
    genericMessage: string
  ): never
```

## 8. Como rodar o projeto

### Local
```bash
  npm install
  npm run start:dev
```

### Build

```bash
  npm run build
  npm run start:prod
```

# 8.1 🐳 Rodando o backend com Docker Compose

Este guia mostra como rodar o **backend do Catálogo de Produtos** usando Docker Compose, incluindo build das imagens, containers e configuração de variáveis de ambiente.

---

### Pré-requisitos

- Docker instalado: https://docs.docker.com/get-docker/  
- Docker Compose instalado: https://docs.docker.com/compose/install/  
- Copiar o arquivo `.env.example` para `.env` e preencher os valores reais:

```bash
  cp .env.example .env
```
 
```bash
  #Construir imagens
  docker-compose build

  #Subir containers
  docker-compose up

  #Para rodar em segundo plano:
  docker-compose up -d

  #Ver logs
  docker-compose logs -f

  #Parar containers
  docker-compose down

  #Para remover volumes de dados também:
  docker-compose down -v
```

### Estrutura do Docker Compose
#### - mysql: container do banco de dados MySQL 8.0
- Porta: 3306
- Volume persistente: mysql_data

#### - api: container do backend NestJS
- Porta: definida em PORT no .env
- Escuta todas interfaces (HOST=0.0.0.0)
- pende do MySQL
- Variáveis de ambiente definidas no .env

## Observações

- HOST=0.0.0.0 garante que a API dentro do container seja acessível externamente.
- PORT=3000 pode ser alterado conforme necessidade, mas lembre-se de ajustar o docker-compose.yml se mudar a porta do host.
- Certifique-se de que a porta escolhida esteja livre no host.
- O container da API reinicia automaticamente em caso de falha (restart: always).
- Qualquer alteração nas variáveis de ambiente exige rebuild do container da API:

```bash
docker-compose build api
docker-compose up -d
```

- Todas as rotas estão documentadas no Swagger em /api/.
