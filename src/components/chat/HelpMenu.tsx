"use client";

import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

type HelpMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function HelpMenu({ open, onClose }: HelpMenuProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-white p-6 rounded-lg shadow-lg mx-auto my-20 max-w-sm relative top-1/2 transform -translate-y-1/2">
        <h2 className="text-xl font-bold mb-4">Help</h2>
        <p className="mb-6">
          When you click generate, you are sending your prompt plus all the
          previously generated ideas on the screen to the AI in an automatically
          created super-prompt. Whether the idea was marked as good or bad, as
          well as any feedback given, is included in the super-prompt.
        </p>
        <p className="mb-6">
          The AI does not see your previous prompts - only the previous ideas.
          So you can modify your prompt, or keep it the same, as you generate
          and give feedback
        </p>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </Box>
    </Modal>
  );
}
