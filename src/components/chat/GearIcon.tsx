"use client";

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AdvancedOptionsMenu from './AdvancedOptionsMenu'; // Import the separate modal component

interface GearIconProps {
    setOptions: React.Dispatch<React.SetStateAction<{ numIdeas: number; modelType: string }>>;
    options: { numIdeas: number; modelType: string };
}

export default function GearIcon({ setOptions, options }: GearIconProps) {
  const [open, setOpen] = React.useState(false); // State to control modal visibility

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <AdvancedOptionsMenu open={open} onClose={handleClose} setOptions={setOptions} options={options}/> {/* Pass open/close state */}
    </>
  );
}
