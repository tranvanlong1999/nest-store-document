
# UC117: Check quota limitations

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép API Gateway kiểm tra hạn ngạch sử dụng (quota) của người dùng hoặc API Key trước khi định tuyến yêu cầu đến dịch vụ backend. Nếu hạn ngạch đã hết, yêu cầu sẽ bị từ chối. Điều này giúp kiểm soát việc sử dụng tài nguyên và thực thi các chính sách gói dịch vụ.

## 2. Tiền xử lý

- API Gateway đã xác thực thành công người dùng/API Key (UC114).
- `Quota & Usage Service` phải hoạt động và sẵn sàng để kiểm tra quota.

## 3. Định nghĩa Endpoint

- **HTTP Method**: Bất kỳ (GET, POST, PUT, DELETE, v.v.)
- **URL**: Bất kỳ URL nào của dịch vụ có áp dụng quota.
- **Authentication**: Yêu cầu JWT Token hoặc API Key hợp lệ.

## 4. Yêu cầu đầu vào

- **HTTP Request**: Bất kỳ yêu cầu HTTP nào từ client.
- **Context từ API Gateway**: `user_id` hoặc `api_key_id`, `service_id` (dịch vụ mà yêu cầu đang nhắm tới).

## 5. Hậu xử lý

- API Gateway trích xuất `user_id` hoặc `api_key_id` và `service_id` từ ngữ cảnh yêu cầu.
- Gửi yêu cầu kiểm tra quota đến `Quota & Usage Service`.
- `Quota & Usage Service` kiểm tra hạn ngạch còn lại cho người dùng/API Key và dịch vụ cụ thể.
- Nếu quota còn lại, `Quota & Usage Service` ghi nhận mức sử dụng và cho phép yêu cầu tiếp tục.
- Nếu quota đã hết, `Quota & Usage Service` thông báo cho API Gateway.
- API Gateway từ chối yêu cầu nếu quota đã hết.

## 6. Yêu cầu đầu ra

- **HTTP Status**: 
    - `200 OK` (nếu quota còn lại, yêu cầu được chuyển tiếp đến dịch vụ backend).
    - `403 Forbidden`: Nếu quota đã hết (với thông báo lỗi).
- **Body**: Nội dung phản hồi từ dịch vụ backend (nếu quota còn lại) hoặc thông báo lỗi (nếu quota đã hết).

- **Trường hợp lỗi**: 
    - `403 Forbidden`: Nếu quota đã hết.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: `Quota & Usage Service` không phản hồi).

