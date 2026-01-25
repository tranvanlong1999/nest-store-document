
# UC40: Theo dõi health check các microservices

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) theo dõi trạng thái sức khỏe (health check) của từng microservice trong hệ thống. Điều này bao gồm việc kiểm tra xem mỗi dịch vụ có đang hoạt động bình thường hay không, có phản hồi các yêu cầu hay không, và các phụ thuộc của nó (ví dụ: cơ sở dữ liệu, Kafka) có ổn định không. Theo dõi health check là rất quan trọng để đảm bảo tính sẵn sàng và độ tin cậy của hệ thống.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền truy cập chức năng giám sát hệ thống.
- Mỗi microservice phải có một endpoint health check được cấu hình và hoạt động.
- Hệ thống giám sát phải được thiết lập để thu thập dữ liệu health check từ các microservice.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/system/health`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

Không có tham số đầu vào.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và quyền của Admin.
- Truy vấn các hệ thống giám sát (ví dụ: Prometheus, Kubernetes Health Checks) để lấy trạng thái health check của tất cả các microservice.
- Tổng hợp thông tin và trả về trạng thái tổng quan.
- Ghi log hoạt động truy cập health check của Admin.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa trạng thái health check của từng microservice:

```json
{
  "overallStatus": "HEALTHY", // HEALTHY, DEGRADED, UNHEALTHY
  "services": [
    {
      "serviceName": "Auth Service",
      "status": "UP",
      "lastChecked": "2023-07-16T00:05:00Z",
      "details": {
        "database": "UP",
        "redis": "UP"
      }
    },
    {
      "serviceName": "Payment Service",
      "status": "DEGRADED",
      "lastChecked": "2023-07-16T00:04:00Z",
      "details": {
        "database": "UP",
        "external_payment_gateway": "DOWN"
      }
    },
    {
      "serviceName": "STT Service",
      "status": "UP",
      "lastChecked": "2023-07-16T00:05:00Z",
      "details": {
        "kafka": "UP"
      }
    }
  ]
}
```

- **Trường hợp lỗi**: 
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối với hệ thống giám sát).

