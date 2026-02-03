const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const serverless = require('serverless-http');
const { authMiddleware } = require('../../utils/auth');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { typeDefs, resolvers } = require('../../schemas');
const connectToDatabase = require('../../config/connection');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let serverReady = false;
let apolloHandler;

const startServer = async () => {
    if (serverReady && apolloHandler) {
        return apolloHandler;
    }

    try {
        await connectToDatabase();

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: authMiddleware,
        });

        await server.start();
        server.applyMiddleware({ app, path: '/graphql' });

        apolloHandler = serverless(app);
        serverReady = true;
        return apolloHandler;
    } catch (error) {
        console.error('Error starting Apollo server:', error);
        throw error;
    }
};

exports.handler = async (event, context) => {
    const handler = await startServer();
    return handler(event, context);
};
