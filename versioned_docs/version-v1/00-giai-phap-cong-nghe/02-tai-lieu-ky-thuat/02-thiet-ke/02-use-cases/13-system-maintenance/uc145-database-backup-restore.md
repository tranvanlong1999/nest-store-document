
# UC145: Database backup/restore

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả các quy trình và công cụ để sao lưu (backup) và khôi phục (restore) cơ sở dữ liệu của hệ thống. Việc sao lưu định kỳ là rất quan trọng để đảm bảo tính toàn vẹn và khả năng phục hồi dữ liệu trong trường hợp xảy ra sự cố, mất mát dữ liệu, hoặc cần khôi phục về một trạng thái trước đó.

## 2. Tiền xử lý

- Cơ sở dữ liệu phải đang hoạt động.
- Các công cụ sao lưu/khôi phục cơ sở dữ liệu phải được cài đặt và cấu hình.
- Nơi lưu trữ bản sao lưu (ví dụ: S3, Google Cloud Storage, NFS) phải có sẵn và có đủ dung lượng.

## 3. Định nghĩa Endpoint

Đây thường là các tác vụ được thực hiện bởi quản trị viên hệ thống hoặc thông qua các công cụ quản lý cơ sở dữ liệu, không phải là các endpoint API công khai. Tuy nhiên, có thể có các endpoint nội bộ để kích hoạt hoặc theo dõi các tác vụ này.

- **HTTP Method**: `POST`
- **URL**: `/internal/system/database/backup` (Kích hoạt sao lưu thủ công)
- **URL**: `/internal/system/database/restore` (Kích hoạt khôi phục thủ công)
- **Authentication**: Yêu cầu xác thực nội bộ mạnh mẽ (ví dụ: API Key hoặc JWT Token).

## 4. Yêu cầu đầu vào

### 4.1. Sao lưu (Backup)

- **Body (JSON)**:

```json
{
  "backupType": "FULL", // FULL, INCREMENTAL, DIFFERENTIAL
  "location": "s3://my-backup-bucket/db-backups",
  "retentionDays": 30 // Số ngày lưu trữ bản sao lưu
}
```

- **Constraints**: 
    - `backupType` và `location` là bắt buộc.

### 4.2. Khôi phục (Restore)

- **Body (JSON)**:

```json
{
  "backupId": "uuid-cua-ban-sao-luu", // ID của bản sao lưu cần khôi phục
  "restorePoint": "2023-07-15T10:00:00Z", // Thời điểm muốn khôi phục (Point-in-time recovery)
  "targetDatabase": "production_db_restore" // Tên database đích để khôi phục vào
}
```

- **Constraints**: 
    - `backupId` hoặc `restorePoint` là bắt buộc.
    - `targetDatabase` là bắt buộc.

## 5. Hậu xử lý

### 5.1. Sao lưu (Backup)

- Tác vụ sao lưu được kích hoạt (thủ công hoặc theo lịch trình).
- Hệ thống sử dụng công cụ sao lưu cơ sở dữ liệu (ví dụ: `pg_dump` cho PostgreSQL) để tạo bản sao lưu.
- Bản sao lưu được nén và tải lên `location` được chỉ định.
- Ghi log chi tiết về quá trình sao lưu (thời gian bắt đầu/kết thúc, kích thước, trạng thái).
- (Tùy chọn) Gửi thông báo đến Admin về kết quả sao lưu.

### 5.2. Khôi phục (Restore)

- Tác vụ khôi phục được kích hoạt.
- Hệ thống tải bản sao lưu từ `location` được chỉ định.
- Sử dụng công cụ khôi phục cơ sở dữ liệu (ví dụ: `pg_restore`) để khôi phục dữ liệu vào `targetDatabase`.
- Ghi log chi tiết về quá trình khôi phục (thời gian bắt đầu/kết thúc, trạng thái).
- (Tùy chọn) Gửi thông báo đến Admin về kết quả khôi phục.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu được chấp nhận và tác vụ đang chạy.
- **Body**: Một đối tượng JSON xác nhận tác vụ:

```json
{
  "taskId": "backup_restore_uuid_123",
  "status": "IN_PROGRESS",
  "message": "Database backup/restore task initiated."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ.
    - `401 Unauthorized`: Nếu yêu cầu không được xác thực nội bộ.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server (ví dụ: lỗi kết nối cơ sở dữ liệu, lỗi công cụ sao lưu/khôi phục).

