# Formulário de Endereço com Consulta de CEP

Este projeto é uma aplicação web de página única que apresenta um formulário de endereço. A principal funcionalidade é o preenchimento automático dos campos de endereço (rua, bairro, cidade e estado) a partir de um CEP informado, utilizando a API pública [ViaCEP](https://viacep.com.br/).

## Funcionalidades

- **Formulário de Endereço:** Interface para inserção de dados de endereço.
- **Consulta de CEP:** Ao digitar um CEP válido de 8 dígitos, a aplicação consulta a API ViaCEP e preenche automaticamente os campos de rua, bairro, cidade e estado.
- **Validação de Formulário:** O campo CEP é validado para aceitar apenas números e para garantir que tenha 8 dígitos. O campo número também é obrigatório.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela.

## Tecnologias Utilizadas

- **HTML5:** Para a estrutura da página.
- **CSS3:** Para a estilização, incluindo um design moderno com gradientes e animações.
- **JavaScript (ES6+):** Para a lógica da aplicação, incluindo a validação do formulário e a comunicação com a API ViaCEP (usando `fetch`).
- **Bootstrap 5:** Para a estrutura do layout e componentes de formulário.
- **ViaCEP API:** Para a consulta de endereços a partir do CEP.

## Como Usar

1. **Clone o repositório ou baixe os arquivos.**
2. **Abra o arquivo `public_html/index.html` em seu navegador de internet.**
