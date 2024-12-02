"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpMenu from "./HelpMenu"; // Import the separate modal component

export default function QuestionIcon() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <HelpOutlineIcon />
      </IconButton>
      <HelpMenu open={open} onClose={handleClose} />
    </>
  );
}
