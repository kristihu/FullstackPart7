import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import blogService from "../services/blogs";
import usersService from "../services/users";

const UserView = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await usersService.getById(userId);
        setUser(userData);
        const userBlogs = await blogService.getBlogsByUser(userId);
        setBlogs(userBlogs);
      } catch (err) {
        setError(`Error fetching user data: ${err.message}`);
      }
    };

    fetchUserData();
  }, [userId]);

  if (error) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 5 }}>
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Added Blogs
        </Typography>

        {blogs.length === 0 ? (
          <Typography variant="body1">No blogs found for this user.</Typography>
        ) : (
          <List>
            {blogs.map((blog) => (
              <ListItem
                key={blog.id}
                sx={{ borderBottom: "1px solid #ddd", padding: 2 }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body1">
                    <strong>{blog.title}</strong> by {blog.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {blog.likes} likes
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default UserView;
