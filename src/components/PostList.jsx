import { Grid, Link, Pagination } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getPosts,
  getPostsByUser,
  selectAllPosts,
  selectPostCount,
  selectStatus,
} from "../redux/slice/postSlice";
import CardItem from "../components/CartItem";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { getEnv } from "../utils/env";
import NotFound from "./NotFound";
export default function PostList({ filter, value }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const keyword = searchParams.get("keyword") ?? "";

  const handleChangePage = (_, page) => {
    const skip = (page - 1) * getEnv("VITE_LIMIT");
    const params = Array.from(searchParams.entries()).reduce(
      (prev, [key, value]) => {
        if (!prev[key]) {
          prev[key] = value;
        } else {
          if (!Array.isArray(prev[key])) {
            prev[key] = [prev[key]];
          }
          prev[key].push(value);
        }
        return prev;
      },
      {}
    );
    if (filter === "user") {
      dispatch(getPostsByUser(value, { skip }));
    } else {
      dispatch(getPosts({ query: keyword, skip }));
    }
    setSearchParams({ ...params, page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const skip = (page - 1) * getEnv("VITE_LIMIT");
    if (filter === "user") {
      dispatch(getPostsByUser(value, { skip }));
    } else {
      dispatch(getPosts({ query: keyword, skip }));
    }
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
      {status === "pending" && <Loading type="spinner" />}
      {posts.length ? (
        <>
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
          <Pagination
            sx={{ marginTop: 2 }}
            count={pageCount}
            siblingCount={3}
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        </>
      ) : (
        status === "idle" && <NotFound />
      )}
    </>
  );
}
