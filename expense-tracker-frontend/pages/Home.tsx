import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, MenuItem, Typography, Box, Paper, Card, CardContent, Grid, IconButton } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: string;
}

const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Other'];

const Home = ({ token }: { token: string }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    id: '',
    date: new Date().toISOString().slice(0, 10),
    category: '',
    description: '',
    amount: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/expenses/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setExpenses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the expenses!", error);
      });
  }, [token]);

  const calculateCategoryTotals = () => {
    const totals: { [key: string]: number } = {};
    expenses.forEach(expense => {
      if (!totals[expense.category]) {
        totals[expense.category] = 0;
      }
      totals[expense.category] += parseFloat(expense.amount);
    });
    return totals;
  };

  const categoryTotals = calculateCategoryTotals();
  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
      }
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const decimalCheck = /^\d+(\.\d{0,2})?$/.test(newExpense.amount);
    
    if (!newExpense.date || !newExpense.category || !newExpense.description || !newExpense.amount) {
      alert("Please fill in all fields.");
      return;
    }

    if (parseFloat(newExpense.amount) <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    if (!decimalCheck) {
      alert("Amount must be a valid number with up to 2 decimal places.");
      return;
    }

    if (isEditing) {
      axios.put(`http://localhost:8000/api/expenses/${newExpense.id}/`, newExpense, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          const updatedExpenses = expenses.map(expense =>
            expense.id === Number(newExpense.id) ? response.data : expense
          );
          setExpenses(updatedExpenses);
          resetForm();
        })
        .catch(error => {
          console.error("There was an error updating the expense!", error);
        });
    } else {
      axios.post('http://localhost:8000/api/expenses/', newExpense, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          setExpenses([...expenses, response.data]);
          resetForm();
        })
        .catch(error => {
          console.error("There was an error submitting the expense!", error);
        });
    }
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8000/api/expenses/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        const remainingExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(remainingExpenses);
      })
      .catch(error => {
        console.error("There was an error deleting the expense!", error);
      });
  };

  const handleEdit = (expense: Expense) => {
    setNewExpense({
      id: expense.id.toString(),
      date: expense.date,
      category: expense.category,
      description: expense.description,
      amount: expense.amount.toString(),
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setNewExpense({
      id: '',
      date: new Date().toISOString().slice(0, 10),
      category: '',
      description: '',
      amount: ''
    });
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 4, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#fff' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: 2.5}}>
              {'Expense Tracker'}
            </Typography>
  
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                type="date"
                label="Date"
                value={newExpense.date}
                onChange={e => setNewExpense({ ...newExpense, date: e.target.value })}
                required
              />
              <TextField
                select
                label="Category"
                value={newExpense.category}
                onChange={e => setNewExpense({ ...newExpense, category: e.target.value })}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Description"
                value={newExpense.description}
                onChange={e => setNewExpense({ ...newExpense, description: e.target.value })}
                required
              />
              <TextField
                label="Amount"
                type="number"
                value={newExpense.amount}
                onChange={e => setNewExpense({ ...newExpense, amount: e.target.value })}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? 'Update Expense' : 'Add Expense'}
              </Button>
              {isEditing && (
                <Button onClick={resetForm} variant="outlined" sx={{ marginTop: -0.5}}>
                  Cancel Edit
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
  
        {expenses.length > 0 && (
          <Grid item xs={12} md={6}>
            <Typography variant="h6" align="center" gutterBottom>
              Expenses by Category
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: 400 }}>
              <Pie data={pieData} height={400} />
            </Box>
          </Grid>
        )}
      </Grid>
  
      {expenses.length > 0 && (
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            All Expenses
          </Typography>
        </Grid>

        {expenses.map((expense) => (
          <Grid item xs={12} sm={6} md={4} key={expense.id}>
            <Card elevation={2} sx={{ padding: 0, borderRadius: '12px', backgroundColor: '#fafafa' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: '8px',
                    flexWrap: 'wrap', // Allow wrapping
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      wordWrap: 'break-word', // Ensure long words break
                      maxWidth: '78%', // Limit the width to avoid pushing the amount
                      flexShrink: 1, // Allow it to shrink if necessary
                    }}
                  >
                    {expense.description}
                  </Typography>
                  <Typography variant="h6" component="div" sx={{ whiteSpace: 'nowrap' }}>
                    ${expense.amount}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent={'space-between'}>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="body2" color="text.secondary">
                      {expense.date}
                    </Typography>
                    <Typography variant="body1">
                      {expense.category}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <IconButton onClick={() => handleEdit(expense)} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(expense.id)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
    </Container>
  );
};

export default Home;