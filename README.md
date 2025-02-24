# Cryptocurrency Price Monitor

A web application to monitor real-time cryptocurrency prices using the Binance API. The project allows users to view price quotes for different currencies in a user-friendly and responsive interface.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React component framework for styling and layout.
- **TypeScript**: JavaScript superset that adds static typing.
- **WebSocket**: For real-time communication with the Binance API.
- **Jest and React Testing Library**: For unit and integration testing.

## Features

- Real-time monitoring of cryptocurrency prices.
- Display of price data, including:
  - Last price
  - Ask price
  - Bid price
  - Percentage variation
- User-friendly and responsive interface, adapted for mobile devices.

## Prerequisites

Before starting, you need to have installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (usually installed with Node.js)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/repository-name.git
   ```

2. Navigate to the project directory:

   ```bash
   cd repository-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and go to: [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/src
  /components       # Reusable React components
  /context          # Context API for state management
  /hooks            # Custom hooks
  /pages            # Application pages
  /styles           # Global styles and theme
  /tests            # Automated tests
```

## Testing

To run automated tests, use the following command:

```bash
npm test
```

## Contribution

Contributions are welcome! Feel free to open an **issue** or a **pull request**.

1. Fork the repository
2. Create a new branch for your feature:
   ```bash
   git checkout -b my-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Adding new feature"
   ```
4. Push your changes to the remote repository:
   ```bash
   git push origin my-feature
   ```
5. Open a Pull Request.

## License

This project is under the MIT license. See the [LICENSE](LICENSE) file for more details.

## Contact

For more information, contact [your-email@domain.com](mailto:your-email@domain.com).
