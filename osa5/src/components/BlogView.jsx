import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { Container, Typography, Button, Paper, Box } from "@mui/material";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await blogService.getById(id);
        setBlog(blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedBlog = await blogService.addComment(id, comment);
      setBlog(updatedBlog);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async () => {
    try {
      // Increment the likes by 1 locally
      const updatedBlog = { ...blog, likes: blog.likes + 1 };

      // Send the updated blog to the backend
      const result = await blogService.update(id, updatedBlog);
      setBlog(result); // Update the state with the updated blog
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {blog.author}
        </Typography>
        <Typography variant="body1" paragraph>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.likes} likes
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleLike}
          sx={{ marginTop: 2 }}
        >
          Like
        </Button>

        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6">Comments</Typography>
          <ul>
            {(blog.comments || []).map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </Box>

        <Box
          component="form"
          sx={{ marginTop: 3 }}
          onSubmit={handleCommentSubmit}
        >
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            required
            style={{ width: "100%", height: "100px", marginBottom: "10px" }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Comment
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogView;
