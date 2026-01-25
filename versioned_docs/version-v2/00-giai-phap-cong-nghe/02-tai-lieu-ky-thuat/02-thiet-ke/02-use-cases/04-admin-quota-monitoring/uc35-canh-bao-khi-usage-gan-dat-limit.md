
# UC35: Cảnh báo khi usage gần đạt limit

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép hệ thống tự động gửi cảnh báo đến người dùng hoặc Admin khi mức độ sử dụng (usage) của một dịch vụ hoặc gói dịch vụ của họ gần đạt đến giới hạn (limit) đã được cấu hình. Điều này giúp người dùng chủ động quản lý việc sử dụng và tránh bị gián đoạn dịch vụ, đồng thời giúp Admin theo dõi các tài khoản có nguy cơ vượt quá hạn mức.

## 2. Tiền xử lý

- Hệ thống phải có khả năng theo dõi usage của từng người dùng/API Key cho từng dịch vụ.
- Các ngưỡng cảnh báo phải được cấu hình (ví dụ: 80% limit).
- Hệ thống thông báo (Email, In-app Notification) phải hoạt động.

## 3. Định nghĩa Endpoint

Chức năng này chủ yếu là một tiến trình chạy nền (background job) hoặc một phần của `Usage & Quota Service` và `Notification System`, không có endpoint API trực tiếp để người dùng gọi. Tuy nhiên, Admin có thể cấu hình ngưỡng cảnh báo thông qua một endpoint quản trị.

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/settings/usage-alerts`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "alertThresholdPercentage": 80, // Ngưỡng cảnh báo (ví dụ: 80% limit)
  "alertFrequency": "DAILY", // Tần suất cảnh báo (DAILY, WEEKLY, ONCE)
  "notificationChannels": ["EMAIL", "IN_APP"]
}
```

- **Constraints**: 
    - `alertThresholdPercentage` là bắt buộc, phải là số nguyên từ 1 đến 99.
    - `alertFrequency` là bắt buộc, phải là một trong các giá trị hợp lệ.
    - `notificationChannels` là bắt buộc, phải là một mảng các kênh thông báo hợp lệ.

## 5. Hậu xử lý

- **Đối với tiến trình nền (Background Process)**:
    - Định kỳ (ví dụ: hàng giờ, hàng ngày), hệ thống quét qua dữ liệu usage của tất cả người dùng.
    - Đối với mỗi người dùng và mỗi dịch vụ, tính toán tỷ lệ usage so với limit.
    - Nếu tỷ lệ này vượt quá `alertThresholdPercentage` và cảnh báo chưa được gửi (hoặc đã đến lúc gửi lại theo `alertFrequency`):
        - Tạo một thông báo cảnh báo.
        - Gửi thông báo này đến `Notification System` để phân phối qua các kênh đã cấu hình (email, in-app).
        - Ghi lại thời điểm cảnh báo cuối cùng được gửi để tránh gửi lặp lại.
- **Đối với Admin Endpoint**: 
    - Lưu cấu hình cảnh báo vào cơ sở dữ liệu.
    - Ghi log hoạt động cấu hình cảnh báo của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` (đối với Admin Endpoint).
- **Body**: Một đối tượng JSON xác nhận cấu hình cảnh báo:

```json
{
  "message": "Usage alert settings updated successfully.",
  "alertThresholdPercentage": 80,
  "alertFrequency": "DAILY"
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

