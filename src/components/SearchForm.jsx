import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { createStyles, makeStyles } from "@mui/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../redux/slice/postSlice";
import { debounce } from "../utils/debounce";
import { useSearchParams } from "react-router-dom";

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
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const firstRequestRef = useRef(true);
  const handleChange = (event) => {
    const value = event.target.value;
    setKeyword(value);
    setSearchParams({ keyword: value });
  };
  const handleClearInput = () => {
    setKeyword("");
    setSearchParams({ keyword: "" });
  };
  const requestSearch = useCallback(
    debounce((keyword) => {
      dispatch(getPosts({ query: keyword }));
    }),
    []
  );
  useEffect(() => {
    if (!firstRequestRef.current) {
      requestSearch(keyword);
    }
    if (searchParams.get("keyword")) {
      setKeyword(searchParams.get("keyword"));
    }
    setShowClearIcon(keyword === "" ? "none" : "flex");
    //Ý tưởng: Kiểm tra keyword cũ
    return () => {
      if (keyword) {
        firstRequestRef.current = false;
      }
    };
  }, [keyword]);
  return (
    <FormControl className={search} sx={{ paddingBottom: 2 }} fullWidth={true}>
      <TextField
        size="small"
        variant="outlined"
        onChange={handleChange}
        fullWidth={true}
        placeholder="Từ khóa tìm kiếm..."
        value={searchParams.get("keyword") ?? keyword}
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
              onClick={handleClearInput}
            >
              <ClearIcon style={{ cursor: "pointer" }} />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}
