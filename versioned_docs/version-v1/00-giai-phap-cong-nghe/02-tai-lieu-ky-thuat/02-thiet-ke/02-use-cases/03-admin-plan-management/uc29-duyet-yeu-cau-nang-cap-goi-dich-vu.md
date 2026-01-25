
# UC29: Duyệt yêu cầu nâng cấp gói dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem xét và phê duyệt các yêu cầu nâng cấp gói dịch vụ từ người dùng. Điều này thường áp dụng cho các gói Enterprise hoặc các gói tùy chỉnh, nơi cần có sự can thiệp thủ công để xác nhận các điều khoản, giá cả, hoặc cấu hình đặc biệt trước khi kích hoạt gói mới.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền duyệt yêu cầu nâng cấp gói.
- Phải có các yêu cầu nâng cấp gói đang ở trạng thái chờ duyệt.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/upgrade-requests/{requestId}/status`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `requestId` (UUID) - ID của yêu cầu nâng cấp cần duyệt.
- **Body (JSON)**:

```json
{
  "status": "APPROVED", // Hoặc "REJECTED"
  "reason": "Đã xác nhận các điều khoản Enterprise." // Tùy chọn, đặc biệt khi từ chối
}
```

- **Constraints**: 
    - `status` là bắt buộc, phải là `APPROVED` hoặc `REJECTED`.
    - `reason` là tùy chọn, nên được cung cấp khi `status` là `REJECTED`.

## 5. Hậu xử lý

- Hệ thống xác định yêu cầu nâng cấp theo `requestId`.
- Kiểm tra tính hợp lệ của `status` và quyền của Admin.
- Nếu `status` là `APPROVED`:
    - Cập nhật trạng thái của yêu cầu nâng cấp thành `APPROVED`.
    - Kích hoạt gói dịch vụ mới cho người dùng (cập nhật subscription của người dùng).
    - (Tùy chọn) Gửi email thông báo phê duyệt và kích hoạt gói cho người dùng.
- Nếu `status` là `REJECTED`:
    - Cập nhật trạng thái của yêu cầu nâng cấp thành `REJECTED`.
    - (Tùy chọn) Gửi email thông báo từ chối cho người dùng, kèm theo `reason`.
- Ghi log hoạt động duyệt yêu cầu nâng cấp của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận trạng thái của yêu cầu:

```json
{
  "requestId": "uuid-cua-upgrade-request",
  "status": "APPROVED",
  "message": "Upgrade request approved successfully. User's plan has been activated."
  // Hoặc: "message": "Upgrade request rejected successfully. Reason: ..."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ hoặc yêu cầu không ở trạng thái `PENDING`.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy yêu cầu nâng cấp với `requestId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

