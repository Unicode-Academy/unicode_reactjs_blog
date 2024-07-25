import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  selectAllPosts,
  selectStatus,
} from "../../redux/slice/postSlice";
import CardItem from "../../components/CartItem";
import SearchForm from "../../components/SearchForm";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const posts = useSelector(selectAllPosts);
  const status = useSelector(selectStatus);
  if (status === "error") {
    return <Error />;
  }
  if (status === "pending") {
    return <Loading />;
  }
  return (
    <>
      <h1>Blog</h1>
      <SearchForm />
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
      </Grid>
    </>
  );
}
