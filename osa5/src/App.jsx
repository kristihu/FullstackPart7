import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, addBlog, deleteBlog } from "./reducers/blogReducer";
import { setUser, logoutUser } from "./reducers/userReducer";
import Users from "./components/Users";
import UserView from "./components/userView";
import BlogView from "./components/BlogView";
import Navigation from "./components/Navigation";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogs = useSelector((state) => state.blogs);
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        dispatch(initializeBlogs(blogs));
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      dispatch(setNotification("Login successful!", "success"));
      setTimeout(() => dispatch(setNotification(null, null)), 5000);
    } catch (err) {
      dispatch(setNotification(err.message, "error"));
      setTimeout(() => dispatch(setNotification(null, null)), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logoutUser());
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogService.remove(id);
        dispatch(deleteBlog(id));
        dispatch(setNotification("Blog deleted successfully", "success"));
        setTimeout(() => dispatch(setNotification(null, null)), 5000);
      } catch (error) {
        dispatch(setNotification(error.message, "error"));
        setTimeout(() => dispatch(setNotification(null, null)), 5000);
      }
    }
  };

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <Router>
      <div>
        <Notification
          notification={notification.message}
          type={notification.type}
        />
        <Navigation user={user} handleLogout={handleLogout} />
        {!user ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#f4f6f8",
            }}
          >
            <Paper
              sx={{
                padding: 3,
                width: 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
              }}
            >
              <Typography variant="h5" gutterBottom>
                Login
              </Typography>

              <form onSubmit={handleLogin} style={{ width: "100%" }}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Login
                </Button>
              </form>
            </Paper>
          </Box>
        ) : (
          <div>
            <Togglable buttonLabel="New Blog" ref={blogFormRef}>
              <BlogForm
                addBlog={(blogObj) => dispatch(addBlog(blogObj))}
                toggleVisibility={() => blogFormRef.current.toggleVisibility()}
              />
            </Togglable>
          </div>
        )}

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogView />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
