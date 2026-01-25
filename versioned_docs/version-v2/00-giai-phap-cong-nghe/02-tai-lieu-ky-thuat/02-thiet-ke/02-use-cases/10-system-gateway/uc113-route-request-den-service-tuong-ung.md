# UC113: Route request đến service tương ứng

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép API Gateway định tuyến các yêu cầu HTTP đến dịch vụ backend (microservice) phù hợp dựa trên đường dẫn URL, phương thức HTTP, hoặc các tiêu chí khác. Đây là chức năng cốt lõi của một API Gateway, đảm bảo các yêu cầu từ client được chuyển đến đúng nơi xử lý trong kiến trúc microservice.

## 2. Tiền xử lý

- API Gateway phải đang hoạt động và lắng nghe các yêu cầu đến.
- Các dịch vụ backend phải được đăng ký với API Gateway (ví dụ: thông qua Service Discovery) và đang hoạt động.

## 3. Định nghĩa Endpoint

- **HTTP Method**: Bất kỳ (GET, POST, PUT, DELETE, v.v.)
- **URL**: Bất kỳ URL nào được cấu hình để định tuyến (ví dụ: `/api/v1/users`, `/api/v1/services/stt/convert`)
- **Authentication**: Yêu cầu JWT Token hợp lệ (sẽ được xử lý bởi API Gateway trước khi định tuyến).

## 4. Yêu cầu đầu vào

- **HTTP Request**: Bất kỳ yêu cầu HTTP nào từ client.

## 5. Hậu xử lý

- API Gateway phân tích yêu cầu đến (URL, method, headers, body).
- Dựa trên cấu hình định tuyến, API Gateway xác định dịch vụ backend mục tiêu.
- API Gateway chuyển tiếp yêu cầu đến dịch vụ backend đó.
- Nhận phản hồi từ dịch vụ backend và chuyển tiếp lại cho client.
- Ghi log hoạt động định tuyến.

## 6. Yêu cầu đầu ra

- **HTTP Status**: Mã trạng thái HTTP được trả về từ dịch vụ backend (ví dụ: `200 OK`, `201 Created`, `404 Not Found`, `500 Internal Server Error`).
- **Body**: Nội dung phản hồi từ dịch vụ backend.

- **Trường hợp lỗi**: 
    - `404 Not Found`: Nếu không tìm thấy dịch vụ backend tương ứng với URL yêu cầu.
    - `503 Service Unavailable`: Nếu dịch vụ backend mục tiêu không khả dụng hoặc không phản hồi.

