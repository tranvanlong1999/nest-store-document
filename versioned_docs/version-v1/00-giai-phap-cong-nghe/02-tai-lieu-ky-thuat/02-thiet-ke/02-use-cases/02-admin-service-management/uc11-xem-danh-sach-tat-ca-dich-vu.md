
# UC11: Xem danh sách tất cả dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem danh sách tất cả các dịch vụ (ví dụ: STT, eKYC, OCR) mà hệ thống đang cung cấp. Danh sách này bao gồm các thông tin cơ bản của dịch vụ như ID, tên dịch vụ, mô tả ngắn gọn, trạng thái kích hoạt (Enable/Disable), và giá cả. Admin có thể xem tổng quan về các dịch vụ hiện có.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng quản lý dịch vụ.
- Hệ thống phải có ít nhất một dịch vụ đã được định nghĩa.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/services`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào cụ thể cho yêu cầu này. Có thể có các tham số tùy chọn cho phân trang hoặc sắp xếp (sẽ được mở rộng sau).

## 5. Hậu xử lý

- Hệ thống truy vấn cơ sở dữ liệu để lấy danh sách các dịch vụ.
- Dữ liệu dịch vụ được định dạng và trả về cho Admin.
- Ghi log hoạt động truy cập của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa danh sách các đối tượng dịch vụ. Mỗi đối tượng dịch vụ bao gồm:

```json
[
  {
    "serviceId": "uuid-cua-service-1",
    "serviceName": "Speech To Text",
    "description": "Chuyển đổi giọng nói thành văn bản.",
    "endpoint": "/stt/v1",
    "isEnabled": true,
    "pricePerUnit": 0.01,
    "unit": "second",
    "createdAt": "2023-01-10T09:00:00Z"
  },
  {
    "serviceId": "uuid-cua-service-2",
    "serviceName": "eKYC",
    "description": "Xác thực danh tính điện tử.",
    "endpoint": "/ekyc/v1",
    "isEnabled": false,
    "pricePerUnit": 0.05,
    "unit": "transaction",
    "createdAt": "2023-02-15T14:30:00Z"
  }
]
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

