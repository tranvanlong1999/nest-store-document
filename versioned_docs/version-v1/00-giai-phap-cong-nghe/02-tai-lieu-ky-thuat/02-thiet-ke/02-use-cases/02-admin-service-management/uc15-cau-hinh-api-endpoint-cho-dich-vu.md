
# UC15: Cấu hình API endpoint cho dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) cấu hình hoặc cập nhật API endpoint mà một dịch vụ sẽ sử dụng. Endpoint này là đường dẫn mà API Gateway sẽ định tuyến các yêu cầu đến dịch vụ backend tương ứng. Việc cấu hình linh hoạt giúp quản lý các phiên bản dịch vụ hoặc chuyển đổi giữa các môi trường khác nhau.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý dịch vụ.
- Dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/services/{serviceId}/endpoint`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ cần cấu hình endpoint.
- **Body (JSON)**:

```json
{
  "endpoint": "/new-stt-v2/convert"
}
```

- **Constraints**: 
    - `endpoint` là bắt buộc, phải là một chuỗi không rỗng và phải là duy nhất trong hệ thống (không trùng với endpoint của dịch vụ khác).

## 5. Hậu xử lý

- Hệ thống xác định dịch vụ theo `serviceId`.
- Kiểm tra tính hợp lệ và tính duy nhất của `endpoint` mới.
- Cập nhật trường `endpoint` của dịch vụ trong cơ sở dữ liệu.
- Ghi log hoạt động cấu hình endpoint của Admin.
- (Tùy chọn) Kích hoạt việc cập nhật cấu hình trong API Gateway để áp dụng endpoint mới ngay lập tức.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận endpoint mới của dịch vụ:

```json
{
  "serviceId": "uuid-cua-service",
  "serviceName": "Speech To Text",
  "endpoint": "/new-stt-v2/convert",
  "message": "Service endpoint updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu `endpoint` không hợp lệ hoặc đã tồn tại.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy dịch vụ với `serviceId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

