
# UC74: Nhận thông báo khi gần hết quota

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng nhận được thông báo (email hoặc in-app) khi mức độ sử dụng (usage) của họ cho một dịch vụ cụ thể gần đạt đến giới hạn (limit) đã được cấu hình. Điều này giúp người dùng chủ động quản lý việc sử dụng tài nguyên và tránh bị gián đoạn dịch vụ.

## 2. Tiền xử lý

- Người dùng phải đang sử dụng một gói dịch vụ có giới hạn quota.
- Hệ thống phải có khả năng theo dõi usage của từng người dùng cho từng dịch vụ.
- Các ngưỡng cảnh báo phải được cấu hình (ví dụ: 80% limit).
- Hệ thống thông báo (Email, In-app Notification) phải hoạt động.

## 3. Định nghĩa Endpoint

Chức năng này chủ yếu là một tiến trình chạy nền (background job) hoặc một phần của `Usage & Quota Service` và `Notification System`, không có endpoint API trực tiếp để người dùng gọi. Người dùng có thể cấu hình tùy chọn nhận thông báo thông qua endpoint quản lý profile hoặc notification preferences.

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/users/notification-preferences`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "quotaAlertsEnabled": true,
  "quotaAlertThreshold": 80, // Phần trăm ngưỡng cảnh báo
  "notificationChannels": ["EMAIL", "IN_APP"]
}
```

- **Constraints**: 
    - `quotaAlertsEnabled` là boolean.
    - `quotaAlertThreshold` là số nguyên từ 1 đến 99.
    - `notificationChannels` là một mảng các kênh thông báo hợp lệ.

## 5. Hậu xử lý

- **Đối với tiến trình nền (Background Process)**:
    - Định kỳ, hệ thống quét qua dữ liệu usage của tất cả người dùng.
    - Đối với mỗi người dùng và mỗi dịch vụ, tính toán tỷ lệ usage so với limit.
    - Nếu tỷ lệ này vượt quá `quotaAlertThreshold` và người dùng đã bật cảnh báo:
        - Tạo một thông báo cảnh báo.
        - Gửi thông báo này đến `Notification System` để phân phối qua các kênh đã cấu hình (email, in-app).
        - Ghi lại thời điểm cảnh báo cuối cùng được gửi để tránh gửi lặp lại.
- **Đối với User Endpoint**: 
    - Lưu cấu hình tùy chọn thông báo của người dùng vào cơ sở dữ liệu.
    - Ghi log hoạt động cấu hình thông báo của người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` (đối với User Endpoint).
- **Body**: Một đối tượng JSON xác nhận cấu hình thông báo:

```json
{
  "userId": "uuid-cua-user",
  "message": "Notification preferences updated successfully.",
  "quotaAlertsEnabled": true
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

