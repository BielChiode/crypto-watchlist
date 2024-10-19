# Monitor de Preços de Criptomoedas

Um aplicativo web para monitorar preços em tempo real de criptomoedas utilizando a API da Binance. O projeto permite aos usuários visualizar cotações de diferentes moedas em uma interface amigável e responsiva.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Material-UI**: Framework de componentes React para estilização e layout.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **WebSocket**: Para comunicação em tempo real com a API da Binance.
- **Jest e React Testing Library**: Para testes unitários e de integração.

## Funcionalidades

- Monitoramento em tempo real de preços de criptomoedas.
- Visualização de dados de preços, incluindo:
  - Último preço
  - Preço de venda (ask)
  - Preço de compra (bid)
  - Variação percentual
- Interface amigável e responsiva, adaptada para dispositivos móveis.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

5. Abra o navegador e acesse: [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
/src
  /components       # Componentes React reutilizáveis
  /context          # Context API para gerenciamento de estado
  /hooks            # Hooks personalizados
  /pages            # Páginas da aplicação
  /styles           # Estilos globais e tema
  /tests            # Testes automatizados
```

## Testes

Para executar os testes automatizados, utilize o seguinte comando:

```bash
npm test
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um **issue** ou um **pull request**.

1. Fork o repositório
2. Crie uma nova branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça suas alterações e faça commit:
   ```bash
   git commit -m "Adicionando nova feature"
   ```
4. Envie suas alterações para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para mais informações, entre em contato com [seu-email@dominio.com](mailto:seu-email@dominio.com).
