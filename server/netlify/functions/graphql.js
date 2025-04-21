const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const serverless = require('serverless-http');
const { authMiddleware } = require('../../utils/auth');
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path');

dotenv.config()


const { typeDefs, resolvers } = require('../../schemas');
const db = require('../../config/connection');
// Stripe Secret Key
// const stripe = require('stripe')('sk_test_51M9WEeA0zgGYE8hKfLzdebUdsNrrjNE3SI2bkSS8NclVm5VXPYz0VglrMEMnmJnK4uKi3jsQvBEkHMaFZEpSJsLr00EcdyU0Ss');

const PORT = process.env.PORT || 3001;


const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(cors()); // For Stripe
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
// }

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

let handler;

const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    // Ensure DB connection initializes before accepting requests
    await new Promise((resolve) => db.once('open', resolve));

    handler = serverless(app);
};

startServer();

exports.handler = async (event, context) => {
    if (!handler) {
        await startServer();
    }
    return handler(event, context);
};