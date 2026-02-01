---
sidebar_position: 13
title: "UC13 Diagrams - Quản lý Chi nhánh (Admin)"
---

# Biểu đồ hệ thống UC13

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Admin User
    participant API as API Gateway
    participant Service as Branch Service
    participant DB as PostgreSQL

    Admin->>API: POST /api/v1/admin/branches
    activate API
    API->>Service: createBranch(dto)
    activate Service
    Service->>DB: check User existence
    Service->>DB: check User is not manager

    alt Validation Failed
        Service-->>API: Error: User invalid/busy
        API-->>Admin: 400 Bad Request
    else Valid
        Service->>DB: save Branch
        Service->>DB: update User role (VENDOR)
        Service-->>API: return BranchDTO
        API-->>Admin: 200 OK
    end
    deactivate Service
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    Admin((Admin))
    API[API Gateway]
    Service[Branch Service]
    DB[(Database)]

    Admin --1. POST /branches--> API
    API --2. createBranch()--> Service
    Service --3. Check User--> DB
    DB -.4. Valid.-> Service
    Service --5. Save Branch--> DB
    Service --6. Update Role--> DB
    Service -.7. BranchDTO.-> API
    API -.8. 200 OK.-> Admin
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["Admin -> API: POST /api/v1/admin/branches"]
    Step1 --> Step2
    Step2["API -> Service: createBranch(dto)"]
    Step2 --> Step3
    Step3["Service -> DB: check User existence"]
    Step3 --> Step4
    Step4["Service -> DB: check User is not manager"]
    Step4 --> Condition{Validation Failed?}

    Condition -- Yes --> Step5
    Step5["Service -> API: Error: User invalid/busy"]
    Step5 --> Step6
    Step6["API -> Admin: 400 Bad Request"]
    Step6 --> End((End))

    Condition -- No --> Step7
    Step7["Service -> DB: save Branch"]
    Step7 --> Step8
    Step8["Service -> DB: update User role VENDOR"]
    Step8 --> Step9
    Step9["Service -> API: return BranchDTO"]
    Step9 --> Step10
    Step10["API -> Admin: 200 OK"]
    Step10 --> End
```
