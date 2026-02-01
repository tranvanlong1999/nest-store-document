---
sidebar_position: 15
title: "UC15 Diagrams - Quản lý Cấu hình Ngôn ngữ (Admin)"
---

# Biểu đồ hệ thống UC15

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin User
    participant API as API Gateway
    participant Service as Locale Service
    participant DB as PostgreSQL
    participant Cache as Redis

    Admin->>API: POST /api/v1/admin/messages
    activate API
    API->>Service: updateMessage(dto)
    activate Service
    Service->>DB: save message
    DB-->>Service: saved
    Service->>Cache: evict(key)
    Service-->>API: return MessageDTO
    deactivate Service
    API-->>Admin: 200 OK
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    Admin((Admin))
    API[API Gateway]
    Service[Locale Service]
    DB[(Database)]
    Cache[(Redis)]

    Admin --1. POST /messages--> API
    API --2. updateMessage()--> Service
    Service --3. Save Msg--> DB
    Service --4. Evict Cache--> Cache
    Service -.5. MessageDTO.-> API
    API -.6. 200 OK.-> Admin
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["Admin -> API: POST /api/v1/admin/messages"]
    Step1 --> Step2
    Step2["API -> Service: updateMessage(dto)"]
    Step2 --> Step3
    Step3["Service -> DB: save message"]
    Step3 --> Step4
    Step4["DB -> Service: saved"]
    Step4 --> Step5
    Step5["Service -> Cache: evict(key)"]
    Step5 --> Step6
    Step6["Service -> API: return MessageDTO"]
    Step6 --> Step7
    Step7["API -> Admin: 200 OK"]
    Step7 --> End((End))
```
