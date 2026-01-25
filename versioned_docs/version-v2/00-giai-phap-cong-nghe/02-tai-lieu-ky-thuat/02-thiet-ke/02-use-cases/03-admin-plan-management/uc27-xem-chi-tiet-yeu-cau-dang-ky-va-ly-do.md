
# UC27: Xem chi tiết yêu cầu đăng ký và lý do

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem chi tiết thông tin của một yêu cầu đăng ký tài khoản cụ thể, bao gồm thông tin người dùng đã cung cấp và bất kỳ ghi chú hoặc lý do nào liên quan đến yêu cầu đó. Điều này giúp Admin có đủ thông tin để đưa ra quyết định duyệt hoặc từ chối một cách chính xác.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền duyệt yêu cầu đăng ký.
- Yêu cầu đăng ký với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/registration-requests/{requestId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `requestId` (UUID) - ID của yêu cầu đăng ký cần xem chi tiết.

## 5. Hậu xử lý

- Hệ thống xác định yêu cầu đăng ký theo `requestId`.
- Truy vấn cơ sở dữ liệu để lấy tất cả thông tin chi tiết của yêu cầu, bao gồm thông tin người dùng liên quan và các ghi chú.
- Trả về thông tin chi tiết của yêu cầu.
- Ghi log hoạt động xem chi tiết yêu cầu của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin chi tiết của yêu cầu đăng ký:

```json
{
  "requestId": "uuid-cua-request",
  "userId": "uuid-cua-user-pending",
  "email": "pending_user@example.com",
  "fullName": "Nguyen Van H",
  "requestedAt": "2023-07-14T10:00:00Z",
  "status": "PENDING",
  "notes": "Yêu cầu từ đối tác mới, cần kiểm tra kỹ.",
  "additionalInfo": {
    "companyName": "ABC Corp",
    "industry": "IT"
  }
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy yêu cầu đăng ký với `requestId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

