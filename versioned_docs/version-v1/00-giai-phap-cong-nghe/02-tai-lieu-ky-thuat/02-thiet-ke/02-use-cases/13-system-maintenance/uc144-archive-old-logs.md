
# UC144: Archive old logs

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả một tác vụ nền (background job) định kỳ để lưu trữ (archive) các tệp log cũ từ hệ thống lưu trữ chính sang một kho lưu trữ dài hạn, chi phí thấp hơn (ví dụ: Amazon S3 Glacier, Google Cloud Storage Coldline). Điều này giúp giảm chi phí lưu trữ, cải thiện hiệu suất của hệ thống log chính, và đảm bảo tuân thủ các quy định về lưu trữ dữ liệu dài hạn.

## 2. Tiền xử lý

- Hệ thống phải có các tệp log được tạo và lưu trữ trên hệ thống lưu trữ chính.
- Một cơ chế lập lịch (scheduler) phải được cấu hình để chạy tác vụ này định kỳ.
- Kho lưu trữ dài hạn phải được cấu hình và có thể truy cập được.

## 3. Định nghĩa Endpoint

Đây là một tác vụ chạy nền, không có endpoint API trực tiếp để người dùng gọi. Nó được kích hoạt bởi một scheduler nội bộ hoặc một sự kiện hệ thống.

## 4. Yêu cầu đầu vào

Không có yêu cầu đầu vào trực tiếp từ người dùng. Tác vụ này hoạt động dựa trên cấu hình nội bộ (ví dụ: tần suất chạy, định nghĩa về log cũ cần archive).

## 5. Hậu xử lý

- Tác vụ được kích hoạt bởi scheduler (ví dụ: chạy hàng tháng vào đầu tháng).
- Xác định các tệp log đủ điều kiện để archive (ví dụ: log cũ hơn 30 ngày).
- Di chuyển hoặc sao chép các tệp log này từ hệ thống lưu trữ chính sang kho lưu trữ dài hạn.
- Sau khi xác nhận việc di chuyển/sao chép thành công, xóa các tệp log khỏi hệ thống lưu trữ chính.
- Ghi log số lượng tệp log đã được archive, kích thước dữ liệu, và bất kỳ lỗi nào xảy ra trong quá trình.
- (Tùy chọn) Gửi thông báo đến Admin nếu có lỗi hoặc số lượng dữ liệu archive bất thường.

## 6. Yêu cầu đầu ra

Không có yêu cầu đầu ra trực tiếp cho người dùng. Kết quả của tác vụ được ghi vào log hệ thống.

- **Log Entry (ví dụ)**:

```
[INFO] 2023-08-01 01:00:00 - ArchiveJob: Started archiving old logs.
[INFO] 2023-08-01 01:05:30 - ArchiveJob: Successfully archived 150 log files (total 2.5 GB) to S3 Glacier.
```

- **Trường hợp lỗi**: 
    - Lỗi kết nối với hệ thống lưu trữ.
    - Lỗi trong quá trình di chuyển/sao chép tệp.
    - Lỗi khi xóa tệp gốc.

