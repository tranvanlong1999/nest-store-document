---
title: Cấu trúc phân rã công việc
---


**DỰ ÁN: HELIX CORE MARKETPLACE**

| **Ngày:**          | 29/08/2025        | **Phiên bản:** | 1.0 |     |
| :----------------- | :---------------- | :------------- | :-- | --- |
| **Soạn thảo bởi:** | Trần Quang Trường |                |     |     |

---

### **1. Giới thiệu**

Tài liệu này trình bày Cấu trúc Phân rã Công việc cho dự án Helix Core Marketplace. WBS là một sự phân rã có định hướng theo sản phẩm bàn giao (deliverable-oriented) của toàn bộ công việc cần thực hiện để hoàn thành dự án. Mỗi cấp độ đi xuống đại diện cho một định nghĩa ngày càng chi tiết hơn về các thành phần của dự án. Gói công việc (Work Package) là cấp độ thấp nhất trong WBS, là cơ sở để lập kế hoạch, ước tính chi phí, phân công nguồn lực và theo dõi tiến độ.

**Lưu ý:** WBS không phải là một kế hoạch tiến độ. Nó không sắp xếp các công việc theo thứ tự thời gian mà chỉ định nghĩa toàn bộ phạm vi công việc.

---

### **2. Sơ đồ Cấu trúc Phân rã Công việc (WBS Diagram)**

**1.0 Dự án Helix Core Marketplace**

*   **1.1 Quản lý Dự án**
    *   1.1.1 Lập kế hoạch và Khởi tạo
    *   1.1.2 Theo dõi và Báo cáo Tiến độ
    *   1.1.3 Quản lý Rủi ro và Thay đổi
    *   1.1.4 Họp và Giao tiếp với các Bên liên quan
    *   1.1.5 Nghiệm thu và Đóng dự án

*   **1.2 Thiết kế**
    *   1.2.1 Thiết kế Trải nghiệm Người dùng (UX)
        *   1.2.1.1 Nghiên cứu và Phân tích Người dùng
        *   1.2.1.2 Xây dựng Luồng người dùng (User Flows)
        *   1.2.1.3 Xây dựng Wireframes
    *   1.2.2 Thiết kế Giao diện Người dùng (UI)
        *   1.2.2.1 Xây dựng Hệ thống Thiết kế (Design System)
        *   1.2.2.2 Thiết kế Mockups chi tiết
        *   1.2.2.3 Tạo Prototype tương tác
    *   1.2.3 Thiết kế Kiến trúc Hệ thống
        *   1.2.3.1 Thiết kế Kiến trúc Tổng thể (Microservices,...)
        *   1.2.3.2 Thiết kế Cơ sở dữ liệu (Schema Design)
        *   1.2.3.3 Thiết kế API (API Design & Specification)

*   **1.3 Phát triển (Development)**
    *   1.3.1 Thiết lập Môi trường & DevOps
        *   1.3.1.1 Thiết lập Kho mã nguồn (Git Repository)
        *   1.3.1.2 Thiết lập quy trình CI/CD
        *   1.3.1.3 Cấu hình Hạ tầng Đám mây (Staging, Production)
    *   1.3.2 Phát triển Backend
        *   1.3.2.1 Module Lõi: Quản lý Tài khoản & Xác thực
        *   1.3.2.2 Module Lõi: API Gateway & Rate Limiting
        *   1.3.2.3 Module Portal Nhà cung cấp (Provider)
        *   1.3.2.4 Module Portal Người dùng cuối (End User)
        *   1.3.2.5 Module Quản trị viên (Admin)
        *   1.3.2.6 Module Đo lường & Thống kê
    *   1.3.3 Phát triển Frontend
        *   1.3.3.1 Xây dựng Giao diện Chung (Layout, Header, Footer)
        *   1.3.3.2 Xây dựng Trang Marketplace Công khai
        *   1.3.3.3 Xây dựng Portal Nhà cung cấp
        *   1.3.3.4 Xây dựng Portal Người dùng cuối
        *   1.3.3.5 Xây dựng Portal Quản trị viên
    *   1.3.4 Tích hợp
        *   1.3.4.1 Tích hợp API Frontend và Backend
        *   1.3.4.2 Tích hợp Dịch vụ Bên thứ ba (Email Service...)

*   **1.4 Kiểm thử & Đảm bảo Chất lượng (QA)**
    *   1.4.1 Lập kế hoạch Kiểm thử (Test Planning)
    *   1.4.2 Viết Kịch bản Kiểm thử (Test Case Development)
    *   1.4.3 Thực hiện Kiểm thử
        *   1.4.3.1 Kiểm thử Chức năng (Functional Testing)
        *   1.4.3.2 Kiểm thử Tích hợp (Integration Testing)
        *   1.4.3.3 Kiểm thử Hiệu năng (Performance Testing)
        *   1.4.3.4 Kiểm thử Bảo mật (Security Testing)
    *   1.4.4 Theo dõi và Báo cáo Lỗi (Bug Tracking)
    *   1.4.5 Kiểm thử Chấp nhận của Người dùng (UAT)

*   **1.5 Triển khai (Deployment)**
    *   1.5.1 Chuẩn bị Kế hoạch Triển khai
    *   1.5.2 Triển khai lên Môi trường Staging
    *   1.5.3 Triển khai lên Môi trường Production (Go-live)
    *   1.5.4 Xác thực sau Triển khai

*   **1.6 Hỗ trợ sau Triển khai**
    *   1.6.1 Giai đoạn Giám sát và Hỗ trợ Tăng cường
    *   1.6.2 Đào tạo và Bàn giao
    *   1.6.3 Xây dựng Tài liệu Hướng dẫn

---

### **3. Từ điển WBS (WBS Dictionary)**

Đây là phần mô tả chi tiết cho một số gói công việc (Work Packages) tiêu biểu.

| **Mã WBS** | **1.3.2.2** |
| :--- | :--- |
| **Tên Gói công việc** | Module Lõi: API Gateway & Rate Limiting |
| **Mô tả công việc** | Xây dựng dịch vụ API Gateway hoạt động như một điểm truy cập duy nhất cho tất cả các yêu cầu API từ người dùng cuối. Dịch vụ này sẽ chịu trách nhiệm: xác thực API key, kiểm tra giới hạn sử dụng (rate limiting) dựa trên gói cước của người dùng, ghi nhận (log) request, và chuyển tiếp request đến endpoint dịch vụ tương ứng của nhà cung cấp. |
| **Sản phẩm bàn giao** | - Dịch vụ API Gateway có thể triển khai (deployable service).<br />- Các API endpoint để quản lý gateway.<br />- Tích hợp với module Quản lý Gói cước để lấy thông tin rate limit. |
| **Tiêu chí Hoàn thành** | - Tất cả request phải được xác thực API key thành công.<br />- Các request vượt quá giới hạn gói cước phải bị chặn và trả về mã lỗi 429 (Too Many Requests).<br />- Request hợp lệ được chuyển tiếp thành công đến dịch vụ đích.<br />- 85% code được bao phủ bởi Unit Test. |
| **Ước tính Nỗ lực** | 80 Story Points |
| **Người chịu trách nhiệm** | Đội Backend |

| **Mã WBS**                 | **1.3.3.4**                                                                                                                                                                                                                                                                                          |
| :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tên Gói công việc**      | Xây dựng Portal Người dùng cuối                                                                                                                                                                                                                                                                      |
| **Mô tả công việc**        | Phát triển toàn bộ giao diện người dùng cho khu vực quản lý của người dùng cuối sau khi đăng nhập. Bao gồm các trang: Dashboard, Quản lý Dịch vụ đã đăng ký, Quản lý API Key, Theo dõi Sản lượng sử dụng, và Quản lý Hồ sơ cá nhân. Tích hợp với các API từ backend để hiển thị và cập nhật dữ liệu. |
| **Sản phẩm bàn giao**      | - Các component giao diện (React/Vue/Angular) đã được phát triển và kiểm thử.<br />- Giao diện người dùng hoàn chỉnh, đáp ứng (responsive) cho Portal Người dùng cuối.<br />- Tích hợp thành công với các API backend liên quan.                                                                         |
| **Tiêu chí Hoàn thành**    | - Người dùng có thể thực hiện tất cả các chức năng được mô tả trong SRS (xem dịch vụ, tạo/xem key, xem biểu đồ sử dụng).<br />- Giao diện tuân thủ 100% theo Mockup đã được duyệt.<br />- Tất cả các trang hoạt động mượt mà trên các trình duyệt Chrome, Firefox và Safari phiên bản mới nhất.          |
| **Ước tính Nỗ lực**        | 120 Story Points                                                                                                                                                                                                                                                                                     |
| **Người chịu trách nhiệm** | Đội Frontend                                                                                                                                                                                                                                                                                         |

| **Mã WBS**                 | **1.4.3.3**                                                                                                                                                                                                                                                                                       |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tên Gói công việc**      | Kiểm thử Hiệu năng (Performance Testing)                                                                                                                                                                                                                                                          |
| **Mô tả công việc**        | Lập kế hoạch và thực thi các kịch bản kiểm thử tải (load testing) và kiểm thử sức chịu đựng (stress testing) cho các thành phần quan trọng của hệ thống, đặc biệt là API Gateway và các API đăng ký/đăng nhập. Sử dụng các công cụ như JMeter hoặc Gatling để giả lập nhiều người dùng đồng thời. |
| **Sản phẩm bàn giao**      | - Kế hoạch Kiểm thử Hiệu năng.<br />- Các script kiểm thử.<br />- Báo cáo kết quả kiểm thử, chỉ ra các điểm nghẽn cổ chai (bottlenecks) và thời gian phản hồi ở các mức tải khác nhau.                                                                                                                |
| **Tiêu chí Hoàn thành**    | - Hoàn thành thực thi các kịch bản kiểm thử đã được duyệt.<br />- Báo cáo kết quả kiểm thử được phân tích và trình bày cho đội dự án.<br />- Hệ thống đáp ứng các chỉ số hiệu năng đã đề ra trong tài liệu SRS (NFR-PERF-01).                                                                         |
| **Ước tính Nỗ lực**        | 30 Story Points                                                                                                                                                                                                                                                                                   |
| **Người chịu trách nhiệm** | Đội QA                                                                                                                                                                                                                                                                                            |