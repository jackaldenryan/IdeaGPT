"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Popover from "@mui/material/Popover";
import AdvancedOptionsMenu from "./AdvancedOptionsMenu";

interface GearIconProps {
  setOptions: React.Dispatch<
    React.SetStateAction<{ numIdeas: number; modelType: string }>
  >;
  options: { numIdeas: number; modelType: string };
}

export default function GearIcon({ setOptions, options }: GearIconProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>

      {/* Use Popover instead of Menu */}
      <Popover
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          style: { minWidth: "250px" }, // Optional styling
        }}
      >
        {/* Pass options to your custom AdvancedOptionsMenu */}
        <AdvancedOptionsMenu
          setOptions={setOptions}
          options={options}
          onClose={handleClose}
        />
      </Popover>
    </>
  );
}
