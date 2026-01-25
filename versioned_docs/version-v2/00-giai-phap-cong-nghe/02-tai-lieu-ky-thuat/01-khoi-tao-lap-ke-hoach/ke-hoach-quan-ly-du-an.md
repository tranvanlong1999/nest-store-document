---
title: Kế hoạch quản lý dự án
---



| **Ngày:**          | 29/08/2025        | **Phiên bản:**  | 1.0     |
| :----------------- | :---------------- | :-------------- | :------ |
| **Soạn thảo bởi:** | Trần Quang Trường | **Trạng Thái:** | Dự thảo |

---

### **1. Giới thiệu**

Tài liệu này vạch ra kế hoạch toàn diện để quản lý và thực thi dự án Helix Core Marketplace. Mục tiêu của kế hoạch này là định nghĩa rõ ràng các quy trình, công cụ và phương pháp luận sẽ được sử dụng để đảm bảo dự án được hoàn thành đúng tiến độ, trong phạm vi ngân sách, và đạt được các tiêu chuẩn chất lượng đã đề ra. Kế hoạch này là tài liệu tham chiếu chính cho tất cả các bên liên quan trong suốt vòng đời dự án.

---

### **2. Phương pháp luận Quản lý Dự án**

Dự án sẽ được quản lý theo phương pháp luận **Agile, cụ thể là framework Scrum**. Lựa chọn này dựa trên các lý do sau:
*   **Tính linh hoạt:** Cho phép đội dự án thích ứng nhanh chóng với các thay đổi về yêu cầu hoặc phản hồi từ thị trường.
*   **Tăng tính minh bạch:** Các buổi họp hàng ngày (Daily Stand-up), họp kế hoạch Sprint (Sprint Planning), và họp sơ kết Sprint (Sprint Review) đảm bảo tất cả mọi người đều nắm rõ tiến độ và các trở ngại.
*   **Bàn giao giá trị sớm:** Cho phép ra mắt một Sản phẩm Khả dụng Tối thiểu (Minimum Viable Product - MVP) sớm để thu thập phản hồi và sau đó phát triển lặp lại.

Mỗi Sprint sẽ kéo dài **2 tuần**.

---

### **3. Quản lý Phạm vi (Scope Management)**

*   **Đường cơ sở Phạm vi (Scope Baseline):** Tài liệu Yêu cầu Hệ thống & Chức năng (SRS/FRS) phiên bản 1.0 được coi là đường cơ sở cho phạm vi của dự án. Mọi công việc phát triển phải có thể truy vết về một hoặc nhiều yêu cầu trong tài liệu này.
*   **Quy trình Kiểm soát Thay đổi (Change Control Process):** Bất kỳ yêu cầu thay đổi nào đối với phạm vi đã được phê duyệt phải tuân theo quy trình sau:
    1.  **Gửi Yêu cầu Thay đổi (Change Request - CR):** Bên yêu cầu điền vào mẫu CR, mô tả rõ thay đổi và lý do kinh doanh.
    2.  **Phân tích Tác động:** Product Owner (PO) và Trưởng nhóm Kỹ thuật sẽ phân tích tác động của thay đổi lên tiến độ, chi phí và nguồn lực.
    3.  **Phê duyệt:** Yêu cầu sẽ được trình lên Ban kiểm soát thay đổi (bao gồm Nhà tài trợ, PO, PM) để phê duyệt hoặc từ chối.
    4.  **Cập nhật:** Nếu được phê duyệt, Product Backlog và các tài liệu liên quan sẽ được cập nhật.

---

### **4. Quản lý Tiến độ (Schedule Management)**

*   **Các Cột mốc Chính (Major Milestones):**

| **Cột mốc** | **Mô tả** | **Thời gian Dự kiến** |
| :--- | :--- | :--- |
| **M1** | Hoàn thành Thiết kế UI/UX và Kiến trúc Hệ thống | Tuần thứ 4 |
| **M2** | Hoàn thành Phát triển các chức năng lõi cho MVP | Tuần thứ 20 |
| **M3** | Hoàn thành Kiểm thử Nội bộ (Internal QA) cho MVP | Tuần thứ 24 |
| **M4** | Triển khai MVP (Go-live) | Tuần thứ 26 |
| **M5** | Onboard thành công 5 Nhà cung cấp đầu tiên | Tuần thứ 34 |

*   **Công cụ:**
    *   **Jira:** Sẽ được sử dụng để quản lý Product Backlog, Sprint Backlog và theo dõi tiến độ công việc hàng ngày.
    *   **Confluence:** Sẽ được sử dụng để lưu trữ tất cả các tài liệu dự án.

---

### **5. Quản lý Chi phí (Cost Management)**

*   **Ngân sách Dự án:** Tổng ngân sách được phê duyệt cho dự án là **[Số tiền X]**. Ngân sách này bao gồm các hạng mục sau:
    *   **Chi phí Nhân sự:** Lương cho đội ngũ dự án.
    *   **Chi phí Hạ tầng:** Chi phí dịch vụ đám mây (AWS/GCP), tên miền.
    *   **Chi phí Phần mềm:** Bản quyền các công cụ cần thiết (Jira, Figma...).
    *   **Dự phòng (10%):** Dành cho các rủi ro hoặc thay đổi không lường trước.
*   **Theo dõi Chi phí:** Chi phí thực tế sẽ được theo dõi và báo cáo hàng tháng so với ngân sách đã được duyệt.

---

### **6. Quản lý Nguồn lực (Resource Management)**

*   **Đội ngũ Dự án:**

| **Vai trò** | **Số lượng** | **Trách nhiệm Chính** |
| :--- | :--- | :--- |
| **Quản lý Dự án (PM)** | 1 | Lập kế hoạch, theo dõi tiến độ, quản lý rủi ro, giao tiếp. |
| **Chủ sản phẩm (PO)** | 1 | Định nghĩa yêu cầu, quản lý Product Backlog, ưu tiên tính năng. |
| **Kỹ sư Backend** | 3 | Phát triển logic nghiệp vụ, API, cơ sở dữ liệu. |
| **Kỹ sư Frontend** | 2 | Xây dựng giao diện người dùng. |
| **Kỹ sư Kiểm thử (QA)** | 2 | Lập kế hoạch và thực hiện kiểm thử, báo cáo lỗi. |
| **Kỹ sư DevOps** | 1 | Quản lý hạ tầng, CI/CD, triển khai. |
| **Thiết kế UI/UX** | 1 | Thiết kế giao diện và trải nghiệm người dùng. |

---

### **7. Quản lý Rủi ro (Risk Management)**

*   **Sổ đăng ký Rủi ro (Risk Register):**

| **ID** | **Mô tả Rủi ro** | **Xác suất (1-5)** | **Tác động (1-5)** | **Kế hoạch Giảm thiểu / Ứng phó** |
| :--- | :--- | :--- | :--- | :--- |
| **R01** | **Rủi ro Thị trường:** Không thu hút được đủ Nhà cung cấp hoặc Người dùng cuối (vấn đề "con gà và quả trứng"). | 4 | 5 | Chủ động làm việc với một nhóm Nhà cung cấp ban đầu trước khi ra mắt. Có chính sách ưu đãi cho những người dùng đầu tiên. |
| **R02** | **Rủi ro Kỹ thuật:** Khó khăn trong việc tích hợp với các hệ thống API đa dạng của các Nhà cung cấp. | 3 | 4 | Xây dựng một bộ SDK/hướng dẫn tích hợp rõ ràng. Cung cấp hỗ trợ kỹ thuật trong giai đoạn onboarding. |
| **R03** | **Rủi ro Nguồn lực:** Thành viên chủ chốt rời khỏi dự án. | 2 | 4 | Đảm bảo tài liệu hóa tốt. Áp dụng quy trình "pair programming" để chia sẻ kiến thức. |
| **R04** | **Rủi ro An ninh:** Nền tảng bị tấn công, gây rò rỉ dữ liệu hoặc API key. | 2 | 5 | Thực hiện đánh giá an ninh (security audit) bởi bên thứ ba trước khi ra mắt. Tuân thủ các tiêu chuẩn bảo mật OWASP Top 10. |

---

### **8. Quản lý Giao tiếp (Communication Management)**

| **Nội dung Giao tiếp** | **Đối tượng** | **Phương tiện** | **Tần suất** | **Chủ trì** |
| :--- | :--- | :--- | :--- | :--- |
| **Họp Hàng ngày (Daily Stand-up)** | Đội dự án | Họp trực tiếp / MS Teams | Hàng ngày (15 phút) | PM |
| **Họp Kế hoạch Sprint** | Đội dự án | Họp trực tiếp | Đầu mỗi Sprint | PO |
| **Họp Sơ kết Sprint (Review/Demo)** | Đội dự án, Ban lãnh đạo | Họp trực tiếp / MS Teams | Cuối mỗi Sprint | PO / PM |
| **Họp Cải tiến Sprint (Retrospective)** | Đội dự án | Họp trực tiếp | Cuối mỗi Sprint | PM |
| **Báo cáo Tiến độ Dự án** | Ban lãnh đạo, các bên liên quan chính | Email / Báo cáo | Hàng tuần | PM |
