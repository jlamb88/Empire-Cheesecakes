//DEPENDENCIES
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

//PAGES
import { Home, UserPage, About, Store, Success, Cancel, SignUp, Login, QueryShell } from './pages'

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//COMPONENTS
// import { CartProvider, Header, NaviBar, ProductCard, Queries, CartContext, LoginForm, SignupForm } from './components';
// import Success from './pages/Success';
// import Cancel from './pages/Cancel';
import CartProvider from './contexts/CartContext';
import AuthProvider from './contexts/AuthContext'
import ErrorHandler from './components/ErrorHandler'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App(details) {

  return (
    <div className='bg-parent'>
      <ApolloProvider client={client}>
        <Container>
          <ErrorHandler>
            <AuthProvider>
              <CartProvider>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path="/store" element={<Store />} />
                  <Route path='/success' element={<Success />} />
                  <Route path='/cancel' element={<Cancel />} />
                  <Route path='/user' element={<Login />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/query' element={<QueryShell />} />
                </Routes>
              </CartProvider>
            </AuthProvider>
          </ErrorHandler>
        </Container>
      </ApolloProvider>
    </div >
  );
};

export default App;