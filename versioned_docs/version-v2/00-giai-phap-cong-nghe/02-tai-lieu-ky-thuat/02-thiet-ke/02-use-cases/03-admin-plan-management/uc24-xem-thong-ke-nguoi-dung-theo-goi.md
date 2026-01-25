
# UC24: Xem thống kê người dùng theo gói

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xem thống kê số lượng người dùng đang sử dụng từng gói dịch vụ. Điều này giúp Admin đánh giá mức độ phổ biến của các gói, theo dõi sự tăng trưởng người dùng, và đưa ra các quyết định kinh doanh liên quan đến gói dịch vụ.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng thống kê.
- Hệ thống phải có dữ liệu về các gói dịch vụ và người dùng đăng ký.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/plans/statistics/users`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào cụ thể. Có thể có các tham số tùy chọn để lọc theo thời gian hoặc trạng thái gói (ví dụ: `activeOnly=true`).

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn cơ sở dữ liệu để đếm số lượng người dùng đang hoạt động cho mỗi gói dịch vụ.
- Tổng hợp dữ liệu và trả về kết quả thống kê.
- Ghi log hoạt động truy cập thống kê của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa thống kê số lượng người dùng cho mỗi gói dịch vụ:

```json
[
  {
    "planId": "uuid-cua-plan-free",
    "planName": "Free",
    "activeUsers": 15000,
    "totalUsers": 20000
  },
  {
    "planId": "uuid-cua-plan-premium",
    "planName": "Premium",
    "activeUsers": 2500,
    "totalUsers": 3000
  },
  {
    "planId": "uuid-cua-plan-enterprise",
    "planName": "Enterprise",
    "activeUsers": 50,
    "totalUsers": 50
  }
]
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

