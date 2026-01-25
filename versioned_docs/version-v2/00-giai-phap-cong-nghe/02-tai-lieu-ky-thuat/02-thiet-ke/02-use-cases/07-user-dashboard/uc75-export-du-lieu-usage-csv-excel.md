
# UC75: Export dữ liệu usage (CSV/Excel)

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xuất (export) dữ liệu về mức độ sử dụng (usage) của họ ra các định dạng phổ biến như CSV hoặc Excel. Điều này giúp người dùng dễ dàng phân tích dữ liệu ngoại tuyến, lưu trữ hồ sơ sử dụng, hoặc tích hợp vào các công cụ phân tích cá nhân.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Người dùng phải có dữ liệu usage đã được ghi nhận.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/users/usage/export`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (bắt buộc)**:
    - `format`: (String) Định dạng tệp xuất (`CSV`, `EXCEL`).
- **Query Parameters (tùy chọn)**:
    - `serviceId`: (UUID) Lọc usage theo dịch vụ cụ thể.
    - `startDate`: (Date) Ngày bắt đầu để lọc dữ liệu (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc dữ liệu (format: YYYY-MM-DD).
    - `interval`: (String) Khoảng thời gian tổng hợp dữ liệu (ví dụ: `DAILY`, `WEEKLY`, `MONTHLY`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn `Usage & Quota Service` để lấy dữ liệu usage của người dùng dựa trên các tham số lọc.
- Chuyển đổi dữ liệu sang định dạng được yêu cầu (`CSV` hoặc `Excel`).
- Trả về tệp báo cáo cho client.
- Ghi log hoạt động xuất dữ liệu usage của người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Headers**: 
    - `Content-Type`: `text/csv` hoặc `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`.
    - `Content-Disposition`: `attachment; filename="user_usage_report.csv"` hoặc `user_usage_report.xlsx`.
- **Body**: Nội dung tệp báo cáo (CSV hoặc Excel).

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi tạo tệp báo cáo).

