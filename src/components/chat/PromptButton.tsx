import React, { useState } from "react";
import Button from "@mui/material/Button";

type PromptButtonProps = {
  onClick: () => Promise<void>;
};

export default function PromptButton({ onClick }: PromptButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      id="generate-btn"
      variant="contained"
      size="large"
      onClick={handleClick}
      disabled={loading}
      sx={{
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
        color: "white",
        width: "45px", // Increased button size
        height: "45px", // Make it square and larger
        minWidth: "20px",
        borderRadius: "50%", // Ensure it stays circular
        padding: "0", // Ensure no inner padding constraints
        "&:hover": {
          background: "linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)",
        },
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <div
          style={{
            width: "15px", // Increased size for the loading box
            height: "15px",
            backgroundColor: "white",
            borderRadius: "3px", // Rounded box
          }}
        />
      ) : (
        <svg
          width="45" // Increased width for the arrow
          height="45" // Increased height for the arrow
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
            fill="currentColor"
          />
        </svg>
      )}
    </Button>
  );
}
