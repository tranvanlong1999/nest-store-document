
# UC34: Theo dõi usage real-time

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) theo dõi mức độ sử dụng (usage) của hệ thống và các dịch vụ theo thời gian thực. Điều này bao gồm việc hiển thị số lượng yêu cầu API, lưu lượng dữ liệu, và các chỉ số hiệu suất khác ngay lập tức khi chúng xảy ra. Theo dõi real-time giúp Admin nhanh chóng phát hiện các sự cố, xu hướng bất thường, hoặc các cuộc tấn công tiềm năng.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng giám sát real-time.
- Hệ thống phải có cơ chế thu thập và truyền tải dữ liệu usage theo thời gian thực (ví dụ: Kafka, Prometheus, Grafana).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/usage/realtime`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `serviceId`: (UUID) Lọc theo dịch vụ cụ thể.
    - `userId`: (UUID) Lọc theo người dùng cụ thể.
    - `interval`: (Integer) Khoảng thời gian cập nhật dữ liệu (ví dụ: 5 giây).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Kết nối đến hệ thống thu thập dữ liệu real-time (ví dụ: thông qua WebSocket hoặc Server-Sent Events).
- Truy vấn và tổng hợp các chỉ số usage mới nhất.
- Truyền tải dữ liệu usage theo thời gian thực về cho client của Admin.
- Ghi log hoạt động giám sát real-time của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` (đối với kết nối ban đầu) hoặc luồng dữ liệu WebSocket/SSE.
- **Body**: Một đối tượng JSON chứa các chỉ số usage cập nhật liên tục:

```json
{
  "timestamp": "2023-07-15T23:00:00Z",
  "totalRequestsPerSecond": 150,
  "serviceUsage": [
    {
      "serviceId": "uuid-cua-service-stt",
      "requestsPerSecond": 80,
      "averageResponseTimeMs": 120
    },
    {
      "serviceId": "uuid-cua-service-ekyc",
      "requestsPerSecond": 30,
      "averageResponseTimeMs": 250
    }
  ],
  "activeUsers": 500,
  "errorsPerMinute": 5
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với hệ thống real-time data).

