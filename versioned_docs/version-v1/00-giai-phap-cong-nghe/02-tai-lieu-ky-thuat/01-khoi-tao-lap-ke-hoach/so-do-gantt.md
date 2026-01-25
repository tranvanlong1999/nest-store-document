---
title: Sơ đồ Gantt
---



| **Ngày:** | 29/08/2025 | **Phiên bản:** | 1.0 |
| :--- | :--- | :--- | :--- |
| **Soạn thảo bởi:** | [Tên Quản lý Dự án] | | |

---

### **1. Giới thiệu**

Tài liệu này trình bày Sơ đồ Gantt cho dự án Helix Core Marketplace, cung cấp một cái nhìn tổng quan trực quan về tiến độ dự kiến, các tác vụ chính, thời gian ước tính và mối quan hệ phụ thuộc giữa chúng. Sơ đồ này được xây dựng dựa trên Cấu trúc Phân rã Công việc (WBS) và các ước tính đã được thống nhất. Nó là một công cụ hỗ trợ quản lý dự án, giúp theo dõi tiến độ, xác định các điểm nghẽn tiềm ẩn và giao tiếp về kế hoạch với các bên liên quan.

**Lưu ý quan trọng:** Mặc dù dự án sử dụng phương pháp Agile (Scrum), Sơ đồ Gantt này vẫn hữu ích cho việc lập kế hoạch cấp cao (roadmap) và thể hiện các cột mốc quan trọng, đặc biệt là khi giao tiếp với các bên liên quan không trực tiếp tham gia vào các Sprint hàng ngày. Đối với việc quản lý chi tiết trong từng Sprint, Jira và Product Backlog sẽ là công cụ chính.

---

### **2. Các Giai đoạn và Cột mốc Chính**

Dự án được chia thành các giai đoạn chính với các cột mốc quan trọng sau:

*   **Giai đoạn 0: Khởi tạo và Lập kế hoạch** (Tuần 1-2)
    *   **Cột mốc 0:** Hoàn thành Tài liệu Tầm nhìn & Phạm vi, BRD, SRS/FRS, PMP, WBS.
*   **Giai đoạn 1: Thiết kế & Kiến trúc** (Tuần 3-6)
    *   **Cột mốc 1:** Hoàn thành Thiết kế UI/UX và Kiến trúc Hệ thống.
*   **Giai đoạn 2: Phát triển Core MVP** (Tuần 7-20)
    *   **Cột mốc 2:** Hoàn thành Phát triển các chức năng lõi cho MVP (Backend & Frontend).
*   **Giai đoạn 3: Kiểm thử & Chuẩn bị Triển khai** (Tuần 21-25)
    *   **Cột mốc 3:** Hoàn thành Kiểm thử Nội bộ (Internal QA) và UAT cho MVP.
*   **Giai đoạn 4: Triển khai & Ra mắt MVP** (Tuần 26-27)
    *   **Cột mốc 4:** Triển khai MVP (Go-live).
*   **Giai đoạn 5: Vận hành & Phát triển Tiếp theo** (Từ Tuần 28 trở đi)
    *   **Cột mốc 5:** Onboard thành công 5 Nhà cung cấp đầu tiên.

---

### **3. Sơ đồ Gantt (Mermaid Syntax)**

```mermaid
gantt
    dateFormat  YYYY-MM-DD
    title       Tiến độ Dự án Helix Core Marketplace (MVP)
    %% Section 0: Khởi tạo và Lập kế hoạch
    section Khởi tạo & Lập kế hoạch
    KT-01: Lập kế hoạch dự án chung              :crit, a1, 2025-09-02, 5d
    KT-02: Phân tích yêu cầu (BRD/SRS)           :crit, a2, after a1, 10d
    milestone M0: Hoàn thành tài liệu kế hoạch   :2025-09-16
    %% Section 1: Thiết kế
    section Thiết kế
    TK-01: Thiết kế UX (Wireframes, Userflows)   : a3, 2025-09-17, 10d
    TK-02: Thiết kế UI (Mockups, Design System)  : a4, after a3, 15d
    TK-03: Thiết kế Kiến trúc Hệ thống           : crit, a5, after a2, 15d
    milestone M1: Hoàn thành thiết kế            :2025-10-14
    %% Section 2: Phát triển Core MVP
    section Phát triển Core MVP
    PT-01: Thiết lập môi trường & DevOps         : crit, a6, after M1, 10d
    PT-02: Backend: Quản lý User & Auth          : crit, a7, after a6, 15d
    PT-03: Backend: API Gateway & Metering       : crit, a8, after a7, 20d
    PT-04: Backend: Quản lý Provider             : crit, a9, after a8, 15d
    PT-05: Backend: Quản lý End User             : crit, a10, after a9, 15d
    PT-06: Frontend: Giao diện chung             : a11, after a6, 10d
    PT-07: Frontend: Marketplace công khai       : a12, after a11, 15d
    PT-08: Frontend: Portal Provider             : a13, after a12, 15d
    PT-09: Frontend: Portal End User             : a14, after a13, 20d
    PT-10: Tích hợp Frontend & Backend           : crit, a15, after a10, 10d
    milestone M2: Hoàn thành phát triển MVP      :2026-02-17
    %% Section 3: Kiểm thử & Chuẩn bị Triển khai
    section Kiểm thử & Chuẩn bị Triển khai
    KT-03: Lập kế hoạch kiểm thử & Viết test case : a16, after M2, 5d
    KT-04: Kiểm thử chức năng & tích hợp         : crit, a17, after a16, 15d
    KT-05: Kiểm thử hiệu năng & bảo mật          : crit, a18, after a17, 10d
    KT-06: UAT (User Acceptance Testing)         : crit, a19, after a18, 10d
    milestone M3: Hoàn thành kiểm thử            :2026-03-31
    %% Section 4: Triển khai & Ra mắt MVP
    section Triển khai & Ra mắt MVP
    TD-01: Chuẩn bị triển khai                   : a20, after M3, 5d
    TD-02: Triển khai Production                 : crit, a21, after a20, 2d
    milestone M4: Go-live MVP                    :2026-04-07
    %% Section 5: Vận hành & Phát triển Tiếp theo
    section Vận hành & Phát triển Tiếp theo
    VH-01: Giám sát & Hỗ trợ ban đầu             : a22, after M4, 20d
    VH-02: Onboard 5 Provider đầu tiên           : a23, after M4, 30d
    milestone M5: Đạt mục tiêu Onboard           :2026-05-19
```

#### **Cách đọc sơ đồ Mermaid:**
*   `dateFormat YYYY-MM-DD`: Định dạng ngày.
*   `title`: Tiêu đề của biểu đồ.
*   `section`: Chia dự án thành các giai đoạn lớn.
*   `[ID]: [Tên tác vụ]`: Định nghĩa một tác vụ.
*   `crit`: Đánh dấu tác vụ là "đường găng" (critical path), tức là nếu tác vụ này trễ, toàn bộ dự án sẽ trễ.
*   `a[số]`: Mã định danh duy nhất cho tác vụ để dùng trong `after`.
*   `YYYY-MM-DD`: Ngày bắt đầu.
*   `[Số]d`: Khoảng thời gian (ví dụ: 5 ngày).
*   `after [ID_tác_vụ_trước]`: Định nghĩa sự phụ thuộc (tác vụ này bắt đầu sau khi tác vụ kia kết thúc).
*   `milestone [Tên cột mốc]`: Định nghĩa một cột mốc quan trọng (không có thời gian kéo dài, chỉ có một ngày).

---

### **4. Giải thích & Hướng dẫn Sử dụng**

*   **Thời gian ước tính:** Các con số ngày (d) là ước tính ban đầu. Chúng sẽ được điều chỉnh và chi tiết hóa trong từng Sprint Planning dựa trên năng lực thực tế của đội nhóm.
*   **Phụ thuộc:** Các mối quan hệ `after` chỉ ra thứ tự logic của các công việc. PM cần đảm bảo các mối quan hệ này được tuân thủ.
*   **Đường găng:** Các tác vụ được đánh dấu `crit` là những tác vụ quan trọng nhất. PM cần theo dõi sát sao để đảm bảo chúng không bị chậm trễ, ảnh hưởng đến ngày kết thúc dự án.
*   **Cập nhật:** Sơ đồ Gantt này là một tài liệu sống. Nó cần được PM thường xuyên cập nhật để phản ánh tiến độ thực tế, các thay đổi về phạm vi hoặc nguồn lực.
*   **Công cụ:** Để quản lý chi tiết hơn và tận dụng tối đa tính năng, các công cụ chuyên dụng như Microsoft Project, Jira (với các plugin Gantt), Asana, hoặc Smartsheet sẽ được sử dụng. Mermaid ở đây cung cấp một bản trình bày gọn gàng, có thể tích hợp vào các tài liệu markdown.