# UC109: Rời khỏi Team

- **Tác nhân:** Thành viên Team (Admin, Member)
- **Mục tiêu:** Một thành viên có thể tự nguyện rời khỏi một team mà họ đang tham gia.

## Luồng xử lý chính

1.  Người dùng vào trang cài đặt của Team.
2.  Người dùng nhấn vào nút "Rời khỏi Team".
3.  Hệ thống hiển thị một hộp thoại xác nhận, cảnh báo về việc họ sẽ mất quyền truy cập vào tài nguyên của team.
4.  Người dùng xác nhận hành động.
5.  Hệ thống xóa liên kết giữa người dùng và team.
6.  Hệ thống ghi lại hành động vào Audit Log của Team.

## Các kịch bản con

-   **Nếu người dùng là thành viên cuối cùng trong team:** Hệ thống có thể đưa ra lựa chọn xóa team vĩnh viễn.
-   **Nếu người dùng là Chủ sở hữu (Owner):** Hệ thống sẽ không cho phép rời đi. Thay vào đó, hệ thống sẽ hiển thị thông báo: "Bạn phải chuyển quyền sở hữu cho một thành viên khác trước khi có thể rời khỏi team." (Tham chiếu đến UC110).
