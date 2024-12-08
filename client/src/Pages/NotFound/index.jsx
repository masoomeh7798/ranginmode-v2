import React from 'react'
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  };
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
      gap={2} 
      justifyContent="center" 
      height="50vh" 
      textAlign="center"
    >
      <Typography
      fontSize={{xs:'3em',md:'6em'}}
      variant="h1" component="h2" color="error">
        404
      </Typography>
      <Typography
      fontSize={{xs:'1em',md:'2em'}}
      variant="h5" gutterBottom>
        اين صفحه در سايت موجود نيست و يا حذف شده است.
      </Typography>
      <Button variant="contained" color="primary" sx={{'&:hover':{bgcolor:'var(--secondary-clr)'}}} onClick={handleGoHome}>
        Go to Home
      </Button>
    </Box>
  );
}

