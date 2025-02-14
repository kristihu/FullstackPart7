import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

const Navigation = ({ user, handleLogout }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h6" color="inherit">
            Blog App
          </Typography>

          <div>
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>

            {user ? (
              <>
                <span style={{ color: "#fff", marginRight: "10px" }}>
                  {user.name} logged in
                </span>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
