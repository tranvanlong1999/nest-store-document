---
title: User Management
description: Managing Customers and Accounts
slug: /user-management
---

# User Management

Manages user profiles, authentication, and addresses.

## User Entity

The `user` table is the core identity.

**Schema:**
```sql
create table "user"
(
    uuid_user     varchar(40)        not null
        primary key,
    email         varchar(50),
    password      varchar(32)        not null,
    first_name    varchar(50),
    last_name     varchar(50),
    mobile        varchar(15),
    admin         smallint default 0 not null,
    vendor        smallint default 0 not null,
    uuid_cart     varchar(40)        not null
        unique
);
```

### Roles
- **Admin**: `admin` flag (1=Admin, 0=User)
- **Vendor**: `vendor` flag (1=Vendor, 0=User)

## Related Entities

- **Bank Accounts**: `bank_accounts` table linked by... (Note: schema allows `uuid_bank_account` but no clear foreign key in provided SQL snippet, implying logical link or missing FK definition in snippet).
- **Address Order**: Snapshot of addresses used in orders.
