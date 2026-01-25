
# UC146: Monitor system health and performance

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả việc giám sát liên tục tình trạng sức khỏe và hiệu suất của toàn bộ hệ thống, bao gồm các microservice, cơ sở dữ liệu, hàng đợi tin nhắn, và hạ tầng. Mục tiêu là phát hiện sớm các vấn đề, cảnh báo khi có sự cố, và thu thập dữ liệu để phân tích xu hướng và tối ưu hóa hệ thống.

## 2. Tiền xử lý

- Các công cụ giám sát (monitoring tools) phải được triển khai và cấu hình (ví dụ: Prometheus, Grafana, ELK Stack, Datadog).
- Các microservice và thành phần hạ tầng phải được cấu hình để xuất các chỉ số (metrics) và log.

## 3. Định nghĩa Endpoint

Đây là một chức năng nội bộ của hệ thống giám sát, thường không có endpoint API công khai cho người dùng cuối. Tuy nhiên, các công cụ giám sát có thể cung cấp API để truy vấn dữ liệu hoặc cấu hình cảnh báo.

- **HTTP Method**: `GET`
- **URL**: `/internal/metrics` (Endpoint để các công cụ giám sát thu thập metrics)
- **URL**: `/internal/health` (Endpoint để kiểm tra tình trạng sức khỏe của service)
- **Authentication**: Yêu cầu xác thực nội bộ.

## 4. Yêu cầu đầu vào

Không có yêu cầu đầu vào trực tiếp từ người dùng. Dữ liệu được thu thập tự động bởi các công cụ giám sát.

## 5. Hậu xử lý

- **Thu thập Metrics**: Các microservice và thành phần hệ thống định kỳ xuất các chỉ số về CPU, RAM, disk I/O, network I/O, số lượng request, thời gian phản hồi, tỷ lệ lỗi, v.v.
- **Thu thập Logs**: Các microservice gửi log đến hệ thống log tập trung.
- **Kiểm tra Health**: Các công cụ giám sát định kỳ gọi endpoint `/health` của từng service để kiểm tra tình trạng hoạt động.
- **Lưu trữ và Phân tích**: Dữ liệu metrics và logs được lưu trữ trong các hệ thống chuyên dụng và được phân tích để tạo ra các biểu đồ, dashboard.
- **Cảnh báo**: Khi các chỉ số vượt quá ngưỡng định trước (ví dụ: CPU > 80%, tỷ lệ lỗi > 5%), hệ thống sẽ gửi cảnh báo đến đội ngũ vận hành (qua email, Slack, PagerDuty).

## 6. Yêu cầu đầu ra

Không có yêu cầu đầu ra trực tiếp cho người dùng cuối. Kết quả được hiển thị trên các dashboard giám sát và thông báo qua hệ thống cảnh báo.

- **Metrics Endpoint Response (ví dụ)**:

```
# HELP http_requests_total Total number of HTTP requests.
# TYPE http_requests_total counter
http_requests_total{method="get",path="/users"} 1234
http_requests_total{method="post",path="/users"} 567

# HELP jvm_memory_used_bytes Current memory usage of the JVM.
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes 1.5e+09
```

- **Health Endpoint Response (ví dụ)**:

```json
{
  "status": "UP",
  "components": {
    "database": {
      "status": "UP",
      "details": {
        "database": "PostgreSQL",
        "version": "14.5"
      }
    },
    "kafka": {
      "status": "UP",
      "details": {
        "brokers": "kafka-1:9092"
      }
    },
    "redis": {
      "status": "UP",
      "details": {
        "version": "6.2.6"
      }
    }
  }
}
```

- **Trường hợp lỗi**: 
    - Các thành phần hệ thống không phản hồi.
    - Các chỉ số vượt ngưỡng cảnh báo.

