import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { createStyles, makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles(() => {
  return createStyles({
    search: {
      margin: "0",
    },
  });
});

export default function SearchForm() {
  const { search } = useStyles();
  const [showClearIcon, setShowClearIcon] = useState("none");
  const [keyword, setKeyword] = useState("");
  const handleChange = (event) => {
    setShowClearIcon(event.target.value === "" ? "none" : "flex");
    setKeyword(event.target.value);
  };
  const handleClick = () => {
    setKeyword("");
  };
  return (
    <FormControl className={search} sx={{ paddingBottom: 2 }} fullWidth={true}>
      <TextField
        size="small"
        variant="outlined"
        onChange={handleChange}
        fullWidth={true}
        placeholder="Từ khóa tìm kiếm..."
        value={keyword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              style={{ display: showClearIcon }}
              onClick={handleClick}
            >
              <ClearIcon style={{ cursor: "pointer" }} />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}
