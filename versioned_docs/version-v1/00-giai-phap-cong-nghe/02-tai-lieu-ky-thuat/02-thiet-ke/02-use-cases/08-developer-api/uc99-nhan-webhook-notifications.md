
# UC99: Nhận webhook notifications

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) đăng ký nhận các thông báo webhook từ hệ thống khi có các sự kiện quan trọng xảy ra liên quan đến tài khoản hoặc dịch vụ của họ (ví dụ: thanh toán thành công, quota gần hết, lỗi API). Webhook cung cấp một cơ chế thông báo không đồng bộ, cho phép ứng dụng của người dùng phản ứng ngay lập tức với các sự kiện mà không cần phải liên tục thăm dò (polling) API.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải có một endpoint (URL) công khai để nhận webhook.
- Hệ thống phải có khả năng gửi webhook đến các URL đã đăng ký.

## 3. Định nghĩa Endpoint

### 3.1. Đăng ký Webhook Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/developer/webhooks`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

### 3.2. Xem danh sách Webhook Endpoints đã đăng ký

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/webhooks`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

### 3.3. Xóa Webhook Endpoint

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/developer/webhooks/{webhookId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

### 4.1. Đăng ký Webhook Endpoint

- **Body (JSON)**:

```json
{
  "url": "https://your-app.com/webhook-listener",
  "events": [
    "payment.succeeded",
    "quota.threshold_reached",
    "api.error"
  ],
  "secret": "your_webhook_secret_for_signature_verification" // Tùy chọn: secret để xác minh chữ ký webhook
}
```

- **Constraints**: 
    - `url` là bắt buộc và phải là một URL hợp lệ, có thể truy cập công khai.
    - `events` là bắt buộc và phải là một mảng các loại sự kiện hợp lệ được hỗ trợ bởi hệ thống.

### 4.2. Xem danh sách Webhook Endpoints đã đăng ký

Không có tham số đầu vào.

### 4.3. Xóa Webhook Endpoint

- **Path Parameter**: `webhookId` (UUID) - ID của webhook endpoint cần xóa.

## 5. Hậu xử lý

### 5.1. Đăng ký Webhook Endpoint

- Hệ thống xác thực JWT Token và xác định người dùng.
- Lưu `url`, `events`, và `secret` vào cơ sở dữ liệu.
- Ghi log hoạt động đăng ký webhook.

### 5.2. Xem danh sách Webhook Endpoints đã đăng ký

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy danh sách các webhook endpoints đã đăng ký của người dùng.
- Trả về danh sách.

### 5.3. Xóa Webhook Endpoint

- Hệ thống xác thực JWT Token và xác định người dùng.
- Xóa webhook endpoint khỏi cơ sở dữ liệu.
- Ghi log hoạt động xóa webhook.

### 5.4. Gửi Webhook (Hệ thống nội bộ)

- Khi một sự kiện được đăng ký xảy ra (ví dụ: thanh toán thành công):
    - Hệ thống tạo một payload webhook chứa thông tin về sự kiện.
    - Ký payload bằng `secret` đã lưu (nếu có).
    - Gửi yêu cầu HTTP POST đến `url` của webhook endpoint.
    - Xử lý phản hồi và thử lại nếu cần.
    - Ghi log hoạt động gửi webhook.

## 6. Yêu cầu đầu ra

### 6.1. Đăng ký Webhook Endpoint

- **HTTP Status**: `201 Created` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận webhook đã được đăng ký:

```json
{
  "webhookId": "uuid-cua-webhook",
  "url": "https://your-app.com/webhook-listener",
  "events": [
    "payment.succeeded",
    "quota.threshold_reached",
    "api.error"
  ],
  "message": "Webhook registered successfully."
}
```

### 6.2. Xem danh sách Webhook Endpoints đã đăng ký

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa danh sách các webhook endpoints:

```json
[
  {
    "webhookId": "uuid-cua-webhook-1",
    "url": "https://your-app.com/webhook-listener-1",
    "events": ["payment.succeeded"]
  },
  {
    "webhookId": "uuid-cua-webhook-2",
    "url": "https://your-app.com/webhook-listener-2",
    "events": ["api.error", "quota.threshold_reached"]
  }
]
```

### 6.3. Xóa Webhook Endpoint

- **HTTP Status**: `204 No Content` nếu thành công.

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu webhook không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy webhook với `webhookId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

