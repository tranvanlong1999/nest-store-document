# UC106: Mời thành viên vào Team

- **Tác nhân:** Chủ sở hữu Team (Team Owner) hoặc Admin của Team
- **Mục tiêu:** Mời một người dùng mới tham gia vào team để cùng sử dụng tài nguyên.

## Luồng xử lý chính

1.  Tác nhân vào trang quản lý thành viên của Team.
2.  Nhấn nút "Mời thành viên".
3.  Một form hiện ra yêu cầu nhập các thông tin:
    -   **Email:** Địa chỉ email của người được mời.
    -   **Vai trò (Role):** Chọn vai trò cho thành viên mới trong team (ví dụ: `Admin`, `Member`).
4.  Tác nhân nhấn "Gửi lời mời".
5.  Hệ thống thực hiện các việc sau:
    a.  Kiểm tra xem email này đã là thành viên của team chưa. Nếu rồi thì báo lỗi.
    b.  Tạo một bản ghi lời mời (invitation) trong cơ sở dữ liệu với trạng thái `pending` và một token mời duy nhất, có thời hạn (ví dụ: 7 ngày).
    c.  Gửi một email đến địa chỉ đã nhập. Email chứa một liên kết duy nhất (có chứa token) để chấp nhận lời mời.
6.  Trên giao diện quản lý team, lời mời đang chờ xử lý sẽ được hiển thị.
