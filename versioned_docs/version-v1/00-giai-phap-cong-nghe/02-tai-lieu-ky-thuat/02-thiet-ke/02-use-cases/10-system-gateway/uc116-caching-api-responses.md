
# UC116: Caching API responses

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách API Gateway thực hiện việc lưu trữ tạm thời (caching) các phản hồi từ các microservice backend. Điều này giúp giảm tải cho các dịch vụ backend, cải thiện thời gian phản hồi cho người dùng, và tối ưu hóa việc sử dụng tài nguyên bằng cách phục vụ các yêu cầu lặp lại từ bộ nhớ cache thay vì xử lý lại từ đầu.

## 2. Tiền xử lý

- API Gateway đã được triển khai và cấu hình.
- Một hệ thống cache (ví dụ: Redis) đã được tích hợp với API Gateway.
- Các chính sách caching đã được định nghĩa (ví dụ: thời gian sống của cache, các endpoint cần cache).

## 3. Định nghĩa Endpoint

Chức năng này được thực hiện bởi API Gateway khi xử lý các yêu cầu đến các microservice backend. Không có endpoint API trực tiếp để gọi chức năng caching, mà nó là một phần của luồng xử lý yêu cầu của Gateway.

## 4. Yêu cầu đầu vào

- **HTTP Request**: Bất kỳ yêu cầu API nào đến API Gateway.
- **Thông tin được sử dụng để tạo cache key**: 
    - `URL` của yêu cầu.
    - `HTTP Method`.
    - `Query Parameters`.
    - `Request Body` (nếu là POST/PUT và cần cache).
    - `Headers` (ví dụ: `Authorization` nếu cache theo người dùng).

## 5. Hậu xử lý

- API Gateway nhận một yêu cầu API.
- Tạo một `cache key` duy nhất dựa trên các thông tin của yêu cầu.
- Kiểm tra xem có phản hồi nào cho `cache key` này trong bộ nhớ cache không.
- Nếu tìm thấy trong cache và còn hợp lệ:
    - API Gateway trả về phản hồi từ cache ngay lập tức cho client.
    - Ghi log sự kiện cache hit.
- Nếu không tìm thấy trong cache hoặc cache đã hết hạn:
    - API Gateway chuyển tiếp yêu cầu đến microservice backend tương ứng.
    - Khi nhận được phản hồi từ microservice backend:
        - Lưu phản hồi này vào bộ nhớ cache với `cache key` đã tạo và thời gian sống (TTL) được cấu hình.
        - Trả về phản hồi cho client.
        - Ghi log sự kiện cache miss.

## 6. Yêu cầu đầu ra

- **HTTP Status**: Phản hồi từ microservice backend (ví dụ: `200 OK`).
- **Headers**: 
    - `X-Cache-Status`: `HIT` hoặc `MISS`.
    - `Cache-Control`: Thông tin về caching (ví dụ: `max-age=3600`).

- **Body**: Phản hồi từ microservice backend.

- **Trường hợp lỗi**: 
    - Nếu có lỗi xảy ra trong quá trình caching (ví dụ: Redis không khả dụng), API Gateway sẽ bỏ qua cache và chuyển tiếp yêu cầu trực tiếp đến backend. Lỗi sẽ được ghi log nhưng không ảnh hưởng đến luồng xử lý chính.

