# CloudDocs 📁

**API REST para gerenciamento de documentos com Node.js, Express, PostgreSQL e Amazon S3.**

CloudDocs é um projeto de portfólio desenvolvido para praticar desenvolvimento backend, autenticação, segurança e integração com serviços AWS.

O projeto permite gerenciar documentos, armazenar arquivos no Amazon S3 e manter seus metadados no PostgreSQL.

🔗 **Repositório:** [github.com/rafaelps10/clouddocs](https://github.com/rafaelps10/clouddocs)

## 🚀 Tecnologias

- **Node.js e Express:** desenvolvimento da API REST.
- **PostgreSQL:** armazenamento de usuários e metadados.
- **Amazon S3:** armazenamento de arquivos.
- **AWS SDK for JavaScript v3:** integração com o S3.
- **JWT:** autenticação de requisições.
- **bcrypt:** hash de senhas.
- **Multer:** recebimento de arquivos.
- **Git e GitHub:** versionamento do código.

## ⚙️ Funcionalidades

- Cadastro e autenticação de usuários.
- Proteção de rotas com JWT.
- Listagem e gerenciamento de documentos.
- Upload e download de arquivos pelo Amazon S3.
- Exclusão do objeto no S3 e do registro correspondente no PostgreSQL.
- Verificação de propriedade dos documentos.
- Geração da chave S3 no backend, evitando que o cliente escolha livremente a chave do objeto.
- Limite configurado de upload de 10 MiB por arquivo.

## 🏗️ Arquitetura

```text
Cliente HTTP
     |
     v
Node.js + Express
     |
     +---- JWT / Middleware de autenticação
     |
     +---- PostgreSQL
     |       Usuários e metadados
     |
     +---- Amazon S3
             Arquivos
```

O backend coordena as operações entre a API, o banco de dados e o armazenamento de arquivos.

## ▶️ Como executar

**Pré-requisitos:** Node.js, npm, PostgreSQL e acesso AWS configurado para um bucket S3 privado.

1. Clone o repositório:

   ```bash
   git clone https://github.com/rafaelps10/clouddocs.git
   cd clouddocs/backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente no arquivo `.env`, utilizando os dados do seu ambiente:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=clouddocs
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   JWT_SECRET=sua_chave_secreta
   ```

4. Prepare o banco de dados e configure o acesso AWS conforme a configuração do projeto.

5. Inicie a API:

   ```bash
   node server.js
   ```

A API estará disponível em `http://localhost:3000`.

## 🔐 Segurança e limitações

O projeto implementa hash de senhas, autenticação JWT, consultas SQL parametrizadas e verificação de propriedade dos documentos.

**Status:** backend funcional em ambiente local, validado por testes manuais. Ainda não está preparado para produção e não possui testes automatizados completos.

Como o S3 e o PostgreSQL não compartilham uma única transação, falhas entre as operações podem causar inconsistências. Além disso, em buckets com versionamento habilitado, excluir um objeto pode criar um *delete marker* sem apagar suas versões anteriores.

## 🔮 Melhorias futuras

- Testes automatizados.
- Interface frontend.
- Infraestrutura como código.
- Tratamento aprimorado de falhas entre serviços.
- Implantação em ambiente AWS e pipeline CI/CD.

## 👨‍💻 Autor

**Rafael Pinto Santos**

- [GitHub](https://github.com/rafaelps10)
- [LinkedIn](https://linkedin.com/in/rafaelpintosantos/)
