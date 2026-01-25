
# UC139: Share reports với team

## 1. Mô tả yêu cầu chức năng

Chức năng này cho phép người dùng (Admin hoặc người dùng có quyền) chia sẻ các báo cáo đã tạo với các thành viên khác trong nhóm hoặc tổ chức. Việc chia sẻ có thể được thực hiện thông qua việc cấp quyền truy cập trực tiếp, gửi liên kết an toàn, hoặc đính kèm báo cáo vào email. Điều này giúp đảm bảo rằng thông tin quan trọng được phân phối đến đúng người một cách hiệu quả.

## 2. Tiền xử lý

- Người dùng phải đang đăng nhập vào hệ thống và có quyền chia sẻ báo cáo.
- Báo cáo cần chia sẻ phải đã được tạo và có sẵn.
- Các thành viên trong nhóm/tổ chức phải có tài khoản trong hệ thống hoặc địa chỉ email hợp lệ.

## 3. Định nghĩa Endpoint

- **HTTP Method**: `POST`
- **URL**: `/api/v1/reports/{reportId}/share`
- **Authentication**: Yêu cầu JWT Token hợp lệ của người dùng.

## 4. Yêu cầu đầu vào

- **Path Parameter**: `reportId` (UUID) - ID của báo cáo cần chia sẻ.
- **Body (JSON)**:

```json
{
  "shareType": "EMAIL", // EMAIL, DIRECT_ACCESS_LINK, USER_GROUP
  "recipients": [
    "team_member_1@example.com",
    "team_member_2@example.com"
  ], // Hoặc user IDs/group IDs tùy shareType
  "message": "Báo cáo doanh thu tháng 7 đã sẵn sàng để xem.", // Tùy chọn: tin nhắn kèm theo
  "accessLevel": "VIEWER" // VIEWER, EDITOR (nếu áp dụng)
}
```

- **Constraints**: 
    - `shareType`, `recipients` là bắt buộc.
    - `recipients` phải là danh sách các email hoặc ID người dùng/nhóm hợp lệ tùy thuộc vào `shareType`.
    - `accessLevel` phải là một trong các giá trị hợp lệ.

## 5. Hậu xử lý

- Hệ thống xác thực JWT Token và xác định người dùng.
- Kiểm tra xem `reportId` có hợp lệ và báo cáo đó thuộc về người dùng hiện tại không.
- Dựa trên `shareType`:
    - **EMAIL**: Tạo một liên kết an toàn đến báo cáo (có thể có thời hạn) và gửi email đến các `recipients` với liên kết và `message`.
    - **DIRECT_ACCESS_LINK**: Tạo một liên kết an toàn đến báo cáo và trả về cho người dùng để họ tự chia sẻ. Liên kết này có thể được bảo vệ bằng mật khẩu hoặc thời hạn.
    - **USER_GROUP**: Cấp quyền truy cập báo cáo trực tiếp cho các `userIds` hoặc `groupIds` được chỉ định trong hệ thống quản lý quyền.
- Ghi log hoạt động chia sẻ báo cáo.

## 6. Yêu cầu đầu ra

- **HTTP Status**: `200 OK` nếu yêu cầu chia sẻ được chấp nhận.
- **Body**: Một đối tượng JSON xác nhận việc chia sẻ:

```json
{
  "reportId": "uuid-cua-report",
  "message": "Report shared successfully.",
  "sharedLink": "https://yourdomain.com/reports/share/secure-link" // Chỉ trả về nếu shareType là DIRECT_ACCESS_LINK
}
```

- **Trường hợp lỗi**: 
    - `400 Bad Request`: Nếu dữ liệu đầu vào không hợp lệ hoặc không đủ quyền.
    - `401 Unauthorized`: Nếu người dùng chưa đăng nhập hoặc JWT Token không hợp lệ.
    - `403 Forbidden`: Nếu báo cáo không thuộc về người dùng hiện tại hoặc người dùng không có quyền chia sẻ.
    - `404 Not Found`: Nếu không tìm thấy báo cáo với `reportId` được cung cấp.
    - `500 Internal Server Error`: Lỗi không xác định từ phía server.

