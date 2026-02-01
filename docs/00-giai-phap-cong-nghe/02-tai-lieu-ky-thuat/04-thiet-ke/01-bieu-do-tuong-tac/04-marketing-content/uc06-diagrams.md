---
sidebar_position: 6
title: "UC06 Diagrams - Xem danh sách bài viết blog"
---

# Biểu đồ hệ thống UC06

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as User/Guest
    participant API as API Gateway
    participant Service as Blog Service
    participant DB as PostgreSQL

    User->>API: GET /api/v1/blogs?page=0&tag=...
    activate API
    API->>Service: getBlogList(filter)
    activate Service
    Service->>DB: query blogs by tag/search
    DB-->>Service: return list
    Service-->>API: return BlogDTO List
    deactivate Service
    API-->>User: 200 OK
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    User((User))
    API[API Gateway]
    Service[Blog Service]
    DB[(Database)]

    User --1. GET /blogs--> API
    API --2. getBlogList()--> Service
    Service --3. Query by Tag--> DB
    DB -.4. Results.-> Service
    Service -.5. BlogDTO List.-> API
    API -.6. 200 OK.-> User
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["User -> API: GET /api/v1/blogs?page=0&tag=..."]
    Step1 --> Step2
    Step2["API -> Service: getBlogList(filter)"]
    Step2 --> Step3
    Step3["Service -> DB: query blogs by tag/search"]
    Step3 --> Step4
    Step4["DB -> Service: return list"]
    Step4 --> Step5
    Step5["Service -> API: return BlogDTO List"]
    Step5 --> Step6
    Step6["API -> User: 200 OK"]
    Step6 --> End((End))
```
