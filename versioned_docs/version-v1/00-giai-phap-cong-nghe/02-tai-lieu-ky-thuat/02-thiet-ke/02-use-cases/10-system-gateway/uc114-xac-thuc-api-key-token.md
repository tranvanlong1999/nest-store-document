
# UC114: Xác thực API key/token

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép API Gateway xác thực tính hợp lệ của API Key hoặc JWT Token được gửi trong mỗi yêu cầu đến. Đây là bước bảo mật quan trọng để đảm bảo chỉ những người dùng hoặc ứng dụng được ủy quyền mới có thể truy cập các dịch vụ backend.

## 2. Tiền xử lý

- API Gateway phải được cấu hình để thực hiện xác thực.
- `AuthService` phải hoạt động và sẵn sàng để xác thực token/key.

## 3. Định nghĩa Endpoint

- **HTTP Method**: Bất kỳ (GET, POST, PUT, DELETE, v.v.)
- **URL**: Bất kỳ URL nào yêu cầu xác thực.
- **Authentication**: Yêu cầu API Key (trong header `X-API-Key` hoặc query parameter `api_key`) hoặc JWT Token (trong header `Authorization: Bearer <token>`).

## 4. Yêu cầu đầu vào

- **HTTP Request Header**: 
    - `Authorization: Bearer <JWT_TOKEN>` (đối với người dùng cuối/admin)
    - `X-API-Key: <API_KEY>` (đối với developer)

## 5. Hậu xử lý

- API Gateway trích xuất API Key hoặc JWT Token từ yêu cầu HTTP.
- Gửi yêu cầu xác thực đến `AuthService` (hoặc `API Key Service` nếu là API Key).
- `AuthService` (hoặc `API Key Service`) kiểm tra tính hợp lệ của token/key (chữ ký, thời hạn, trạng thái kích hoạt).
- Nếu hợp lệ, `AuthService` trả về thông tin người dùng/developer và các quyền liên quan.
- API Gateway lưu trữ thông tin xác thực này vào ngữ cảnh của yêu cầu để các bước xử lý tiếp theo (kiểm tra quyền, quota) có thể sử dụng.
- Nếu không hợp lệ, API Gateway từ chối yêu cầu.

## 6. Yêu cầu đầu ra

- **HTTP Status**: 
    - `200 OK` (nếu xác thực thành công, yêu cầu được chuyển tiếp đến dịch vụ backend).
    - `401 Unauthorized`: Nếu API Key/JWT Token không hợp lệ, thiếu, hoặc đã hết hạn.
- **Body**: Nội dung phản hồi từ dịch vụ backend (nếu xác thực thành công) hoặc thông báo lỗi (nếu xác thực thất bại).

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu API Key/JWT Token không hợp lệ, thiếu, hoặc đã hết hạn.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: `AuthService` không phản hồi).

