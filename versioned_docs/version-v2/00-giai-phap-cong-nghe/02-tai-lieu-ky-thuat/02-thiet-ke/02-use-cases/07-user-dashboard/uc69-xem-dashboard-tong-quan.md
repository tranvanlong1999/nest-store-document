
# UC69: Xem dashboard tổng quan

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem một dashboard tổng quan về tài khoản và việc sử dụng dịch vụ của họ. Dashboard này cung cấp cái nhìn nhanh về trạng thái gói dịch vụ, hạn ngạch còn lại, và thống kê sử dụng cơ bản.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/dashboard`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn thông tin gói dịch vụ hiện tại của người dùng.
- Truy vấn thông tin hạn ngạch (quota) và thống kê sử dụng gần đây của người dùng.
- Tổng hợp dữ liệu và trả về cho người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin tổng quan của dashboard:

```json
{
  "userInfo": {
    "userId": "uuid-cua-user",
    "fullName": "Nguyen Van C",
    "email": "user@example.com"
  },
  "currentSubscription": {
    "planName": "Free",
    "startDate": "2023-07-01T00:00:00Z",
    "endDate": null,
    "status": "ACTIVE"
  },
  "quotaSummary": [
    {
      "serviceName": "Speech To Text",
      "used": 500,
      "limit": 1000,
      "unit": "seconds"
    },
    {
      "serviceName": "eKYC",
      "used": 10,
      "limit": 50,
      "unit": "transactions"
    }
  ],
  "recentUsage": {
    "totalRequestsToday": 50,
    "totalRequestsThisMonth": 510
  },
  "apiKeys": [
    {
      "apiKeyId": "uuid-cua-api-key-1",
      "name": "My First API Key",
      "isActive": true
    }
  ]
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

