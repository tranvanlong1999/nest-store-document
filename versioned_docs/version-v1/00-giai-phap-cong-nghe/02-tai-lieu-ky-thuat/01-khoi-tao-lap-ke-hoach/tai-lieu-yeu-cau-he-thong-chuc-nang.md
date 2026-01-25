---
title: Tài liệu yêu cầu hệ thống & chức năng
---



| **Ngày:**    | 29/08/2025                     | **Phiên bản:**  | 1.0     |
| :----------- | :----------------------------- | :-------------- | :------ |
| **Tác giả:** | [Tên của bạn/Business Analyst] | **Trạng thái:** | Dự thảo |

---

### **1. Giới thiệu**

#### **1.1. Mục đích**
Tài liệu này đặc tả chi tiết các yêu cầu chức năng và phi chức năng của hệ thống **Helix Core Marketplace**. Nó được xây dựng dựa trên Tài liệu Yêu cầu Kinh doanh (BRD) phiên bản 1.0 và sẽ được sử dụng làm tài liệu tham chiếu chính cho các đội thiết kế, phát triển, kiểm thử (QA), và quản lý dự án trong suốt vòng đời phát triển sản phẩm.

#### **1.2. Phạm vi**
Phạm vi của tài liệu này bao gồm tất cả các tính năng được mô tả trong BRD, chi tiết hóa thành các hành vi cụ thể của hệ thống. Các chức năng được chia thành các module chính, bao gồm: Quản lý Người dùng & Tài khoản, Marketplace công khai, Cổng thông tin cho Người dùng cuối, Cổng thông tin cho Nhà cung cấp, và Giao diện Quản trị viên.

#### **1.3. Định nghĩa & Viết tắt**
*   **Nhà cung cấp (Provider):** Doanh nghiệp niêm yết và bán dịch vụ của họ trên nền tảng.
*   **Người dùng cuối (End User):** Lập trình viên/Doanh nghiệp đăng ký và sử dụng dịch vụ.
*   **Quản trị viên (Admin):** Nhân viên quản trị nền tảng Helix Core.
*   **Dịch vụ (Service):** Một sản phẩm API/SaaS được cung cấp trên marketplace.
*   **Gói cước (Plan):** Một tùy chọn đăng ký dịch vụ với các giới hạn và chi phí cụ thể.

---

### **2. Mô tả Tổng quan**

Helix Core Marketplace là một ứng dụng web, bao gồm một trang web công khai (marketplace), và các khu vực yêu cầu đăng nhập riêng cho Người dùng cuối, Nhà cung cấp, và Quản trị viên. Hệ thống sẽ hoạt động như một lớp trung gian, xác thực các yêu cầu API từ Người dùng cuối và chuyển tiếp đến hệ thống của Nhà cung cấp, đồng thời ghi nhận lại sản lượng sử dụng.

---

### **3. Yêu cầu Chức năng (Functional Requirements)**

#### **3.1. Module Quản lý Người dùng & Tài khoản (Core User Management)**
*   `FRS-USER-01`: **Đăng ký tài khoản**
    *   `FRS-USER-01.1`: Hệ thống **phải** cung cấp một form đăng ký yêu cầu các thông tin: Tên, Email, Mật khẩu.
    *   `FRS-USER-01.2`: Hệ thống **phải** xác thực định dạng email và độ mạnh của mật khẩu (tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số).
    *   `FRS-USER-01.3`: Sau khi đăng ký thành công, hệ thống **phải** gửi một email xác thực đến địa chỉ email đã đăng ký. Tài khoản sẽ ở trạng thái "Chưa kích hoạt" cho đến khi người dùng nhấp vào liên kết xác thực.
*   `FRS-USER-02`: **Đăng nhập**
    *   `FRS-USER-02.1`: Hệ thống **phải** cung cấp form đăng nhập bằng Email và Mật khẩu.
    *   `FRS-USER-02.2`: Hệ thống **phải** triển khai chức năng "Quên mật khẩu", cho phép người dùng đặt lại mật khẩu qua email.
*   `FRS-USER-03`: **Quản lý Hồ sơ**
    *   `FRS-USER-03.1`: Sau khi đăng nhập, người dùng **phải** có thể xem và chỉnh sửa thông tin cá nhân (Tên, Mật khẩu).

#### **3.2. Module Marketplace Công khai (Public Marketplace)**
*   `FRS-MKT-01`: **Hiển thị Danh sách Dịch vụ** *(Liên quan BRD: BR-USER-01)*
    *   `FRS-MKT-01.1`: Hệ thống **phải** hiển thị một trang danh sách tất cả các dịch vụ đã được "Phê duyệt".
    *   `FRS-MKT-01.2`: Mỗi dịch vụ trong danh sách **phải** hiển thị: Logo, Tên dịch vụ, Tên Nhà cung cấp, và một mô tả ngắn.
*   `FRS-MKT-02`: **Tìm kiếm và Lọc Dịch vụ** *(Liên quan BRD: BR-USER-01)*
    *   `FRS-MKT-02.1`: Hệ thống **phải** cung cấp một thanh tìm kiếm cho phép người dùng tìm dịch vụ theo tên.
    *   `FRS-MKT-02.2`: Hệ thống **phải** cung cấp chức năng lọc dịch vụ theo "Danh mục" (ví dụ: AI/ML, Data, Security).
*   `FRS-MKT-03`: **Trang Chi tiết Dịch vụ**
    *   `FRS-MKT-03.1`: Khi nhấp vào một dịch vụ, hệ thống **phải** hiển thị một trang chi tiết bao gồm: mô tả đầy đủ, các gói cước có sẵn, liên kết đến tài liệu API.
    *   `FRS-MKT-03.2`: Trang này **phải** có nút "Đăng ký sử dụng" (Subscribe) rõ ràng.

#### **3.3. Cổng thông tin cho Người dùng cuối (End User Portal)**
*   `FRS-ENDUSER-01`: **Dashboard Tổng quan** *(Liên quan BRD: BR-USER-04)*
    *   `FRS-ENDUSER-01.1`: Hệ thống **phải** hiển thị một dashboard cho người dùng sau khi đăng nhập, tóm tắt số lượng dịch vụ đã đăng ký và cảnh báo về việc sử dụng (nếu sắp hết hạn mức).
*   `FRS-ENDUSER-02`: **Quản lý Dịch vụ đã Đăng ký** *(Liên quan BRD: BR-USER-04)*
    *   `FRS-ENDUSER-02.1`: Hệ thống **phải** cung cấp một trang liệt kê tất cả các dịch vụ mà người dùng đã đăng ký, cùng với gói cước hiện tại.
*   `FRS-ENDUSER-03`: **Đăng ký và Hủy Dịch vụ** *(Liên quan BRD: BR-USER-03, BR-USER-04)*
    *   `FRS-ENDUSER-03.1`: Hệ thống **phải** cho phép người dùng đăng ký một gói cước của một dịch vụ từ trang chi tiết.
    *   `FRS-ENDUSER-03.2`: Hệ thống **phải** cho phép người dùng hủy đăng ký một dịch vụ. Sau khi hủy, API key liên quan sẽ bị vô hiệu hóa.
*   `FRS-ENDUSER-04`: **Quản lý API Key** *(Liên quan BRD: BR-USER-04)*
    *   `FRS-ENDUSER-04.1`: Đối với mỗi dịch vụ đã đăng ký, hệ thống **phải** tự động tạo một API key duy nhất.
    *   `FRS-ENDUSER-04.2`: Hệ thống **phải** cho phép người dùng xem, sao chép và tạo lại (re-generate) API key của họ.
*   `FRS-ENDUSER-05`: **Theo dõi Sản lượng** *(Liên quan BRD: BR-USER-04)*
    *   `FRS-ENDUSER-05.1`: Hệ thống **phải** cung cấp biểu đồ hiển thị số lượng API call đã sử dụng cho từng dịch vụ theo ngày/tuần/tháng.
    *   `FRS-ENDUSER-05.2`: Hệ thống **phải** hiển thị hạn mức (quota) của gói cước hiện tại và phần trăm đã sử dụng.

#### **3.4. Cổng thông tin cho Nhà cung cấp (Provider Portal)**
*   `FRS-PROV-01`: **Quản lý Hồ sơ Công ty** *(Liên quan BRD: BR-PROV-01)*
    *   `FRS-PROV-01.1`: Nhà cung cấp **phải** có thể cập nhật thông tin công ty (tên, mô tả, website).
*   `FRS-PROV-02`: **Quản lý Dịch vụ** *(Liên quan BRD: BR-PROV-02, BR-PROV-05)*
    *   `FRS-PROV-02.1`: Hệ thống **phải** cung cấp chức năng "Thêm dịch vụ mới" với các trường thông tin: Tên, Mô tả, Logo, Danh mục, Link tài liệu, URL Endpoint.
    *   `FRS-PROV-02.2`: Nhà cung cấp **phải** có thể chỉnh sửa thông tin dịch vụ và gửi lại để phê duyệt.
    *   `FRS-PROV-02.3`: Hệ thống **phải** hiển thị trạng thái của dịch vụ (Bản nháp, Chờ duyệt, Đã duyệt, Bị từ chối).
*   `FRS-PROV-03`: **Quản lý Gói cước** *(Liên quan BRD: BR-PROV-03)*
    *   `FRS-PROV-03.1`: Đối với mỗi dịch vụ, nhà cung cấp **phải** có thể tạo/sửa/xóa nhiều gói cước.
    *   `FRS-PROV-03.2`: Mỗi gói cước **phải** có các thuộc tính: Tên gói, Giá, Giới hạn số API call (theo ngày/tháng).
*   `FRS-PROV-04`: **Dashboard & Báo cáo** *(Liên quan BRD: BR-PROV-04)*
    *   `FRS-PROV-04.1`: Hệ thống **phải** cung cấp dashboard hiển thị tổng số người dùng đang đăng ký dịch vụ, tổng số API call trong tháng, và doanh thu ước tính.

#### **3.5. Giao diện Quản trị viên (Admin Portal)**
*   `FRS-ADMIN-01`: **Quản lý Dịch vụ** *(Liên quan BRD: BR-ADMIN-01)*
    *   `FRS-ADMIN-01.1`: Quản trị viên **phải** xem được danh sách các dịch vụ đang "Chờ duyệt".
    *   `FRS-ADMIN-01.2`: Quản trị viên **phải** có quyền "Phê duyệt" hoặc "Từ chối" (kèm lý do) một dịch vụ.
*   `FRS-ADMIN-02`: **Quản lý Người dùng** *(Liên quan BRD: BR-ADMIN-02)*
    *   `FRS-ADMIN-02.1`: Quản trị viên **phải** có thể xem, tìm kiếm, và khóa/mở khóa tài khoản của cả Nhà cung cấp và Người dùng cuối.

---

### **4. Yêu cầu Phi Chức năng (Non-Functional Requirements)**

*   `NFR-PERF-01`: **Hiệu năng (Performance)**
    *   Thời gian tải các trang chính (trang chủ, trang danh sách dịch vụ) **phải** dưới 3 giây.
    *   Thời gian phản hồi của API Gateway (không tính thời gian xử lý của dịch vụ gốc) **phải** dưới 200ms ở mức tải trung bình.
*   `NFR-SEC-01`: **Bảo mật (Security)**
    *   Toàn bộ truy cập vào hệ thống **phải** sử dụng giao thức HTTPS.
    *   Mật khẩu người dùng **phải** được băm (hashed) bằng thuật toán an toàn (ví dụ: bcrypt).
    *   Hệ thống **phải** được bảo vệ khỏi các lỗ hổng bảo mật phổ biến theo danh sách OWASP Top 10.
    *   API key **phải** được mã hóa khi lưu trữ trong cơ sở dữ liệu.
*   `NFR-AVAIL-01`: **Tính sẵn sàng (Availability)**
    *   Hệ thống **phải** đạt độ sẵn sàng 99.9% (thời gian downtime không quá 43 phút/tháng).
*   `NFR-USABIL-01`: **Tính dễ sử dụng (Usability)**
    *   Giao diện người dùng **phải** tuân thủ các nguyên tắc thiết kế nhất quán và có tính tương thích trên các trình duyệt phổ biến (Chrome, Firefox, Safari).
    *   Giao diện **phải** có thiết kế đáp ứng (responsive), hoạt động tốt trên cả máy tính và thiết bị di động.
*   `NFR-SCAL-01`: **Khả năng mở rộng (Scalability)**
    *   Kiến trúc hệ thống **phải** hỗ trợ khả năng mở rộng theo chiều ngang (horizontal scaling) để đáp ứng sự gia tăng về lưu lượng truy cập.