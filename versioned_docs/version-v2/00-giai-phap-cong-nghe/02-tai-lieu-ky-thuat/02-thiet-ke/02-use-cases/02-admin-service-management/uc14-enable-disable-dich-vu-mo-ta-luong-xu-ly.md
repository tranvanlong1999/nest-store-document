# UC14: Enable/Disable Dịch vụ

- **Tác nhân:** Admin
- **Mục tiêu:** Admin có thể bật hoặc tắt một microservice cụ thể trong hệ thống.

## Luồng xử lý chính

1.  Admin vào trang quản lý danh sách các dịch vụ.
2.  Admin chọn một dịch vụ và nhấn vào nút "Enable" hoặc "Disable".
3.  Hệ thống yêu cầu xác nhận.
4.  Khi Admin xác nhận, hệ thống sẽ:
    -   Cập nhật trạng thái của dịch vụ trong cơ sở dữ liệu cấu hình (ví dụ: `service_registry`).
    -   Gửi một thông điệp (event) đến API Gateway để thông báo về sự thay đổi trạng thái.

## Tương tác với API Gateway

-   API Gateway lắng nghe các sự kiện thay đổi trạng thái dịch vụ.
-   Khi nhận được thông báo một dịch vụ bị **Disable**:
    -   Gateway sẽ cập nhật cấu hình routing của nó.
    -   Mọi yêu cầu mới đến các endpoint của dịch vụ đó sẽ bị chặn ngay tại Gateway.
    -   Gateway sẽ trả về mã lỗi `503 Service Unavailable` cho client, cùng với một thông báo giải thích rằng dịch vụ đang tạm thời không hoạt động.
-   Khi một dịch vụ được **Enable**:
    -   Gateway sẽ khôi phục lại các quy tắc routing cho dịch vụ đó.
    -   Các yêu cầu sẽ được chuyển tiếp đến dịch vụ như bình thường.

## Các kịch bản con

-   **Dịch vụ đang xử lý request khi bị disable:** API Gateway sẽ cho phép các request đang được xử lý hoàn thành, nhưng sẽ không chấp nhận bất kỳ request mới nào.
-   **Health Check:** Hệ thống giám sát vẫn có thể thực hiện health check đối với dịch vụ bị disable để biết khi nào nó sẵn sàng hoạt động trở lại, nhưng các health check này không nên ảnh hưởng đến trạng thái "Disabled" do admin thiết lập.
