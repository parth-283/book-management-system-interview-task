# Solvify Tech Practical

This project is a GraphQL-based server for managing a library of books. It provides functionalities to query, add, update, and delete books. Below is a detailed overview of the project, its features, database details, and steps to run it.

## Features

1. **GraphQL API**:

   - Query all books with optional pagination and sorting.
   - Query a single book by its ID.
   - Add a new book to the library.
   - Update an existing book's details.
   - Delete a book by its ID.

2. **Book Schema**:

   - Fields:
     - `id` (Integer): Unique identifier for the book.
     - `title` (String): Title of the book.
     - `author` (String): Author of the book.
     - `published_year` (Integer): Year the book was published.
     - `genre` (String): Genre of the book.
     - `availability` (Boolean): Availability status of the book.
     - `deleted_at` (String): Timestamp for soft deletion.

3. **Resolvers**:
   - Query Resolvers:
     - `books`: Fetches a list of books with optional pagination (`limit`, `offset`) and sorting (`sortBy`, `sortOrder`).
     - `book`: Fetches a single book by its `id`.
   - Mutation Resolvers:
     - `addBook`: Adds a new book with the provided details.
     - `updateBook`: Updates an existing book's details by its `id`.
     - `deleteBook`: Deletes a book by its `id`.

## Database Details

- **Database Type**: Relational Database (e.g., MySQL, PostgreSQL, etc.)
- **Tables**:
  - `books`:
    - `id`: Primary key, auto-incremented.
    - `title`: String, not null.
    - `author`: String, not null.
    - `published_year`: Integer, not null.
    - `genre`: String, not null.
    - `availability`: Boolean, not null.
    - `deleted_at`: Nullable string for soft deletion.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A running instance of a relational database (e.g., MySQL, PostgreSQL)

## Steps to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd Solvify_Tech_Practicle
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up the Database**:

   - Create a database (e.g., `library_db`).
   - Run the necessary migrations or SQL scripts to create the `books` table.

4. **Configure Environment Variables**:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     DB_HOST=<your-database-host>
     DB_PORT=<your-database-port>
     DB_USER=<your-database-username>
     DB_PASSWORD=<your-database-password>
     DB_NAME=<your-database-name>
     ```

5. **Start the Server**:

   ```bash
   npm start
   ```

6. **Access the GraphQL Playground**:
   - Open your browser and navigate to `http://localhost:4000/graphql`.

## Example Queries

### Fetch All Books

```graphql
query {
  books(limit: 10, offset: 0, sortBy: "title", sortOrder: "asc") {
    id
    title
    author
    published_year
    genre
    availability
  }
}
```

### Fetch a Single Book

```graphql
query {
  book(id: 1) {
    id
    title
    author
    published_year
    genre
    availability
  }
}
```

### Add a New Book

```graphql
mutation {
  addBook(
    title: "New Book"
    author: "Author Name"
    published_year: 2023
    genre: "Fiction"
    availability: true
  ) {
    id
    title
  }
}
```

### Update a Book

```graphql
mutation {
  updateBook(
    id: 1
    title: "Updated Title"
    author: "Updated Author"
    published_year: 2022
    genre: "Non-Fiction"
    availability: false
  ) {
    id
    title
  }
}
```

### Delete a Book

```graphql
mutation {
  deleteBook(id: 1)
}
```

## License

This project is licensed under the MIT License.
# book-management-system-interview-task
