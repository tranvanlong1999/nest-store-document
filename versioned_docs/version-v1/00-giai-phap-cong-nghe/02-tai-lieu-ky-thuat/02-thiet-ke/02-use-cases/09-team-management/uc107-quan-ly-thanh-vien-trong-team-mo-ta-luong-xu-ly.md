# UC107: Quản lý thành viên trong Team

- **Tác nhân:** Chủ sở hữu Team (Team Owner) hoặc Admin của Team
- **Mục tiêu:** Quản lý vai trò và trạng thái của các thành viên trong team.

## Luồng 1: Thay đổi vai trò thành viên

1.  Tác nhân vào trang quản lý thành viên của Team.
2.  Danh sách thành viên hiện tại được hiển thị cùng với vai trò của họ (`Owner`, `Admin`, `Member`).
3.  Tác nhân chọn một thành viên và chọn một vai trò mới từ danh sách dropdown.
4.  Hệ thống yêu cầu xác nhận.
5.  Sau khi xác nhận, hệ thống cập nhật vai trò của thành viên trong cơ sở dữ liệu.
6.  Hệ thống ghi lại hành động vào Audit Log của Team.

**Các quy tắc:**
-   Chỉ `Owner` mới có thể thăng cấp cho người khác lên `Admin` hoặc `Owner`.
-   Một `Admin` có thể thay đổi vai trò của các `Member`.
-   Không thể thay đổi vai trò của chính mình.

## Luồng 2: Xóa thành viên khỏi Team

1.  Tác nhân chọn một thành viên và nhấn nút "Xóa khỏi Team".
2.  Hệ thống yêu cầu xác nhận.
3.  Sau khi xác nhận, hệ thống sẽ xóa liên kết giữa người dùng và team.
4.  Hệ thống ghi lại hành động vào Audit Log.

**Các quy tắc:**
-   `Owner` không thể bị xóa hoặc tự xóa mình. Họ phải chuyển quyền sở hữu (UC110) trước.
-   `Admin` có thể xóa `Member`.
-   `Owner` có thể xóa `Admin` và `Member`.
