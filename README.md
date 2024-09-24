# Tivic Test Frontend

Este é o front-end do projeto Tivic Test.

Instruções de Configuração e Execução do Projeto:

## Pré-requisitos:

  - Node.js (Versão mínima recomendada: 16.x)
  - Angular CLI (Versão mínima recomendada: 15.x)

## Passos para rodar o projeto:

1. Instalar as dependências:

        npm install

2. Configurar o end-point da API e autenticação no api.service:

        private apiUrl = 'api-endpoint'; // URL da API
        private username = 'your-user'; // Usuário para autenticação
        private password = 'your-token'; // Token de autenticação

3. Rodar a aplicação:

        ng serve

  Acesse a aplicação no navegador em http://localhost:4200.

## Tecnologias Utilizadas

![Angular](https://img.shields.io/badge/Angular-18.0.0-DD0031?style=for-the-badge&logo=angular&logoColor=white) ![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white) ![Angular Material](https://img.shields.io/badge/Angular%20Material-15.0.0-757575?style=for-the-badge&logo=angular-material&logoColor=white) ![NgCharts2](https://img.shields.io/badge/NgCharts2-1.0.0-ff5733?style=for-the-badge&logo=chart.js&logoColor=white)
