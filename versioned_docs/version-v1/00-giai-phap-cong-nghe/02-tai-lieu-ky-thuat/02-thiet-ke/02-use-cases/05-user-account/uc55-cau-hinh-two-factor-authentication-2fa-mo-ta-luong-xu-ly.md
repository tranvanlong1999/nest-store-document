# UC55: Cấu hình Two-Factor Authentication (2FA)

- **Tác nhân:** Người dùng (Đã xác thực)
- **Mục tiêu:** Người dùng có thể bật và quản lý xác thực hai yếu tố cho tài khoản của mình để tăng cường bảo mật.

## Luồng 1: Bật 2FA

1.  Người dùng vào trang "Bảo mật" trong phần cài đặt tài khoản và chọn "Bật 2FA".
2.  Hệ thống yêu cầu người dùng xác nhận lại mật khẩu.
3.  Sau khi xác nhận, hệ thống sẽ:
    a.  Tạo một secret key duy nhất cho người dùng.
    b.  Hiển thị một mã QR code chứa secret key đó (theo định dạng của Google Authenticator/Authy).
    c.  Hiển thị secret key dưới dạng văn bản để người dùng có thể nhập thủ công.
4.  Người dùng sử dụng ứng dụng xác thực (Google Authenticator, Authy, v.v.) trên điện thoại để quét mã QR hoặc nhập key.
5.  Ứng dụng sẽ tạo ra các mã 6 chữ số thay đổi theo thời gian (TOTP).
6.  Người dùng nhập mã 6 chữ số từ ứng dụng vào trang web để xác nhận việc thiết lập.
7.  Hệ thống xác minh mã. Nếu đúng, hệ thống sẽ:
    a.  Lưu trạng thái "2FA đã bật" cho tài khoản.
    b.  Tạo ra một danh sách các "Recovery Codes" (mã khôi phục) dùng một lần.
    c.  Hiển thị các recovery codes này và yêu cầu người dùng lưu lại ở một nơi an toàn. Các mã này dùng để truy cập tài khoản trong trường hợp mất thiết bị xác thực.
8.  Quá trình thiết lập hoàn tất.

## Luồng 2: Đăng nhập với 2FA

1.  Người dùng đăng nhập bằng email và mật khẩu (UC52).
2.  Nếu thành công, hệ thống kiểm tra thấy tài khoản đã bật 2FA.
3.  Hệ thống chuyển hướng người dùng đến trang yêu cầu nhập mã xác thực 6 chữ số từ ứng dụng.
4.  Người dùng mở ứng dụng và nhập mã.
5.  Hệ thống xác minh mã. Nếu đúng, quá trình đăng nhập hoàn tất.

## Luồng 3: Tắt 2FA

1.  Người dùng vào trang "Bảo mật" và chọn "Tắt 2FA".
2.  Hệ thống yêu cầu người dùng nhập một mã 6 chữ số cuối cùng từ ứng dụng (hoặc mật khẩu) để xác nhận.
3.  Sau khi xác nhận, hệ thống sẽ xóa secret key và cập nhật trạng thái "2FA đã tắt" cho tài khoản.
