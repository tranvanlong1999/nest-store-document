# UC42: Xem Audit Log hệ thống

- **Tác nhân:** Admin
- **Mục tiêu:** Admin có thể xem một danh sách chi tiết các hành động quan trọng đã xảy ra trong hệ thống để phục vụ cho việc kiểm toán và điều tra.

## Mô tả

Giao diện Audit Log sẽ là một bảng hiển thị các sự kiện theo thứ tự thời gian mới nhất trước. Mỗi dòng trong log sẽ chứa các thông tin sau:

-   **Timestamp:** Thời gian chính xác sự kiện xảy ra (ví dụ: `2025-07-16 10:30:00 UTC`).
-   **Actor (Tác nhân):** Người dùng hoặc hệ thống đã thực hiện hành động. Có thể là User ID, email, hoặc "System" nếu là hành động tự động.
-   **Action (Hành động):** Mô tả hành động đã thực hiện. Ví dụ: `user.login`, `service.disable`, `apikey.create`, `team.invite_member`.
-   **Target (Đối tượng):** Đối tượng bị tác động bởi hành động. Ví dụ: User ID `123`, Service Name `auth-service`, API Key ID `xyz-456`.
-   **Status (Trạng thái):** Kết quả của hành động (`SUCCESS`, `FAILURE`).
-   **IP Address:** Địa chỉ IP của tác nhân thực hiện hành động.
-   **Details (Chi tiết):** (Tùy chọn) Một trường chứa dữ liệu JSON mô tả chi tiết hơn về sự thay đổi (ví dụ: giá trị cũ và giá trị mới).
