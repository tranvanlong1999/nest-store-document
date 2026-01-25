# UC111: Quản lý Webhook Endpoint

- **Tác nhân:** Người dùng (Đã xác thực)
- **Mục tiêu:** Người dùng có thể cấu hình các URL (endpoint) để nhận thông báo webhook từ hệ thống một cách tự động.

## Mô tả

Trong trang cài đặt API hoặc Developer, người dùng sẽ có một khu vực "Webhooks". Tại đây, họ có thể:

### 1. Thêm một Endpoint mới

-   Nhấn nút "Add endpoint".
-   Một form hiện ra yêu cầu:
    -   **Endpoint URL:** URL của server sẽ nhận webhook. Hệ thống nên xác thực đây là một URL hợp lệ.
    -   **Description (Mô tả):** Một mô tả ngắn để người dùng dễ nhận biết (ví dụ: "Staging Server Notifications").
    -   **Events (Sự kiện):** Một danh sách các checkbox cho phép người dùng chọn những sự kiện họ muốn nhận. Ví dụ:
        -   `payment.succeeded`
        -   `payment.failed`
        -   `quota.warning`
        -   `apikey.created`
-   Sau khi lưu, hệ thống sẽ tạo một `secret` duy nhất cho webhook này, dùng để ký (sign) các payload, giúp người dùng xác thực nguồn gốc của webhook. Secret này chỉ hiển thị một lần.

### 2. Sửa một Endpoint

-   Người dùng có thể cập nhật URL, mô tả, và danh sách các sự kiện cho một endpoint đã có.

### 3. Xóa một Endpoint

-   Người dùng có thể xóa một endpoint không còn sử dụng.

### 4. Bật/Tắt một Endpoint

-   Mỗi endpoint có một nút gạt để tạm thời bật hoặc tắt việc gửi webhook đến URL đó mà không cần xóa.
