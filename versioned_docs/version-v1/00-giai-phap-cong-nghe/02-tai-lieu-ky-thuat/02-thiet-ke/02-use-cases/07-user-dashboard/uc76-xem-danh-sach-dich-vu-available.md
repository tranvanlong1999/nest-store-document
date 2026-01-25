
# UC76: Xem danh sách dịch vụ available

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem danh sách các dịch vụ mà hệ thống cung cấp và có thể sử dụng. Danh sách này bao gồm các dịch vụ đã được kích hoạt (enabled) và có thể truy cập được bởi người dùng dựa trên gói dịch vụ hiện tại của họ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống phải có ít nhất một dịch vụ được kích hoạt.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/services/available`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn danh sách các dịch vụ đang hoạt động (`isEnabled = true`).
- Lọc danh sách dịch vụ dựa trên gói dịch vụ hiện tại của người dùng (ví dụ: gói Free chỉ có thể thấy một số dịch vụ nhất định).
- Trả về thông tin cơ bản của các dịch vụ.

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
    "unit": "second",
    "pricePerUnit": 0.01
  },
  {
    "serviceId": "uuid-cua-service-2",
    "serviceName": "eKYC",
    "description": "Xác thực danh tính điện tử.",
    "endpoint": "/ekyc/v1",
    "unit": "transaction",
    "pricePerUnit": 0.05
  }
]
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

