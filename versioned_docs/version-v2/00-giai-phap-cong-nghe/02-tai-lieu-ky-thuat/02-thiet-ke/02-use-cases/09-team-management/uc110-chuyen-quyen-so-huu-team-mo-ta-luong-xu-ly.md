# UC110: Chuyển quyền sở hữu Team

- **Tác nhân:** Chủ sở hữu Team (Team Owner)
- **Mục tiêu:** Chuyển giao vai trò Owner của team cho một thành viên khác.

## Luồng xử lý chính

1.  Owner vào trang quản lý thành viên của Team.
2.  Owner chọn một thành viên khác (phải là Admin hoặc Member) và chọn hành động "Chuyển quyền sở hữu".
3.  Hệ thống hiển thị một hộp thoại cảnh báo nghiêm trọng, giải thích rằng hành động này không thể hoàn tác và họ sẽ mất toàn bộ quyền quản trị cao nhất của team.
4.  Để xác nhận, hệ thống yêu cầu Owner nhập lại mật khẩu của mình.
5.  Sau khi xác thực mật khẩu thành công, hệ thống thực hiện các thay đổi sau trong một transaction:
    a.  Cập nhật vai trò của Owner hiện tại thành `Admin`.
    b.  Cập nhật vai trò của thành viên được chọn thành `Owner`.
6.  Hệ thống gửi email thông báo cho cả hai người dùng về sự thay đổi này.
7.  Hệ thống ghi lại hành động vào Audit Log của Team.

## Các ràng buộc

-   Chỉ có thể chuyển quyền sở hữu cho một thành viên hiện tại của team.
-   Không thể chuyển quyền cho chính mình.
-   Hành động này là không thể hoàn tác bởi người dùng. Chỉ có thể được đảo ngược bởi Owner mới.
