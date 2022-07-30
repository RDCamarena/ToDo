import React from "react";

import "react-datepicker/dist/react-datepicker.css";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  listItemAvatarClasses,
} from "@mui/material";

const ToDoInput = ({ handleEditChange,isEditing,editSubmit, task, submit, handleChange, currentTask, setIsEditing}) => {
  return (
    <>
      {isEditing ? (
        <form onSubmit={editSubmit}> 
         <Grid container sx={{ paddingBottom: "20px" }}>
            <Grid>
              <Card sx={{ width: "400px" }}>
                <CardContent>
                  <TextField label="Update Task" onChange={handleEditChange} value={currentTask.text}>
                   
                  </TextField>
                  <Grid sx={{paddingTop:'5px'}}>
                  <Button
                  size="small"
                    variant="contained"
                    sx={{marginRight:'5px'}}
                    type="submit"
                  >
                    UPDATE
                  </Button>
                  <Button size='small'variant="contained" sx={{backgroundColor:'red'}} onClick={()=>{setIsEditing(false)}}> CANCEL</Button>
                  </Grid>
                 
                </CardContent>
              </Card>
            </Grid>
          </Grid>

        </form>

      ) : (
        <form onSubmit={submit}>
          <Grid container sx={{ paddingBottom: "20px" }}>
            <Grid>
              <Card sx={{ width: "400px" }}>
                <CardContent>
                  <TextField onChange={handleChange} value={task}>
                   
                  </TextField>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: "45px", marginTop: "10px" }}
                    type="submit"
                  >
                    ENTER
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default ToDoInput;
