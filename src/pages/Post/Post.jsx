import { Box } from "@mui/material";

export default function Post() {
  return (
    <div>
      <h1>Post</h1>
      <Box sx={{ paddingBlock: 1, display: "flex" }} gap={1}>
        <span>Posted by: Hoàng An</span>
        <span>At: 01/01/2022</span>
      </Box>
      <Box>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
          repudiandae iusto, fugiat optio aut vero culpa nam architecto omnis
          deserunt odit tenetur eos minima, saepe aperiam tempora quo sed iure?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
          repudiandae iusto, fugiat optio aut vero culpa nam architecto omnis
          deserunt odit tenetur eos minima, saepe aperiam tempora quo sed iure?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
          repudiandae iusto, fugiat optio aut vero culpa nam architecto omnis
          deserunt odit tenetur eos minima, saepe aperiam tempora quo sed iure?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
          repudiandae iusto, fugiat optio aut vero culpa nam architecto omnis
          deserunt odit tenetur eos minima, saepe aperiam tempora quo sed iure?
        </p>
      </Box>
    </div>
  );
}
