
# UC102: Xem knowledge base

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) truy cập và tìm kiếm trong cơ sở tri thức (knowledge base) của hệ thống. Cơ sở tri thức chứa các bài viết hướng dẫn, câu hỏi thường gặp (FAQ), giải pháp cho các vấn đề phổ biến, và các tài liệu kỹ thuật khác. Điều này giúp người dùng tự tìm kiếm thông tin và giải quyết vấn đề một cách nhanh chóng.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Cơ sở tri thức phải được xây dựng và có sẵn các bài viết.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/support/knowledge-base`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `query`: (String) Từ khóa tìm kiếm.
    - `category`: (String) Lọc theo danh mục (ví dụ: `API Integration`, `Troubleshooting`, `Billing`).
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu hoặc dịch vụ tìm kiếm của knowledge base để lấy các bài viết phù hợp với các tham số lọc.
- Áp dụng phân trang và sắp xếp kết quả.
- Trả về danh sách các bài viết.
- Ghi log hoạt động xem knowledge base.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các bài viết và thông tin phân trang:

```json
{
  "content": [
    {
      "articleId": "kb_uuid_1",
      "title": "Hướng dẫn tích hợp Speech To Text API",
      "category": "API Integration",
      "summary": "Bài viết này hướng dẫn chi tiết cách tích hợp Speech To Text API vào ứng dụng của bạn.",
      "url": "https://docs.example.com/kb/stt-integration",
      "lastUpdated": "2023-07-10T10:00:00Z"
    },
    {
      "articleId": "kb_uuid_2",
      "title": "FAQ: Lỗi 401 Unauthorized khi gọi API",
      "category": "Troubleshooting",
      "summary": "Giải đáp các nguyên nhân phổ biến và cách khắc phục lỗi 401 Unauthorized.",
      "url": "https://docs.example.com/kb/401-error-faq",
      "lastUpdated": "2023-07-05T14:30:00Z"
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 15,
  "totalPages": 1
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

