---
title: Thiết kế API (RESTful Design)
description: Quy chuẩn thiết kế và giao tiếp giữa Frontend và Backend.
---

# Thiết kế API (RESTful Design)

Tài liệu này định nghĩa các quy chuẩn chung cho việc thiết kế và sử dụng API trong toàn bộ hệ thống Nest Store.

## 1. Nguyên tắc cốt lõi

- **RESTful Architecture:** Sử dụng các phương thức HTTP chuẩn (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
- **Nội dung trao đổi:** Luôn sử dụng định dạng `application/json`.
- **Naming Convention:** Sử dụng **camelCase** cho các thuộc tính trong JSON body.

## 2. Định dạng Phản hồi chuẩn (Standard Response)

Tất cả các API response đều tuân theo cấu trúc nhất quán:

```json
{
  "timestamp": "2024-11-20T10:00:00Z",
  "status": 200,
  "message": "Success",
  "data": { ... },
  "error": null
}
```

## 3. Phân trang và Bộ lọc (Pagination & Filtering)

Đối với các API danh sách (List APIs), luôn bắt buộc sử dụng phân trang để tối ưu hiệu năng:

- **Tham số chuẩn:**
  - `page`: Chỉ số trang (bắt đầu từ 0 hoặc 1).
  - `size`: Số lượng bản ghi trên một trang.
  - `sort`: Thuộc tính cần sắp xếp (ví dụ: `createdAt,desc`).
- **Response cho Pagination:**
  ```json
  "data": {
    "content": [ ... ],
    "totalElements": 100,
    "totalPages": 10,
    "size": 10,
    "number": 1
  }
  ```

## 4. Xử lý Lỗi (Error Handling)

Khi xảy ra lỗi, Backend sẽ trả về mã HTTP tương ứng và thông tin lỗi chi tiết:

| HTTP Status        | Trường hợp sử dụng                                     |
| :----------------- | :----------------------------------------------------- |
| `400 Bad Request`  | Dữ liệu đầu vào không hợp lệ (Validation failed).      |
| `401 Unauthorized` | Chưa đăng nhập hoặc Token hết hạn.                     |
| `403 Forbidden`    | Đã đăng nhập nhưng không có quyền truy cập tài nguyên. |
| `404 Not Found`    | Tài nguyên không tồn tại.                              |
| `500 Server Error` | Lỗi logic hệ thống hoặc database.                      |

## 5. Phiên bản hóa (Versioning)

Sử dụng định tuyến URL để phân biệt phiên bản:
`https://api.nest-store.com/v1/products`

---

> [!TIP]
> Hệ thống khuyến khích sử dụng **Swagger/OpenAPI UI** để tra cứu chi tiết các endpoint và schema dữ liệu thực tế tại môi trường Development.
