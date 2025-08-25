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
  # Acessar pasta do backend
  cd backend

  # Instalar dependencias
  npm install

  # Rodar o projeto em desenvolvimento
  npm run start:dev
```

### Build

```bash
  # Acessar pasta do backend
  cd backend

  # Buildar o projeto
  npm run build

  # Rodar o projeto em produção
  npm run start:prod
```

---

### Todas as rotas estão documentadas no Swagger em /api/.

---
