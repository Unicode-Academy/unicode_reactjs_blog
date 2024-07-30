/* eslint-disable react/prop-types */
import CommentItem from "./CommentItem";

export default function CommentList({ commentList }) {
  return (
    <>
      {commentList.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </>
  );
}
