# UC52: Đăng nhập bằng Email và Mật khẩu

- **Tác nhân:** Người dùng (Chưa xác thực)
- **Mục tiêu:** Người dùng đăng nhập vào hệ thống bằng email và mật khẩu đã đăng ký.

## Luồng xử lý chính

1.  Người dùng truy cập trang đăng nhập.
2.  Người dùng nhập email và mật khẩu.
3.  Người dùng nhấn nút "Đăng nhập".
4.  Hệ thống thực hiện các bước xác thực sau:
    a.  Kiểm tra định dạng email có hợp lệ không.
    b.  Tìm người dùng trong cơ sở dữ liệu dựa trên email.
    c.  Nếu tìm thấy, so sánh hash của mật khẩu người dùng nhập vào với hash được lưu trong database.
5.  Nếu xác thực thành công:
    a.  Hệ thống tạo một phiên làm việc (session) hoặc một cặp token (access token, refresh token).
    b.  Hệ thống chuyển hướng người dùng đến trang dashboard.
    c.  Ghi lại lịch sử đăng nhập thành công.

## Các luồng phụ và Xử lý lỗi

-   **Sai email hoặc mật khẩu:**
    -   Hệ thống hiển thị một thông báo lỗi chung: "Email hoặc mật khẩu không chính xác." (Để tránh tiết lộ tài khoản nào tồn tại).
    -   Ghi lại nỗ lực đăng nhập thất bại.
-   **Tài khoản chưa xác thực email:**
    -   Hệ thống hiển thị thông báo: "Vui lòng xác thực email của bạn trước khi đăng nhập." và cung cấp tùy chọn gửi lại email xác thực.
-   **Tài khoản bị khóa (bởi Admin):**
    -   Hệ thống hiển thị thông báo: "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ hỗ trợ."
-   **Cơ chế chống Brute-Force:**
    -   Sau một số lần đăng nhập thất bại liên tiếp từ cùng một địa chỉ IP hoặc cho cùng một tài khoản (ví dụ: 5 lần trong 15 phút), hệ thống sẽ tạm thời khóa chức năng đăng nhập cho tài khoản/IP đó trong một khoảng thời gian (ví dụ: 30 phút) hoặc yêu cầu xác minh CAPTCHA.
-   **Tài khoản đã bật 2FA:**
    -   Sau khi xác thực mật khẩu thành công, hệ thống sẽ chuyển người dùng đến trang nhập mã 2FA (Xem UC55).
