---
title: Tổng quan
---

### **Giai đoạn 1: Khởi tạo và Lập kế hoạch (Initiation & Planning)**

#### **📄 TÀI LIỆU:**

1.  **[[Tuyên bố tầm nhìn và phạm vi dự án|Tuyên bố Tầm nhìn & Phạm vi (Vision & Scope Document)]]:** Mô tả tầm nhìn dài hạn, vấn đề kinh doanh cần giải quyết, và xác định rõ phạm vi của dự án.
2.  **[[Tài liệu yêu cầu kinh doanh|Tài liệu Yêu cầu Kinh doanh (Business Requirements Document - BRD)]]:** Mô tả các yêu cầu ở cấp độ kinh doanh, tập trung vào mục tiêu và lợi ích.
3.  **[[Tài liệu Yêu cầu Hệ thống Chức năng|Tài liệu Yêu cầu Hệ thống/Chức năng (SRS/FRS)]]:** Chi tiết hóa các yêu cầu từ BRD thành các chức năng cụ thể mà hệ thống cần có.
4.  **[[Kế hoạch Quản lý Dự án|Kế hoạch Quản lý Dự án (Project Management Plan)]]:** Tài liệu tổng thể bao gồm kế hoạch về tiến độ, chi phí, nguồn lực, rủi ro, và giao tiếp.
5.  **[[Cấu trúc Phân rã Công việc|Cấu trúc Phân rã Công việc (Work Breakdown Structure - WBS)]]:** Chia nhỏ dự án thành các gói công việc (work packages) dễ quản lý và ước tính hơn.
6.  **[[Sơ đồ Gantt|Sơ đồ Gantt (Gantt Chart)]]:** Biểu đồ hóa tiến độ dự án, thể hiện các công việc, thời gian thực hiện và sự phụ thuộc lẫn nhau.

#### **🛠️ CÔNG CỤ:**

*   **Quản lý dự án & Tác vụ:**
    *   **Jira:** Cực kỳ mạnh mẽ cho các dự án Agile (Scrum, Kanban), quản lý backlog, sprint, và theo dõi lỗi.
    *   **Asana, Trello:** Đơn giản hơn Jira, phù hợp cho quản lý tác vụ và các dự án nhỏ hơn.
    *   **Microsoft Project:** Công cụ truyền thống mạnh về lập kế hoạch theo mô hình Thác nước (Waterfall) và vẽ sơ đồ Gantt.
*   **Tài liệu & Cộng tác:**
    *   **Confluence:** Hệ thống wiki nội bộ, tích hợp chặt chẽ với Jira, lý tưởng để lưu trữ tài liệu dự án.
    *   **Google Workspace (Docs, Sheets, Slides), Microsoft 365:** Dùng cho việc soạn thảo văn bản, bảng tính và trình bày.
*   **Vẽ sơ đồ & Lên ý tưởng:**
    *   **Miro, Lucidchart:** Bảng trắng kỹ thuật số để brainstorm, vẽ quy trình (flowcharts), sơ đồ kiến trúc.

---

### **Giai đoạn 2: Thiết kế (Design)**

Giai đoạn này tập trung vào việc "Làm thế nào" để xây dựng hệ thống.

#### **📄 TÀI LIỆU:**

1.  **Tài liệu Thiết kế Kiến trúc (Architecture Design Document):** Sơ đồ tổng quan về kiến trúc hệ thống (ví dụ: Microservices, client-server), các thành phần chính và luồng dữ liệu.
2.  **Tài liệu Thiết kế Kỹ thuật (Technical Design Document):** Mô tả chi tiết cách triển khai một tính năng hoặc một module cụ thể.
3.  **Thiết kế Giao diện (UI) & Trải nghiệm Người dùng (UX):**
    *   **Wireframes:** Bố cục xương sườn của giao diện.
    *   **Mockups:** Thiết kế trực quan, có màu sắc, hình ảnh chi tiết.
    *   **Prototypes:** Mẫu thử có thể tương tác được để người dùng trải nghiệm trước khi code.
4.  **Đặc tả API (API Specification):** Tài liệu mô tả các endpoints, request/response formats, mã lỗi... (thường dùng OpenAPI/Swagger).
5.  **Thiết kế Cơ sở dữ liệu (Database Schema/ERD):** Sơ đồ mô tả các bảng, các trường và mối quan hệ giữa chúng.

#### **🛠️ CÔNG CỤ:**

*   **Thiết kế UI/UX:**
    *   **Figma:** Công cụ thiết kế và prototype dựa trên web, rất mạnh cho cộng tác nhóm.
    *   **Sketch, Adobe XD:** Các lựa chọn phổ biến khác.
*   **Thiết kế API:**
    *   **Postman, Insomnia:** Dùng để thiết kế, thử nghiệm và tài liệu hóa API.
    *   **Swagger Hub:** Nền tảng để thiết kế và quản lý đặc tả OpenAPI.

---

### **Giai đoạn 3: Phát triển và Kiểm thử (Development & Testing)**

Giai đoạn này là nơi code được viết và chất lượng được đảm bảo.

#### **📄 TÀI LIỆU:**

1.  **Hướng dẫn về Quy chuẩn Code (Coding Standards/Guidelines):** Quy tắc về cách đặt tên biến, cấu trúc code... để đảm bảo tính nhất quán.
2.  **Kế hoạch Kiểm thử (Test Plan):** Mô tả chiến lược, phạm vi và phương pháp kiểm thử.
3.  **Kịch bản Kiểm thử (Test Cases/Scenarios):** Các bước chi tiết để kiểm tra một chức năng cụ thể và kết quả mong đợi.
4.  **Báo cáo Lỗi (Bug Reports):** Tài liệu ghi lại các lỗi được tìm thấy, bao gồm các bước tái hiện, mức độ nghiêm trọng...

#### **🛠️ CÔNG CỤ:**

*   **Quản lý Mã nguồn (Version Control):**
    *   **Git:** Hệ thống quản lý phiên bản phân tán (bắt buộc phải có).
    *   **GitHub, GitLab, Bitbucket:** Các nền tảng lưu trữ kho mã nguồn Git, cung cấp thêm tính năng quản lý pull request, CI/CD, và theo dõi issues.
*   **Tích hợp/Triển khai Liên tục (CI/CD):**
    *   **Jenkins:** Một máy chủ tự động hóa mã nguồn mở, rất linh hoạt.
    *   **GitHub Actions, GitLab CI/CD:** Các công cụ CI/CD tích hợp sẵn trong nền tảng tương ứng.
*   **Kiểm thử:**
    *   **Selenium, Cypress:** Tự động hóa kiểm thử trên trình duyệt web.
    *   **JMeter, Gatling:** Kiểm thử hiệu năng và tải.
    *   **SonarQube:** Phân tích chất lượng code tĩnh.

---

### **Giai đoạn 4: Triển khai và Vận hành (Deployment & Operations)**

Giai đoạn này đưa sản phẩm đến tay người dùng và duy trì hoạt động.

#### **📄 TÀI LIỆU:**

1.  **Kế hoạch Triển khai (Deployment Plan):** Các bước chi tiết để triển khai phiên bản mới lên môi trường production.
2.  **Ghi chú Phát hành (Release Notes):** Tóm tắt các thay đổi, tính năng mới và sửa lỗi trong một phiên bản.
3.  **Tài liệu Hướng dẫn Người dùng (User Manual/Documentation):** Hướng dẫn người dùng cuối cách sử dụng sản phẩm.
4.  **Sổ tay Vận hành (Runbook):** Hướng dẫn cho đội vận hành cách xử lý các sự cố thường gặp.

#### **🛠️ CÔNG CỤ:**

*   **Hạ tầng & Container hóa:**
    *   **Docker:** Đóng gói ứng dụng và các thành phần phụ thuộc vào một container.
    *   **Kubernetes:** Điều phối và quản lý các container ở quy mô lớn.
    *   **Terraform, Ansible:** Công cụ Quản lý hạ tầng dưới dạng mã (Infrastructure as Code - IaC).
*   **Nền tảng Đám mây (Cloud Platforms):**
    *   **AWS, Google Cloud (GCP), Microsoft Azure.**
*   **Giám sát và Ghi log (Monitoring & Logging):**
    *   **Prometheus & Grafana:** Bộ đôi giám sát hệ thống và hiển thị dashboard.
    *   **ELK Stack (Elasticsearch, Logstash, Kibana), Datadog:** Quản lý và phân tích log tập trung.

---

### **Công cụ và Nền tảng Hỗ trợ Xuyên suốt**

*   **Giao tiếp Nhóm:** **Slack, Microsoft Teams** là không thể thiếu để giao tiếp hàng ngày, thảo luận nhanh và thông báo.
*   **IDE (Môi trường phát triển tích hợp):** Visual Studio Code, IntelliJ IDEA, Eclipse... (đây là nơi viết code).

Tóm lại, một dự án lớn thành công là sự kết hợp giữa **viết code giỏi**, **lập kế hoạch kỹ lưỡng**, **tài liệu hóa rõ ràng**, và **sử dụng công cụ hiệu quả**.