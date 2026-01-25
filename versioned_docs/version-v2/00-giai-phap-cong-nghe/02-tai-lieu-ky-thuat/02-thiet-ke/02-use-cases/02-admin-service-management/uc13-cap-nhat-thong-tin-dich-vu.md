
# UC13: Cập nhật thông tin dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) cập nhật thông tin của một dịch vụ hiện có trong hệ thống. Admin có thể thay đổi các thuộc tính như mô tả, endpoint, giá cả, hoặc các cấu hình khác của dịch vụ.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý dịch vụ.
- Dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/services/{serviceId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ cần cập nhật.
- **Body (JSON)**:

```json
{
  "description": "Mô tả cập nhật về dịch vụ Speech To Text.",
  "endpoint": "/stt/v2",
  "pricePerUnit": 0.015
}
```

- **Constraints**: 
    - Các trường trong body là tùy chọn; chỉ các trường được cung cấp sẽ được cập nhật.
    - `serviceName` không thể thay đổi.
    - `endpoint` nếu được cung cấp phải là duy nhất và chưa được sử dụng bởi dịch vụ khác.
    - `pricePerUnit` nếu được cung cấp phải là số dương.

## 5. Hậu xử lý

- Hệ thống xác định dịch vụ theo `serviceId`.
- Kiểm tra tính hợp lệ của dữ liệu đầu vào (ví dụ: `endpoint` không trùng lặp).
- Cập nhật các trường thông tin được cung cấp trong cơ sở dữ liệu.
- Ghi log hoạt động cập nhật dịch vụ của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin cập nhật của dịch vụ:

```json
{
  "serviceId": "uuid-cua-service-1",
  "serviceName": "Speech To Text",
  "description": "Mô tả cập nhật về dịch vụ Speech To Text.",
  "endpoint": "/stt/v2",
  "isEnabled": true,
  "pricePerUnit": 0.015,
  "unit": "second",
  "createdAt": "2023-01-10T09:00:00Z",
  "updatedAt": "2023-07-15T15:00:00Z"
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: `endpoint` đã tồn tại).
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy dịch vụ với `serviceId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

