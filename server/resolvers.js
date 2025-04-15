import db from "./config/db.js";

export const resolvers = {
  Query: {
    books: async () => {
      const [rows] = await db.query('SELECT * FROM books');
      return rows;
    },
    book: async (_, { id }) => {
      const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
      return rows[0];
    },
  },
  Mutation: {
    addBook: async (_, { title, author, published_year, genre, availability }) => {
      const [result] = await db.query(
        'INSERT INTO books (title, author, published_year, genre, availability) VALUES (?, ?, ?, ?, ?)',
        [title, author, published_year, genre, availability]
      );
      return { id: result.insertId, title, author, published_year, genre, availability };
    },
    updateBook: async (_, { id, title, author, published_year, genre, availability }) => {
      await db.query(
        'UPDATE books SET title = ?, author = ?, published_year = ?, genre = ?, availability = ? WHERE id = ?',
        [title, author, published_year, genre, availability, id]
      );
      return { id, title, author, published_year, genre, availability };
    },
    deleteBook: async (_, { id }) => {
      await db.query('DELETE FROM books WHERE id = ?', [id]);
      return true;
    },
  }
};
