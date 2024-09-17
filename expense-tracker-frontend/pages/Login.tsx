import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Paper, Box, Typography } from '@mui/material';

const Login = ({ setToken, setUsername }: { setToken: (token: string) => void, setUsername: (username: string) => void }) => {
  const [username, setLoginUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/token/', { username, password })
      .then(response => {
        const token = response.data.access;
        setToken(token);  // Pass token to parent App
        setUsername(username);  // Pass username to parent App
        localStorage.setItem('token', token);  // Safely save token in localStorage
        localStorage.setItem('username', username);  // Save username in localStorage
        setError('');
      })
      .catch(() => {
        setError('Invalid username or password.');
      });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if passwords match before sending the request
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    axios.post('http://localhost:8000/api/register/', { username, password, password2 })
      .then(() => {
        setError('');
        // Automatically login after successful registration
        axios.post('http://localhost:8000/api/token/', { username, password })
          .then(response => {
            const token = response.data.access;
            setToken(token);  // Pass token to parent App
            setUsername(username);  // Pass username to parent App
            localStorage.setItem('token', token);  // Save token in localStorage
            localStorage.setItem('username', username);  // Save username in localStorage
            setError('');
          })
          .catch(() => {
            setError('Login failed after registration.');
          });
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
          let errorMessage = 'Registration failed. Please try again.';
          
          if (errorData.username) {
            errorMessage = `${errorData.username.join(' ')}`;
          } else if (errorData.password) {
            errorMessage = `${errorData.password.join(' ')}`;
          }

          setError(errorMessage);
        } else {
          setError('Registration failed. Please try again.');
        }
      });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 10, marginBottom: 10 }}>
      <Paper elevation={2} sx={{ padding: 4, borderRadius: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: 2.5 }}>
          {isRegistering ? 'Register' : 'Login'}
        </Typography>

        {error && <Typography color="error" align="center" gutterBottom sx={{ marginBottom: 2.5 }}>{error}</Typography>}

        <Box component="form" onSubmit={isRegistering ? handleRegister : handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setLoginUsername(e.target.value)}  // Set the username entered
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />

          {isRegistering && (
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}  // Set the confirmation password
              fullWidth
              required
            />
          )}

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ padding: 1.5 }}>
            {isRegistering ? 'Register' : 'Login'}
          </Button>

          {/* Toggle between login and register */}
          <Button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');  // Clear any previous errors when switching forms
            }}
            variant="outlined"
            fullWidth
            sx={{ padding: 1.5, mt: -1.5 }}  // Add margin on top to separate the buttons
          >
            {isRegistering ? 'Back to Login' : 'Register'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;