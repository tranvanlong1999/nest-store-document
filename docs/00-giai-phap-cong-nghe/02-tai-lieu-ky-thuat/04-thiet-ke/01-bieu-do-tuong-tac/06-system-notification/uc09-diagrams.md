---
sidebar_position: 9
title: "UC09 Diagrams - Đăng ký nhận thông báo"
---

# Biểu đồ hệ thống UC09

## Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor User as Client
    participant API as API Gateway
    participant Service as Notify Service
    participant DB as PostgreSQL
    participant Kafka as Apache Kafka

    User->>API: POST /api/v1/notifications/subscribe
    activate API
    API->>Service: subscribe(dto)
    activate Service
    Service->>DB: save preference
    DB-->>Service: saved
    Service->>Kafka: publish(SubscriptionEvent)
    Service-->>API: Success
    deactivate Service
    API-->>User: 200 OK
    deactivate API
```

## Communication Diagram

```mermaid
graph LR
    User((User))
    API[API Gateway]
    Service[Notify Service]
    DB[(Database)]
    Kafka[Kafka Broker]

    User --1. POST /subscribe--> API
    API --2. subscribe()--> Service
    Service --3. Save Prefs--> DB
    Service --4. Publish Event--> Kafka
    Service -.5. Success.-> API
    API -.6. 200 OK.-> User
```

## Activity Diagram

```mermaid
graph TD
    Start((Start))
    Start --> Step1
    Step1["User -> API: POST /api/v1/notifications/subscribe"]
    Step1 --> Step2
    Step2["API -> Service: subscribe(dto)"]
    Step2 --> Step3
    Step3["Service -> DB: save preference"]
    Step3 --> Step4
    Step4["DB -> Service: saved"]
    Step4 --> Step5
    Step5["Service -> Kafka: publish(SubscriptionEvent)"]
    Step5 --> Step6
    Step6["Service -> API: Success"]
    Step6 --> Step7
    Step7["API -> User: 200 OK"]
    Step7 --> End((End))
```
