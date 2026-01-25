# UC147: Quản lý danh sách đen IP

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép quản trị viên (Admin) quản lý danh sách các địa chỉ IP bị cấm truy cập vào hệ thống (blacklist). Điều này giúp tăng cường bảo mật bằng cách ngăn chặn các cuộc tấn công từ các nguồn độc hại đã biết hoặc các IP có hành vi đáng ngờ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống với quyền Admin.
- Hệ thống phải có cơ chế lưu trữ và áp dụng danh sách đen IP (ví dụ: thông qua API Gateway hoặc Firewall).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/security/ip-blacklist`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/security/ip-blacklist`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/admin/security/ip-blacklist/{ipAddress}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

### 4.1. Xem danh sách đen IP

Không có tham số đầu vào.

### 4.2. Thêm IP vào danh sách đen

- **Body (JSON)**:

```json
{
  "ipAddress": "192.168.1.100",
  "reason": "Detected suspicious login attempts"
}
```

- **Constraints**: 
    - `ipAddress` là bắt buộc và phải là địa chỉ IP hợp lệ.
    - `reason` là tùy chọn.

### 4.3. Xóa IP khỏi danh sách đen

- **Path Parameter**: `ipAddress` (String) - Địa chỉ IP cần xóa khỏi danh sách đen.

## 5. Hậu xử lý

### 5.1. Xem danh sách đen IP

- Hệ thống xác thực JWT Token và quyền Admin.
- Truy vấn cơ sở dữ liệu để lấy danh sách các IP trong blacklist.
- Trả về danh sách.

### 5.2. Thêm IP vào danh sách đen

- Hệ thống xác thực JWT Token và quyền Admin.
- Lưu địa chỉ IP và lý do vào cơ sở dữ liệu.
- Kích hoạt cơ chế để áp dụng thay đổi (ví dụ: thông báo cho API Gateway/Firewall để cập nhật quy tắc).
- Ghi log hoạt động thêm IP vào blacklist.

### 5.3. Xóa IP khỏi danh sách đen

- Hệ thống xác thực JWT Token và quyền Admin.
- Xóa địa chỉ IP khỏi cơ sở dữ liệu.
- Kích hoạt cơ chế để áp dụng thay đổi.
- Ghi log hoạt động xóa IP khỏi blacklist.

## 6. Yêu cầu đầu ra

### 6.1. Xem danh sách đen IP

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa danh sách các IP:

```json
[
  {
    "ipAddress": "192.168.1.100",
    "reason": "Detected suspicious login attempts",
    "addedBy": "admin_user_id",
    "addedAt": "2023-07-16T10:00:00Z"
  }
]
```

### 6.2. Thêm IP vào danh sách đen

- **HTTP Status**: `201 Created` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận:

```json
{
  "ipAddress": "192.168.1.100",
  "message": "IP address added to blacklist."
}
```

### 6.3. Xóa IP khỏi danh sách đen

- **HTTP Status**: `204 No Content` nếu thành công.

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu người dùng không có quyền Admin.
    - `404 Not Found`: Nếu không tìm thấy IP cần xóa.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

