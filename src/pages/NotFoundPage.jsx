import { Button, Container, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          mt: 10,
        }}
      >
        <Typography variant="h1" component="h1" color="error" fontWeight="bold">
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Oops! The page you’re looking for doesn’t exist.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ mt: 3 }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
}
