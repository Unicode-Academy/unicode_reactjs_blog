import PostList from "../../components/PostList";
import { useParams } from "react-router-dom";

export default function Tag() {
  const { tag } = useParams();
  return (
    <>
      <h1>Tag: {tag}</h1>
      <PostList filter="tag" value={tag} />
    </>
  );
}
