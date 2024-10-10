"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import HelpMenu from "./HelpMenu"; // Import the separate modal component

interface QuestionIconProps {
  setOptions: React.Dispatch<
    React.SetStateAction<{ numIdeas: number; modelType: string }>
  >;
  options: { numIdeas: number; modelType: string };
}

export default function QuestionIcon({
  setOptions,
  options,
}: QuestionIconProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <HelpOutlineIcon />
      </IconButton>
      <HelpMenu
        open={open}
        onClose={handleClose}
        setOptions={setOptions}
        options={options}
      />{" "}
    </>
  );
}
