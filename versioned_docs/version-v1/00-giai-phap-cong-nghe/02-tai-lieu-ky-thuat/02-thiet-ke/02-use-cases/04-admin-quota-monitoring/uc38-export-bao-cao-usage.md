
# UC38: Export báo cáo usage

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xuất (export) các báo cáo về mức độ sử dụng (usage) của hệ thống ra các định dạng phổ biến như CSV hoặc Excel. Điều này giúp Admin dễ dàng phân tích dữ liệu ngoại tuyến, chia sẻ báo cáo với các bên liên quan, hoặc tích hợp vào các hệ thống báo cáo khác.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng báo cáo.
- Hệ thống phải có dữ liệu usage để xuất báo cáo.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/usage/reports/export`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Query Parameters (bắt buộc)**:
    - `format`: (String) Định dạng tệp xuất (`CSV`, `EXCEL`).
    - `interval`: (String) Khoảng thời gian tổng hợp báo cáo (`DAILY`, `WEEKLY`, `MONTHLY`).
- **Query Parameters (tùy chọn)**:
    - `startDate`: (Date) Ngày bắt đầu của khoảng thời gian báo cáo (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc của khoảng thời gian báo cáo (format: YYYY-MM-DD).
    - `serviceId`: (UUID) Lọc báo cáo theo dịch vụ cụ thể.
    - `userId`: (UUID) Lọc báo cáo theo người dùng cụ thể.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn `Reporting System` để lấy dữ liệu usage dựa trên các tham số lọc.
- Chuyển đổi dữ liệu sang định dạng được yêu cầu (`CSV` hoặc `Excel`).
- Trả về tệp báo cáo cho client.
- Ghi log hoạt động xuất báo cáo của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Headers**: 
    - `Content-Type`: `text/csv` hoặc `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.
    - `Content-Disposition`: `attachment; filename="usage_report.csv"` hoặc `usage_report.xlsx`.
- **Body**: Nội dung tệp báo cáo (CSV hoặc Excel).

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi tạo tệp báo cáo).

