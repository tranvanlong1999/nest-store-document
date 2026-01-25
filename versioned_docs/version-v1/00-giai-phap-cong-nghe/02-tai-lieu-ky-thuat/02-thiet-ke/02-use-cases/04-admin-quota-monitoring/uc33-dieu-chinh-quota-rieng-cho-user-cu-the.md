
# UC33: Điều chỉnh quota riêng cho user cụ thể

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) điều chỉnh hạn ngạch (quota) sử dụng cho một người dùng cụ thể, độc lập với gói dịch vụ mà người dùng đó đang sử dụng. Điều này hữu ích cho các trường hợp đặc biệt như cấp thêm quota cho khách hàng VIP, hoặc điều chỉnh quota tạm thời cho các dự án thử nghiệm.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý quota.
- User với ID được cung cấp phải tồn tại trong hệ thống.
- Dịch vụ được điều chỉnh quota phải tồn tại.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/users/{userId}/custom-quota`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `userId` (UUID) - ID của người dùng cần điều chỉnh quota.
- **Body (JSON)**:

```json
{
  "serviceId": "uuid-cua-service-stt",
  "limit": 500000, // Hạn mức mới cho dịch vụ này
  "unit": "seconds",
  "resetMonthly": true // Có reset quota hàng tháng không
}
```

- **Constraints**: 
    - `serviceId` là bắt buộc và phải là ID của một dịch vụ hợp lệ.
    - `limit` là bắt buộc và phải là số nguyên không âm (0 để xóa quota tùy chỉnh).
    - `unit` là bắt buộc và phải khớp với đơn vị của dịch vụ.
    - `resetMonthly` là tùy chọn, mặc định là `false`.

## 5. Hậu xử lý

- Hệ thống xác định người dùng theo `userId` và kiểm tra `serviceId`.
- Kiểm tra tính hợp lệ của dữ liệu đầu vào.
- Lưu cấu hình quota tùy chỉnh cho người dùng và dịch vụ cụ thể vào cơ sở dữ liệu.
- Ghi log hoạt động điều chỉnh quota của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận quota tùy chỉnh đã được cập nhật:

```json
{
  "userId": "uuid-cua-user",
  "serviceId": "uuid-cua-service-stt",
  "limit": 500000,
  "unit": "seconds",
  "resetMonthly": true,
  "message": "Custom quota for user updated successfully."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (thiếu trường, sai định dạng, `serviceId` không tồn tại).
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy người dùng với `userId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

