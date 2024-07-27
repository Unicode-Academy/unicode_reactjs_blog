import { Grid, Pagination } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  selectAllPosts,
  selectPostCount,
  selectStatus,
} from "../../redux/slice/postSlice";
import CardItem from "../../components/CartItem";
import SearchForm from "../../components/SearchForm";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { getEnv } from "../../utils/env";
export default function Home() {
  const dispatch = useDispatch();
  const handleChangePage = (_, page) => {
    const skip = (page - 1) * getEnv("VITE_LIMIT");
    dispatch(getPosts({ query: "", skip }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    dispatch(getPosts({ query: "", skip: 0 }));
  }, [dispatch]);
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectStatus);
  const postCount = useSelector(selectPostCount);
  const pageCount = Math.ceil(postCount / getEnv("VITE_LIMIT"));
  if (status === "error") {
    return <Error />;
  }

  return (
    <>
      <h1>Blog</h1>
      <SearchForm />
      {status === "pending" && <Loading type="spinner" />}
      <Grid container spacing={2}>
        {posts.map(({ id, title }) => (
          <Grid item xs={4} key={id}>
            <CardItem
              image={
                "https://fastly.picsum.photos/id/1/367/267.jpg?hmac=jZdc5TviQPVhxLyvyU8siO-I5FMVXVZpBhsBYKbBJpM"
              }
              title={title}
              id={id}
            />
          </Grid>
        ))}
        <Pagination
          sx={{ marginTop: 2 }}
          count={pageCount}
          siblingCount={3}
          color="primary"
          onChange={handleChangePage}
        />
      </Grid>
    </>
  );
}
