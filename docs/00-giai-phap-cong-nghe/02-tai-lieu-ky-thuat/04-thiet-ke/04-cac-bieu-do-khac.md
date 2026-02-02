---
title: "System Diagrams"
description: "High-level Architecture and Detailed Entity Relationship Diagrams for Nest Store."
---

# System Diagrams

Tài liệu này tổng hợp các biểu đồ kiến trúc và thiết kế cơ sở dữ liệu cho hệ thống Nest Store.

## 1. High-Level Architecture (C4 Model)

Mô hình kiến trúc tổng quan của hệ thống Nest Store, được thiết kế theo hướng **Microservices**.

```mermaid
graph TD
    %% Actors
    Customer[Customer]
    Vendor[Vendor]
    Admin[Admin/Operator]

    subgraph NestStoreSystem [Nest Store System]
        direction TB
        %% Frontend Containers
        WebApp[Web Application<br/>React/Next.js]
        AdminPortal[Admin Portal<br/>React/Next.js]

        %% Backend Boundary
        subgraph BackendServices [Backend Services - Microservices]
            direction TB
            APIGateway[API Gateway / Core Service<br/>Spring Boot]

            subgraph Modules [Business Modules]
                direction TB
                UserMod[User Module<br/>Spring Bean]
                StoreMod[Store Module<br/>Spring Bean]
                NotifyMod[Notify Module<br/>Spring Bean]
                WorkerMod[Worker Module<br/>Temporal Worker]
            end
        end

        %% Infrastructure / DBs
        Postgres[(PostgreSQL<br/>Relational DB)]
        Redis[(Redis<br/>Cache / KV Store)]
        Kafka{Apache Kafka<br/>Message Broker}
        MinIO[(MinIO<br/>Object Storage)]
        Temporal[(Temporal Service<br/>Workflow Engine)]
    end

    %% Relationships
    Customer -->|Uses| WebApp
    Vendor -->|Manages Store| WebApp
    Admin -->|Administers| AdminPortal

    WebApp -->|HTTPS/JSON| APIGateway
    AdminPortal -->|HTTPS/JSON| APIGateway

    APIGateway -->|Uses| UserMod
    APIGateway -->|Uses| StoreMod
    APIGateway -->|Uses| NotifyMod

    StoreMod -.->|Trigger Workflow| WorkerMod

    UserMod -->|Reads/Writes| Postgres
    StoreMod -->|Reads/Writes| Postgres

    APIGateway -->|Cache Access| Redis
    APIGateway -->|Pub/Sub| Kafka
    APIGateway -->|File Storage| MinIO
    APIGateway -->|Execute Workflows| Temporal
```

## 2. Comprehensive Entity Relationship Diagram (ERD)

Sơ đồ tổng hợp các thực thể chính trong hệ thống và mối quan hệ giữa chúng.

```mermaid
erDiagram
    %% User Module
    USER {
        varchar uuid_user PK
        varchar email UK
        varchar password
        smallint admin
        smallint vendor
        smallint activate
    }
    OPERATOR ||--|| USER : "is_a"
    BANK_ACCOUNTS }o--|| USER : "belongs_to"
    ADDRESS_ORDER }o--|| USER : "has"

    %% Product Module
    PRODUCT {
        varchar uuid_product PK
        varchar title
        varchar sku UK
        double price
        smallint quantity
        varchar uuid_branch FK
    }
    CATEGORY {
        varchar uuid_category PK
        varchar name
        varchar parent_id FK
    }
    PRODUCT_CATEGORY {
        varchar uuid_product FK
        varchar uuid_category FK
    }
    ATTRIBUTE {
        varchar uuid_attribute PK
        varchar name
    }
    PRODUCT_ATTRIBUTE {
        varchar uuid_product FK
        varchar uuid_attribute FK
        varchar value
    }
    TAG {
        varchar uuid_tag PK
        varchar name
    }
    PRODUCT_TAG {
        varchar uuid_product FK
        varchar uuid_tag FK
    }

    PRODUCT ||--o{ PRODUCT_CATEGORY : "classified_in"
    CATEGORY ||--o{ PRODUCT_CATEGORY : "contains"
    PRODUCT ||--o{ PRODUCT_ATTRIBUTE : "has_specs"
    ATTRIBUTE ||--o{ PRODUCT_ATTRIBUTE : "defines"
    PRODUCT ||--o{ PRODUCT_TAG : "tagged_with"
    TAG ||--o{ PRODUCT_TAG : "labels"

    %% Order Module
    ORDER {
        varchar uuid_order PK
        varchar user_id FK
        smallint status
        double grand_total
        varchar promo
    }
    ORDER_ITEM {
        varchar uuid_order_item PK
        varchar uuid_order FK
        varchar uuid_product FK
        double price
        int quantity
    }
    CART {
        varchar uuid_cart PK
        varchar user_id FK
    }
    CART_ITEM {
        varchar uuid_cart_item PK
        varchar uuid_cart FK
        varchar uuid_product FK
        int quantity
    }

    USER ||--o{ ORDER : "places"
    ORDER ||--o{ ORDER_ITEM : "contains"
    PRODUCT ||--o{ ORDER_ITEM : "ordered_as"

    USER ||--|| CART : "has_active"
    CART ||--o{ CART_ITEM : "contains"
    PRODUCT ||--o{ CART_ITEM : "added_to"

    %% Branch & Operations Module
    BRANCH {
        varchar uuid_branch PK
        varchar name
        varchar uuid_user FK
    }
    VENDOR_REVIEW {
        varchar uuid_vendor_review PK
        varchar uuid_vendor FK
        smallint rating
    }
    MESSAGE {
        varchar key PK
        varchar locale
        text content
    }

    BRANCH ||--|| USER : "managed_by"
    PRODUCT }o--|| BRANCH : "stocked_at"
    VENDOR_REVIEW }o--|| USER : "reviews_vendor"
```

## 3. Technology Stack & Component Interaction

Chi tiết về tương tác giữa các thành phần công nghệ (dựa trên tài liệu Backend Stack).

```mermaid
graph TD
    subgraph Client
        Browser[Web Browser / Mobile App]
    end

    subgraph "API Gateway / Load Balancer"
        Nginx[Nginx / Cloud LB]
    end

    subgraph "Application Server (Spring Boot Microservices)"
        Controller[REST Controllers]
        Service[Service Layer]

        subgraph "Modules"
            StoreMod[Nest Store Service]
            UserMod[Nest User Service]
            NotifyMod[Nest Notify Service]
        end

        Worker[Temporal Worker Service]
    end

    subgraph "Data Layer"
        Postgres[(PostgreSQL)]
        Redis[(Redis Cache)]
        MinIO[(MinIO Storage)]
    end

    subgraph "Messaging & Workflow"
        Kafka{Apache Kafka}
        TemporalServer[Temporal Service]
    end

    Browser -->|HTTPS/JSON| Nginx
    Nginx -->|Proxy| Controller
    Controller --> Service
    Service --> StoreMod & UserMod & NotifyMod

    StoreMod -->|JPA/QueryDSL| Postgres
    UserMod -->|JPA| Postgres

    Service -->|Cache| Redis
    Service -->|Publish Events| Kafka
    Service -->|Start Workflow| TemporalServer

    TemporalServer -->|Dispatch Task| Worker
    Worker -->|Execute Logic| StoreMod

    NotifyMod -->|Subscribe| Kafka
    StoreMod -->|Upload Images| MinIO
```

## 4. Sequence Diagrams

### 4.1. Order Processing Flow

Quy trình xử lý đơn hàng từ lúc khách hàng đặt mua cho đến khi hệ thống tiếp nhận và xử lý background.

```mermaid
sequenceDiagram
    autonumber
    actor User as Customer
    participant API as API Gateway / Controller
    participant Store as Store Module
    participant DB as PostgreSQL
    participant Tempo as Temporal Service
    participant Worker as Temporal Worker
    participant Notify as Notify Module

    User->>API: POST /api/v1/orders (Place Order)
    activate API
    API->>Store: validateOrder(items, address)
    activate Store
    Store->>DB: Check Inventory (Product)
    DB-->>Store: Inventory OK
    Store->>DB: Save Order (Status: PENDING)
    DB-->>Store: Order Saved
    Store->>Tempo: startWorkflow("OrderFlow", orderId)
    Tempo-->>Store: WorkflowId
    Store-->>API: Order Created
    deactivate Store
    API-->>User: 201 Created (OrderId)
    deactivate API

    par Async Processing
        Tempo->>Worker: Execute Activity: ReserveInventory
        Worker->>DB: Update Inventory (Reserve)
        Tempo->>Worker: Execute Activity: ProcessPayment
        Worker->>DB: Update Order Status (PAID)
        Tempo->>Worker: Execute Activity: SendNotification
        Worker->>Notify: sendEmail(OrderConfirmation)
        Notify-->>User: Email Sent
    end
```

### 4.2. Authentication Flow

Quy trình đăng nhập và lấy Token truy cập.

```mermaid
sequenceDiagram
    autonumber
    actor User as User/Client
    participant API as API Gateway (Spring Security)
    participant UserMod as User Module
    participant DB as PostgreSQL
    participant Cache as Redis

    User->>API: POST /api/v1/auth/login
    activate API
    API->>UserMod: authenticate(email, password)
    activate UserMod
    UserMod->>DB: findByEmail(email)
    DB-->>UserMod: User Entity (Hash)
    UserMod->>UserMod: Check Password (BCrypt)

    alt Password Valid
        UserMod->>UserMod: Generate JWT (Access + Refresh)
        UserMod->>Cache: Store Session/RefreshToken
        UserMod-->>API: Tokens
        API-->>User: 200 OK (Tokens)
    else Invalid
        UserMod-->>API: Exception (Bad Credentials)
        API-->>User: 401 Unauthorized
    end
    deactivate UserMod
    deactivate API
```
