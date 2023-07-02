import React, { useState } from 'react';
import { Container, Typography, Select, FormControl, MenuItem, Grid, TextField } from '@mui/material';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { Task } from '../utils/Tasks';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (taskId: number, updatedTask: Task) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const filterTasks = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const searchTasks = (query: string) => {
    setSearchQuery(query);
  };

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === 'All') {
      return true;
    } else if (filter === 'Completed') {
      return task.status.toLowerCase() === 'completed';
    } else if (filter === 'Pending') {
      return task.status.toLowerCase() === 'pending';
    }
    return true;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Task Management App
      </Typography>
      <TaskForm addTask={addTask} />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant="subtitle1">Filter:</Typography>
            <Select value={filter} onChange={(e) => filterTasks(e.target.value)}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Typography variant="subtitle1">Search:</Typography>
            <TextField
              value={searchQuery}
              onChange={(e) => searchTasks(e.target.value)}
              placeholder="Search task..."
            />
          </FormControl>
        </Grid>
      </Grid>
      <TaskList tasks={searchedTasks} updateTask={updateTask} deleteTask={deleteTask} />
    </Container>
  );
};

export default Home;
