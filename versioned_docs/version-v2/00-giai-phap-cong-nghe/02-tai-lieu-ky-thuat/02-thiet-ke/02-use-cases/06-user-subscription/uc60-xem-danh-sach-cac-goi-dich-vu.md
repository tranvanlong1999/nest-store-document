
# UC60: Xem danh sách các gói dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng đã đăng nhập xem danh sách tất cả các gói dịch vụ (plans) mà hệ thống cung cấp, bao gồm gói Free, Trial, Premium, Enterprise. Thông tin hiển thị bao gồm tên gói, mô tả, giá cả, chu kỳ thanh toán, và các tính năng chính.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống.
- Hệ thống phải có ít nhất một gói dịch vụ được định nghĩa.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/plans`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Truy vấn cơ sở dữ liệu để lấy danh sách các gói dịch vụ đang hoạt động và có sẵn cho người dùng.
- Trả về thông tin chi tiết của các gói dịch vụ.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa danh sách các đối tượng gói dịch vụ:

```json
[
  {
    "planId": "uuid-cua-plan-free",
    "planName": "Free",
    "description": "Gói miễn phí với các tính năng cơ bản.",
    "price": 0,
    "billingCycle": "NONE",
    "features": ["Basic STT", "Limited eKYC"],
    "quotas": [
      {
        "serviceId": "uuid-cua-service-stt",
        "limit": 1000,
        "unit": "seconds"
      }
    ]
  },
  {
    "planId": "uuid-cua-plan-premium",
    "planName": "Premium",
    "description": "Gói cao cấp với nhiều tính năng và quota lớn.",
    "price": 99.99,
    "billingCycle": "MONTHLY",
    "features": ["Advanced STT", "Full eKYC", "Priority Support"],
    "quotas": [
      {
        "serviceId": "uuid-cua-service-stt",
        "limit": 100000,
        "unit": "seconds"
      },
      {
        "serviceId": "uuid-cua-service-ekyc",
        "limit": 5000,
        "unit": "transactions"
      }
    ]
  }
]
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

