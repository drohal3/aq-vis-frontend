import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(option, selectedOptions, theme) {
  return {
    fontWeight:
      selectedOptions.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({options, selectedOptions, title, setOnChange}) {
  /*
  * expected values:
  *
  * options: [
  *   {name: "some title 1", code: "code1"},
  *   {name: "some title 2", code: "code2"},
  *   {name: "some title 3", code: "code3"}
  * ]
  *
  * selectedOptions: ["code2, code3"]
  *
  * */


  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    console.log("vaaal", value)

    const retValue = typeof value === 'string' ? value.split(',') : value

    setOnChange(retValue)
  };

  const value = options.reduce((acc, cur) => {
    if (selectedOptions.indexOf(cur.code) !== -1) {
      return [...acc, cur.code]
    }
    return acc
  }, [])

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={title} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option.code}
              value={option.code}
              style={getStyles(option, selectedOptions, theme)}
            >
              {option.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
