---
sidebar_position: 8
title: "UC08 Diagrams - Xem danh sách chi nhánh"
---

# Biểu đồ hệ thống UC08

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as User/Guest
    participant API as API Gateway
    participant Service as Branch Service
    participant DB as PostgreSQL

    User->>API: GET /api/v1/branches
    activate API
    API->>Service: getBranches(filter)
    activate Service
    Service->>DB: query branches + manager info
    DB-->>Service: return list
    Service-->>API: return BranchDTO List
    deactivate Service
    API-->>User: 200 OK
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    User((User))
    API[API Gateway]
    Service[Branch Service]
    DB[(Database)]

    User --1. GET /branches--> API
    API --2. getBranches()--> Service
    Service --3. Query--> DB
    DB -.4. List.-> Service
    Service -.5. BranchDTO List.-> API
    API -.6. 200 OK.-> User
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["User -> API: GET /api/v1/branches"]
    Step1 --> Step2
    Step2["API -> Service: getBranches(filter)"]
    Step2 --> Step3
    Step3["Service -> DB: query branches + manager info"]
    Step3 --> Step4
    Step4["DB -> Service: return list"]
    Step4 --> Step5
    Step5["Service -> API: return BranchDTO List"]
    Step5 --> Step6
    Step6["API -> User: 200 OK"]
    Step6 --> End((End))
```
