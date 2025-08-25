# 🛍️ Frontend - Catálogo de Produtos

## 1. Introdução
Frontend do catálogo de produtos, desenvolvido em **React + TypeScript + CSS**.  
Permite navegar por produtos, buscar itens, gerenciar favoritos e carrinho.

---

## 2. Tecnologias utilizadas
- React 18
- TypeScript
- CSS
- React Router 6
- Axios
- Lucide Icons

---

## 3. Estrutura de pastas

src/
├─ assets/ # Imagens e ícones
├─ components/ # Componentes reutilizáveis (Header, CardProduct, SearchProducts, etc.)
├─ pages/ # Páginas (Home, ProductDetails, NotFound)
├─ api/ # Comunicação com a API
└─ App.tsx # Configuração de rotas e layout principal

---

## 4. Componentes Principais

### Header
Responsável pelo topo da aplicação, barra de pesquisa e navegação de ícones.

**Props:**
```ts
interface HeaderProps {
  onSearchChange: (value: string) => void;
  getProducts: (value: string) => void;
}
```

**Comportamento:**

Pesquisa dispara automaticamente em páginas normais.

Na página de detalhes do produto (/product/:id), a pesquisa só dispara ao clicar no ícone 🔍.

SearchProducts
Input de pesquisa dentro do Header.

Props:

```ts
interface SearchProductsProps {
  onSearchChange: (value: string) => void;
  getProducts: (value: string) => void;
}
```

**Uso:**

```tsx
<SearchProducts
  onSearchChange={handleSearch}
  getProducts={fetchProducts}
/>
```

**ProductDetails**
Exibe informações detalhadas de um produto.

Exemplo de uso:

```tsx
  <ProductDetails />
```

**Fluxo:**

Pega id da URL via useParams().

Chama API.get('api/products', { params: { productId: id } }).

Exibe imagem, descrição e preço.

Se não encontrar produto, renderiza 
```tsx
  <ProductNotFound />. 
```

ProductNotFound
Componente usado quando o produto não é encontrado.

Exemplo de uso:

```tsx
  <ProductNotFound />. 
```
Props: nenhum.
Exibe ícone e mensagem amigável.

Loading
Spinner usado enquanto os dados estão sendo carregados.

Exemplo de uso:

```tsx
  <Loading />
```

Props: nenhum.

---

## 5. Fluxo de dados
Busca de produtos

Usuário digita na barra → SearchProducts → Header dispara API → estado local → renderização
Página de detalhes

Header pesquisa somente ao clicar no ícone → ProductDetails chama API pelo id da URL → renderiza produto ou 

```tsx
  <ProductNotFound />
```

---

## 6. Estilo e design
CSS para classes utilitárias.

Padrões de cores:

Roxo principal: #9333ea

Texto padrão: #444

Fundo: #f9f5ff ou branco

Botões e inputs: bordas arredondadas, sombras leves.

---

## 7. Dependências

react, react-dom, react-router-dom

axios

lucide-react

---

## 8. Scripts úteis
```bash

# Instalar dependências
npm install

# Rodar projeto local
npm run dev

# Build de produção
npm run build
```

---

## 🐳 Rodando o frontedn com Docker

Comando de Build do Frontend com Vite e Docker

```bash
  docker build \
    --build-arg VITE_API_URL=http://localhost:3000 \
    -t meu-frontend .
```

### Explicação dos parâmetros
- Parâmetro	Função
- docker build	Comando para construir uma imagem Docker a partir de um Dockerfile.
- --build-arg VITE_API_URL=http://localhost:3000	Passa a variável VITE_API_URL como argumento para o build. Essa variável será usada no Dockerfile para definir - ENV VITE_API_URL=$VITE_API_URL e incorporada no bundle do Vite.
- -t meu-frontend	Dá um nome (tag) para a imagem que está sendo construída, facilitando o run depois.
- .	Contexto do build: indica que o Dockerfile e todo o código estão na pasta atual.

### Como usar depois do build

- Rodar o container do frontend:
```bash
  docker run -p 8080:80 meu-frontend
```

### Isso vai expor a aplicação no host na porta 8080.


---

## 9. Observações
- Componentes são reutilizáveis e seguem padrão de props claro.

- Projeto pronto para integração com backend via API.

- O Vite já terá embutido o valor http://localhost:3000 como import.meta.env.VITE_API_URL.

- Alterar a URL da API:

- Como o React com Vite resolve variáveis de ambiente durante o build, para mudar VITE_API_URL é necessário rebuildar a imagem:

```bash
  docker build \
    --build-arg VITE_API_URL=http://outra-api:3000 \
    -t meu-frontend .
```

---
