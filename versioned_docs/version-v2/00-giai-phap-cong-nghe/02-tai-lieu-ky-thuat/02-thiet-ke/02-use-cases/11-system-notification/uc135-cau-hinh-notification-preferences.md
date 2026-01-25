
# UC135: Cấu hình notification preferences

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng cấu hình tùy chọn nhận thông báo của họ, bao gồm loại thông báo muốn nhận (ví dụ: email, in-app), tần suất, và các ngưỡng cảnh báo. Điều này giúp người dùng kiểm soát lượng thông báo nhận được và chỉ tập trung vào những thông tin quan trọng đối với họ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống phải có các loại thông báo và kênh thông báo được định nghĩa.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/users/notification-preferences`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "emailNotifications": {
    "enabled": true,
    "types": [
      "PAYMENT_CONFIRMATION",
      "QUOTA_WARNING",
      "SERVICE_DOWNTIME"
    ]
  },
  "inAppNotifications": {
    "enabled": true,
    "types": [
      "QUOTA_WARNING",
      "NEW_FEATURE"
    ]
  },
  "quotaWarningThreshold": 85 // Phần trăm ngưỡng cảnh báo quota
}
```

- **Constraints**: 
    - Các trường `enabled` là boolean.
    - `types` là mảng các loại thông báo hợp lệ.
    - `quotaWarningThreshold` là số nguyên từ 1 đến 99.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Cập nhật các tùy chọn thông báo của người dùng trong cơ sở dữ liệu.
- Ghi log hoạt động cấu hình tùy chọn thông báo.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận tùy chọn đã được cập nhật:

```json
{
  "userId": "uuid-cua-user",
  "message": "Notification preferences updated successfully.",
  "preferences": {
    "emailNotifications": {
      "enabled": true,
      "types": [
        "PAYMENT_CONFIRMATION",
        "QUOTA_WARNING",
        "SERVICE_DOWNTIME"
      ]
    },
    "inAppNotifications": {
      "enabled": true,
      "types": [
        "QUOTA_WARNING",
        "NEW_FEATURE"
      ]
    },
    "quotaWarningThreshold": 85
  }
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

