
# UC93: Download SDK/libraries

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) tải xuống các bộ công cụ phát triển phần mềm (SDK) và thư viện client-side cho các ngôn ngữ lập trình và nền tảng khác nhau. Các SDK này giúp đơn giản hóa quá trình tích hợp và tương tác với các API của hệ thống, cung cấp các hàm và lớp được đóng gói sẵn.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Các SDK/thư viện phải được lưu trữ trên một hệ thống lưu trữ tệp có thể truy cập công khai hoặc được xác thực (ví dụ: GitHub Releases, S3).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/sdk/download`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (bắt buộc)**:
    - `language`: (String) Ngôn ngữ lập trình của SDK (ví dụ: `java`, `python`, `nodejs`, `go`).
    - `platform`: (String) Nền tảng của SDK (ví dụ: `web`, `android`, `ios`).
- **Query Parameters (tùy chọn)**:
    - `version`: (String) Phiên bản cụ thể của SDK (ví dụ: `1.0.0`). Nếu không có, sẽ trả về phiên bản mới nhất.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra tính hợp lệ của `language`, `platform`, và `version`.
- Tìm kiếm đường dẫn đến tệp SDK/thư viện tương ứng trong kho lưu trữ.
- Trả về tệp SDK/thư viện cho client.
- Ghi log hoạt động tải xuống SDK.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Headers**: 
    - `Content-Type`: `application/zip` hoặc `application/octet-stream`.
    - `Content-Disposition`: `attachment; filename="sdk-java-1.0.0.zip"`.
- **Body**: Nội dung tệp SDK/thư viện.

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ (ví dụ: ngôn ngữ/nền tảng không được hỗ trợ).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `404 Not Found`: Nếu không tìm thấy SDK/thư viện với các tham số được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi truy cập kho lưu trữ tệp).

