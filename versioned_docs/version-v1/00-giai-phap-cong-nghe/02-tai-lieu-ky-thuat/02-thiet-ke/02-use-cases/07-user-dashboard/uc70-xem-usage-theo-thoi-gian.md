
# UC70: Xem usage theo thời gian

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem chi tiết mức độ sử dụng (usage) của họ cho từng dịch vụ theo các khoảng thời gian khác nhau (ví dụ: hàng ngày, hàng tuần, hàng tháng). Điều này giúp người dùng theo dõi việc tiêu thụ quota của mình và quản lý chi phí hiệu quả.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống phải có dữ liệu usage của người dùng được thu thập và lưu trữ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/users/usage`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Query Parameters (tùy chọn)**:
    - `serviceId`: (UUID) Lọc usage theo dịch vụ cụ thể.
    - `startDate`: (Date) Ngày bắt đầu để lọc dữ liệu (format: YYYY-MM-DD).
    - `endDate`: (Date) Ngày kết thúc để lọc dữ liệu (format: YYYY-MM-DD).
    - `interval`: (String) Khoảng thời gian tổng hợp dữ liệu (ví dụ: `DAILY`, `WEEKLY`, `MONTHLY`). Mặc định là `DAILY`.
    - `page`: (Integer) Số trang (mặc định 1).
    - `size`: (Integer) Số lượng bản ghi trên mỗi trang (mặc định 20).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn `Usage & Quota Service` để lấy dữ liệu usage của người dùng dựa trên các tham số lọc.
- Tổng hợp dữ liệu theo `interval` được yêu cầu.
- Trả về dữ liệu usage đã được phân trang và sắp xếp.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa dữ liệu usage của người dùng và thông tin phân trang:

```json
{
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
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

