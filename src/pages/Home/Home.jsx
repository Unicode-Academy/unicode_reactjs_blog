import PostList from "../../components/PostList";
import SearchForm from "../../components/SearchForm";

export default function Home() {
  return (
    <>
      <h1>Bài viết mới nhất</h1>
      <SearchForm />
      <PostList />
    </>
  );
}
