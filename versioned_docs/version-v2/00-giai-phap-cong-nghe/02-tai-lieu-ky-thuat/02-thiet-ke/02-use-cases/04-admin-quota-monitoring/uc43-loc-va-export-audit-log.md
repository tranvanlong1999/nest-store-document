# UC43: Lọc và Export Audit Log

- **Tác nhân:** Admin
- **Mục tiêu:** Admin có thể lọc và tìm kiếm các bản ghi audit log cụ thể và xuất chúng ra file để lưu trữ hoặc phân tích.

## Chức năng Lọc

Giao diện Audit Log sẽ cung cấp các bộ lọc sau:

-   **Lọc theo khoảng thời gian:** Chọn ngày bắt đầu và ngày kết thúc.
-   **Lọc theo Tác nhân (Actor):** Nhập User ID hoặc email.
-   **Lọc theo Loại hành động (Action Type):** Chọn từ danh sách dropdown (ví dụ: `user.*`, `apikey.*`, `payment.*`).
-   **Lọc theo Trạng thái (Status):** Chọn `SUCCESS`, `FAILURE`, hoặc `ALL`.

## Chức năng Export

1.  Sau khi áp dụng các bộ lọc mong muốn, Admin nhấn nút "Export".
2.  Hệ thống hiển thị các tùy chọn định dạng file để export:
    -   **CSV (Comma-Separated Values)**
    -   **JSON (JavaScript Object Notation)**
3.  Admin chọn định dạng và xác nhận.
4.  Hệ thống sẽ tạo một file chứa các bản ghi log đã được lọc và cho phép Admin tải về. Đối với lượng dữ liệu lớn, hệ thống có thể thực hiện export ở chế độ nền và gửi email thông báo cho Admin khi file sẵn sàng.
