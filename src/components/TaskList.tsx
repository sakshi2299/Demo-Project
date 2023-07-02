// TaskList.tsx
import React, { useState } from 'react';
import { Task } from '../utils/Tasks';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface TaskListProps {
  tasks: Task[];
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTask, deleteTask }) => {
  const [updatedTitles, setUpdatedTitles] = useState<{ [taskId: number]: string }>({});
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>('None');
  const [viewTaskId, setViewTaskId] = useState<number | null>(null);
  const [viewTaskDetails, setViewTaskDetails] = useState<string>('');

  const handleEditClick = (taskId: number) => {
    setEditTaskId(taskId);
    setUpdatedTitles(prevState => ({ ...prevState, [taskId]: tasks.find(task => task.id === taskId)?.title || '' }));
  };

  const handleCancelClick = () => {
    setEditTaskId(null);
    setUpdatedTitles({});
  };

  const handleUpdateClick = (taskId: number) => {
    const updatedTitle = updatedTitles[taskId] || '';
    updateTask(taskId, { ...tasks.find(task => task.id === taskId)!, title: updatedTitle });
    setEditTaskId(null);
    setUpdatedTitles({});
  };

  const handleTitleChange = (taskId: number, value: string) => {
    setUpdatedTitles(prevState => ({ ...prevState, [taskId]: value }));
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
  };

  const handleViewTaskClick = (taskId: number) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      setViewTaskId(taskId);
      setViewTaskDetails(task.details || '');
    }
  };

  const handleViewTaskSave = () => {
    if (viewTaskId) {
      const updatedTask = { ...tasks.find(task => task.id === viewTaskId)!, details: viewTaskDetails };
      updateTask(viewTaskId, updatedTask);
    }
    setViewTaskId(null);
  };

  const handleViewTaskCancel = () => {
    setViewTaskId(null);
  };

  const sortedTasks = tasks.slice().sort((a, b) => {
    if (sortOption === 'Alphabetical') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'Status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">Sort By:</Typography>
          <Select value={sortOption} onChange={handleSortChange} fullWidth>
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Alphabetical">Alphabetical</MenuItem>
            <MenuItem value="Status">Status</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {sortedTasks.map(task => (
        <Card key={task.id} variant="outlined" sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="subtitle1">Status: {task.status}</Typography>
            <Button variant="contained" color="primary" onClick={() => handleViewTaskClick(task.id)}>
              View Details
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => updateTask(task.id, { ...task, status: 'Completed' })}
            >
              Complete
            </Button>
            <Button variant="contained" color="error" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
            {editTaskId === task.id ? (
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={8} sx={{mt:2}}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Update task"
                    value={updatedTitles[task.id] || ''}
                    onChange={e => handleTitleChange(task.id, e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" color="primary" onClick={() => handleUpdateClick(task.id)}>
                    Update
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Button variant="contained" onClick={() => handleEditClick(task.id)}>
                Edit
              </Button>
            )}
          </CardContent>
        </Card>
      ))}

      <Dialog open={viewTaskId !== null} onClose={handleViewTaskCancel}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={viewTaskDetails}
            onChange={e => setViewTaskDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleViewTaskSave}>
            Save
          </Button>
          <Button variant="contained" onClick={handleViewTaskCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
