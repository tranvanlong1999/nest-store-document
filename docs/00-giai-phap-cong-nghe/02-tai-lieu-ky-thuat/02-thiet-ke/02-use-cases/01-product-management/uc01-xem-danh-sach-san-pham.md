---
title: UC01 - Xem danh sách sản phẩm
description: Mô tả chi tiết kịch bản người dùng xem danh sách sản phẩm trên hệ thống.
---

# UC01 - Xem danh sách sản phẩm

## 1. Mô tả yêu cầu chức năng

Cho phép khách hàng hoặc quản trị viên xem danh sách các sản phẩm đang có trong hệ thống, kèm theo thông tin cơ bản về giá và tồn kho. Hệ thống hỗ trợ phân trang và lọc dữ liệu.

## 2. Tiền xử lý

- Không yêu cầu đăng nhập đối với khách hàng (truy cập công khai).
- Đối với quản trị viên, cần có quyền xem danh sách sản phẩm để thực hiện các thao tác quản lý.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `GET`
- **URL**: `/api/v1/products`
- **Authentication**: Không bắt buộc (Công khai).

## 4. Yêu cầu đầu vào

Cung cấp các tham số thông qua Query String để phân trang và tìm lọc:

| Tham số      | Kiểu dữ liệu | Mô tả                                   | Bắt buộc            |
| :----------- | :----------- | :-------------------------------------- | :------------------ |
| `page`       | integer      | Chỉ số trang cần xem                    | Không (Mặc định 0)  |
| `size`       | integer      | Số lượng bản ghi mỗi trang              | Không (Mặc định 20) |
| `sort`       | string       | Trường cần sắp xếp (ví dụ: `price,asc`) | Không               |
| `q`          | string       | Từ khóa tìm kiếm theo tên sản phẩm      | Không               |
| `categoryId` | string       | Lọc theo danh mục sản phẩm              | Không               |

## 5. Hậu xử lý

- Hệ thống truy vấn cơ sở dữ liệu (Bảng `product`).
- Tính toán tổng số lượng bản ghi để phục vụ phân trang.
- Trả về danh sách đối tượng chứa thông tin sản phẩm rút gọn.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu thành công.
- **Body**: Một đối tượng JSON chứa danh sách sản phẩm.

```json
{
  "timestamp": "2024-11-20T10:00:00Z",
  "status": 200,
  "message": "Success",
  "data": {
    "content": [
      {
        "uuid_product": "p-12345",
        "title": "Sản phẩm A",
        "slug": "san-pham-a",
        "price": 500000,
        "discount": 50000,
        "quantity": 100,
        "thumbnail": "https://cdn.nest-store.com/image-a.jpg"
      }
    ],
    "totalPages": 5,
    "totalElements": 100,
    "size": 20,
    "number": 0
  }
}
```

- **Trường hợp lỗi**:
  - `400 Bad Request`: Nếu tham số phân trang (`page`, `size`) không hợp lệ.
  - `500 Internal Server Error`: Lỗi không xác định từ phía server.

---

> [!TIP]
> Sử dụng tham số `q` để tìm kiếm nhanh theo tiêu đề sản phẩm (Title).
