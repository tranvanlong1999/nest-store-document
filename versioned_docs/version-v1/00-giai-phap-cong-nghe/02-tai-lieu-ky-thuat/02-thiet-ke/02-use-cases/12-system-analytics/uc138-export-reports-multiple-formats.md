
# UC138: Export reports multiple formats

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Admin hoặc người dùng có quyền) xuất các báo cáo đã tạo ra nhiều định dạng tệp khác nhau (ví dụ: CSV, PDF, Excel). Điều này cung cấp sự linh hoạt cho người dùng trong việc sử dụng báo cáo cho các mục đích khác nhau, như phân tích dữ liệu ngoại tuyến, trình bày, hoặc lưu trữ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống và có quyền truy cập báo cáo.
- Báo cáo cần xuất phải đã được tạo hoặc có thể được tạo theo yêu cầu.
- Hệ thống phải có khả năng chuyển đổi dữ liệu báo cáo sang các định dạng tệp được hỗ trợ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/reports/{reportId}/export`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `reportId` (UUID) - ID của báo cáo cần xuất.
- **Query Parameters (bắt buộc)**:
    - `format`: (String) Định dạng tệp xuất (`CSV`, `PDF`, `EXCEL`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `reportId` có hợp lệ và báo cáo đó thuộc về người dùng hiện tại không.
- Truy vấn dữ liệu của báo cáo từ cơ sở dữ liệu hoặc bộ nhớ cache.
- Chuyển đổi dữ liệu báo cáo sang định dạng tệp được yêu cầu (`CSV`, `PDF`, hoặc `Excel`).
- Trả về tệp báo cáo cho client.
- Ghi log hoạt động xuất báo cáo.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Headers**: `Content-Type` và `Content-Disposition` sẽ thay đổi tùy theo `format`.
- **Body**: Nội dung tệp báo cáo (CSV, PDF, hoặc Excel).

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu báo cáo không thuộc về người dùng hiện tại hoặc người dùng không có quyền truy cập.
    - `404 Not Found`: Nếu không tìm thấy báo cáo với `reportId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi tạo tệp báo cáo).

