import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  if (!blogs || blogs.length === 0) {
    return <>No blogs avaiable</>;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Blogs
        </Typography>
        <List>
          {blogs.map((blog) => (
            <ListItem key={blog.id} sx={{ marginBottom: 2 }}>
              <ListItemText
                primary={
                  <Link
                    to={`/blogs/${blog.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography variant="h6" color="primary">
                      {blog.title}
                    </Typography>
                  </Link>
                }
                secondary={`by ${blog.author}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default BlogList;
