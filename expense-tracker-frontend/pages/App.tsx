import { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { Button, Box, Typography, AppBar, Toolbar } from '@mui/material';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  };

  if (!token) {
    return <Login setToken={setToken} setUsername={setUsername} />;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {`Hello, ${username || 'User'}`}
          </Typography>
          <Button 
            color="inherit" 
            variant="outlined" 
            onClick={handleLogout} 
            sx={{ color: '#fff', borderColor: '#fff' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Home token={token} />
      </Box>
    </Box>
  );
};

export default App;