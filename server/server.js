const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()


const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// Stripe Secret Key
// const stripe = require('stripe')('sk_test_51M9WEeA0zgGYE8hKfLzdebUdsNrrjNE3SI2bkSS8NclVm5VXPYz0VglrMEMnmJnK4uKi3jsQvBEkHMaFZEpSJsLr00EcdyU0Ss');

const PORT = process.env.SERVER_PORT || 3001;
console.log(process.env.SERVER_MONGODB_URI)

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(cors()); // For Stripe
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  console.log("MONGO");
  db.once('open', () => {
    app.listen(SERVER_PORT, () => {
      console.log(`API server running on port ${SERVER_PORT}!`);
      console.log(`Use GraphQL at http://localhost:${SERVER_PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);