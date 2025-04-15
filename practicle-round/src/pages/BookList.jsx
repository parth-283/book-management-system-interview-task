import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { DELETE_BOOK, GET_BOOKS } from "../apollo/queries";
import { Button, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function BookList() {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto", marginTop: 4 }} />;
  if (error) return <Typography color="error" align="center">Error loading books 😢</Typography>;

  const books = data?.books || [];

  const handleDelete = async (id) => {
    try {
      await deleteBook({
        variables: { id },
        refetchQueries: [{ query: GET_BOOKS }],
      });
      console.log(`Book with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>📚 Book List</Typography>
        <Link
          to="/add"
          style={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            textDecoration: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1565c0")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
        >
          ➕ Add Book
        </Link>
      </Box>

      <TableContainer component={Box} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="book list">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#555" }}>Title</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#555" }}>Author</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#555" }}>Genre</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#555" }}>Year</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#555" }}>Available</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#555" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.length > 0 ? (
              books.map((book) => (
                <TableRow
                  key={book.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                >
                  <TableCell align="center">{book.title}</TableCell>
                  <TableCell align="center">{book.author}</TableCell>
                  <TableCell align="center">{book.genre}</TableCell>
                  <TableCell align="center">{book.published_year}</TableCell>
                  <TableCell align="center">{book.availability ? "✅" : "❌"}</TableCell>
                  <TableCell align="center">
                    <Button
                      component={Link}
                      to={`/update/${book.id}`}
                      sx={{
                        padding: "4px 12px",
                        backgroundColor: "#ffeb3b",
                        color: "#333",
                        borderRadius: "4px",
                        textDecoration: "none",
                        marginRight: "8px",
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#fbc02d",
                        },
                      }}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(book.id)}
                      sx={{ padding: "4px 12px" }}
                    >
                      🗑️ Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ padding: "16px", color: "#888" }}>
                  No books found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
}

