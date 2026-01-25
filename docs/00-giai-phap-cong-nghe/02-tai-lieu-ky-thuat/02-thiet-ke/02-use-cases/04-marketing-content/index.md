---
title: Marketing Content
description: Blogs and Promotions
slug: /marketing-content
---

# Marketing Content

This module handles content marketing (blogs) and sales promotions.

## Blogs

Content management system features.

**Schema:**
```sql
create table blogs
(
    uuid_blog   varchar(40) not null
        primary key,
    title       varchar(100),
    description text,
    created_at  timestamp,
    updated_at  timestamp
);

create table blog_reviews
(
    uuid_blog_review varchar(40) not null
        primary key,
    uuid_blog        varchar(40)
        references blogs,
    uuid_user        varchar(40)
        references "user",
    comment          text,
    rate             double precision
);
```

## Promotions

Discount logic and codes.

**Schema:**
```sql
create table promotions
(
    uuid_promotion   varchar(40) not null
        primary key,
    code             varchar(255),
    discount         numeric(5, 2),
    start_date       timestamp,
    end_date         timestamp,
    type             varchar(255)
);

create table product_promotion
(
    uuid_product_promotion varchar(40) not null
        primary key,
    uuid_product           varchar(40) references product,
    uuid_promotion         varchar(40) references promotions
);
```
