
# UC59: Xem lịch sử đăng nhập

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem lịch sử các lần đăng nhập vào tài khoản của họ. Thông tin bao gồm thời gian đăng nhập, địa chỉ IP, và thiết bị/trình duyệt được sử dụng. Điều này giúp người dùng theo dõi hoạt động tài khoản và phát hiện các hoạt động đáng ngờ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống phải có cơ chế ghi lại lịch sử đăng nhập.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/users/login-history`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).
    - `sortBy`: (String) Tên trường để sắp xếp (ví dụ: `timestamp`).
    - `sortOrder`: (String) Thứ tự sắp xếp (`ASC` hoặc `DESC`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy lịch sử đăng nhập của người dùng.
- Áp dụng phân trang và sắp xếp kết quả.
- Trả về danh sách các bản ghi lịch sử đăng nhập.
- Ghi log hoạt động truy cập lịch sử đăng nhập của người dùng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các bản ghi lịch sử đăng nhập và thông tin phân trang:

```json
{
  "content": [
    {
      "loginId": "uuid-cua-login-1",
      "timestamp": "2023-07-15T22:00:00Z",
      "ipAddress": "192.168.1.1",
      "device": "Chrome on Windows",
      "status": "SUCCESS"
    },
    {
      "loginId": "uuid-cua-login-2",
      "timestamp": "2023-07-15T21:30:00Z",
      "ipAddress": "10.0.0.5",
      "device": "Mobile App on Android",
      "status": "SUCCESS"
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 50,
  "totalPages": 3
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

