---
sidebar_position: 0
title: "Mô hình Yêu cầu"
description: "Tổng hợp các mô hình phân tích yêu cầu trong SDLC."
---

# 1. Mô hình Yêu cầu (Requirements Model)

Mô hình Yêu cầu được tạo ra trong quá trình **Thu thập Yêu cầu và Phân tích**. Nó đóng vai trò cầu nối giữa nhu cầu của khách hàng và thiết kế kỹ thuật.

| Sơ đồ/Mô hình                                         | Mục đích chính                                                                                                                                              | Vai trò trong SDLC                                                                                                                                                 |
| :---------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sơ đồ Use Case**<br/>_(Use Case Diagram)_           | Mô hình hóa các yêu cầu chức năng cấp cao của hệ thống và xác định các tác nhân (actors).                                                                   | Cung cấp cái nhìn tổng quan về chức năng của hệ thống cho các bên liên quan và là cơ sở cho việc xác định yêu cầu chức năng cấp thấp.                              |
| **Sơ đồ Hoạt động**<br/>_(Activity Diagram)_          | Mô hình hóa luồng sự kiện (workflow) của một Use Case, giúp xác nhận các kịch bản sử dụng.                                                                  | Giúp các bên liên quan xem liệu các yêu cầu đã được hiểu đúng chưa. Thường được dùng để mô hình hóa luồng công việc phức tạp của một Use Case.                     |
| **Mô hình Miền**<br/>_(Domain Model / Class Diagram)_ | Xác định các thực thể cốt lõi (key abstractions) hoặc các lớp trong miền vấn đề (problem domain) và các mối quan hệ (association, multiplicity) giữa chúng. | Là một trong những thành phần chính của Mô hình Yêu cầu. Hỗ trợ trong Phân tích Yêu cầu để tạo ra một danh sách thống nhất các thuật ngữ được sử dụng trong dự án. |
| **Sơ đồ Đối tượng**<br/>_(Object Diagram)_            | Là một thể hiện (instance) thời gian chạy (runtime) của Sơ đồ Lớp.                                                                                          | Được sử dụng để xác thực Mô hình Miền bằng cách phân tích nhiều kịch bản Use Case.                                                                                 |
