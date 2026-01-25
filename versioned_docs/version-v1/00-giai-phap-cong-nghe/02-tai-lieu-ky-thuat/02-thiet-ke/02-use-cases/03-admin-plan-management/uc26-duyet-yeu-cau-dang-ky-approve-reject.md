
# UC26: Duyệt yêu cầu đăng ký (approve/reject)

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) duyệt (phê duyệt hoặc từ chối) các yêu cầu đăng ký tài khoản mới. Khi một yêu cầu được phê duyệt, tài khoản người dùng sẽ được kích hoạt. Khi bị từ chối, tài khoản sẽ không được tạo hoặc sẽ bị đánh dấu là không hợp lệ.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền duyệt yêu cầu đăng ký.
- Yêu cầu đăng ký với ID được cung cấp phải tồn tại và đang ở trạng thái `PENDING`.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/registration-requests/{requestId}/status`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `requestId` (UUID) - ID của yêu cầu đăng ký cần duyệt.
- **Body (JSON)**:

```json
{
  "status": "APPROVED", // Hoặc "REJECTED"
  "reason": "Thông tin đầy đủ và hợp lệ." // Tùy chọn, đặc biệt khi từ chối
}
```

- **Constraints**: 
    - `status` là bắt buộc, phải là `APPROVED` hoặc `REJECTED`.
    - `reason` là tùy chọn, nên được cung cấp khi `status` là `REJECTED`.

## 5. Hậu xử lý

- Hệ thống xác định yêu cầu đăng ký theo `requestId`.
- Kiểm tra tính hợp lệ của `status` và quyền của Admin.
- Nếu `status` là `APPROVED`:
    - Cập nhật trạng thái của yêu cầu đăng ký thành `APPROVED`.
    - Kích hoạt tài khoản người dùng liên quan (cập nhật trạng thái người dùng thành `ACTIVE`).
    - (Tùy chọn) Gửi email thông báo phê duyệt cho người dùng.
- Nếu `status` là `REJECTED`:
    - Cập nhật trạng thái của yêu cầu đăng ký thành `REJECTED`.
    - (Tùy chọn) Gửi email thông báo từ chối cho người dùng, kèm theo `reason`.
- Ghi log hoạt động duyệt yêu cầu của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận trạng thái của yêu cầu:

```json
{
  "requestId": "uuid-cua-request",
  "status": "APPROVED",
  "message": "Registration request approved successfully."
  // Hoặc: "message": "Registration request rejected successfully. Reason: ..."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ hoặc yêu cầu không ở trạng thái `PENDING`.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy yêu cầu đăng ký với `requestId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

