---
title: Branch Management
description: Managing Branches and Operators
slug: /branch-management
---

# Store Branch Management

Manages physical or logical branches and the operators (staff) assigned to them.

## Branch

**Schema:**
```sql
create table branch
(
    uuid_branch  varchar(40) not null
        primary key,
    name         varchar(100),
    uuid_user    varchar(40) not null
        unique -- Manager of the branch
);
```

## Operator

Staff members or operators.

**Schema:**
```sql
create table operator
(
    uuid_operator varchar(40) not null
        primary key,
    email         varchar(50)
);
```

## Vendor Reviews

Reviews specifically for the vendor/branch performance.

**Schema:**
```sql
create table vendor_review
(
    uuid_vendor_review varchar(40) not null
        primary key,
    uuid_vendor        varchar(40) not null
        references "user",
    rating             smallint default 0 not null,
    comment            text
);
```
