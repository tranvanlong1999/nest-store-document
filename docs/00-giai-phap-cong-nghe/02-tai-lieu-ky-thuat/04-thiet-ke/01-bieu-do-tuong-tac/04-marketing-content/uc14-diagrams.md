---
sidebar_position: 14
title: "UC14 Diagrams - Soạn thảo bài viết Blog (Admin)"
---

# Biểu đồ hệ thống UC14

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin User
    participant API as API Gateway
    participant Service as Blog Service
    participant DB as PostgreSQL

    Admin->>API: POST /api/v1/admin/blogs
    activate API
    API->>Service: createBlog(dto)
    activate Service
    Service->>DB: save blog entity
    DB-->>Service: saved
    Service->>DB: update tags if new
    Service-->>API: return BlogDTO
    deactivate Service
    API-->>Admin: 200 OK
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    Admin((Admin))
    API[API Gateway]
    Service[Blog Service]
    DB[(Database)]

    Admin --1. POST /blogs--> API
    API --2. createBlog()--> Service
    Service --3. Save Blog--> DB
    DB -.4. Saved.-> Service
    Service --5. Update Tags--> DB
    Service -.6. BlogDTO.-> API
    API -.7. 200 OK.-> Admin
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["Admin -> API: POST /api/v1/admin/blogs"]
    Step1 --> Step2
    Step2["API -> Service: createBlog(dto)"]
    Step2 --> Step3
    Step3["Service -> DB: save blog entity"]
    Step3 --> Step4
    Step4["DB -> Service: saved"]
    Step4 --> Step5
    Step5["Service -> DB: update tags if new"]
    Step5 --> Step6
    Step6["Service -> API: return BlogDTO"]
    Step6 --> Step7
    Step7["API -> Admin: 200 OK"]
    Step7 --> End((End))
```
