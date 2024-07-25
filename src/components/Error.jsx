import { Alert } from "@mui/material";

export default function Error() {
  return (
    <Alert variant="filled" severity="error">
      Đã có lỗi xảy ra. Vui lòng thử lại sau
    </Alert>
  );
}
