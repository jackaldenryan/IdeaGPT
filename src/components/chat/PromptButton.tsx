import React, { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

type PromptButtonProps = {
  onClick: () => Promise<void>; // assuming onClick is an async function
};

export default function PromptButton({ onClick }: PromptButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick(); // Execute the passed onClick function
    } finally {
      setLoading(false); // Ensure loading is set to false after completion
    }
  };

  return (
    <Button
      variant="contained"
      size="large"
      onClick={handleClick}
      disabled={loading} // Disable button while loading
      sx={{
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        color: "white",
        width: "150px", // Set a fixed width for consistency
        height: "48px", // Ensure consistent height
        "&:hover": {
          background: "linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)",
        },
        position: "relative",
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: "white" }} />
      ) : (
        "Generate"
      )}
    </Button>
  );
}
