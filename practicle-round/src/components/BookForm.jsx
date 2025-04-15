import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Button, Checkbox, FormControlLabel, TextField, CircularProgress, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // For navigation

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  published_year: yup.number().required('Year is required'),
  genre: yup.string().required('Genre is required'),
  availability: yup.boolean().required('Availability is required'),
});

export default function BookForm({ defaultValues, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Hook to navigate

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      toast.success('Book saved successfully!');
      reset();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          maxWidth: 600,
          margin: 'auto',
          padding: 4,
          backgroundColor: '#f9f9f9',
          borderRadius: 3,
          boxShadow: 4,
          border: '1px solid #ddd',
          '&:hover': {
            boxShadow: 6,
            transition: 'box-shadow 0.3s ease',
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: 'center', marginBottom: 3, fontWeight: 'bold', color: '#333' }}
        >
          Add a New Book
        </Typography>

        <div>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
            margin="normal"
            sx={{ '& .MuiInputBase-root': { borderRadius: 5 } }}
          />
        </div>

        <div>
          <TextField
            label="Author"
            fullWidth
            variant="outlined"
            {...register('author')}
            error={!!errors.author}
            helperText={errors.author?.message}
            margin="normal"
            sx={{ '& .MuiInputBase-root': { borderRadius: 5 } }}
          />
        </div>

        <div>
          <TextField
            label="Published Year"
            type="number"
            fullWidth
            variant="outlined"
            {...register('published_year')}
            error={!!errors.published_year}
            helperText={errors.published_year?.message}
            margin="normal"
            sx={{ '& .MuiInputBase-root': { borderRadius: 5 } }}
          />
        </div>

        <div>
          <TextField
            label="Genre"
            fullWidth
            variant="outlined"
            {...register('genre')}
            error={!!errors.genre}
            helperText={errors.genre?.message}
            margin="normal"
            sx={{ '& .MuiInputBase-root': { borderRadius: 5 } }}
          />
        </div>

        <div>
          <Controller
            name="availability"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Available"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 'bold',
                    color: '#555',
                  },
                }}
              />
            )}
          />
          {errors.availability && <p style={{ color: 'red', fontSize: '12px' }}>{errors.availability.message}</p>}
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isSubmitting}
          sx={{
            marginTop: 3,
            padding: '12px 0',
            borderRadius: '30px',
            '&:hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} sx={{ marginRight: 1 }} />
          ) : null}
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        {/* Back Button */}
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleBackClick}
          sx={{
            marginBottom: 3,
            marginTop: 1,
            padding: '12px 0',
            borderRadius: '30px',
            '&:hover': {
              backgroundColor: '#ddd',
            },
          }}
        >
          🏠 Back
        </Button>
      </Box>
    </motion.form>
  );
}
