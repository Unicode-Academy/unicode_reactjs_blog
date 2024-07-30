import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Post from "./pages/Post/Post";
import Author from "./pages/Post/Author";
import Tag from "./pages/Post/Tag";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/author/:id" element={<Author />} />
        <Route path="/tag/:tag" element={<Tag />} />
      </Route>
    </Routes>
  );
}
