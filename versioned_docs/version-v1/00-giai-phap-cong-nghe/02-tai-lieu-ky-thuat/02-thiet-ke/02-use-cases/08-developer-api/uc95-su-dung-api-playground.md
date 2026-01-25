
# UC95: Sử dụng API playground

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) tương tác trực tiếp với các API của hệ thống thông qua một giao diện người dùng đồ họa (GUI) thân thiện, thường được gọi là API Playground hoặc API Explorer. Điều này giúp người dùng dễ dàng thử nghiệm các endpoint, xem cấu trúc yêu cầu và phản hồi, và hiểu cách các API hoạt động mà không cần viết mã.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- API Playground phải được tích hợp và có thể truy cập được.
- Người dùng phải có ít nhất một API key hợp lệ để sử dụng.

## 3. Định nghĩa Endpoint

Chức năng này thường được cung cấp thông qua một giao diện người dùng web (Frontend Application) tương tác với các API hiện có của hệ thống. Không có endpoint API riêng biệt cho API Playground, mà nó sử dụng lại các endpoint của các dịch vụ khác.

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/playground` (để truy cập giao diện Playground)
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng để truy cập giao diện.

## 4. Yêu cầu đầu vào

- **Thông tin từ người dùng trên giao diện Playground**: 
    - `API Endpoint`: URL của API cần gọi.
    - `HTTP Method`: GET, POST, PUT, DELETE, v.v.
    - `Headers`: Các header của yêu cầu (ví dụ: `Authorization` với API Key).
    - `Request Body`: Dữ liệu JSON hoặc form data cho các yêu cầu POST/PUT.
    - `API Key`: API Key mà người dùng muốn sử dụng để thực hiện cuộc gọi.

## 5. Hậu xử lý

- Người dùng truy cập giao diện API Playground.
- Người dùng chọn API endpoint, phương thức, nhập headers và body (nếu có).
- Người dùng chọn API Key muốn sử dụng cho cuộc gọi.
- Khi người dùng nhấn nút 


        "Execute" (hoặc tương tự):
    - Frontend gửi yêu cầu đến một endpoint trung gian trên backend của hệ thống (ví dụ: `/api/v1/developer/playground/execute`).
    - Backend nhận yêu cầu, sử dụng API Key của người dùng và các thông tin yêu cầu để thực hiện cuộc gọi đến API thực tế của dịch vụ.
    - Backend nhận phản hồi từ API dịch vụ và trả về cho frontend.
    - Frontend hiển thị phản hồi (status code, headers, body) cho người dùng.
    - Ghi log hoạt động sử dụng API Playground.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` (từ endpoint trung gian).
- **Body**: Một đối tượng JSON chứa kết quả của cuộc gọi API:

```json
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "X-Request-Id": "req-123"
  },
  "body": {
    "result": "success",
    "data": "..."
  },
  "executionTimeMs": 150
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ (ví dụ: JSON body sai định dạng).
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu API Key không có quyền truy cập vào endpoint được yêu cầu.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi khi gọi API dịch vụ).

