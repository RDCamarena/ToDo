import {
  Button,
  Typography,
  Grid,
  Container,
  Box,
  Card,
  CardContent,
  listItemAvatarClasses,
  IconButton
} from "@mui/material";
import React, { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import ToDoInput from "./components/ToDoInput";
import "./App.css";

const App = () => {

  //Sets list 
  const [list, setList] = useState(() => {
    const savedTasked = localStorage.getItem("tasks");
    if (savedTasked) {
      return JSON.parse(savedTasked);
    } else {
      return [];
    }
  });
  //For input & storing the values
  const [task, setTask] = useState("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
    
    
  }, [list]);

  //Handle the editing of tasks
  const [isEditing, setIsEditing] = useState(false)
  const [currentTask, setCurrentTask] = useState({})
  const handleEditChange=(e)=>{
    setCurrentTask({...currentTask, text: e.target.value})
  }
  const editSubmit =(event)=>{
    event.preventDefault();
    handleUpdateTask(currentTask.id, currentTask)

  }
  const handleUpdateTask =(id, updatedTask) =>{
    const updatedItem = list.map((task)=>{
      return task.id === id ? updatedTask : task;
    }) 

    setIsEditing(false)
    setList(updatedItem)
  }
  const handleEditClick = (task)=> {
    setIsEditing(true)
    setCurrentTask({...task})
  }

  //ToDoInput methods
  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const submit = (event) => {
    event.preventDefault();

    if (task !== "") {
      setList([
        ...list,
        {
          id: list.length + 1,
          text: task.trim(),
        },
      ]);

      setTask("");
    }
  };

  //Methods for deleting tasks
  const clearAll = () => {
    setList([]);
  };
  const removeHandler = (index) => {
    const newList = list;
    newList.splice(index, 1);


    setList([...newList]);
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "40%",
          top: "15%",
        }}
      >
        <Box>
          <Grid sx={{}} item>
            <Typography align="center" variant="h2">
              Do Stuff!
            </Typography>
            <ToDoInput
              
              isEditing={isEditing}
              currentTask={currentTask}
              setIsEditing={setIsEditing}
              handleEditChange={handleEditChange}
              editSubmit={editSubmit}
              sx={{ position: "relative" }}
              task={task}
              handleChange={handleChange}
              submit={submit}
            />
            {list?.map((task, i) => (
              <Grid key={task.id} container>
                <Grid item>
                  <Card
                    sx={{
                      width: "400px",
                      height: "60px",
                      display: "flex",
                      marginBottom: "5px",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6"> {task.text}</Typography>
                    </CardContent>
                    <Grid sx={{ position:'relative', }}>
                    <IconButton onClick={()=>{handleEditClick(task)}}><EditIcon/></IconButton>
                    
                    <Button sx={{}} onClick={()=>{removeHandler(i)}}>
                      X
                    </Button>
                    </Grid>
                    
                  </Card>
                </Grid>
              </Grid>
            ))}
            <Button onClick={clearAll}> Clear All</Button>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default App;
