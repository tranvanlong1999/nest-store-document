---
sidebar_position: 19
title: "UC19 Diagrams - Tương tác bài viết Blog"
---

# Biểu đồ hệ thống UC19

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as Client
    participant API as API Gateway
    participant Service as Review Service
    participant DB as PostgreSQL
    participant Notify as Notification Service

    User->>API: POST /api/v1/blogs/{id}/review
    activate API
    API->>Service: addReview(dto)
    activate Service
    Service->>DB: save review
    DB-->>Service: saved

    par Async Actions
        Service->>DB: update blog comment count
        Service->>Notify: alertAuthor()
    end

    Service-->>API: return ReviewDTO
    deactivate Service
    API-->>User: 200 OK
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    User((User))
    API[API Gateway]
    Service[Review Service]
    DB[(Database)]
    Notify[Notif Service]

    User --1. POST /review--> API
    API --2. addReview()--> Service
    Service --3. Save--> DB
    Service --4. Update Count--> DB
    Service --5. Alert Author--> Notify
    Service -.6. ReviewDTO.-> API
    API -.7. 200 OK.-> User
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["User -> API: POST /api/v1/blogs/{id}/review"]
    Step1 --> Step2
    Step2["API -> Service: addReview(dto)"]
    Step2 --> Step3
    Step3["Service -> DB: save review"]
    Step3 --> Step4
    Step4["DB -> Service: saved"]
    Step4 --> Step5
    Step5["Service -> DB: update blog comment count"]
    Step5 --> Step6
    Step6["Service -> Notify: alertAuthor()"]
    Step6 --> Step7
    Step7["Service -> API: return ReviewDTO"]
    Step7 --> Step8
    Step8["API -> User: 200 OK"]
    Step8 --> End((End))
```
