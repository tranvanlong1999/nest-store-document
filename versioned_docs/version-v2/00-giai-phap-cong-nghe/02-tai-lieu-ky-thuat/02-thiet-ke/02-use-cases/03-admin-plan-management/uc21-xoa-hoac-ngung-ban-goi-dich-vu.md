
# UC21: Xóa hoặc ngừng bán gói dịch vụ

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép Quản trị viên (Admin) xóa vĩnh viễn một gói dịch vụ hoặc đánh dấu nó là không còn bán (ngừng bán). Việc xóa gói dịch vụ sẽ loại bỏ nó khỏi danh sách các gói có sẵn cho người dùng mới đăng ký, trong khi ngừng bán cho phép giữ lại thông tin lịch sử nhưng không cho phép đăng ký mới.

## 2. Tiền xử lý

- Admin phải đăng nhập vào hệ thống với vai trò có quyền quản lý gói dịch vụ.
- Gói dịch vụ với ID được cung cấp phải tồn tại trong hệ thống.
- Cần có cơ chế xử lý người dùng hiện tại đang sử dụng gói dịch vụ bị xóa/ngừng bán (ví dụ: chuyển sang gói Free, thông báo nâng cấp).

## 3. Định nghĩa Endpoint

- **HTTP Method**: `DELETE`
- **URL**: `/api/v1/admin/plans/{planId}`
- **Authentication**: Yêu cầu JWT Token hợp lệ của Admin.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `planId` (UUID) - ID của gói dịch vụ cần xóa hoặc ngừng bán.
- **Query Parameter (tùy chọn)**:
    - `action`: (String) `DELETE` để xóa vĩnh viễn, `DEACTIVATE` để ngừng bán (mặc định là `DEACTIVATE`).

## 5. Hậu xử lý

- Hệ thống xác định gói dịch vụ theo `planId`.
- Nếu `action` là `DEACTIVATE`:
    - Cập nhật trạng thái của gói dịch vụ thành `INACTIVE` hoặc `UNAVAILABLE_FOR_SALE`.
    - Ghi log hoạt động ngừng bán.
- Nếu `action` là `DELETE`:
    - Kiểm tra xem có người dùng nào đang sử dụng gói này không. Nếu có, cần có chính sách xử lý (ví dụ: chuyển đổi gói, thông báo).
    - Xóa gói dịch vụ khỏi cơ sở dữ liệu.
    - Ghi log hoạt động xóa.
- (Tùy chọn) Gửi thông báo cho người dùng bị ảnh hưởng.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `204 No Content` nếu thành công (hoặc `200 OK` với thông báo).
- **Body**: (Nếu `200 OK`)

```json
{
  "message": "Plan successfully deactivated."
  // Hoặc: "message": "Plan successfully deleted."
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu `action` không hợp lệ hoặc có người dùng đang sử dụng gói dịch vụ khi cố gắng xóa.
    - `401 Unauthorized`: Nếu Admin chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu Admin không có quyền truy cập chức năng này.
    - `404 Not Found`: Nếu không tìm thấy gói dịch vụ với `planId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

