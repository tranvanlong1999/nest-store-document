
# Danh sách Use Cases cho MVP

## Mục tiêu MVP

Xây dựng một phiên bản tối thiểu của hệ thống SaaS, cho phép người dùng đăng ký, đăng nhập, sử dụng một dịch vụ cơ bản miễn phí, và quản lý API key của họ. Admin có thể quản lý người dùng và dịch vụ ở mức độ cơ bản.

## Use Cases được chọn cho MVP

### 🧑‍💼 **ADMIN (Quản trị viên)**

- **Quản lý Users & Roles**
    - UC01: Xem danh sách tất cả users
    - UC03: Xem chi tiết thông tin user
    - UC04: Khóa/mở khóa tài khoản user
- **Quản lý Dịch vụ**
    - UC11: Xem danh sách tất cả dịch vụ
    - UC12: Thêm dịch vụ mới vào hệ thống
    - UC13: Cập nhật thông tin dịch vụ
    - UC14: Enable/Disable dịch vụ
- **Quản lý Gói dịch vụ (Plans)**
    - UC19: Tạo gói dịch vụ mới (chỉ cần gói Free cho MVP)
    - UC22: Cấu hình quota cho từng gói

### 👤 **END USER (Người dùng cuối)**

- **Quản lý tài khoản**
    - UC50: Đăng ký tài khoản mới
    - UC51: Xác thực email đăng ký
    - UC52: Đăng nhập bằng email/password
    - UC54: Quên mật khẩu và reset
    - UC55: Đổi mật khẩu
    - UC56: Cập nhật thông tin profile
- **Quản lý gói dịch vụ**
    - UC62: Đăng ký gói Free
- **Dashboard & Thống kê**
    - UC69: Xem dashboard tổng quan (đơn giản)
    - UC72: Xem quota còn lại
- **Quản lý dịch vụ**
    - UC76: Xem danh sách dịch vụ available
    - UC77: Đọc documentation cho từng dịch vụ

### 💻 **DEVELOPER (Vai trò của End User)**

- **Quản lý API Token**
    - UC82: Tạo API key mới
    - UC83: Xem danh sách API keys
    - UC85: Copy API key
    - UC87: Thu hồi/xóa API key
- **Development & Testing**
    - UC91: Test API endpoints
    - UC92: Xem API documentation

### 🚪 **API GATEWAY**

- **Request Management**
    - UC113: Route request đến service tương ứng
    - UC114: Xác thực API key/token
    - UC117: Check quota limitations
    - UC118: Log all API calls

### 🔔 **NOTIFICATION SYSTEM**

- **Email Notifications**
    - UC125: Gửi email xác thực đăng ký
    - UC126: Gửi email reset password
    - UC127: Gửi email thông báo quota warning


