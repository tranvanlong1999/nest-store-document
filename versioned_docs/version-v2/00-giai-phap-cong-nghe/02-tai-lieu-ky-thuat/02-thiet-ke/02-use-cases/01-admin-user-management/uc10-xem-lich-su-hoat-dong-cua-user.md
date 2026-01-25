
# UC10: Xem lịch sử hoạt động của user

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem lịch sử hoạt động chi tiết của một người dùng cụ thể. Lịch sử hoạt động bao gồm các sự kiện như đăng nhập, thay đổi thông tin cá nhân, tạo/xóa API Key, sử dụng dịch vụ, v.v. Điều này giúp Admin theo dõi hành vi người dùng, điều tra sự cố hoặc kiểm toán.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng quản lý người dùng và xem lịch sử hoạt động.
- User với ID được cung cấp phải tồn tại trong hệ thống.
- Hệ thống phải có cơ chế ghi log hoạt động của người dùng.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/users/{userId}/activity-logs`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `userId` (UUID) - ID của người dùng cần xem lịch sử hoạt động.
- **Query Parameters (tùy chọn)**:
    - `startDate`: (Date) Ngày bắt đầu để lọc lịch sử hoạt động (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc lịch sử hoạt động (format: YYYY-MM-DD).
    - `eventType`: (String) Loại sự kiện để lọc (ví dụ: `LOGIN`, `API_KEY_CREATED`, `PROFILE_UPDATED`).
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn cơ sở dữ liệu log để lấy các bản ghi hoạt động liên quan đến `userId`.
- Áp dụng các bộ lọc theo ngày, loại sự kiện, và phân trang.
- Trả về danh sách các bản ghi hoạt động.
- Ghi log hoạt động truy cập lịch sử của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các bản ghi hoạt động và thông tin phân trang:

```json
{
  "content": [
    {
      "logId": "uuid-cua-log-1",
      "userId": "uuid-cua-user",
      "eventType": "LOGIN",
      "description": "User logged in from IP 192.168.1.100",
      "timestamp": "2023-07-15T18:00:00Z",
      "ipAddress": "192.168.1.100"
    },
    {
      "logId": "uuid-cua-log-2",
      "userId": "uuid-cua-user",
      "eventType": "API_KEY_CREATED",
      "description": "Created new API Key: My New Key",
      "timestamp": "2023-07-15T17:30:00Z"
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 50,
  "totalPages": 3
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy người dùng với `userId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

