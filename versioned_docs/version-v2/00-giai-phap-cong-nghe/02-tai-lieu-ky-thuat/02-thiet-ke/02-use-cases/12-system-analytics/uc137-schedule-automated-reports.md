
# UC137: Schedule automated reports

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Admin hoặc người dùng có quyền) lên lịch tự động tạo và gửi các báo cáo định kỳ (ví dụ: hàng ngày, hàng tuần, hàng tháng) đến các địa chỉ email được chỉ định. Điều này giúp tự động hóa quy trình báo cáo, đảm bảo các bên liên quan luôn nhận được thông tin cập nhật mà không cần thao tác thủ công.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống và có quyền lên lịch báo cáo.
- Các loại báo cáo cần lên lịch phải đã được định nghĩa hoặc có thể tạo tùy chỉnh (như UC136).
- Hệ thống phải có một cơ chế lập lịch (scheduler) và khả năng gửi email.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/reports/schedules`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Body (JSON)**:

```json
{
  "reportName": "Báo cáo doanh thu hàng tháng",
  "reportType": "REVENUE_BY_PLAN",
  "scheduleType": "MONTHLY", // DAILY, WEEKLY, MONTHLY
  "scheduleDetails": {
    "dayOfMonth": 1, // Nếu là MONTHLY, ngày trong tháng
    "dayOfWeek": "MONDAY", // Nếu là WEEKLY, thứ trong tuần
    "time": "09:00" // Giờ gửi báo cáo (HH:MM)
  },
  "filters": {
    "startDate": "LAST_MONTH_START",
    "endDate": "LAST_MONTH_END"
  },
  "metrics": [
    "totalRevenue",
    "newSubscriptions"
  ],
  "outputFormat": "PDF", // CSV, PDF, EXCEL
  "recipients": [
    "admin@example.com",
    "finance@example.com"
  ]
}
```

- **Constraints**: 
    - `reportName`, `reportType`, `scheduleType`, `scheduleDetails`, `outputFormat`, `recipients` là bắt buộc.
    - `scheduleDetails` phải hợp lệ với `scheduleType`.
    - `recipients` phải là một mảng các địa chỉ email hợp lệ.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Xác thực các tham số đầu vào và quyền của người dùng.
- Tạo một bản ghi lịch trình báo cáo mới trong cơ sở dữ liệu.
- Lập lịch một tác vụ định kỳ trong hệ thống scheduler:
    - Khi đến thời gian đã định, tác vụ sẽ kích hoạt việc tạo báo cáo (sử dụng logic tương tự UC136).
    - Sau khi báo cáo được tạo, nó sẽ được gửi đến các địa chỉ email trong danh sách `recipients`.
- Ghi log hoạt động lên lịch báo cáo.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `201 Created` nếu lịch trình được tạo thành công.
- **Body**: Một đối tượng JSON xác nhận lịch trình đã được tạo:

```json
{
  "scheduleId": "schedule_uuid_123",
  "reportName": "Báo cáo doanh thu hàng tháng",
  "status": "ACTIVE",
  "message": "Report schedule created successfully. Reports will be sent as configured."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ hoặc không đủ quyền.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi lập lịch tác vụ).

