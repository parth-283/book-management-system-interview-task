import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} from "graphql";
import { resolvers } from "../resolvers.js";

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    published_year: { type: GraphQLInt },
    genre: { type: GraphQLString },
    availability: { type: GraphQLBoolean },
    deleted_at: { type: GraphQLString },
  },
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      args: {
        limit: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        sortBy: { type: GraphQLString },
        sortOrder: { type: GraphQLString },
      },
      resolve: (_, args) => resolvers.Query.books(args),
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLInt } },
      resolve: resolvers.Query.book,
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        published_year: { type: GraphQLInt },
        genre: { type: GraphQLString },
        availability: { type: GraphQLBoolean },
        deleted_at: { type: GraphQLString },
      },
      resolve: resolvers.Mutation.addBook,
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        published_year: { type: GraphQLInt },
        genre: { type: GraphQLString },
        availability: { type: GraphQLBoolean },
        deleted_at: { type: GraphQLString },
      },
      resolve: resolvers.Mutation.updateBook,
    },
    deleteBook: {
      type: GraphQLBoolean,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: resolvers.Mutation.deleteBook,
    },
  },
});

export default new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});
