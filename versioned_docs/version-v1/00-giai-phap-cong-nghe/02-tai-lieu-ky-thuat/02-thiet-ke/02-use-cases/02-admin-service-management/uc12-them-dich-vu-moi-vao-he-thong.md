
# UC12: Thêm dịch vụ mới vào hệ thống

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) thêm một dịch vụ mới vào danh mục các dịch vụ mà hệ thống cung cấp. Khi thêm dịch vụ, Admin cần cung cấp các thông tin cơ bản như tên dịch vụ, mô tả, endpoint API, trạng thái ban đầu (kích hoạt/vô hiệu hóa), và thông tin giá cả.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý dịch vụ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/services`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "serviceName": "New Service Name",
  "description": "Mô tả chi tiết về dịch vụ mới.",
  "endpoint": "/new-service/v1",
  "isEnabled": true,
  "pricePerUnit": 0.005,
  "unit": "request"
}
```

- **Constraints**: 
    - `serviceName` là bắt buộc và phải là duy nhất.
    - `description` là bắt buộc.
    - `endpoint` là bắt buộc và phải là duy nhất.
    - `isEnabled` là bắt buộc (true/false).
    - `pricePerUnit` là bắt buộc và phải là số dương.
    - `unit` là bắt buộc (ví dụ: "request", "second", "transaction").

## 5. Hậu xử lý

- Hệ thống kiểm tra tính hợp lệ của dữ liệu đầu vào.
- Lưu thông tin dịch vụ mới vào cơ sở dữ liệu.
- Ghi log hoạt động thêm dịch vụ của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin của dịch vụ vừa được tạo, bao gồm `serviceId` được tạo tự động:

```json
{
  "serviceId": "uuid-cua-service-moi",
  "serviceName": "New Service Name",
  "description": "Mô tả chi tiết về dịch vụ mới.",
  "endpoint": "/new-service/v1",
  "isEnabled": true,
  "pricePerUnit": 0.005,
  "unit": "request",
  "createdAt": "2023-07-15T10:00:00Z"
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (thiếu trường, sai định dạng, `serviceName` hoặc `endpoint` đã tồn tại).
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

