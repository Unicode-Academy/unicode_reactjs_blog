import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/PostList";
import { useEffect } from "react";
import { getUser, selectUserById } from "../../redux/slice/userSlice";
import { useParams } from "react-router-dom";
import { selectStatus } from "../../redux/slice/userSlice";
import Error from "../../components/Error";

export default function Author() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserById);
  const status = useSelector(selectStatus);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  if (status === "error") {
    return <Error />;
  }
  return (
    <>
      <h1>Tác giả: {user.username}</h1>
      <PostList filter="user" value={id} />
    </>
  );
}
