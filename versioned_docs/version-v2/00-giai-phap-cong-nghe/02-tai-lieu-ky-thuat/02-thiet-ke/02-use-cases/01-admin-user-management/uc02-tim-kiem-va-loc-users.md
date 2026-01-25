# UC02: Tìm kiếm và lọc users

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) tìm kiếm và lọc danh sách người dùng dựa trên các tiêu chí khác nhau như email, trạng thái tài khoản, hoặc gói dịch vụ đang sử dụng. Điều này giúp Admin dễ dàng tìm thấy người dùng cụ thể hoặc nhóm người dùng có đặc điểm chung.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng quản lý người dùng.
- Hệ thống phải có dữ liệu người dùng để tìm kiếm và lọc.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/users`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `email`: (String) Email đầy đủ hoặc một phần của email để tìm kiếm.
    - `status`: (String) Trạng thái tài khoản (ví dụ: `ACTIVE`, `LOCKED`, `PENDING_VERIFICATION`).
    - `planId`: (UUID) ID của gói dịch vụ.
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).
    - `sortBy`: (String) Tên trường để sắp xếp (ví dụ: `createdAt`, `email`).
    - `sortOrder`: (String) Thứ tự sắp xếp (`ASC` hoặc `DESC`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Xây dựng truy vấn cơ sở dữ liệu dựa trên các tham số tìm kiếm và lọc được cung cấp.
- Thực hiện phân trang và sắp xếp kết quả.
- Trả về danh sách người dùng phù hợp.
- Ghi log hoạt động tìm kiếm/lọc của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách người dùng và thông tin phân trang:

```json
{
  "content": [
    {
      "userId": "uuid-cua-user-1",
      "email": "user1@example.com",
      "fullName": "Nguyen Van A",
      "status": "ACTIVE",
      "currentPlan": "Free",
      "createdAt": "2023-01-01T10:00:00Z"
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 100,
  "totalPages": 5
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

