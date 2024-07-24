/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import LinkBehavior from "./LinkBehavior";

export default function CartItem({ id, title, image }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={LinkBehavior} to={`/post/${id}`}>
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
}
