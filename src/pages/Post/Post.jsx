import { Box, Button, Link } from "@mui/material";
import LinkBehavior from "../../components/LinkBehavior";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPost,
  selectOnePost,
  selectStatus,
} from "../../redux/slice/postSlice";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
export default function Post() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(selectOnePost);
  const status = useSelector(selectStatus);
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);
  if (status === "error") {
    return <Error />;
  }
  if (status === "pending") {
    return <Loading />;
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <Box sx={{ paddingBlock: 1, display: "flex" }} gap={1}>
        <span>
          Posted by:{" "}
          <Link
            component={LinkBehavior}
            color="inherit"
            to={`/author/${post.userId}`}
          >
            {post?.user?.username}
          </Link>
        </span>
        <span>Views: {post.views}</span>
      </Box>
      <Box>
        <p>{post.body}</p>
      </Box>
      <Button variant="outlined" component={LinkBehavior} to={"/"}>
        Quay lại
      </Button>
    </div>
  );
}
