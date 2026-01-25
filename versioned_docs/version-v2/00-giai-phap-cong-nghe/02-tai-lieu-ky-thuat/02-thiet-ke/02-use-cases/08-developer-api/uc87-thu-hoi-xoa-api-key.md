
# UC87: Thu hồi/xóa API key

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Developer thu hồi hoặc xóa một API Key đã tạo. Khi một API Key bị thu hồi/xóa, nó sẽ không còn giá trị để xác thực các yêu cầu API nữa, giúp tăng cường bảo mật khi một key bị lộ hoặc không còn cần thiết.

## 2. Tiền xử lý

- Developer phải đang đăng nhập vào hệ thống.
- API Key với ID được cung cấp phải tồn tại và thuộc về Developer đó.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/developer/api-keys/{apiKeyId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Developer.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `apiKeyId` (UUID) - ID của API Key cần thu hồi/xóa.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định Developer.
- Kiểm tra xem `apiKeyId` có thuộc về Developer đang yêu cầu hay không.
- Cập nhật trạng thái của API Key thành `INACTIVE` hoặc xóa hoàn toàn khỏi cơ sở dữ liệu (tùy thuộc vào chính sách).
- Ghi log hoạt động thu hồi/xóa API Key.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `204 No Content` nếu thành công (hoặc `200 OK` với thông báo).
- **Body**: (Nếu `200 OK`)

```json
{
  "message": "API Key revoked/deleted successfully."
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Developer chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu API Key không thuộc về Developer đang yêu cầu.
    - `404 Not Found`: Nếu không tìm thấy API Key với `apiKeyId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

