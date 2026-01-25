
# UC72: Xem quota còn lại

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem chi tiết hạn ngạch (quota) còn lại của họ cho từng dịch vụ mà họ đang sử dụng. Điều này giúp người dùng theo dõi mức độ sử dụng và quản lý tài nguyên hiệu quả.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải có ít nhất một gói dịch vụ đang hoạt động.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/users/quota`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn thông tin gói dịch vụ hiện tại của người dùng.
- Truy vấn hạn ngạch đã được cấp và mức độ sử dụng hiện tại cho từng dịch vụ mà người dùng có quyền truy cập.
- Tính toán quota còn lại.
- Tổng hợp dữ liệu và trả về cho người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa thông tin quota cho từng dịch vụ:

```json
[
  {
    "serviceId": "uuid-cua-service-1",
    "serviceName": "Speech To Text",
    "totalQuota": 10000,
    "usedQuota": 1234,
    "remainingQuota": 8766,
    "unit": "seconds"
  },
  {
    "serviceId": "uuid-cua-service-2",
    "serviceName": "eKYC",
    "totalQuota": 500,
    "usedQuota": 10,
    "remainingQuota": 490,
    "unit": "transactions"
  }
]
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

