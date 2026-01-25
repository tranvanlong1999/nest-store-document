
# UC25: Xem danh sách yêu cầu đăng ký chờ duyệt

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem danh sách các yêu cầu đăng ký tài khoản mới đang chờ được duyệt. Đây là một phần của quy trình đăng ký thủ công hoặc bán tự động, nơi Admin cần xem xét và phê duyệt các tài khoản trước khi chúng được kích hoạt hoàn toàn.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý người dùng và duyệt yêu cầu.
- Phải có các yêu cầu đăng ký đang ở trạng thái chờ duyệt.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/registration-requests`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `status`: (String) Trạng thái yêu cầu (ví dụ: `PENDING`, `APPROVED`, `REJECTED`). Mặc định là `PENDING`.
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).
    - `sortBy`: (String) Tên trường để sắp xếp (ví dụ: `requestedAt`).
    - `sortOrder`: (String) Thứ tự sắp xếp (`ASC` hoặc `DESC`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn cơ sở dữ liệu để lấy danh sách các yêu cầu đăng ký dựa trên các tiêu chí lọc.
- Thực hiện phân trang và sắp xếp kết quả.
- Trả về danh sách các yêu cầu đăng ký.
- Ghi log hoạt động truy cập danh sách yêu cầu.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các yêu cầu đăng ký và thông tin phân trang:

```json
{
  "content": [
    {
      "requestId": "uuid-cua-request-1",
      "userId": "uuid-cua-user-pending-1",
      "email": "pending_user1@example.com",
      "fullName": "Nguyen Van F",
      "requestedAt": "2023-07-14T10:00:00Z",
      "status": "PENDING",
      "notes": "Yêu cầu từ đối tác X"
    },
    {
      "requestId": "uuid-cua-request-2",
      "userId": "uuid-cua-user-pending-2",
      "email": "pending_user2@example.com",
      "fullName": "Le Thi G",
      "requestedAt": "2023-07-14T11:30:00Z",
      "status": "PENDING",
      "notes": ""
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 5,
  "totalPages": 1
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

