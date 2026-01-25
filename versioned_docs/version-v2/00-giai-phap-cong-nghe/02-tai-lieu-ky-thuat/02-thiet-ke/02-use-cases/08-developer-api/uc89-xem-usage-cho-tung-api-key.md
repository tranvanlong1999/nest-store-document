
# UC89: Xem usage cho từng API key

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Developer) xem chi tiết mức độ sử dụng (usage) của từng API key riêng lẻ. Điều này bao gồm số lượng yêu cầu API, thời gian sử dụng dịch vụ, và các chỉ số khác liên quan đến từng key. Việc theo dõi usage theo từng API key giúp người dùng hiểu rõ hơn về cách các ứng dụng hoặc dự án khác nhau đang tiêu thụ tài nguyên và quản lý chi phí hiệu quả.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- API key cần xem usage phải tồn tại và thuộc về người dùng.
- Hệ thống phải có dữ liệu usage được thu thập và lưu trữ cho từng API key.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/developer/api-keys/{apiKeyId}/usage`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `apiKeyId` (UUID) - ID của API key cần xem usage.
- **Query Parameters (tùy chọn)**:
    - `startDate`: (Date) Ngày bắt đầu để lọc dữ liệu (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc dữ liệu (format: YYYY-MM-DD).
    - `interval`: (String) Khoảng thời gian tổng hợp dữ liệu (ví dụ: `DAILY`, `WEEKLY`, `MONTHLY`). Mặc định là `DAILY`.
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `apiKeyId` có hợp lệ và thuộc về người dùng hiện tại không.
- Truy vấn `Usage & Quota Service` để lấy dữ liệu usage cho API key được chỉ định, dựa trên các tham số lọc.
- Tổng hợp dữ liệu theo `interval` được yêu cầu.
- Trả về dữ liệu usage đã được phân trang và sắp xếp.
- Ghi log hoạt động xem usage của API key.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa dữ liệu usage của API key và thông tin phân trang:

```json
{
  "apiKeyId": "uuid-cua-api-key",
  "content": [
    {
      "period": "2023-07-10", // Hoặc "2023-W28", "2023-07"
      "serviceId": "uuid-cua-service-stt",
      "serviceName": "Speech To Text",
      "used": 1500,
      "unit": "seconds",
      "limit": 100000
    },
    {
      "period": "2023-07-10",
      "serviceId": "uuid-cua-service-ekyc",
      "serviceName": "eKYC",
      "used": 50,
      "unit": "transactions",
      "limit": 5000
    }
  ],
  "page": 1,
  "size": 20,
  "totalElements": 30,
  "totalPages": 2
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu tham số đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu API key không thuộc về người dùng hiện tại.
    - `404 Not Found`: Nếu không tìm thấy API key với `apiKeyId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

