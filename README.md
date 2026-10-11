# Sistema de Aluguel de Motos

Uma plataforma web full-stack desenvolvida para gerenciar o aluguel de motos, pagamentos, manutenções e usuários. O sistema conta com uma landing page integrada
e painéis administrativos que permitem o gerenciamento das informações e dos conteúdos exibidos no site.

O projeto foi desenvolvido com **React no front-end** e **Node.js com Express no back-end**, utilizando uma API para a comunicação entre as aplicações.

## Tecnologias utilizadas

### Back-end

- **Node.js:** ambiente de execução JavaScript no servidor.
- **Express:** construção da API e gerenciamento de rotas e requisições HTTP.
- **Sequelize ORM:** mapeamento objeto-relacional para interação com banco de dados relacional, facilitando operações de consulta, cadastro,
atualização e exclusão de dados.
- **JWT (JSON Web Token):** autenticação e validação de tokens para proteger rotas e controlar o acesso aos recursos do sistema.
- **bcrypt:** proteção de senhas por meio de hashing seguro.
- **Multer:** recebimento e gerenciamento de arquivos enviados pela aplicação, como imagens.
- **Nodemailer:** envio de e-mails, incluindo mensagens relacionadas ao cadastro de usuários.
- **Arquitetura em camadas:** organização das responsabilidades da aplicação para facilitar manutenção, testes e evolução do código.
- **Organização por domínio:** separação dos arquivos e das funcionalidades de acordo com as áreas de negócio do sistema.

### Front-end

- **React:** construção de interfaces dinâmicas e componentes reutilizáveis.
- **Bootstrap:** estilização da interface e utilização de componentes visuais para agilizar o desenvolvimento.

##  Funcionalidades

### Autenticação e usuários

- Cadastro e login de usuários.
- Autenticação baseada em JWT.
- Controle de acesso a funcionalidades conforme o perfil do usuário.
- Proteção de rotas e recursos restritos.
- E-mails enviados durante o processo de cadastro.

### Gerenciamento de motos e aluguéis

- Cadastro, consulta, edição e exclusão de aluguéis.
- Associação dos aluguéis aos respectivos usuários e motos.
- Consulta dos aluguéis vinculados a cada usuário.
- Gerenciamento de informações relacionadas às motos.
- Cadastro e gerenciamento de manutenções e revisões das motos.

### Gerenciamento de pagamentos

- Consulta dos pagamentos realizados.
- Visualização dos pagamentos relacionados aos aluguéis.
- Organização das informações financeiras vinculadas às operações de locação.

### Painel administrativo

- Gerenciamento de usuários.
- Consulta dos aluguéis associados aos usuários.
- Administração dos comentários e sugestões enviados pelos usuários.
- Aprovação e reprovação de comentários.
- Gerenciamento das imagens das motos exibidas na landing page.
- Administração das informações necessárias para o funcionamento da plataforma.

### Painel do usuário

- Consulta dos próprios aluguéis.
- Consulta do histórico de pagamentos.
- Edição de dados pessoais.
- Envio de comentários, avaliações e sugestões ao administrador.

### Landing page

- Página pública de apresentação da plataforma.
- Exibição de imagens das motos disponibilizadas no site.
- Exibição de comentários aprovados pela administração.
- Integração com o sistema de gerenciamento para manter o conteúdo atualizado.

### Paginação e filtros

O sistema possui recursos de paginação e filtragem para facilitar a navegação e a consulta dos dados.

- Paginação de registros nas listagens.
- Filtros para localizar informações específicas.
- Melhor organização de grandes conjuntos de dados.
- Navegação mais prática nos painéis administrativos e de usuário.

## Arquitetura do projeto

O back-end utiliza uma arquitetura em camadas combinada com a organização dos arquivos por domínio, buscando separar responsabilidades e facilitar a manutenção.

A aplicação é dividida em duas partes principais:

- **Back-end:** responsável pelas regras de negócio, autenticação, acesso ao banco de dados, gerenciamento de arquivos e disponibilização da API.
- **Front-end:** responsável pela interface, navegação, formulários e interação do usuário com as funcionalidades do sistema.

## Estrutura do projeto

```text
aluguel-de-motos/
├── back-end/
│   ├── src/
│   ├── package.json
│   └── ...
├── front-end/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```

*Estrutura ilustrativa: a organização interna das pastas pode variar conforme a implementação.*

## Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- npm, normalmente instalado junto com o Node.js.
- Banco de dados relacional configurado conforme as configurações do back-end.

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
cd NOME_DO_REPOSITORIO
```

Substitua `URL_DO_REPOSITORIO` e `NOME_DO_REPOSITORIO` pelos dados do seu repositório.

### 2. Executar o back-end

Abra um terminal na raiz do projeto e execute:

```bash
cd back-end
npm install
npm start
```

O comando `npm install` instala as dependências do back-end, enquanto `npm start` inicia o servidor conforme definido no `package.json`.

### 3. Executar o front-end

Abra **outro terminal**, mantendo o back-end em execução, e execute a partir da raiz do projeto:

```bash
cd front-end
npm install
npm run dev
```

O comando `npm run dev` inicia o servidor de desenvolvimento do front-end.

Após iniciar as aplicações, acesse o endereço local informado pelo Vite no terminal.

##  Configuração do ambiente

Antes de executar o sistema, configure as variáveis de ambiente necessárias no back-end, 
incluindo as informações de conexão com o banco de dados, o segredo utilizado para assinar os JWTs e as credenciais de envio de e-mails,
conforme a implementação do projeto.

Se necessário, configure também a URL da API no front-end.

Crie um arquivo .env com as seguintes variáveis :
keySecret = 
senha_email=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_USER=
PORT=


## Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de aplicar conhecimentos de desenvolvimento web full-stack na construção de uma plataforma de gerenciamento de aluguel de motos.

Durante o desenvolvimento, foram trabalhados conceitos como:

- Construção e integração de API REST.
- Autenticação e autorização com JWT.
- Modelagem e persistência de dados relacionais com Sequelize.
- Organização do código por camadas e domínios.
- Upload e gerenciamento de imagens.
- Envio de e-mails automatizados.
- Desenvolvimento de interfaces com React e Bootstrap.
- Gerenciamento de permissões para usuários e administradores.
- Implementação de filtros e paginação.
- Integração entre front-end, back-end e banco de dados.

## Considerações finais

O sistema reúne funcionalidades administrativas e operacionais em uma única plataforma, oferecendo recursos para gerenciar motos, aluguéis, pagamentos, manutenções e interações com os usuários.

Além de atender às necessidades propostas para o sistema de locação, o projeto serviu como oportunidade para praticar organização de código, integração entre aplicações e desenvolvimento de funcionalidades comuns em sistemas web reais.
