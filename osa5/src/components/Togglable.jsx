import { useState, forwardRef } from "react";
import { Button, Box } from "@mui/material";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <Box>
      <Box sx={{ display: visible ? "none" : "block" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleVisibility}
          sx={{ marginBottom: 2 }}
        >
          {props.buttonLabel}
        </Button>
      </Box>

      <Box sx={{ display: visible ? "block" : "none" }}>
        {props.children}
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={toggleVisibility}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
});

Togglable.displayName = "Togglable";
export default Togglable;
