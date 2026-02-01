---
sidebar_position: 21
title: "UC21 Diagrams - Quản lý Thông tin Tài chính (Vendor)"
---

# Biểu đồ hệ thống UC21

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Vendor as Vendor User
    participant API as API Gateway
    participant Service as Finance Service
    participant DB as PostgreSQL

    Vendor->>API: POST /api/v1/vendor/bank-accounts
    activate API
    API->>Service: addBankAccount(dto)
    activate Service
    Service->>DB: save bank_account
    DB-->>Service: saved
    Service-->>API: return AccountDTO
    deactivate Service
    API-->>Vendor: 200 OK
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    Vendor((Vendor))
    API[API Gateway]
    Service[Finance Service]
    DB[(Database)]

    Vendor --1. POST /bank-accounts--> API
    API --2. addAccount()--> Service
    Service --3. Save--> DB
    DB -.4. Saved.-> Service
    Service -.5. AccountDTO.-> API
    API -.6. 200 OK.-> Vendor
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["Vendor -> API: POST /api/v1/vendor/bank-accounts"]
    Step1 --> Step2
    Step2["API -> Service: addBankAccount(dto)"]
    Step2 --> Step3
    Step3["Service -> DB: save bank_account"]
    Step3 --> Step4
    Step4["DB -> Service: saved"]
    Step4 --> Step5
    Step5["Service -> API: return AccountDTO"]
    Step5 --> Step6
    Step6["API -> Vendor: 200 OK"]
    Step6 --> End((End))
```
