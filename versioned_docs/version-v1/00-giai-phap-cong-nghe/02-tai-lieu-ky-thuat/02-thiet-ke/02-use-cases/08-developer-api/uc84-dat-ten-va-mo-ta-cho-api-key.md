# UC84: Đặt tên và mô tả cho API key

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) đặt tên và thêm mô tả cho các API key của họ. Việc này giúp người dùng dễ dàng quản lý và nhận diện các API key khác nhau, đặc biệt khi họ có nhiều API key cho các dự án hoặc môi trường khác nhau.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- API key cần đặt tên/mô tả phải tồn tại và thuộc về người dùng.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/developer/api-keys/{apiKeyId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `apiKeyId` (UUID) - ID của API key cần cập nhật.
- **Body (JSON)**:

```json
{
  "name": "API Key cho dự án Mobile App",
  "description": "Sử dụng cho các API call từ ứng dụng di động iOS và Android."
}
```

- **Constraints**: 
    - `name` là tùy chọn, nếu được cung cấp phải là chuỗi không rỗng.
    - `description` là tùy chọn, nếu được cung cấp phải là chuỗi không rỗng.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `apiKeyId` có hợp lệ và thuộc về người dùng hiện tại không.
- Cập nhật tên và/hoặc mô tả của API key trong cơ sở dữ liệu.
- Ghi log hoạt động cập nhật API key.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin cập nhật của API key:

```json
{
  "apiKeyId": "uuid-cua-api-key",
  "name": "API Key cho dự án Mobile App",
  "description": "Sử dụng cho các API call từ ứng dụng di động iOS và Android.",
  "last4Chars": "abcd",
  "createdAt": "2023-01-01T00:00:00Z",
  "updatedAt": "2023-07-16T08:00:00Z"
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu API key không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy API key với `apiKeyId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

