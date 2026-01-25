# Tài liệu thiết kế cơ sở dữ liệu

## Giới thiệu

Tài liệu này mô tả chi tiết về thiết kế cơ sở dữ liệu cho hệ thống SaaS quản lý dịch vụ. Sơ đồ quan hệ thực thể (ERD) được sử dụng để trực quan hóa cấu trúc của cơ sở dữ liệu, cùng với mô tả chi tiết về từng bảng và các mối quan hệ giữa chúng.

## Sơ đồ quan hệ thực thể (ERD)

```mermaid
    erDiagram
        USERS {
            user_id UUID PK
            email VARCHAR(255) UNIQUE
            password_hash VARCHAR(255)
            full_name VARCHAR(255)
            avatar_url VARCHAR(255)
            status VARCHAR(50)
            created_at TIMESTAMP
            updated_at TIMESTAMP
        }
        ROLES {
            role_id INT PK
            role_name VARCHAR(50) UNIQUE
        }
        USER_ROLES {
            user_id UUID FK
            role_id INT FK
        }
        SERVICES {
            service_id UUID PK
            service_name VARCHAR(255)
            description TEXT
            endpoint VARCHAR(255)
            is_enabled BOOLEAN
            created_at TIMESTAMP
            updated_at TIMESTAMP
        }
        PLANS {
            plan_id UUID PK
            plan_name VARCHAR(255)
            price DECIMAL(10, 2)
            billing_cycle VARCHAR(50)
            is_active BOOLEAN
            created_at TIMESTAMP
            updated_at TIMESTAMP
        }
        PLAN_QUOTAS {
            plan_id UUID FK
            service_id UUID FK
            quota_limit INT
        }
        SUBSCRIPTIONS {
            subscription_id UUID PK
            user_id UUID FK
            plan_id UUID FK
            start_date TIMESTAMP
            end_date TIMESTAMP
            status VARCHAR(50)
            created_at TIMESTAMP
            updated_at TIMESTAMP
        }
        API_KEYS {
            api_key_id UUID PK
            user_id UUID FK
            key_hash VARCHAR(255) UNIQUE
            name VARCHAR(255)
            description TEXT
            permissions JSONB
            expiry_date TIMESTAMP
            is_active BOOLEAN
            created_at TIMESTAMP
            updated_at TIMESTAMP
        }
        USAGE_LOGS {
            log_id BIGSERIAL PK
            api_key_id UUID FK
            service_id UUID FK
            request_timestamp TIMESTAMP
            response_time_ms INT
            status_code INT
            request_payload JSONB
            response_payload JSONB
        }
        PAYMENTS {
            payment_id UUID PK
            subscription_id UUID FK
            amount DECIMAL(10, 2)
            payment_method VARCHAR(50)
            transaction_id VARCHAR(255)
            status VARCHAR(50)
            created_at TIMESTAMP
            updated_at TIMESTAMP
        }
        NOTIFICATIONS {
            notification_id UUID PK
            user_id UUID FK
            type VARCHAR(50)
            content TEXT
            is_read BOOLEAN
            created_at TIMESTAMP
        }
        USERS ||--o{ USER_ROLES : "has"
        ROLES ||--o{ USER_ROLES : "has"
        USERS ||--o{ SUBSCRIPTIONS : "has"
        PLANS ||--o{ SUBSCRIPTIONS : "has"
        USERS ||--o{ API_KEYS : "has"
        API_KEYS ||--o{ USAGE_LOGS : "has"
        SERVICES ||--o{ USAGE_LOGS : "has"
        SUBSCRIPTIONS ||--o{ PAYMENTS : "has"
        USERS ||--o{ NOTIFICATIONS : "has"
        PLANS ||--o{ PLAN_QUOTAS : "has"
        SERVICES ||--o{ PLAN_QUOTAS : "has"
    }
```

## Mô tả chi tiết các bảng

### Bảng `USERS`

Lưu trữ thông tin về tất cả người dùng trong hệ thống.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `user_id` | UUID | Khóa chính, định danh duy nhất cho mỗi người dùng | PK | |
| `email` | VARCHAR(255) | Địa chỉ email của người dùng, được sử dụng để đăng nhập | UNIQUE | |
| `password_hash` | VARCHAR(255) | Mật khẩu đã được mã hóa của người dùng | | |
| `full_name` | VARCHAR(255) | Họ và tên đầy đủ của người dùng | | |
| `avatar_url` | VARCHAR(255) | URL đến ảnh đại diện của người dùng | | |
| `status` | VARCHAR(50) | Trạng thái của tài khoản (ví dụ: active, inactive, locked) | | |
| `created_at` | TIMESTAMP | Thời gian tạo tài khoản | | |
| `updated_at` | TIMESTAMP | Thời gian cập nhật thông tin tài khoản lần cuối | | |

### Bảng `ROLES`

Lưu trữ các vai trò khác nhau trong hệ thống.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `role_id` | INT | Khóa chính, định danh duy nhất cho mỗi vai trò | PK | |
| `role_name` | VARCHAR(50) | Tên của vai trò (ví dụ: ADMIN, USER, DEVELOPER) | UNIQUE | |

### Bảng `USER_ROLES`

Bảng trung gian để quản lý mối quan hệ nhiều-nhiều giữa người dùng và vai trò.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `user_id` | UUID | Khóa ngoại, tham chiếu đến bảng `USERS` | FK | |
| `role_id` | INT | Khóa ngoại, tham chiếu đến bảng `ROLES` | FK | |

### Bảng `SERVICES`

Lưu trữ thông tin về các dịch vụ được cung cấp bởi hệ thống.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `service_id` | UUID | Khóa chính, định danh duy nhất cho mỗi dịch vụ | PK | |
| `service_name` | VARCHAR(255) | Tên của dịch vụ | | |
| `description` | TEXT | Mô tả chi tiết về dịch vụ | | |
| `endpoint` | VARCHAR(255) | URL endpoint của dịch vụ | | |
| `is_enabled` | BOOLEAN | Trạng thái của dịch vụ (đã được kích hoạt hay chưa) | | |
| `created_at` | TIMESTAMP | Thời gian tạo dịch vụ | | |
| `updated_at` | TIMESTAMP | Thời gian cập nhật thông tin dịch vụ lần cuối | | |

### Bảng `PLANS`

Lưu trữ thông tin về các gói dịch vụ.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `plan_id` | UUID | Khóa chính, định danh duy nhất cho mỗi gói dịch vụ | PK | |
| `plan_name` | VARCHAR(255) | Tên của gói dịch vụ (ví dụ: Free, Premium) | | |
| `price` | DECIMAL(10, 2) | Giá của gói dịch vụ | | |
| `billing_cycle` | VARCHAR(50) | Chu kỳ thanh toán (ví dụ: monthly, yearly) | | |
| `is_active` | BOOLEAN | Trạng thái của gói dịch vụ (còn được bán hay không) | | |
| `created_at` | TIMESTAMP | Thời gian tạo gói dịch vụ | | |
| `updated_at` | TIMESTAMP | Thời gian cập nhật thông tin gói dịch vụ lần cuối | | |

### Bảng `PLAN_QUOTAS`

Bảng trung gian để quản lý hạn ngạch (quota) của từng dịch vụ trong mỗi gói.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `plan_id` | UUID | Khóa ngoại, tham chiếu đến bảng `PLANS` | FK | |
| `service_id` | UUID | Khóa ngoại, tham chiếu đến bảng `SERVICES` | FK | |
| `quota_limit` | INT | Hạn ngạch sử dụng cho dịch vụ trong gói | | |

### Bảng `SUBSCRIPTIONS`

Lưu trữ thông tin về các đăng ký gói dịch vụ của người dùng.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `subscription_id` | UUID | Khóa chính, định danh duy nhất cho mỗi đăng ký | PK | |
| `user_id` | UUID | Khóa ngoại, tham chiếu đến bảng `USERS` | FK | |
| `plan_id` | UUID | Khóa ngoại, tham chiếu đến bảng `PLANS` | FK | |
| `start_date` | TIMESTAMP | Ngày bắt đầu đăng ký | | |
| `end_date` | TIMESTAMP | Ngày kết thúc đăng ký | | |
| `status` | VARCHAR(50) | Trạng thái của đăng ký (ví dụ: active, canceled, expired) | | |
| `created_at` | TIMESTAMP | Thời gian tạo đăng ký | | |
| `updated_at` | TIMESTAMP | Thời gian cập nhật thông tin đăng ký lần cuối | | |

### Bảng `API_KEYS`

Lưu trữ thông tin về các khóa API được tạo bởi người dùng.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `api_key_id` | UUID | Khóa chính, định danh duy nhất cho mỗi khóa API | PK | |
| `user_id` | UUID | Khóa ngoại, tham chiếu đến bảng `USERS` | FK | |
| `key_hash` | VARCHAR(255) | Khóa API đã được mã hóa | UNIQUE | |
| `name` | VARCHAR(255) | Tên của khóa API | | |
| `description` | TEXT | Mô tả về khóa API | | |
| `permissions` | JSONB | Các quyền được cấp cho khóa API | | |
| `expiry_date` | TIMESTAMP | Ngày hết hạn của khóa API | | |
| `is_active` | BOOLEAN | Trạng thái của khóa API (đang hoạt động hay không) | | |
| `created_at` | TIMESTAMP | Thời gian tạo khóa API | | |
| `updated_at` | TIMESTAMP | Thời gian cập nhật thông tin khóa API lần cuối | | |

### Bảng `USAGE_LOGS`

Lưu trữ lịch sử sử dụng API của người dùng.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `log_id` | BIGSERIAL | Khóa chính, tự động tăng | PK | |
| `api_key_id` | UUID | Khóa ngoại, tham chiếu đến bảng `API_KEYS` | FK | |
| `service_id` | UUID | Khóa ngoại, tham chiếu đến bảng `SERVICES` | FK | |
| `request_timestamp` | TIMESTAMP | Thời gian gửi yêu cầu | | |
| `response_time_ms` | INT | Thời gian phản hồi (tính bằng mili giây) | | |
| `status_code` | INT | Mã trạng thái HTTP của phản hồi | | |
| `request_payload` | JSONB | Nội dung của yêu cầu | | |
| `response_payload` | JSONB | Nội dung của phản hồi | | |

### Bảng `PAYMENTS`

Lưu trữ thông tin về các giao dịch thanh toán.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `payment_id` | UUID | Khóa chính, định danh duy nhất cho mỗi giao dịch | PK | |
| `subscription_id` | UUID | Khóa ngoại, tham chiếu đến bảng `SUBSCRIPTIONS` | FK | |
| `amount` | DECIMAL(10, 2) | Số tiền thanh toán | | |
| `payment_method` | VARCHAR(50) | Phương thức thanh toán (ví dụ: Stripe, Momo) | | |
| `transaction_id` | VARCHAR(255) | Mã giao dịch từ nhà cung cấp thanh toán | | |
| `status` | VARCHAR(50) | Trạng thái của giao dịch (ví dụ: success, failed, pending) | | |
| `created_at` | TIMESTAMP | Thời gian tạo giao dịch | | |
| `updated_at` | TIMESTAMP | Thời gian cập nhật thông tin giao dịch lần cuối | | |

### Bảng `NOTIFICATIONS`

Lưu trữ các thông báo được gửi đến người dùng.

| Tên cột | Kiểu dữ liệu | Mô tả | Khóa | Ghi chú |
|---|---|---|---|---|
| `notification_id` | UUID | Khóa chính, định danh duy nhất cho mỗi thông báo | PK | |
| `user_id` | UUID | Khóa ngoại, tham chiếu đến bảng `USERS` | FK | |
| `type` | VARCHAR(50) | Loại thông báo (ví dụ: quota_warning, payment_success) | | |
| `content` | TEXT | Nội dung của thông báo | | |
| `is_read` | BOOLEAN | Trạng thái đã đọc hay chưa của thông báo | | |
| `created_at` | TIMESTAMP | Thời gian tạo thông báo | | |


