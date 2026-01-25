# UC143: Cleanup expired tokens

## 1. Mô tả yêu cầu chức năng

Chức năng này mô tả một tác vụ nền (background job) định kỳ để dọn dẹp các token đã hết hạn (ví dụ: JWT refresh tokens, password reset tokens, email verification tokens) khỏi cơ sở dữ liệu. Điều này giúp duy trì hiệu suất hệ thống, giảm kích thước cơ sở dữ liệu, và tăng cường bảo mật bằng cách loại bỏ các token không còn giá trị sử dụng.

## 2. Tiền xử lý

- Hệ thống phải có các loại token được tạo và lưu trữ với thời gian hết hạn.
- Một cơ chế lập lịch (scheduler) phải được cấu hình để chạy tác vụ này định kỳ.

## 3. Định nghĩa Endpoint

Đây là một tác vụ chạy nền, không có endpoint API trực tiếp để người dùng gọi. Nó được kích hoạt bởi một scheduler nội bộ hoặc một sự kiện hệ thống.

## 4. Yêu cầu đầu vào

Không có yêu cầu đầu vào trực tiếp từ người dùng. Tác vụ này hoạt động dựa trên cấu hình nội bộ (ví dụ: tần suất chạy, định nghĩa về token hết hạn).

## 5. Hậu xử lý

- Tác vụ được kích hoạt bởi scheduler (ví dụ: chạy hàng ngày vào lúc 3 giờ sáng).
- Truy vấn cơ sở dữ liệu để tìm tất cả các token có `expiryDate` nhỏ hơn thời điểm hiện tại.
- Xóa các token đã hết hạn khỏi cơ sở dữ liệu.
- Ghi log số lượng token đã được dọn dẹp và bất kỳ lỗi nào xảy ra trong quá trình.
- (Tùy chọn) Gửi thông báo đến Admin nếu có lỗi hoặc số lượng token dọn dẹp bất thường.

## 6. Yêu cầu đầu ra

Không có yêu cầu đầu ra trực tiếp cho người dùng. Kết quả của tác vụ được ghi vào log hệ thống.

- **Log Entry (ví dụ)**:

```
[INFO] 2023-07-16 03:00:00 - CleanupJob: Started cleaning up expired tokens.
[INFO] 2023-07-16 03:00:05 - CleanupJob: Successfully deleted 1250 expired tokens.
```

- **Trường hợp lỗi**: 
    - Lỗi kết nối cơ sở dữ liệu.
    - Lỗi trong quá trình xóa dữ liệu.

