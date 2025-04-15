import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      published_year
      genre
      availability
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: Int!) {
    book(id: $id) {
      id
      title
      author
      published_year
      genre
      availability
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook(
    $title: String!
    $author: String!
    $published_year: Int!
    $genre: String!
    $availability: Boolean!
  ) {
    addBook(
      title: $title
      author: $author
      published_year: $published_year
      genre: $genre
      availability: $availability
    ) {
      id
      title
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: Int!
    $title: String!
    $author: String!
    $published_year: Int!
    $genre: String!
    $availability: Boolean!
  ) {
    updateBook(
      id: $id
      title: $title
      author: $author
      published_year: $published_year
      genre: $genre
      availability: $availability
    ) {
      id
      title
      author
      published_year
      genre
      availability
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id)
  }
`;
