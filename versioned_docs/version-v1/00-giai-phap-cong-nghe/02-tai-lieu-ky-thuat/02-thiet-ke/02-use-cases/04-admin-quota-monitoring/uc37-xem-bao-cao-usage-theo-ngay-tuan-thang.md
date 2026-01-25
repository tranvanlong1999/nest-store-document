
# UC37: Xem báo cáo usage theo ngày/tuần/tháng

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem các báo cáo chi tiết về mức độ sử dụng (usage) của hệ thống, được tổng hợp theo các khoảng thời gian khác nhau như ngày, tuần, hoặc tháng. Báo cáo này cung cấp cái nhìn sâu sắc về xu hướng sử dụng, giúp Admin phân tích hiệu suất, dự báo nhu cầu tài nguyên, và lập kế hoạch kinh doanh.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng báo cáo.
- Hệ thống phải có dữ liệu usage được thu thập và lưu trữ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/usage/reports`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Query Parameters (bắt buộc)**:
    - `interval`: (String) Khoảng thời gian tổng hợp báo cáo (`DAILY`, `WEEKLY`, `MONTHLY`).
- **Query Parameters (tùy chọn)**:
    - `startDate`: (Date) Ngày bắt đầu của khoảng thời gian báo cáo (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc của khoảng thời gian báo cáo (format: YYYY-MM-DD).
    - `serviceId`: (UUID) Lọc báo cáo theo dịch vụ cụ thể.
    - `userId`: (UUID) Lọc báo cáo theo người dùng cụ thể.
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn `Reporting System` để tổng hợp dữ liệu usage dựa trên `interval` và các bộ lọc khác.
- Tính toán các chỉ số như tổng số yêu cầu, tổng thời gian sử dụng, số lượng người dùng duy nhất, v.v., cho mỗi khoảng thời gian.
- Trả về dữ liệu báo cáo đã được phân trang và sắp xếp.
- Ghi log hoạt động truy cập báo cáo của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa dữ liệu báo cáo usage và thông tin phân trang:

```json
{
  "content": [
    {
      "period": "2023-07-10", // Hoặc "2023-W28", "2023-07"
      "totalRequests": 150000,
      "totalUsageByService": {
        "Speech To Text": {"value": 5000, "unit": "seconds"},
        "eKYC": {"value": 1000, "unit": "transactions"}
      },
      "activeUsers": 500,
      "revenue": 12000.50
    },
    {
      "period": "2023-07-11",
      "totalRequests": 160000,
      "totalUsageByService": {
        "Speech To Text": {"value": 5500, "unit": "seconds"},
        "eKYC": {"value": 1100, "unit": "transactions"}
      },
      "activeUsers": 520,
      "revenue": 12500.75
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 30,
  "totalPages": 2
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

