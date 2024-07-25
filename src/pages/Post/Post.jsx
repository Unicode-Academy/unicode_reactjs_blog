import { Box, Button } from "@mui/material";
import LinkBehavior from "../../components/LinkBehavior";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPost,
  selectOnePost,
  selectStatus,
} from "../../redux/slice/postSlice";
import { useEffect } from "react";
export default function Post() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(selectOnePost);
  const status = useSelector(selectStatus);
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);
  if (status === "error") {
    return <h2>Đã có lỗi xảy ra. Vui lòng thử lại sau</h2>;
  }
  return (
    <div>
      {status === "pending" ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>{post.title}</h1>
          <Box sx={{ paddingBlock: 1, display: "flex" }} gap={1}>
            <span>Posted by: Hoàng An</span>
            <span>At: 01/01/2022</span>
          </Box>
          <Box>
            <p>{post.body}</p>
          </Box>
          <Button variant="outlined" component={LinkBehavior} to={"/"}>
            Quay lại
          </Button>
        </>
      )}
    </div>
  );
}
