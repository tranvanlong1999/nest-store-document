
# UC94: Xem code examples

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) xem các ví dụ mã nguồn (code examples) minh họa cách sử dụng các API và SDK của hệ thống. Các ví dụ này bao gồm các đoạn mã cho các ngôn ngữ lập trình phổ biến, giúp người dùng nhanh chóng hiểu và tích hợp các chức năng vào ứng dụng của họ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Các ví dụ mã nguồn phải được lưu trữ và có thể truy cập được.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/code-examples`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `serviceId`: (UUID) Lọc ví dụ theo dịch vụ cụ thể.
    - `language`: (String) Lọc ví dụ theo ngôn ngữ lập trình (ví dụ: `java`, `python`, `nodejs`).
    - `topic`: (String) Lọc ví dụ theo chủ đề (ví dụ: `authentication`, `stt-streaming`).
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu hoặc kho lưu trữ ví dụ mã nguồn để lấy các ví dụ phù hợp với các tham số lọc.
- Trả về danh sách các ví dụ mã nguồn.
- Ghi log hoạt động xem ví dụ mã nguồn.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách các ví dụ mã nguồn và thông tin phân trang:

```json
{
  "content": [
    {
      "exampleId": "ex_uuid_1",
      "title": "Speech To Text - Basic Usage (Python)",
      "description": "Ví dụ cơ bản về cách sử dụng API Speech To Text trong Python.",
      "serviceId": "uuid-cua-service-stt",
      "language": "python",
      "codeSnippet": """import requests\n\nurl = \"https://api.example.com/stt\"\nheaders = {\"Authorization\": \"Bearer YOUR_API_KEY\"}\nfiles = {\"audio\": open(\"audio.wav\", \"rb\")}\n\nresponse = requests.post(url, headers=headers, files=files)\nprint(response.json())""",
      "lastUpdated": "2023-07-01T10:00:00Z"
    },
    {
      "exampleId": "ex_uuid_2",
      "title": "eKYC - Face Matching (Java)",
      "description": "Ví dụ về cách thực hiện so khớp khuôn mặt trong Java.",
      "serviceId": "uuid-cua-service-ekyc",
      "language": "java",
      "codeSnippet": """// Java code snippet for eKYC face matching""",
      "lastUpdated": "2023-06-20T15:30:00Z"
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 10,
  "totalPages": 1
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

