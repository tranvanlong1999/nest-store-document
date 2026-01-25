
# UC30: Duyệt yêu cầu tăng quota đặc biệt

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem xét và phê duyệt các yêu cầu tăng hạn ngạch (quota) đặc biệt từ người dùng. Điều này thường áp dụng khi người dùng cần vượt quá hạn mức mặc định của gói dịch vụ hiện tại cho một mục đích cụ thể, và cần sự chấp thuận thủ công từ Admin.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền duyệt yêu cầu tăng quota.
- Phải có các yêu cầu tăng quota đang ở trạng thái chờ duyệt.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/quota-requests/{requestId}/status`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `requestId` (UUID) - ID của yêu cầu tăng quota cần duyệt.
- **Body (JSON)**:

```json
{
  "status": "APPROVED", // Hoặc "REJECTED"
  "reason": "Yêu cầu hợp lý cho dự án đặc biệt.", // Tùy chọn, đặc biệt khi từ chối
  "approvedQuota": {
    "serviceId": "uuid-cua-service-stt",
    "limit": 500000,
    "unit": "seconds"
  } // Chỉ khi APPROVED
}
```

- **Constraints**: 
    - `status` là bắt buộc, phải là `APPROVED` hoặc `REJECTED`.
    - `reason` là tùy chọn, nên được cung cấp khi `status` là `REJECTED`.
    - `approvedQuota` là bắt buộc khi `status` là `APPROVED`, phải chứa `serviceId`, `limit` (số nguyên dương), và `unit` hợp lệ.

## 5. Hậu xử lý

- Hệ thống xác định yêu cầu tăng quota theo `requestId`.
- Kiểm tra tính hợp lệ của `status` và quyền của Admin.
- Nếu `status` là `APPROVED`:
    - Cập nhật trạng thái của yêu cầu tăng quota thành `APPROVED`.
    - Cập nhật hạn ngạch đặc biệt cho người dùng và dịch vụ tương ứng trong cơ sở dữ liệu.
    - (Tùy chọn) Gửi email thông báo phê duyệt và cập nhật quota cho người dùng.
- Nếu `status` là `REJECTED`:
    - Cập nhật trạng thái của yêu cầu tăng quota thành `REJECTED`.
    - (Tùy chọn) Gửi email thông báo từ chối cho người dùng, kèm theo `reason`.
- Ghi log hoạt động duyệt yêu cầu tăng quota của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận trạng thái của yêu cầu:

```json
{
  "requestId": "uuid-cua-quota-request",
  "status": "APPROVED",
  "message": "Quota increase request approved successfully. User's quota has been updated."
  // Hoặc: "message": "Quota increase request rejected successfully. Reason: ..."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ hoặc yêu cầu không ở trạng thái `PENDING`.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy yêu cầu tăng quota với `requestId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

