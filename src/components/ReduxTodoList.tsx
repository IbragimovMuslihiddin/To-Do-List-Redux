import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, addTodo, removeTodo, toggleStatus, editTodo, Todo } from "../store/store";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export const ReduxTodoList: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [editId, setEditId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);

  const handleSave = () => {
    if (firstName.trim() === "" || lastName.trim() === "") return;

    if (editId !== null) {
      dispatch(editTodo({ id: editId, firstName, lastName, year, status: "active" }));
      setEditId(null);
    } else {
      dispatch(addTodo({ id: Date.now(), firstName, lastName, year, status: "active" }));
    }

    setFirstName("");
    setLastName("");
    setYear(new Date().getFullYear());
    setIsOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
        />
        <TextField
          label="Year"
          type="number"
          variant="outlined"
          value={year}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYear(Number(e.target.value))}
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          {editId !== null ? "Save" : "Add"}
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo: Todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.firstName}</TableCell>
                <TableCell>{todo.lastName}</TableCell>
                <TableCell>{todo.year}</TableCell>
                <TableCell>{todo.status}</TableCell>
                <TableCell>
                  <Button
                    color="warning"
                    onClick={() => {
                      setEditId(todo.id);
                      setFirstName(todo.firstName);
                      setLastName(todo.lastName);
                      setYear(todo.year);
                      setIsOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button color="secondary" onClick={() => dispatch(toggleStatus(todo.id))}>
                    Toggle
                  </Button>
                  <Button color="error" onClick={() => dispatch(removeTodo(todo.id))}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Edit Person</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Year"
            type="number"
            variant="outlined"
            value={year}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYear(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
          <Button onClick={() => setIsOpen(false)} color="secondary" variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
