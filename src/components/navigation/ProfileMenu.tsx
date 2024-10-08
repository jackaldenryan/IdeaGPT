// src/components/ProfileMenu.tsx

"use client";

import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { supabase } from "@/supabaseClient"; // Ensure the correct path to your Supabase client
import { useRouter } from "next/navigation";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/sign-in"); // Redirect to the sign-in page or home after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNavigateIdeasApp = () => {
    router.push("/ideas-app");
  };

  const handleNavigateSettings = () => {
    router.push("/settings");
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="large"
        aria-controls="profile-menu"
        aria-haspopup="true"
      >
        <AccountCircle className="text-black" fontSize="large" />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
        PaperProps={{
          style: { width: "200px" },
        }}
      >
        <MenuItem onClick={handleNavigateIdeasApp}>Ideas App</MenuItem>
        <MenuItem onClick={handleNavigateSettings}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
