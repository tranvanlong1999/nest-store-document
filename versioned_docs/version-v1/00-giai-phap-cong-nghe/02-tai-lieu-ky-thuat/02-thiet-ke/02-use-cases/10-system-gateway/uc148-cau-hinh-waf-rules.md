
# UC148: Cấu hình WAF rules

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép quản trị viên (Admin) cấu hình các quy tắc cho Tường lửa ứng dụng web (Web Application Firewall - WAF). Các quy tắc này giúp bảo vệ ứng dụng khỏi các cuộc tấn công phổ biến trên web như SQL Injection, Cross-Site Scripting (XSS), và các lỗ hổng OWASP Top 10 khác. Admin có thể thêm, sửa, xóa, hoặc kích hoạt/vô hiệu hóa các quy tắc WAF.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống với quyền Admin.
- Hệ thống phải có một WAF được triển khai và tích hợp (ví dụ: AWS WAF, Cloudflare WAF, Nginx ModSecurity).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/security/waf-rules`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/security/waf-rules`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/security/waf-rules/{ruleId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/admin/security/waf-rules/{ruleId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

### 4.1. Xem danh sách WAF rules

Không có tham số đầu vào.

### 4.2. Thêm WAF rule mới

- **Body (JSON)**:

```json
{
  "name": "Block_SQL_Injection_Attempts",
  "description": "Chặn các mẫu tấn công SQL Injection phổ biến.",
  "priority": 100,
  "action": "BLOCK", // ALLOW, BLOCK, COUNT
  "criteria": {
    "matchType": "REGEX",
    "target": "ARGS", // HEADERS, BODY, URI
    "pattern": ".*union.*select.*"
  },
  "enabled": true
}
```

- **Constraints**: 
    - `name`, `priority`, `action`, `criteria` là bắt buộc.
    - `priority` là số nguyên.
    - `action` phải là một trong các giá trị hợp lệ.
    - `criteria` phải chứa `matchType`, `target`, `pattern` hợp lệ.

### 4.3. Cập nhật WAF rule

- **Path Parameter**: `ruleId` (UUID) - ID của rule cần cập nhật.
- **Body (JSON)**: Tương tự như thêm mới, nhưng có thể chỉ cập nhật một số trường.

### 4.4. Xóa WAF rule

- **Path Parameter**: `ruleId` (UUID) - ID của rule cần xóa.

## 5. Hậu xử lý

### 5.1. Xem danh sách WAF rules

- Hệ thống xác thực JWT Token và quyền Admin.
- Truy vấn WAF để lấy danh sách các quy tắc.
- Trả về danh sách.

### 5.2. Thêm WAF rule mới

- Hệ thống xác thực JWT Token và quyền Admin.
- Gửi yêu cầu đến WAF để tạo quy tắc mới.
- Ghi log hoạt động thêm WAF rule.

### 5.3. Cập nhật WAF rule

- Hệ thống xác thực JWT Token và quyền Admin.
- Gửi yêu cầu đến WAF để cập nhật quy tắc.
- Ghi log hoạt động cập nhật WAF rule.

### 5.4. Xóa WAF rule

- Hệ thống xác thực JWT Token và quyền Admin.
- Gửi yêu cầu đến WAF để xóa quy tắc.
- Ghi log hoạt động xóa WAF rule.

## 6. Yêu cầu đầu ra

### 6.1. Xem danh sách WAF rules

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một mảng JSON chứa danh sách các WAF rules:

```json
[
  {
    "ruleId": "waf_rule_uuid_1",
    "name": "Block_SQL_Injection_Attempts",
    "description": "Chặn các mẫu tấn công SQL Injection phổ biến.",
    "priority": 100,
    "action": "BLOCK",
    "criteria": {
      "matchType": "REGEX",
      "target": "ARGS",
      "pattern": ".*union.*select.*"
    },
    "enabled": true
  }
]
```

### 6.2. Thêm WAF rule mới

- **HTTP Status**: `201 Created` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận:

```json
{
  "ruleId": "waf_rule_uuid_new",
  "message": "WAF rule created successfully."
}
```

### 6.3. Cập nhật WAF rule

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON xác nhận:

```json
{
  "ruleId": "waf_rule_uuid_1",
  "message": "WAF rule updated successfully."
}
```

### 6.4. Xóa WAF rule

- **HTTP Status**: `204 No Content` nếu thành công.

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu người dùng không có quyền Admin.
    - `404 Not Found`: Nếu không tìm thấy rule.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

