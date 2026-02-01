---
sidebar_position: 7
title: "UC07 Diagrams - Kiểm tra mã giảm giá"
---

# Biểu đồ hệ thống UC07

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as Client
    participant API as API Gateway
    participant Service as Promo Service
    participant DB as PostgreSQL

    User->>API: GET /api/v1/promotions/validate
    activate API
    API->>Service: validatePromo(code, amount)
    activate Service
    Service->>DB: findByCode(code)
    DB-->>Service: return Promo Entity

    alt Not Found / Expired
        Service-->>API: Error: Invalid Code
        API-->>User: 404/400 Error
    else Valid
        Service->>Service: checkLimit()
        Service->>Service: calculateDiscount()
        Service-->>API: return PromoResponse
        API-->>User: 200 OK
    end
    deactivate Service
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    User((User))
    API[API Gateway]
    Service[Promo Service]
    DB[(Database)]

    User --1. GET /validate--> API
    API --2. validatePromo()--> Service
    Service --3. Find Code--> DB
    DB -.4. Promo Entity.-> Service
    Service --5. Check Logic--> Service
    Service -.6. Discount Info.-> API
    API -.7. 200 OK.-> User
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["User -> API: GET /api/v1/promotions/validate"]
    Step1 --> Step2
    Step2["API -> Service: validatePromo(code, amount)"]
    Step2 --> Step3
    Step3["Service -> DB: findByCode(code)"]
    Step3 --> Step4
    Step4["DB -> Service: return Promo Entity"]
    Step4 --> Condition{Is Valid?}

    Condition -- No --> Step5
    Step5["Service -> API: Error: Invalid Code"]
    Step5 --> Step6
    Step6["API -> User: 404/400 Error"]
    Step6 --> End((End))

    Condition -- Yes --> Step7
    Step7["Service -> Service: checkLimit()"]
    Step7 --> Step8
    Step8["Service -> Service: calculateDiscount()"]
    Step8 --> Step9
    Step9["Service -> API: return PromoResponse"]
    Step9 --> Step10
    Step10["API -> User: 200 OK"]
    Step10 --> End
```
