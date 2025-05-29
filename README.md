# Eatzy

## Descrição
O **Eatzy** é uma aplicação web desenvolvida para ajudar usuários a descobrir estabelecimentos gastronômicos próximos à sua localização atual. O projeto oferece informações detalhadas sobre cada estabelecimento, incluindo avaliações de clientes, horário de funcionamento, preço médio e a possibilidade de filtrar resultados de acordo com as preferências do usuário. 

O Eatzy foi pensado para um público diversificado, como turistas, pessoas que buscam praticidade e entusiastas de culinária que desejam experimentar novos sabores.

## Funcionalidades
- **Localização em tempo real**: Mostra estabelecimentos próximos com base na localização atual do usuário.
- **Avaliações e informações**: Exibe avaliações de clientes, horário de funcionamento e preço médio dos estabelecimentos.
- **Filtros personalizados**: Permite filtrar estabelecimentos por tipo de culinária, preço, avaliação e outras preferências.
- **Interface intuitiva**: Design amigável e fácil de usar para uma experiência agradável.

## Tecnologias Utilizadas
- **Frontend**: Vue.js, HTML, CSS, JavaScript
- **Backend**: Node.js
- **Banco de Dados**: JSON (para armazenamento de dados)
- **Ferramentas**: GitHub (controle de versão), Visual Studio Code (editor de código), API Google Places.

## Como Executar o Projeto

### Pré-requisitos
- Node.js instalado na máquina.
- Git instalado para clonar o repositório.

### Passo a Passo

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/GustavoM4tias/restaurante.git

2. **Instale as dependências**: 
 - No diretório do backend:
      ```bash
      cd backend
      npm install
  
 - No diretório do frontend:
      ```bash
      cd ../frontend
      npm install
      
3. **Execute o backend**:
 - No diretório do backend, rode o seguinte comando:
   ```bash
   npx nodemon server.js

4. **Execute o frontend**:
 - No diretório do frontend, rode o seguinte comando:
   ```bash
   npm run dev

5. **Acesse a aplicação:**:
 Abra o navegador e acesse o link fornecido no terminal após rodar o frontend (geralmente `http://localhost:5173` ou similar).

## Como Contribuir 
O projeto utiliza um fluxo de trabalho baseado em branches para controle de modificações. Siga os passos abaixo para contribuir:

1. Crie uma branch:
 - Cada integrante deve criar sua própria branch para trabalhar:
    ```bash
    git checkout -b nome-da-branch

2. Faça as alterações:
 - Teste suas modificações localmente antes de enviar.

3. Commit e Push:
 - Após testar, faça o commit das alterações:
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   git push origin nome-da-branch

4. Abra um Pull Request (PR):
 - Envie um PR da sua branch para a branch `main`.
 - Um dos integrantes do time fará a revisão do código.

5. Merge:
 - Após a aprovação do PR, o código será mergeado na branch `main`.

## Agradecimentos
Agradecemos a todos que, de alguma forma, contribuíram para o desenvolvimento do Eatzy. 🙏

## Autores
 - Breno Bernardo - RA: 1988043
 - Gilmar Junior - RA: 1978685
 - Gustavo Diniz - RA: 1977490
 - Maria Eduarda Del Boni - RA: 1974297
 - Suelen Aleixo - RA: 1969506
