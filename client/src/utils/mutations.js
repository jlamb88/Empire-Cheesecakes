import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!)  {
  login(email: $email, password: $password) {
    token
    user {
      _id
      firstName
      lastName
    }
  }
}`

export const ADD_USER = gql`
mutation addUser($email: String!, $password: String!, $firstName: String, $lastName: String, $address: String, $city: String, $state: String, $zipcode: Int, $phone: Float) {
    addUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName, streetAddress: $streetAddress, city: $city, state: $state, zipcode: $zipcode, phone: $phone) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`
export const ADD_CART = gql`
mutation addCart($userId: ID!, $cartContents: [cartInput]!) {
  addCart(userId: $userId, cartContents: $cartContents) {
    userId
    items {
      productId
      quantity
    }
  }
}
`
export const DELETE_CART = gql`
mutation deleteCart($userId: ID!) {
  deleteCart(userId: $userId)
}
`
export const CHECKOUT = gql`
mutation checkoutSession($userId: ID!) {
  checkoutSession(userId: $userId) {
    userId
    transId
    url
    total
  }
}
`
export const ADD_ORDER = gql`
mutation AddOrder($userId: ID!, $orderItems: [orderItems], $total: Int, $transId: String) {
  addOrder(userId: $userId, orderItems: $orderItems, total: $total, transId: $transId) {
    total
    _id
  }
}
`

