import { Box, Button, Link } from "@mui/material";
import LinkBehavior from "../../components/LinkBehavior";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import {
  getPost,
  selectOnePost,
  selectStatus,
} from "../../redux/slice/postSlice";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import CommentList from "./Comments/CommentList";
import axios from "axios";
import { getEnv } from "../../utils/env";
export default function Post() {
  const [commentList, setCommentList] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(selectOnePost);
  const status = useSelector(selectStatus);
  const getCommentList = useCallback(async () => {
    const response = await axios.get(
      getEnv("VITE_SERVER_API") + `/comments/post/${id}`
    );
    const data = await response.data;
    setCommentList(data.comments);
  }, [id]);
  useEffect(() => {
    dispatch(getPost(id));
    getCommentList();
  }, [dispatch, id, getCommentList]);
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
        {post.tags?.length && (
          <Box sx={{ marginBottom: 2 }}>
            Tags:
            {post.tags.map((tag, index) => (
              <Button
                sx={{ marginInline: 1 }}
                key={index}
                variant="outlined"
                size="small"
                component={LinkBehavior}
                to={`/tag/${tag}`}
              >
                {tag}
              </Button>
            ))}
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <ThumbUpIcon color="primary" /> {post.reactions?.likes}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
            <ThumbDownAltIcon color="error" /> {post.reactions?.dislikes}
          </div>
        </Box>
      </Box>
      <Button variant="outlined" component={LinkBehavior} to={"/"}>
        Quay lại
      </Button>
      <Box sx={{ marginTop: 2 }}>
        <h3>Comments</h3>
        <CommentList commentList={commentList} />
      </Box>
    </div>
  );
}
