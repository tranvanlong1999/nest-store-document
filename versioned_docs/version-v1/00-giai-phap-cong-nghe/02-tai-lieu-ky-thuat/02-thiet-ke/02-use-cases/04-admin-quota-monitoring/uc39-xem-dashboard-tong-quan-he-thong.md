
# UC39: Xem dashboard tổng quan hệ thống

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem một dashboard tổng quan về tình trạng và hiệu suất của toàn bộ hệ thống. Dashboard này cung cấp các chỉ số quan trọng (KPIs) như trạng thái dịch vụ, số lượng yêu cầu API, lỗi hệ thống, tài nguyên sử dụng, và các cảnh báo. Điều này giúp Admin có cái nhìn tổng thể về sức khỏe hệ thống và nhanh chóng phát hiện các vấn đề tiềm ẩn.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập dashboard hệ thống.
- Hệ thống giám sát phải được thiết lập và thu thập dữ liệu từ tất cả các microservice.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/system/dashboard`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `timeRange`: (String) Khoảng thời gian để hiển thị dữ liệu (ví dụ: `LAST_HOUR`, `LAST_24_HOURS`, `LAST_7_DAYS`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn các hệ thống giám sát (ví dụ: Prometheus, Grafana, ELK Stack) để lấy các chỉ số và log mới nhất.
- Tổng hợp dữ liệu từ các nguồn khác nhau để tạo ra cái nhìn tổng thể.
- Trả về dữ liệu dashboard.
- Ghi log hoạt động truy cập dashboard của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa các chỉ số tổng quan hệ thống:

```json
{
  "systemStatus": "OPERATIONAL", // OPERATIONAL, DEGRADED, OUTAGE
  "totalApiRequests": 1234567,
  "averageResponseTimeMs": 150,
  "errorRatePercentage": 0.5,
  "activeUsers": 1200,
  "serviceHealth": [
    {
      "serviceName": "Auth Service",
      "status": "UP",
      "lastChecked": "2023-07-15T23:59:00Z"
    },
    {
      "serviceName": "Payment Service",
      "status": "DEGRADED",
      "lastChecked": "2023-07-15T23:58:00Z"
    }
  ],
  "resourceUtilization": {
    "cpuUsagePercentage": 45,
    "memoryUsagePercentage": 60,
    "diskUsagePercentage": 70
  },
  "recentAlerts": [
    {
      "alertId": "alert-123",
      "message": "High error rate on Payment Service",
      "severity": "HIGH",
      "timestamp": "2023-07-15T23:50:00Z"
    }
  ]
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với hệ thống giám sát).

