import { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";

const BlogForm = ({ addBlog, toggleVisibility }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog(newBlog);
    setNewBlog({ title: "", author: "", url: "" });
    toggleVisibility();
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create New Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              fullWidth
              label="Title"
              id="title"
              name="title"
              value={newBlog.title}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Author"
              id="author"
              name="author"
              value={newBlog.author}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="URL"
              id="url"
              name="url"
              value={newBlog.url}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </div>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default BlogForm;
