# UC112: Xem lại lịch sử gửi Webhook

- **Tác nhân:** Người dùng (Đã xác thực)
- **Mục tiêu:** Người dùng có thể xem lại lịch sử các webhook đã được gửi đến endpoint của họ, giúp cho việc gỡ lỗi (debug).

## Mô tả

Khi người dùng chọn một webhook endpoint đã cấu hình (từ UC111), họ sẽ thấy một tab "Delivery History" hoặc tương tự.

Giao diện này sẽ hiển thị một danh sách các lần gửi webhook (delivery attempts) theo thứ tự mới nhất trước. Mỗi dòng sẽ chứa:

-   **Timestamp:** Thời gian hệ thống gửi webhook.
-   **Status (Trạng thái):**
    -   Một icon màu xanh lá và mã `200 OK` nếu server của người dùng trả về mã 2xx.
    -   Một icon màu đỏ và mã lỗi (ví dụ: `404 Not Found`, `500 Internal Server Error`) nếu có lỗi.
-   **Event Type:** Loại sự kiện đã được gửi (ví dụ: `payment.succeeded`).
-   **Action:** Một nút "View Details" hoặc "Resend".

## Chi tiết một lần gửi (Delivery Details)

Khi nhấn vào "View Details", người dùng có thể thấy:

-   **Headers:** Các HTTP headers đã được gửi, bao gồm cả `signature` để xác thực.
-   **Payload:** Nội dung (body) của request đã được gửi, thường là một đối tượng JSON.

## Chức năng "Resend"

-   Người dùng có thể nhấn nút "Resend" để gửi lại một webhook cụ thể. Điều này rất hữu ích khi server của họ bị lỗi và họ muốn xử lý lại sự kiện đó sau khi đã sửa lỗi.
