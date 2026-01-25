# UC136: Tạo custom reports

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Admin hoặc người dùng có quyền) tạo các báo cáo tùy chỉnh dựa trên các tiêu chí và dữ liệu cụ thể mà họ quan tâm. Điều này cung cấp sự linh hoạt cao trong việc phân tích dữ liệu và trích xuất thông tin chi tiết từ hệ thống.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống và có quyền tạo báo cáo.
- Dữ liệu cần thiết cho báo cáo phải có sẵn trong hệ thống (ví dụ: usage data, payment data, user data).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/reports/custom`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "reportName": "Báo cáo sử dụng API theo dịch vụ tháng 7",
  "reportType": "USAGE_BY_SERVICE", // Loại báo cáo (ví dụ: USAGE_BY_SERVICE, REVENUE_BY_PLAN, USER_ACTIVITY)
  "filters": {
    "startDate": "2023-07-01T00:00:00Z",
    "endDate": "2023-07-31T23:59:59Z",
    "serviceId": "uuid-cua-service-stt",
    "planType": "PREMIUM"
  },
  "groupBy": [
    "serviceName",
    "day"
  ],
  "metrics": [
    "totalRequests",
    "totalUsageTime",
    "totalCost"
  ],
  "outputFormat": "JSON" // JSON, CSV, PDF
}
```

- **Constraints**: 
    - `reportName`, `reportType`, `metrics` là bắt buộc.
    - `filters` và `groupBy` là tùy chọn, tùy thuộc vào `reportType`.
    - `outputFormat` phải là một trong các định dạng được hỗ trợ.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Xác thực các tham số đầu vào và quyền của người dùng.
- Truy vấn cơ sở dữ liệu hoặc các microservice liên quan (Usage, Payment, User) để thu thập dữ liệu thô.
- Xử lý dữ liệu theo các `filters`, `groupBy`, và `metrics` được yêu cầu.
- Chuyển đổi kết quả sang `outputFormat` được chỉ định.
- Trả về báo cáo cho người dùng.
- Ghi log hoạt động tạo báo cáo tùy chỉnh.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Headers**: `Content-Type` và `Content-Disposition` sẽ thay đổi tùy theo `outputFormat`.
- **Body**: Nội dung báo cáo (JSON, CSV, hoặc PDF).

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ hoặc không đủ quyền.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi xử lý dữ liệu hoặc tạo tệp báo cáo).

