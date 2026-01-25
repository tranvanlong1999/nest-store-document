
# UC18: Quản lý version của dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) quản lý các phiên bản (version) khác nhau của một dịch vụ. Điều này bao gồm việc thêm phiên bản mới, kích hoạt/vô hiệu hóa một phiên bản cụ thể, hoặc chuyển đổi lưu lượng truy cập giữa các phiên bản. Quản lý phiên bản là rất quan trọng để triển khai các bản cập nhật mà không làm gián đoạn dịch vụ hiện có (zero-downtime deployment) và cho phép thử nghiệm A/B.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý dịch vụ và cấu hình hệ thống.
- Dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.

## 3. Định nghĩa Endpoint

### 3.1. Thêm phiên bản mới cho dịch vụ

- **HTTP Method**: `POST`
- **URL**: `/api/v1/admin/services/{serviceId}/versions`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

### 3.2. Cập nhật trạng thái/lưu lượng của phiên bản dịch vụ

- **HTTP Method**: `PUT`
- **URL**: `/api/v1/admin/services/{serviceId}/versions/{versionId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

### 3.3. Xem danh sách các phiên bản của dịch vụ

- **HTTP Method**: `GET`
- **URL**: `/api/v1/admin/services/{serviceId}/versions`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

### 4.1. Thêm phiên bản mới cho dịch vụ

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ.
- **Body (JSON)**:

```json
{
  "versionName": "v2.0",
  "endpoint": "/stt/v2",
  "description": "Phiên bản mới với cải tiến hiệu suất.",
  "initialTrafficWeight": 0 // Tỷ lệ lưu lượng ban đầu (0-100)
}
```

- **Constraints**: 
    - `versionName` là bắt buộc và phải là duy nhất cho dịch vụ đó.
    - `endpoint` là bắt buộc và phải là duy nhất.
    - `initialTrafficWeight` là tùy chọn, mặc định 0.

### 4.2. Cập nhật trạng thái/lưu lượng của phiên bản dịch vụ

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ.
- **Path Parameter**: `versionId` (UUID) - ID của phiên bản cần cập nhật.
- **Body (JSON)**:

```json
{
  "isEnabled": true, // Kích hoạt/vô hiệu hóa phiên bản
  "trafficWeight": 50 // Tỷ lệ lưu lượng (0-100)
}
```

- **Constraints**: 
    - `isEnabled` là tùy chọn.
    - `trafficWeight` là tùy chọn, tổng `trafficWeight` của tất cả các phiên bản `isEnabled` của một dịch vụ không được vượt quá 100.

### 4.3. Xem danh sách các phiên bản của dịch vụ

- **Path Parameter**: `serviceId` (UUID) - ID của dịch vụ.

## 5. Hậu xử lý

### 5.1. Thêm phiên bản mới cho dịch vụ

- Hệ thống kiểm tra tính hợp lệ của dữ liệu đầu vào.
- Lưu thông tin phiên bản mới vào cơ sở dữ liệu.
- Ghi log hoạt động.

### 5.2. Cập nhật trạng thái/lưu lượng của phiên bản dịch vụ

- Hệ thống xác định phiên bản theo `serviceId` và `versionId`.
- Cập nhật trạng thái và/hoặc tỷ lệ lưu lượng trong cơ sở dữ liệu.
- Gửi thông báo đến API Gateway để cập nhật cấu hình định tuyến lưu lượng.
- Ghi log hoạt động.

### 5.3. Xem danh sách các phiên bản của dịch vụ

- Truy vấn cơ sở dữ liệu để lấy danh sách các phiên bản của dịch vụ.
- Trả về danh sách.

## 6. Yêu cầu đầu ra

### 6.1. Thêm phiên bản mới cho dịch vụ

- **HTTP Status**: `201 Created`.
- **Body**: Đối tượng JSON của phiên bản vừa tạo:

```json
{
  "versionId": "uuid-cua-version-moi",
  "serviceId": "uuid-cua-service",
  "versionName": "v2.0",
  "endpoint": "/stt/v2",
  "description": "Phiên bản mới với cải tiến hiệu suất.",
  "isEnabled": false,
  "trafficWeight": 0,
  "createdAt": "2023-07-15T20:00:00Z"
}
```

### 6.2. Cập nhật trạng thái/lưu lượng của phiên bản dịch vụ

- **HTTP Status**: `200 OK`.
- **Body**: Đối tượng JSON của phiên bản đã cập nhật:

```json
{
  "versionId": "uuid-cua-version",
  "serviceId": "uuid-cua-service",
  "versionName": "v1.0",
  "isEnabled": true,
  "trafficWeight": 50,
  "message": "Service version updated successfully."
}
```

### 6.3. Xem danh sách các phiên bản của dịch vụ

- **HTTP Status**: `200 OK`.
- **Body**: Mảng JSON chứa danh sách các phiên bản:

```json
[
  {
    "versionId": "uuid-cua-version-1",
    "serviceId": "uuid-cua-service",
    "versionName": "v1.0",
    "endpoint": "/stt/v1",
    "description": "Phiên bản ổn định hiện tại.",
    "isEnabled": true,
    "trafficWeight": 100,
    "createdAt": "2023-01-01T00:00:00Z"
  },
  {
    "versionId": "uuid-cua-version-2",
    "serviceId": "uuid-cua-service",
    "versionName": "v2.0",
    "endpoint": "/stt/v2",
    "description": "Phiên bản mới với cải tiến hiệu suất.",
    "isEnabled": false,
    "trafficWeight": 0,
    "createdAt": "2023-07-15T20:00:00Z"
  }
]
```

- **Trường hợp lỗi chung**: 
    - `400 Bad Request`: Dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Admin không có quyền.
    - `404 Not Found`: Không tìm thấy dịch vụ hoặc phiên bản.
    - `409 Conflict`: `versionName` hoặc `endpoint` đã tồn tại.
    - `500 Internal Server Error`: Lỗi server.

