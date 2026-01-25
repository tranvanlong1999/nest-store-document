
# UC141: Predictive usage analytics

## 1. Mô tả yêu cầu chức năng

Chức năng này cung cấp khả năng phân tích dự đoán về mức độ sử dụng (usage) của người dùng trong tương lai. Bằng cách sử dụng các thuật toán học máy và dữ liệu lịch sử, hệ thống có thể dự báo xu hướng sử dụng, giúp người dùng (Admin hoặc người dùng có quyền) lập kế hoạch tài nguyên, tối ưu hóa chi phí, và đưa ra các quyết định kinh doanh chiến lược.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống và có quyền truy cập vào các phân tích dự đoán.
- Hệ thống phải có đủ dữ liệu lịch sử về usage của người dùng.
- Các mô hình học máy để dự đoán usage phải đã được huấn luyện và triển khai.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/analytics/predictive-usage`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `userId`: (UUID) Lọc dự đoán cho người dùng cụ thể (nếu Admin).
    - `serviceId`: (UUID) Lọc dự đoán cho dịch vụ cụ thể.
    - `predictionPeriod`: (String) Khoảng thời gian dự đoán (ví dụ: `NEXT_MONTH`, `NEXT_QUARTER`).
    - `granularity`: (String) Mức độ chi tiết của dự đoán (ví dụ: `DAILY`, `WEEKLY`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn `Analytics Service` hoặc `Machine Learning Service` để lấy dữ liệu dự đoán usage.
- Dịch vụ này sẽ sử dụng các mô hình đã huấn luyện để tạo ra dự đoán dựa trên dữ liệu lịch sử và các tham số đầu vào.
- Trả về kết quả dự đoán cho người dùng.
- Ghi log hoạt động xem phân tích dự đoán.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa dữ liệu dự đoán usage:

```json
{
  "predictionPeriod": "NEXT_MONTH",
  "granularity": "DAILY",
  "predictions": [
    {
      "date": "2023-08-01",
      "serviceId": "uuid-cua-service-stt",
      "serviceName": "Speech To Text",
      "predictedUsage": 90000,
      "unit": "seconds",
      "confidenceInterval": {
        "lower": 85000,
        "upper": 95000
      }
    },
    {
      "date": "2023-08-02",
      "serviceId": "uuid-cua-service-stt",
      "serviceName": "Speech To Text",
      "predictedUsage": 92000,
      "unit": "seconds",
      "confidenceInterval": {
        "lower": 87000,
        "upper": 97000
      }
    }
  ],
  "summary": {
    "totalPredictedUsage": 2800000,
    "totalPredictedCost": 280.00,
    "currency": "USD"
  }
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu người dùng không có quyền truy cập vào phân tích dự đoán.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi chạy mô hình học máy).

