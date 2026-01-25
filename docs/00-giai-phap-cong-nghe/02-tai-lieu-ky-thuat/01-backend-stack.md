---
title: "Công nghệ: Backend Stack"
description: Chi tiết về các công nghệ Backend, Cơ sở dữ liệu và Workflow engine.
---

# Công nghệ: Backend Stack

Hệ thống Nest Store Backend được xây dựng trên nền tảng Java hiện đại, tập trung vào hiệu năng, độ tin cậy và khả năng xử lý nghiệp vụ phức tạp.

## 1. Core Technology (Cốt lõi)

- **Ngôn ngữ:** Java 21 (LTS)
- **Framework:** Spring Boot 3.4.5
- **Build Tool:** Gradle

## 2. Database & Storage (Cơ sở dữ liệu & Lưu trữ)

- **Database chính:** PostgreSQL (Driver 42.7.5)
- **Database Migration:** Flyway
- **ORM / Query:**
  - Spring Data JPA
  - QueryDSL 6.11 (Type-safe queries)
  - Hibernate
- **Caching:**
  - Redis (Redisson 3.46.0 & Jedis 6.0.0)
  - Caffeine (Local cache)
- **Object Storage:** MinIO (Lưu trữ ảnh sản phẩm, tài liệu blog)

## 3. Messaging & Workflow

- **Message Broker:** Apache Kafka (spring-kafka)
- **Workflow Orchestration:** **Temporal** (v1.29.0) - Đảm bảo các luồng nghiệp vụ (như Order Flow) được thực thi bền vững.
- **State Management:** Spring State Machine (v4.0.0)

## 4. Security & Access Control

- **Authentication:** Spring Security 6.4.6, OAuth2 Resource Server.
- **Phân quyền:** **Casbin** (jcasbin) - Quản lý phân quyền động linh hợp.

## 5. Thư viện Utility

- **Mapping:** MapStruct 1.6.3
- **Boilerplate:** Lombok
- **JSON:** Gson 2.13.1
- **File Processing:** Apache POI (Excel), Apache Tika (Mime-type).
- **Functional:** Vavr 0.10.6

## 6. Business Logic Modules

Backend được chia thành các module chức năng:

- `nest-store-service`: Core commerce logic.
- `nest-user-service`: User & Identity.
- `nest-notify-service`: Notification processing.
- `nest-worker-service`: Temporal workers.

---

> [!TIP]
> Backend được thiết kế theo hướng **Modular Monolith**, sẵn sàng để chuyển đổi sang Microservices khi quy mô hệ thống yêu cầu.
