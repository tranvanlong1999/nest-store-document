---
sidebar_position: 11
title: "UC11 Diagrams - Quản lý Danh mục (Admin)"
---

# Biểu đồ hệ thống UC11

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin User
    participant API as API Gateway
    participant Service as Category Service
    participant DB as PostgreSQL
    participant Cache as Redis

    Admin->>API: POST /api/v1/admin/categories
    activate API
    API->>Service: createCategory(dto)
    activate Service
    Service->>DB: save(category)
    DB-->>Service: return saved entity
    Service->>Cache: invalidate("category_tree")
    Service-->>API: return CategoryDTO
    deactivate Service
    API-->>Admin: 200 OK
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    Admin((Admin))
    API[API Gateway]
    Service[Category Service]
    DB[(Database)]
    Cache[(Redis)]

    Admin -- "1. POST /categories" --> API
    API -- "2. createCategory()" --> Service
    Service -- "3. Save" --> DB
    DB -. "4. Success" .-> Service
    Service -- "5. Invalidate Tree" --> Cache
    Service -. "6. CategoryDTO" .-> API
    API -. "7. 200 OK" .-> Admin
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["Admin -> API: POST /api/v1/admin/categories"]
    Step1 --> Step2
    Step2["API -> Service: createCategory(dto)"]
    Step2 --> Step3
    Step3["Service -> DB: save(category)"]
    Step3 --> Step4
    Step4["DB -> Service: return saved entity"]
    Step4 --> Step5
    Step5["Service -> Cache: invalidate(\"category_tree\")"]
    Step5 --> Step6
    Step6["Service -> API: return CategoryDTO"]
    Step6 --> Step7
    Step7["API -> Admin: 200 OK"]
    Step7 --> End((End))
```
