
# UC31: Xem tổng quan usage toàn hệ thống

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem tổng quan về mức độ sử dụng (usage) của toàn bộ hệ thống. Dashboard này cung cấp các số liệu tổng hợp như tổng số yêu cầu API, tổng thời gian sử dụng dịch vụ, số lượng người dùng hoạt động, và các xu hướng sử dụng theo thời gian. Điều này giúp Admin đánh giá hiệu suất hệ thống, dự báo nhu cầu tài nguyên, và xác định các dịch vụ được sử dụng nhiều nhất.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng giám sát và báo cáo.
- Hệ thống phải có dữ liệu usage được thu thập từ các dịch vụ và API Gateway.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/usage/overview`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `startDate`: (Date) Ngày bắt đầu để lọc dữ liệu (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc dữ liệu (format: YYYY-MM-DD).
    - `interval`: (String) Khoảng thời gian tổng hợp dữ liệu (ví dụ: `DAILY`, `WEEKLY`, `MONTHLY`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn `Reporting System` hoặc `Usage & Quota Service` để tổng hợp dữ liệu usage từ tất cả các dịch vụ và người dùng.
- Tính toán các chỉ số tổng quan như tổng số yêu cầu, tổng thời gian sử dụng, số lượng người dùng duy nhất, v.v.
- Trả về dữ liệu tổng hợp.
- Ghi log hoạt động truy cập báo cáo của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa các số liệu tổng quan về usage:

```json
{
  "totalApiRequests": 12345678,
  "totalServiceUsage": {
    "Speech To Text": {"value": 500000, "unit": "seconds"},
    "eKYC": {"value": 150000, "unit": "transactions"}
  },
  "activeUsers": 1500,
  "newUsersLastMonth": 250,
  "usageTrend": [
    {
      "date": "2023-07-01",
      "totalRequests": 100000
    },
    {
      "date": "2023-07-02",
      "totalRequests": 110000
    }
  ],
  "topServices": [
    {
      "serviceName": "Speech To Text",
      "usagePercentage": 60
    },
    {
      "serviceName": "eKYC",
      "usagePercentage": 30
    }
  ]
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

