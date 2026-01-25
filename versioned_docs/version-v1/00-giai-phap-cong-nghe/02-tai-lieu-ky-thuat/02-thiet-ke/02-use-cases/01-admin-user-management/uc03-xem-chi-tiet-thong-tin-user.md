
# UC03: Xem chi tiết thông tin user

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem thông tin chi tiết của một người dùng cụ thể dựa trên ID của họ. Thông tin chi tiết bao gồm tất cả các trường dữ liệu liên quan đến người dùng như thông tin cá nhân, lịch sử hoạt động, trạng thái tài khoản, gói dịch vụ đang sử dụng, và các thông tin khác.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng quản lý người dùng.
- User với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/users/{userId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `userId` (UUID) - ID của người dùng cần xem chi tiết.

## 5. Hậu xử lý

- Hệ thống truy vấn cơ sở dữ liệu để lấy thông tin chi tiết của người dùng theo `userId`.
- Dữ liệu người dùng được định dạng và trả về cho Admin.
- Ghi log hoạt động truy cập của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin chi tiết của người dùng:

```json
{
  "userId": "uuid-cua-user-1",
  "email": "user1@example.com",
  "fullName": "Nguyen Van A",
  "avatarUrl": "https://example.com/avatar.jpg",
  "status": "ACTIVE",
  "roles": ["USER", "DEVELOPER"],
  "subscription": {
    "planName": "Free",
    "startDate": "2023-01-01T10:00:00Z",
    "endDate": null
  },
  "usage": {
    "requestsThisMonth": 1234,
    "quotaLimit": 10000
  },
  "loginHistory": [
    {
      "timestamp": "2023-07-15T09:00:00Z",
      "ipAddress": "192.168.1.1"
    }
  ],
  "createdAt": "2023-01-01T10:00:00Z",
  "updatedAt": "2023-07-10T14:20:00Z"
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy người dùng với `userId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

