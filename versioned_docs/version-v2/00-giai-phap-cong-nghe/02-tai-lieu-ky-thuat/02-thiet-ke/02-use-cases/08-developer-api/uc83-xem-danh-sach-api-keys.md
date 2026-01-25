
# UC83: Xem danh sách API keys

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Developer xem danh sách tất cả các API Key mà họ đã tạo. Danh sách này cung cấp thông tin tổng quan về từng API Key, bao gồm tên, mô tả, trạng thái kích hoạt, và ngày tạo.

## 2. Tiền xử lý

- Developer phải đang đăng nhập vào hệ thống.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/api-keys`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Developer.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định Developer.
- Truy vấn cơ sở dữ liệu để lấy danh sách các API Key thuộc về Developer đó.
- Trả về thông tin cơ bản của các API Key (không bao gồm giá trị `key` thực tế).
- Ghi log hoạt động truy cập danh sách API Key.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa danh sách các đối tượng API Key. Mỗi đối tượng API Key bao gồm:

```json
[
  {
    "apiKeyId": "uuid-cua-api-key-1",
    "name": "My First API Key",
    "description": "API Key for my web application",
    "isActive": true,
    "createdAt": "2023-07-15T17:00:00Z"
  },
  {
    "apiKeyId": "uuid-cua-api-key-2",
    "name": "API Key for Mobile App",
    "description": "",
    "isActive": false,
    "createdAt": "2023-07-10T10:30:00Z"
  }
]
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Developer chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

