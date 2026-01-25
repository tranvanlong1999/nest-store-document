# Tài liệu Sizing hệ thống

## Giới thiệu

Tài liệu này cung cấp ước tính về tài nguyên cần thiết để triển khai và vận hành hệ thống SaaS quản lý dịch vụ, dựa trên kiến trúc microservice đã đề xuất. Mục tiêu của sizing là đảm bảo hệ thống có đủ khả năng xử lý tải trọng dự kiến, duy trì hiệu suất ổn định và có khả năng mở rộng trong tương lai. Các ước tính này sẽ là cơ sở để lập kế hoạch hạ tầng và chi phí.

## 1. Các giả định và thông số đầu vào

Để thực hiện sizing hệ thống, chúng ta cần đưa ra một số giả định về tải trọng và hành vi của người dùng. Các con số này có thể được điều chỉnh dựa trên dữ liệu thực tế sau khi hệ thống đi vào hoạt động.

### 1.1. Giả định về người dùng và tải trọng

- **Tổng số người dùng đăng ký (Registered Users)**: 1,000,000
- **Người dùng hoạt động hàng ngày (Daily Active Users - DAU)**: 100,000 (10% tổng số người dùng)
- **Người dùng hoạt động đồng thời (Concurrent Users - CU)**: 10,000 (10% DAU, dựa trên mô hình 10% DAU hoạt động đồng thời trong giờ cao điểm)
- **Tỷ lệ yêu cầu trung bình mỗi giây (Average Requests Per Second - RPS) mỗi người dùng**: 0.5 RPS (mỗi người dùng thực hiện trung bình 0.5 yêu cầu mỗi giây khi hoạt động)
- **Tỷ lệ yêu cầu API từ Developer**: 50% tổng số yêu cầu (giả định các dịch vụ AI/ML sẽ được sử dụng nhiều)
- **Tỷ lệ đọc/ghi (Read/Write Ratio)**: 80% đọc, 20% ghi (hệ thống SaaS thường có nhiều truy vấn hơn ghi dữ liệu)
- **Kích thước dữ liệu trung bình mỗi giao dịch**: 1KB (đối với các giao dịch thông thường như đăng nhập, xem thông tin), 10KB (đối với các giao dịch phức tạp như tạo API Key, cập nhật gói), 100KB (đối với các giao dịch liên quan đến log usage).
- **Thời gian lưu trữ log usage**: 1 năm
- **Thời gian phản hồi mục tiêu (Target Latency)**: < 200ms cho 95% yêu cầu
- **Thời gian hoạt động mục tiêu (Target Uptime)**: 99.9% (tối đa 8.76 giờ downtime mỗi năm)

### 1.2. Tính toán tải trọng tổng thể

- **Tổng số yêu cầu trung bình mỗi giây (Total Average RPS)**:
    `CU * RPS mỗi người dùng = 10,000 * 0.5 = 5,000 RPS`
- **Tổng số yêu cầu trong giờ cao điểm (Peak RPS)**: Giả định gấp 2 lần Average RPS
    `5,000 RPS * 2 = 10,000 RPS`

Chúng ta sẽ sử dụng **Peak RPS = 10,000** làm cơ sở để tính toán tài nguyên cho các thành phần xử lý yêu cầu.

## 2. Sizing các thành phần chính

### 2.1. API Gateway

API Gateway là điểm vào duy nhất của hệ thống, chịu trách nhiệm xử lý tất cả các yêu cầu đến. Nó cần có khả năng xử lý số lượng kết nối lớn và định tuyến hiệu quả.

- **Tải trọng dự kiến**: 10,000 RPS (Peak)
- **Yêu cầu CPU/Memory**: API Gateway thường nhẹ về CPU nhưng cần đủ bộ nhớ để quản lý kết nối và cấu hình định tuyến.
- **Ước tính**: 
    - Mỗi instance có thể xử lý khoảng 2,000 - 3,000 RPS (tùy thuộc vào độ phức tạp của các filter/plugin).
    - Cần ít nhất `10,000 / 2,500 = 4` instances.
    - Để đảm bảo khả năng chịu lỗi (High Availability) và mở rộng, nên có ít nhất 2 instance chạy trên các node khác nhau và sử dụng Horizontal Pod Autoscaler (HPA) trong Kubernetes.
- **Tài nguyên đề xuất cho mỗi instance**: 
    - **CPU**: 1 vCPU
    - **Memory**: 2GB
- **Tổng tài nguyên cho API Gateway**: 
    - **CPU**: 4 vCPU
    - **Memory**: 8GB

### 2.2. Core Microservices (Auth, User, Service Catalog, Plan Management, Subscription, API Key)

Các dịch vụ này xử lý các nghiệp vụ cốt lõi, thường có tương tác với cơ sở dữ liệu PostgreSQL.

- **Tải trọng dự kiến**: Tổng cộng 10,000 RPS (phân bổ cho các dịch vụ).
    - Giả định mỗi dịch vụ xử lý trung bình 1,000 - 2,000 RPS trong giờ cao điểm.
- **Yêu cầu CPU/Memory**: Phụ thuộc vào độ phức tạp của logic nghiệp vụ và số lượng truy vấn DB.
- **Ước tính**: 
    - Mỗi instance của một microservice Spring Boot có thể xử lý khoảng 500 - 1,000 RPS (tùy thuộc vào logic).
    - Cần ít nhất 2-3 instances cho mỗi dịch vụ để đảm bảo HA và khả năng mở rộng.
- **Tài nguyên đề xuất cho mỗi instance**: 
    - **CPU**: 2 vCPU
    - **Memory**: 4GB
- **Tổng tài nguyên cho 6 dịch vụ core (giả định 3 instances/dịch vụ)**:
    - **CPU**: `6 * 3 * 2 = 36 vCPU`
    - **Memory**: `6 * 3 * 4 = 72GB`

### 2.3. Payment Service

Dịch vụ này xử lý các giao dịch thanh toán, có thể có ít yêu cầu hơn nhưng yêu cầu độ tin cậy cao.

- **Tải trọng dự kiến**: 100 RPS (Peak, giả định 1% tổng số yêu cầu là giao dịch thanh toán)
- **Ước tính**: 2 instances.
- **Tài nguyên đề xuất cho mỗi instance**: 
    - **CPU**: 1 vCPU
    - **Memory**: 2GB
- **Tổng tài nguyên**: 
    - **CPU**: 2 vCPU
    - **Memory**: 4GB

### 2.4. Quota & Usage Service

Dịch vụ này xử lý dữ liệu usage real-time, có thể yêu cầu nhiều tài nguyên Redis.

- **Tải trọng dự kiến**: 10,000 RPS (mỗi yêu cầu API đều cần kiểm tra quota và ghi usage).
- **Ước tính**: 4 instances.
- **Tài nguyên đề xuất cho mỗi instance**: 
    - **CPU**: 2 vCPU
    - **Memory**: 8GB (do tương tác nhiều với Redis và xử lý dữ liệu lớn)
- **Tổng tài nguyên**: 
    - **CPU**: 8 vCPU
    - **Memory**: 32GB

### 2.5. Notification Service

Dịch vụ này xử lý các thông báo, thường là bất đồng bộ qua Kafka.

- **Tải trọng dự kiến**: 1,000 thông báo/giây (Peak, giả định 10% tổng số yêu cầu tạo ra thông báo).
- **Ước tính**: 2 instances.
- **Tài nguyên đề xuất cho mỗi instance**: 
    - **CPU**: 1 vCPU
    - **Memory**: 2GB
- **Tổng tài nguyên**: 
    - **CPU**: 2 vCPU
    - **Memory**: 4GB

### 2.6. Reporting Service

Dịch vụ này thường chạy các truy vấn phức tạp, có thể yêu cầu nhiều CPU/Memory khi tạo báo cáo lớn.

- **Tải trọng dự kiến**: Ít yêu cầu hơn nhưng nặng hơn (ví dụ: 10 RPS cho các truy vấn báo cáo).
- **Ước tính**: 2 instances.
- **Tài nguyên đề xuất cho mỗi instance**: 
    - **CPU**: 4 vCPU
    - **Memory**: 8GB
- **Tổng tài nguyên**: 
    - **CPU**: 8 vCPU
    - **Memory**: 16GB

### 2.7. Background Job Service

Các tác vụ nền, có thể chạy theo lịch hoặc kích hoạt bởi sự kiện.

- **Tải trọng dự kiến**: Thay đổi theo tác vụ.
- **Ước tính**: 2 instances.
- **Tài nguyên đề xuất cho mỗi instance**: 
    - **CPU**: 2 vCPU
    - **Memory**: 4GB
- **Tổng tài nguyên**: 
    - **CPU**: 4 vCPU
    - **Memory**: 8GB

### 2.8. Third-Party Service Adapter

Chỉ là lớp trung gian, tài nguyên phụ thuộc vào số lượng yêu cầu đến các dịch vụ bên ngoài.

- **Tải trọng dự kiến**: 5,000 RPS (giả định 50% tổng số yêu cầu đi qua adapter).
- **Ước tính**: 4 instances.
- **Tài nguyên đề xuất cho mỗi instance**: 
    - **CPU**: 1 vCPU
    - **Memory**: 2GB
- **Tổng tài nguyên**: 
    - **CPU**: 4 vCPU
    - **Memory**: 8GB

### 2.9. Logging & Monitoring Service (ELK Stack / Prometheus & Grafana)

Các thành phần này thường chạy trên các máy chủ riêng hoặc các node Kubernetes chuyên dụng.

- **Tải trọng dự kiến**: Thu thập log và metrics từ tất cả các microservice (khoảng 10,000 log entries/giây, 1,000 metrics/giây).
- **Ước tính**: 
    - **Elasticsearch**: 3 node (master-eligible, data nodes).
    - **Logstash**: 2 instances.
    - **Kibana**: 1 instance.
    - **Prometheus**: 1 instance.
    - **Grafana**: 1 instance.
- **Tài nguyên đề xuất**: 
    - **Elasticsearch Node**: 4 vCPU, 16GB Memory (mỗi node)
    - **Logstash Instance**: 2 vCPU, 4GB Memory (mỗi instance)
    - **Kibana Instance**: 2 vCPU, 4GB Memory
    - **Prometheus Instance**: 2 vCPU, 4GB Memory
    - **Grafana Instance**: 1 vCPU, 2GB Memory
- **Tổng tài nguyên**: 
    - **CPU**: `3*4 + 2*2 + 2 + 2 + 1 = 12 + 4 + 2 + 2 + 1 = 21 vCPU`
    - **Memory**: `3*16 + 2*4 + 4 + 4 + 2 = 48 + 8 + 4 + 4 + 2 = 66GB`

## 3. Sizing Cơ sở dữ liệu

### 3.1. PostgreSQL

PostgreSQL là cơ sở dữ liệu chính cho hầu hết các microservice. Sizing phụ thuộc vào kích thước dữ liệu, số lượng giao dịch và IOPS.

- **Dữ liệu người dùng**: 1,000,000 người dùng * ~1KB/người dùng = 1GB
- **Dữ liệu dịch vụ/gói**: Nhỏ, vài MB.
- **Dữ liệu đăng ký/thanh toán**: 1,000,000 đăng ký * ~0.5KB/đăng ký = 0.5GB
- **Dữ liệu API Keys**: 1,000,000 keys * ~0.5KB/key = 0.5GB
- **Dữ liệu Usage Logs**: Đây là phần lớn nhất. Với 10,000 RPS và lưu trữ 1 năm:
    - `10,000 requests/sec * 60 sec/min * 60 min/hr * 24 hr/day * 365 days/year = 315,360,000,000 requests/year`
    - Giả định mỗi log entry là 100KB (bao gồm payload): `315,360,000,000 * 100KB = 31,536,000,000 GB = 31,536 TB` (Con số này là quá lớn và không thực tế cho một hệ thống SaaS thông thường. Cần điều chỉnh giả định về kích thước log hoặc cách lưu trữ log usage).

**Điều chỉnh giả định về Usage Logs**: 
- Thay vì lưu trữ toàn bộ request/response payload trong `USAGE_LOGS` cho mục đích sizing, chúng ta sẽ chỉ lưu trữ các metadata cần thiết cho việc tính toán quota và báo cáo. Payload đầy đủ sẽ được xử lý bởi Logging Service.
- Giả định mỗi log entry cho mục đích quota/báo cáo là 1KB.
- `10,000 requests/sec * 60 sec/min * 60 min/hr * 24 hr/day * 365 days/year * 1KB/request = 315,360 GB = 315.36 TB` (Vẫn còn rất lớn).

**Điều chỉnh tiếp**: `USAGE_LOGS` sẽ chỉ lưu trữ các bản ghi tổng hợp (aggregated logs) hoặc các bản ghi quan trọng. Các log chi tiết sẽ được đẩy vào hệ thống Logging & Monitoring (ELK Stack).
- Giả định chỉ 1% số request được ghi vào `USAGE_LOGS` chi tiết cho mục đích audit hoặc các use case đặc biệt, còn lại là tổng hợp.
- `10,000 RPS * 0.01 = 100 RPS` (cho detailed usage logs)
- `100 requests/sec * 60 sec/min * 60 min/hr * 24 hr/day * 365 days/year * 1KB/request = 3.15 TB/năm`
- Tổng dữ liệu PostgreSQL (không bao gồm log chi tiết): `1GB (users) + 0.5GB (subscriptions) + 0.5GB (api keys) + 3.15TB (usage logs) = ~3.15 TB`

- **IOPS (Input/Output Operations Per Second)**: 
    - Đọc: 80% * 10,000 RPS = 8,000 IOPS
    - Ghi: 20% * 10,000 RPS = 2,000 IOPS
    - Tổng: 10,000 IOPS (Peak)

- **Ước tính**: 
    - Cần một cụm PostgreSQL với ít nhất 1 master và 2 replica (cho HA và đọc).
    - Sử dụng ổ cứng SSD hiệu năng cao.
- **Tài nguyên đề xuất cho mỗi node PostgreSQL**: 
    - **CPU**: 8 vCPU
    - **Memory**: 32GB
    - **Storage**: 5TB SSD (có thể mở rộng)
- **Tổng tài nguyên cho PostgreSQL (3 nodes)**:
    - **CPU**: 24 vCPU
    - **Memory**: 96GB
    - **Storage**: 15TB SSD

### 3.2. Redis

Redis được sử dụng cho caching, session, rate limiting và usage real-time. Yêu cầu về memory là chính.

- **Dữ liệu cache**: Thay đổi tùy theo kích thước cache.
- **Dữ liệu session**: 10,000 concurrent users * ~1KB/session = 10MB
- **Dữ liệu rate limit/quota**: Nhỏ, vài MB.
- **Dữ liệu usage real-time**: Có thể lên đến vài GB tùy thuộc vào granularity và thời gian lưu trữ.
- **Ước tính**: Cần một cụm Redis Cluster hoặc Master-Replica.
- **Tài nguyên đề xuất cho mỗi instance Redis**: 
    - **CPU**: 2 vCPU
    - **Memory**: 16GB
- **Tổng tài nguyên cho Redis (3 instances)**:
    - **CPU**: 6 vCPU
    - **Memory**: 48GB

### 3.3. Kafka Cluster

Kafka được sử dụng làm message broker cho các sự kiện bất đồng bộ. Sizing phụ thuộc vào throughput (số lượng tin nhắn/giây) và thời gian lưu trữ tin nhắn.

- **Throughput dự kiến**: 10,000 messages/giây (tương đương Peak RPS).
- **Kích thước tin nhắn trung bình**: 1KB.
- **Thời gian lưu trữ tin nhắn**: 7 ngày.
- **Dung lượng lưu trữ cần thiết**: 
    - `10,000 messages/sec * 1KB/message * 60 sec/min * 60 min/hr * 24 hr/day * 7 days = 6,048 GB = ~6TB`
- **Ước tính**: Cần một cụm Kafka với ít nhất 3 broker để đảm bảo HA và phân tán tải.
- **Tài nguyên đề xuất cho mỗi Kafka Broker**: 
    - **CPU**: 4 vCPU
    - **Memory**: 16GB
    - **Storage**: 2TB SSD (cho logs Kafka)
- **Tổng tài nguyên cho Kafka (3 brokers)**:
    - **CPU**: 12 vCPU
    - **Memory**: 48GB
    - **Storage**: 6TB SSD

## 4. Tổng hợp tài nguyên ước tính

Bảng dưới đây tổng hợp tài nguyên ước tính cho toàn bộ hệ thống:

| Thành phần | Số lượng Instance | CPU (vCPU) | Memory (GB) | Storage (TB) | Ghi chú |
|---|---|---|---|---|---|
| API Gateway | 4 | 4 | 8 | - | | 
| Core Microservices | 18 (6 services * 3 instances) | 36 | 72 | - | | 
| Payment Service | 2 | 2 | 4 | - | | 
| Quota & Usage Service | 4 | 8 | 32 | - | | 
| Notification Service | 2 | 2 | 4 | - | | 
| Reporting Service | 2 | 8 | 16 | - | | 
| Background Job Service | 2 | 4 | 8 | - | | 
| Third-Party Service Adapter | 4 | 4 | 8 | - | | 
| **Tổng Microservices** | **38** | **68** | **152** | **-** | | 
| PostgreSQL Cluster | 3 nodes | 24 | 96 | 15 | Bao gồm dữ liệu và log chi tiết | 
| Redis Cluster | 3 instances | 6 | 48 | - | | 
| Kafka Cluster | 3 brokers | 12 | 48 | 6 | | 
| Logging & Monitoring | 7 instances/nodes | 21 | 66 | 10 (cho ES) | Elasticsearch, Logstash, Kibana, Prometheus, Grafana | 
| **TỔNG CỘNG** | **~51** | **131** | **410** | **~31** | | 

**Lưu ý**: 
- Các con số trên là ước tính ban đầu và có thể thay đổi dựa trên kết quả kiểm thử tải (load testing) và dữ liệu sử dụng thực tế.
- Cần tính thêm tài nguyên cho Kubernetes control plane (master nodes), load balancers, và các dịch vụ hạ tầng khác.
- Storage cho Logging & Monitoring (Elasticsearch) có thể cần lớn hơn tùy thuộc vào lượng log và thời gian lưu trữ mong muốn.
- Nên có một tỷ lệ dự phòng (overhead) cho tài nguyên (ví dụ: 20-30%) để xử lý các tình huống đột biến tải hoặc sự cố.

## 5. Đề xuất hạ tầng triển khai

Với các ước tính trên, hệ thống có thể được triển khai trên các nền tảng đám mây như AWS, Google Cloud Platform (GCP) hoặc Azure, sử dụng các dịch vụ sau:

- **Kubernetes (EKS/GKE/AKS)**: Để triển khai và quản lý các microservice.
- **Managed PostgreSQL Service (RDS/Cloud SQL/Azure Database for PostgreSQL)**: Để quản lý cơ sở dữ liệu PostgreSQL.
- **Managed Redis Service (ElastiCache/Memorystore/Azure Cache for Redis)**: Để quản lý Redis.
- **Managed Kafka Service (MSK/Confluent Cloud/Azure Event Hubs for Kafka)**: Để quản lý Kafka.
- **Managed Logging & Monitoring (CloudWatch/Cloud Logging & Monitoring/Azure Monitor)** hoặc tự triển khai ELK/Prometheus trên Kubernetes.
- **Object Storage (S3/Cloud Storage/Azure Blob Storage)**: Để lưu trữ các file lớn như avatar, backup dữ liệu.

Việc sử dụng các dịch vụ Managed giúp giảm gánh nặng vận hành và đảm bảo tính sẵn sàng cao.



