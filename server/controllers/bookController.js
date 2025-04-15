import db from "../config/db.js";

export const getAllBooks = async ({
  limit = 5,
  offset = 0,
  sortBy = "id",
  sortOrder = "ASC",
}) => {
  const validSortFields = [
    "id",
    "title",
    "author",
    "published_year",
    "genre",
    "availability",
  ];
  const validSortOrders = ["ASC", "DESC"];

  // Fallback to default if invalid values are passed
  const safeSortBy = validSortFields.includes(sortBy) ? sortBy : "id";
  const safeSortOrder = validSortOrders.includes(sortOrder.toUpperCase())
    ? sortOrder.toUpperCase()
    : "ASC";

  const [rows] = await db.query(
    `SELECT * FROM books WHERE deleted_at IS NULL ORDER BY ${safeSortBy} ${safeSortOrder} LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  return rows;
};

export const getBookByID = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM books WHERE id = ? AND deleted_at IS NULL",
    [id]
  );
  return rows[0];
};

export const addBook = async ({
  title,
  author,
  published_year,
  genre,
  availability,
  deleted_at = null,
}) => {
  const [result] = await db.query(
    "INSERT INTO books (title, author, published_year, genre, availability, deleted_at) VALUES (?, ?, ?, ?, ?, ?)",
    [title, author, published_year, genre, availability, deleted_at]
  );
  return {
    id: result.insertId,
    title,
    author,
    published_year,
    genre,
    availability,
    deleted_at,
  };
};

export const updateBook = async ({
  id,
  title,
  author,
  published_year,
  genre,
  availability,
  deleted_at = null,
}) => {
  await db.query(
    "UPDATE books SET title = ?, author = ?, published_year = ?, genre = ?, availability = ?, deleted_at = ? WHERE id = ?",
    [title, author, published_year, genre, availability, deleted_at, id]
  );
  return { id, title, author, published_year, genre, availability, deleted_at };
};

export const deleteBook = async (id) => {
  await db.query("UPDATE books SET deleted_at = NOW() WHERE id = ?", [id]);
  return true;
};
