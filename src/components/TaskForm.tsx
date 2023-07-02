import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Task {
  id: number;
  title: string;
  status: string;
  details: string;
}

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        title,
        status: 'Pending',
        details: '', // Add the 'details' property with an empty string
      };
      addTask(newTask);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            variant="outlined"
            label="Add task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;
