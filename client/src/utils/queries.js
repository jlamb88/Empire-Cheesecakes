import { gql } from '@apollo/client'

export const PRODUCTS = gql`
query products {
    products {
      _id
      name
      description
      price
      stock
      allergens
      comments {
        name
        text
        rating
        dateAdded
      }
      image
    }
  }`

export const ONE_PRODUCT = gql`
query oneProduct($id: ID!) {
    product(_id: $id) {
      _id
      name
      description
      price
      quantity
      allergens
      comments {
        name
        text
        rating
        dateAdded
      }
    }
  }`

export const USER = gql`
query User($id: ID!) {
    user(_id: $id) {
      _id
      firstName
      lastName
      streetAddress
      city
      state
      phone
      email
      password
      payment {
        cardType
        cardNumber
        expiration
        default
      }
    }
  }
  `

export const USER_CART = gql`
query Cart($userId: ID!) {
  cart(userId: $userId) {
    userId
    items {
      productId
      quantity
    }
  }
}
`
export const USER_ORDER = gql`
query UserOrders($userId: ID!) {
  userOrders(userId: $userId) {
    userId
    products {
      _id
      name
    }
    total
    transId
    orderedAt
  }
}
`


