
# UC103: Tham gia developer community

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) truy cập và tham gia vào cộng đồng phát triển của hệ thống (ví dụ: diễn đàn, kênh Slack, nhóm Discord). Điều này cung cấp một không gian để người dùng có thể đặt câu hỏi, chia sẻ kiến thức, thảo luận về các vấn đề kỹ thuật, và kết nối với các nhà phát triển khác.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Cộng đồng phát triển phải được thiết lập và có sẵn các nền tảng (diễn đàn, chat).

## 3. Định nghĩa Endpoint

Chức năng này thường là một liên kết dẫn người dùng đến nền tảng cộng đồng bên ngoài. Tuy nhiên, có thể có một endpoint để lấy thông tin về các kênh cộng đồng hoặc để tự động đăng nhập (SSO) vào nền tảng đó.

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/community-links`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy danh sách các liên kết và thông tin về cộng đồng.
- Trả về các liên kết này cho người dùng.
- Ghi log hoạt động truy cập cộng đồng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các liên kết cộng đồng:

```json
{
  "communityLinks": [
    {
      "name": "Diễn đàn hỗ trợ",
      "url": "https://forum.example.com",
      "description": "Nơi đặt câu hỏi và tìm kiếm giải pháp từ cộng đồng."
    },
    {
      "name": "Kênh Slack Developer",
      "url": "https://slack.example.com/join/developer-channel",
      "description": "Trò chuyện trực tiếp với các nhà phát triển khác và đội ngũ hỗ trợ."
    },
    {
      "name": "GitHub Discussions",
      "url": "https://github.com/your-org/your-repo/discussions",
      "description": "Thảo luận về các tính năng mới và đóng góp mã nguồn."
    }
  ]
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

