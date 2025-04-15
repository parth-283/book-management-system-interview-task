// src/pages/AddBook.jsx
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_BOOK, GET_BOOKS } from "../apollo/queries";
import BookForm from "../components/BookForm";

export default function AddBook() {
  const navigate = useNavigate();
  const [addBook] = useMutation(ADD_BOOK);

  const handleAdd = async (values) => {
    await addBook({
      variables: values,
      refetchQueries: [{ query: GET_BOOKS }],
    });
    navigate("/");
  };

  return (
    <BookForm onSubmit={handleAdd} defaultValues={{ availability: true }} />
  );
}
