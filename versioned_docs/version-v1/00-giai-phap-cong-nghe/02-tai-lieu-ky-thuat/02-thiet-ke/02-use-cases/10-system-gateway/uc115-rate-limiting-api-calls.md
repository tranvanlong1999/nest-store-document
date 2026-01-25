# UC115: Rate limiting API calls

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả cách API Gateway thực hiện giới hạn tần suất (rate limiting) các cuộc gọi API từ người dùng. Điều này giúp bảo vệ các dịch vụ backend khỏi bị quá tải do lưu lượng truy cập cao hoặc các cuộc tấn công DDoS, đồng thời đảm bảo phân phối tài nguyên công bằng giữa các người dùng.

## 2. Tiền xử lý

- API Gateway đã được triển khai và cấu hình để chặn các yêu cầu đến các microservice backend.
- Các chính sách rate limiting đã được định nghĩa (ví dụ: số yêu cầu tối đa mỗi phút/giờ cho mỗi API Key hoặc người dùng).

## 3. Định nghĩa Endpoint

Chức năng này được thực hiện bởi API Gateway trước khi yêu cầu được chuyển tiếp đến các microservice backend. Không có endpoint API trực tiếp để gọi chức năng rate limiting, mà nó là một phần của luồng xử lý yêu cầu của Gateway.

## 4. Yêu cầu đầu vào

- **HTTP Request**: Bất kỳ yêu cầu API nào đến API Gateway.
- **Thông tin được sử dụng để xác định người dùng/API Key**: 
    - `API Key` (từ header `X-API-Key` hoặc query parameter).
    - `JWT Token` (từ header `Authorization`).
    - `IP Address` của client.

## 5. Hậu xử lý

- API Gateway nhận một yêu cầu API.
- Trích xuất thông tin định danh người dùng/API Key từ yêu cầu.
- Truy vấn `Rate Limiting Service` (hoặc bộ nhớ cache nội bộ) để kiểm tra số lượng yêu cầu đã được thực hiện bởi người dùng/API Key đó trong khoảng thời gian hiện tại.
- So sánh số lượng yêu cầu hiện tại với giới hạn đã cấu hình cho người dùng/API Key đó.
- Nếu số lượng yêu cầu vượt quá giới hạn:
    - API Gateway từ chối yêu cầu.
    - Trả về lỗi `429 Too Many Requests` cho client.
    - Ghi log sự kiện rate limiting.
- Nếu số lượng yêu cầu chưa vượt quá giới hạn:
    - Cho phép yêu cầu đi qua đến microservice backend.
    - Tăng bộ đếm yêu cầu cho người dùng/API Key đó.
- Ghi log chi tiết quá trình kiểm tra rate limiting.

## 6. Yêu cầu đầu ra

- **HTTP Status**: 
    - `429 Too Many Requests` nếu yêu cầu bị giới hạn.
    - `X-RateLimit-Limit`: Tổng số yêu cầu được phép trong một khoảng thời gian.
    - `X-RateLimit-Remaining`: Số yêu cầu còn lại trong khoảng thời gian hiện tại.
    - `X-RateLimit-Reset`: Thời gian (Unix timestamp) khi giới hạn sẽ được reset.

- **Body**: Một đối tượng JSON lỗi:

```json
{
  "errorCode": "TOO_MANY_REQUESTS",
  "message": "You have exceeded your API request limit. Please try again later."
}
```

- **Trường hợp lỗi**: 
    - Không có lỗi cụ thể từ chức năng này, vì nó là một cơ chế bảo vệ. Các lỗi khác sẽ được xử lý bởi các thành phần khác của Gateway hoặc microservice backend.

