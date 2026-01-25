# UC108: Chấp nhận lời mời vào Team

- **Tác nhân:** Người dùng được mời
- **Mục tiêu:** Chấp nhận lời mời để trở thành thành viên của một team.

## Luồng xử lý

1.  Người dùng nhận được email mời và nhấp vào liên kết chấp nhận lời mời.
2.  Hệ thống xác thực token trong liên kết. Nếu token hợp lệ và chưa hết hạn, tiếp tục. Nếu không, hiển thị thông báo lỗi.

**Kịch bản 1: Người dùng chưa có tài khoản**
3.  Hệ thống chuyển hướng người dùng đến trang đăng ký (UC50).
4.  Sau khi người dùng đăng ký và xác thực email thành công, hệ thống sẽ tự động thêm họ vào team đã mời.
5.  Hiển thị thông báo chào mừng và cho biết họ đã trở thành thành viên của team.

**Kịch bản 2: Người dùng đã có tài khoản nhưng chưa đăng nhập**
3.  Hệ thống chuyển hướng người dùng đến trang đăng nhập (UC52).
4.  Sau khi đăng nhập thành công, hệ thống hiển thị thông báo: "Bạn đã được mời tham gia Team [Tên Team]. Bạn có muốn chấp nhận không?".
5.  Người dùng nhấn "Chấp nhận".
6.  Hệ thống thêm người dùng vào team và cập nhật trạng thái lời mời thành `accepted`.

**Kịch bản 3: Người dùng đã có tài khoản và đã đăng nhập**
3.  Hệ thống hiển thị trực tiếp thông báo mời tham gia team.
4.  Người dùng nhấn "Chấp nhận".
5.  Hệ thống thêm người dùng vào team.
