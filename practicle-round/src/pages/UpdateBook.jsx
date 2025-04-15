import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOK, GET_BOOKS, UPDATE_BOOK } from "../apollo/queries";
import BookForm from "../components/BookForm";

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookId = parseInt(id, 10);

  const { data, loading, error } = useQuery(GET_BOOK, {
    variables: { id: bookId },
    fetchPolicy: "network-only",
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const [updateBook] = useMutation(UPDATE_BOOK);

  const handleUpdate = async (values) => {
    await updateBook({
      variables: {
        ...values,
        id: bookId,
        availability: Boolean(values.availability),
      },
    });
    navigate("/");
  };

  if (loading) return <p>Loading book...</p>;
  if (error) return <p>Error loading book 😢</p>;

  return <BookForm onSubmit={handleUpdate} defaultValues={data.book} />;
}
