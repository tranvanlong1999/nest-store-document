
# UC118: Log all API calls

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép API Gateway ghi lại (log) tất cả các cuộc gọi API đi qua nó. Việc ghi log bao gồm các thông tin như thời gian yêu cầu, IP nguồn, API Key/User ID, dịch vụ được gọi, trạng thái phản hồi, và thời gian xử lý. Dữ liệu log này rất quan trọng cho việc giám sát, phân tích sử dụng, gỡ lỗi và kiểm toán.

## 2. Tiền xử lý

- API Gateway phải được cấu hình để ghi log.
- `Logging & Monitoring Service` phải hoạt động và sẵn sàng để nhận log.

## 3. Định nghĩa Endpoint

- **HTTP Method**: Bất kỳ (GET, POST, PUT, DELETE, v.v.)
- **URL**: Bất kỳ URL nào đi qua API Gateway.
- **Authentication**: Không liên quan trực tiếp đến chức năng logging, nhưng thông tin xác thực sẽ được ghi vào log.

## 4. Yêu cầu đầu vào

- **HTTP Request**: Bất kỳ yêu cầu HTTP nào từ client.
- **HTTP Response**: Phản hồi từ dịch vụ backend.

## 5. Hậu xử lý

- API Gateway thu thập các thông tin liên quan đến yêu cầu (request) và phản hồi (response).
- Gửi các thông tin này đến `Logging & Monitoring Service` (ví dụ: qua Kafka hoặc trực tiếp qua HTTP).
- `Logging & Monitoring Service` lưu trữ log vào hệ thống lưu trữ log (ví dụ: Elasticsearch).
- Quá trình logging nên được thực hiện một cách không đồng bộ để không ảnh hưởng đến hiệu suất của API Gateway.

## 6. Yêu cầu đầu ra

- **HTTP Status**: Không có đầu ra trực tiếp từ chức năng logging. Mã trạng thái và body của phản hồi sẽ là của yêu cầu API gốc.
- **Body**: Không có body phản hồi riêng cho chức năng logging.

- **Trường hợp lỗi**: 
    - Các lỗi trong quá trình logging không nên làm gián đoạn luồng xử lý chính của yêu cầu API. Thay vào đó, chúng nên được ghi nhận nội bộ hoặc cảnh báo cho đội ngũ vận hành.

