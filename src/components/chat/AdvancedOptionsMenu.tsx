"use client";

import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

type AdvancedOptionsMenuProps = {
  open: boolean;
  onClose: () => void;
  setOptions: React.Dispatch<
    React.SetStateAction<{ numIdeas: number; modelType: string }>
  >;
  options: { numIdeas: number; modelType: string };
};

export default function AdvancedOptionsMenu({
  open,
  onClose,
  setOptions,
  options,
}: AdvancedOptionsMenuProps) {
  const handleNumIdeasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNumIdeas = parseInt(event.target.value, 10);
    setOptions((prevOptions) => ({
      ...prevOptions,
      numIdeas: newNumIdeas,
    }));
  };

  const handleModelTypeChange = (event: SelectChangeEvent<string>) => {
    const newModelType = event.target.value;
    setOptions((prevOptions) => ({
      ...prevOptions,
      modelType: newModelType,
    }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-white p-6 rounded-lg shadow-lg mx-auto my-20 max-w-sm relative top-1/2 transform -translate-y-1/2">
        <h2 className="text-xl font-bold mb-4">Advanced Options</h2>
        <div className="mb-4">
          <TextField
            label="Number of Ideas Per Generation"
            type="number"
            value={options.numIdeas}
            onChange={handleNumIdeasChange}
            fullWidth
          />
        </div>
        <div className="mb-6">
          <FormControl fullWidth>
            <InputLabel id="model-type-label">Model Type</InputLabel>
            <Select
              labelId="model-type-label"
              value={options.modelType}
              onChange={handleModelTypeChange}
              label="Model Type"
            >
              {/* <MenuItem key="o1-preview" value="o1-preview">
                o1-preview
              </MenuItem> */}
              {/* <MenuItem key="o1-mini" value="o1-mini">
                o1-mini
              </MenuItem> */}
              <MenuItem key="gpt-4o" value="gpt-4o">
                gpt-4o
              </MenuItem>
              <MenuItem key="gpt-4o-mini" value="gpt-4o-mini">
                gpt-4o-mini
              </MenuItem>
              {/* <MenuItem key="gpt-4-turbo" value="gpt-4-turbo">
                gpt-4-turbo
              </MenuItem> */}
              {/* <MenuItem key="gpt-4" value="gpt-4">
                gpt-4
              </MenuItem>
              <MenuItem key="gpt-3.5-turbo" value="gpt-3.5-turbo">
                gpt-3.5-turbo
              </MenuItem> */}
            </Select>
          </FormControl>
        </div>
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
