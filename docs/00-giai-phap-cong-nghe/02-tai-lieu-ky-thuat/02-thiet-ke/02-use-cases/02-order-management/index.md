---
title: Order Management
description: Managing Orders and Shopping Carts
slug: /order-management
---

# Order Management

This module handles the purchasing flow, from Cart to Order placement.

## Cart

The shopping cart allows users to accumulate items before purchase.

### Tables
- `cart`: Represents the cart session.
- `cart_item`: Individual items in the cart.

**Schema:**
```sql
create table cart
(
    uuid_cart_id varchar(30)               not null
        constraint cart_pk
            primary key,
    date_created date default CURRENT_DATE not null
);

create table cart_item
(
    uuid_cart_item varchar(40)                not null
        primary key,
    uuid_cart      varchar(40)                not null
        references "user" (uuid_cart), -- Note: References user.uuid_cart
    uuid_product   varchar(40),
    quantity       smallint         default 0 not null,
    price          double precision default 0 not null
);
```

## Orders

Once checkout is complete, a cart converts to an order.

### Tables
- `order`: The order header containing totals, status, and user info.
- `order_item`: Line items for the order.
- `address_order`: Shipping info snapshot.

**Schema:**
```sql
create table "order"
(
    uuid_order      varchar(40)                not null
        primary key,
    user_id         varchar(40)
        references "user",
    status          smallint         default 0 not null,
    subtotal        double precision default 0 not null,
    tax             double precision default 0 not null,
    shipping        double precision default 0 not null,
    total           double precision default 0 not null,
    grand_total     double precision default 0 not null,
    payment_methods varchar(10)
);

create table order_item
(
    uuid_order_item varchar(40)                not null
        primary key,
    uuid_product    varchar(40)                not null
        references product,
    uuid_order      varchar(40)                not null
        references "order",
    price           double precision default 0 not null,
    quantity        smallint         default 0 not null
);
```
