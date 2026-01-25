# UC01: Xem danh sách tất cả users

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem danh sách tất cả người dùng đã đăng ký trong hệ thống. Danh sách này bao gồm các thông tin cơ bản của người dùng như ID, email, tên đầy đủ, trạng thái tài khoản, và gói dịch vụ đang sử dụng. Admin có thể xem tổng quan về số lượng người dùng và trạng thái của họ.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng quản lý người dùng.
- Hệ thống phải có ít nhất một người dùng đã đăng ký.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/users`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào cụ thể cho yêu cầu này. Tuy nhiên, có thể có các tham số tùy chọn cho phân trang hoặc sắp xếp (sẽ được mở rộng trong các use case sau).

## 5. Hậu xử lý

- Hệ thống truy vấn cơ sở dữ liệu để lấy danh sách người dùng.
- Dữ liệu người dùng được định dạng và trả về cho Admin.
- Ghi log hoạt động truy cập của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa danh sách các đối tượng người dùng. Mỗi đối tượng người dùng bao gồm:

```json
[
  {
    "userId": "uuid-cua-user-1",
    "email": "user1@example.com",
    "fullName": "Nguyen Van A",
    "status": "ACTIVE",
    "currentPlan": "Free",
    "createdAt": "2023-01-01T10:00:00Z"
  },
  {
    "userId": "uuid-cua-user-2",
    "email": "user2@example.com",
    "fullName": "Tran Thi B",
    "status": "INACTIVE",
    "currentPlan": "Premium",
    "createdAt": "2023-01-05T11:30:00Z"
  }
]
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

