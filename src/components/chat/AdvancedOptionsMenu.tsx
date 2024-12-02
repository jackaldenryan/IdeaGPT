"use client";

import * as React from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

type AdvancedOptionsMenuProps = {
  onClose: () => void;
  setOptions: React.Dispatch<
    React.SetStateAction<{ numIdeas: number; modelType: string }>
  >;
  options: { numIdeas: number; modelType: string };
};

export default function AdvancedOptionsMenu({
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
    <div className="p-4">
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
            <MenuItem key="gpt-4o" value="gpt-4o">
              gpt-4o
            </MenuItem>
            <MenuItem key="gpt-4o-mini" value="gpt-4o-mini">
              gpt-4o-mini
            </MenuItem>
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
    </div>
  );
}
