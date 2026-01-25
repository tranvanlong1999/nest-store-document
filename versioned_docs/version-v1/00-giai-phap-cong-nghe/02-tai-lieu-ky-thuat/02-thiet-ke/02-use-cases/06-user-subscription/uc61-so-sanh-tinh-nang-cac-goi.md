
# UC61: So sánh tính năng các gói

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem bảng so sánh chi tiết các tính năng, hạn ngạch và giá cả giữa các gói dịch vụ khác nhau. Điều này giúp người dùng đưa ra quyết định sáng suốt về gói dịch vụ phù hợp nhất với nhu cầu của họ.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống phải có ít nhất hai gói dịch vụ để so sánh.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/plans/compare`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy thông tin chi tiết của tất cả các gói dịch vụ có sẵn.
- Tổng hợp thông tin về tính năng, giá cả, và quota của từng gói.
- Trả về dữ liệu đã được cấu trúc để dễ dàng hiển thị dưới dạng bảng so sánh.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa thông tin so sánh các gói dịch vụ:

```json
{
  "comparisonTable": {
    "headers": ["Tính năng", "Free", "Premium", "Enterprise"],
    "rows": [
      {
        "feature": "Speech To Text (giây/tháng)",
        "Free": "1,000",
        "Premium": "100,000",
        "Enterprise": "Không giới hạn"
      },
      {
        "feature": "eKYC (giao dịch/tháng)",
        "Free": "10",
        "Premium": "5,000",
        "Enterprise": "Không giới hạn"
      },
      {
        "feature": "Hỗ trợ",
        "Free": "Email",
        "Premium": "Email & Chat",
        "Enterprise": "Hỗ trợ 24/7"
      },
      {
        "feature": "Giá (tháng)",
        "Free": "Miễn phí",
        "Premium": "$99.99",
        "Enterprise": "Liên hệ"
      }
    ]
  }
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

