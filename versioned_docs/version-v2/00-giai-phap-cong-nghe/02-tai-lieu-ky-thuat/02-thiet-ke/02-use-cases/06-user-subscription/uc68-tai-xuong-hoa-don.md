
# UC68: Tải xuống hóa đơn

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập tải xuống hóa đơn (invoice) của một giao dịch cụ thể dưới dạng tệp PDF. Điều này giúp người dùng lưu trữ hóa đơn cho mục đích kế toán hoặc lưu trữ cá nhân.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hóa đơn với ID được cung cấp phải tồn tại và thuộc về người dùng.
- Hệ thống phải có khả năng tạo hóa đơn PDF.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/invoices/{invoiceId}/download`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `invoiceId` (UUID) - ID của hóa đơn cần tải xuống.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `invoiceId` có hợp lệ và thuộc về người dùng hiện tại không.
- Truy vấn thông tin chi tiết của hóa đơn từ cơ sở dữ liệu.
- Tạo tệp PDF hóa đơn dựa trên thông tin này.
- Trả về tệp PDF cho client.
- Ghi log hoạt động tải xuống hóa đơn.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Headers**: 
    - `Content-Type`: `application/pdf`.
    - `Content-Disposition`: `attachment; filename="invoice_{invoiceId}.pdf"`.
- **Body**: Nội dung tệp PDF hóa đơn.

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu hóa đơn không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy hóa đơn với `invoiceId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi tạo tệp PDF).

