# Đặc Tả Mô Hình Phân Quyền Casbin

Đây là tài liệu đặc tả chi tiết về mô hình kiểm soát truy cập (Access Control Model) được sử dụng trong dự án, dựa trên file `model.conf` của Casbin.

## 1. Tổng Quan

Mô hình này được thiết kế để cung cấp một hệ thống phân quyền cực kỳ linh hoạt, kết hợp các yếu tố của **Role-Based Access Control (RBAC)** và **Attribute-Based Access Control (ABAC)**. Nó cho phép định nghĩa các quyền không chỉ dựa trên vai trò của người dùng mà còn dựa trên các thuộc tính/nhóm của tài nguyên (objects) và hành động (actions).

## 2. Cấu Trúc Mô Hình (`model.conf`)

### 2.1. `[request_definition]` - Định Nghĩa Request

```conf
[request_definition]
r = sub, obj, act
```

- **Ý nghĩa:** Mỗi yêu cầu (request) kiểm tra quyền truy cập phải bao gồm 3 thành phần:
  - `sub` (Subject): Chủ thể yêu cầu truy cập. Thường là ID người dùng hoặc tên một vai trò (role).
  - `obj` (Object): Đối tượng/tài nguyên đang được yêu cầu truy cập. Ví dụ: một API endpoint, một file, một trang dữ liệu.
  - `act` (Action): Hành động mà chủ thể muốn thực hiện lên đối tượng. Ví dụ: `read`, `write`, `delete`, `create`.

### 2.2. `[policy_definition]` - Định Nghĩa Policy

```conf
[policy_definition]
p = sub, obj, act, eft
```

- **Ý nghĩa:** Mỗi quy tắc (policy) trong hệ thống sẽ được định nghĩa với 4 thành phần:
  - `sub`, `obj`, `act`: Tương ứng với các thành phần trong request.
  - `eft` (Effect): Hiệu lực của quy tắc. Giá trị có thể là `allow` (cho phép) hoặc `deny` (từ chối). Mặc định, nếu không có quy tắc nào khớp, quyền sẽ bị từ chối.

### 2.3. `[role_definition]` - Định Nghĩa Vai Trò và Nhóm

```conf
[role_definition]
g = _, _
g2 = _, _
g3 = _, _
```

- **Ý nghĩa:** Đây là phần mạnh mẽ nhất của mô hình, cho phép phân nhóm linh hoạt.
  - `g = _, _`: **Nhóm User-Role.** Dùng để gán người dùng (user) vào các vai trò (role).
    - *Ví dụ:* `g, alice, admin` (Người dùng `alice` thuộc vai trò `admin`).
  - `g2 = _, _`: **Nhóm Object (Tài nguyên).** Dùng để nhóm các tài nguyên có cùng tính chất.
    - *Ví dụ:* `g2, /api/users/1, user_data` và `g2, /api/users/2, user_data` (Nhóm các endpoint chi tiết người dùng vào nhóm `user_data`).
  - `g3 = _, _`: **Nhóm Action (Hành động).** Dùng để nhóm các hành động có cùng bản chất.
    - *Ví dụ:* `g3, read, read_actions` và `g3, list, read_actions` (Nhóm các hành động đọc/liệt kê vào nhóm `read_actions`).

### 2.4. `[policy_effect]` - Hiệu Lực Policy

```conf
[policy_effect]
e = some(where (p.eft == allow)) && !some(where (p.eft == deny))
```

- **Ý nghĩa:** Logic quyết định cuối cùng. Một request được **CHẤP NHẬN** khi và chỉ khi:
  1. Có **ít nhất một** quy tắc `allow` khớp với request.
  2. **VÀ không có bất kỳ** quy tắc `deny` nào khớp với request.
- Đây là mô hình "Allow-Override", ưu tiên việc từ chối để đảm bảo an toàn.

### 2.5. `[matchers]` - Logic So Khớp

```conf
[matchers]
m = g(r.sub, p.sub) && (g2(r.obj, p.obj) && g3(r.act, p.act) || p.act == "*")
```

- **Ý nghĩa:** Đây là "bộ não" của việc kiểm tra quyền. Một request (`r`) được coi là khớp (`match`) với một policy (`p`) nếu:
  1. `g(r.sub, p.sub)`: **Subject của request** (user) phải thuộc về **Subject của policy** (role).
  2. **VÀ** một trong hai điều kiện sau phải đúng:
     - `g2(r.obj, p.obj) && g3(r.act, p.act)`: **Object của request** thuộc nhóm **Object của policy** VÀ **Action của request** thuộc nhóm **Action của policy**.
     - `p.act == "*"`: **Action của policy** là một ký tự đại diện (`*`), cho phép thực hiện mọi hành động.

- **Lưu ý quan trọng:** Nhờ có cặp dấu ngoặc `(...)`, quyền `*` (wildcard) chỉ được áp dụng khi `subject` đã khớp. Điều này ngăn chặn lỗ hổng bảo mật cho phép bypass toàn bộ quyền.

## 3. Cách Viết Policy (Ví dụ)

Dưới đây là một số ví dụ về cách định nghĩa các quy tắc (policy) và các nhóm (grouping) để bạn dễ hình dung.

### Ví dụ 1: Phân quyền cơ bản

- **Mục tiêu:** Cho phép `manager` có thể đọc và ghi (`read`, `write`) trên tất cả các báo cáo (`report`).
- **Grouping:**
  ```
  # User 'bob' là một manager
  g, bob, manager

  # Các tài nguyên report
  g2, /reports/financial, reports_data
  g2, /reports/operational, reports_data

  # Các hành động ghi/đọc
  g3, read, read_write_actions
  g3, write, read_write_actions
  ```
- **Policy:**
  ```
  # Policy cho phép manager thực hiện các hành động đọc/ghi trên dữ liệu báo cáo
  p, manager, reports_data, read_write_actions, allow
  ```

### Ví dụ 2: Sử dụng Wildcard `*` an toàn

- **Mục tiêu:** Cho phép `admin` có toàn quyền (`*`) trên tất cả các tài nguyên thuộc nhóm `admin_resources`.
- **Grouping:**
  ```
  # User 'alice' là một admin
  g, alice, admin

  # Các tài nguyên quản trị
  g2, /admin/settings, admin_resources
  g2, /admin/users, admin_resources
  ```
- **Policy:**
  ```
  # Policy cho phép admin làm mọi thứ trên các tài nguyên quản trị
  p, admin, admin_resources, *, allow
  ```
- **Phân tích:** Nếu `alice` yêu cầu `delete` tài nguyên `/admin/settings`, matcher sẽ hoạt động như sau:
  - `g('alice', 'admin')` -> `true`
  - `g2('/admin/settings', 'admin_resources')` -> `true`
  - `p.act == "*"` -> `true`
  - Kết quả: `true && (true && ... || true)` -> `true`. Request được cho phép.

### Ví dụ 3: Quy tắc từ chối (Deny)

- **Mục tiêu:** `auditor` có quyền đọc (`read`) tất cả các báo cáo (`reports_data`), nhưng bị cấm (`deny`) truy cập vào báo cáo tài chính (`/reports/financial`).
- **Grouping:**
  ```
  g, charlie, auditor
  g3, read, read_action
  ```
- **Policies:**
  ```
  # Cho phép auditor đọc tất cả reports
  p, auditor, reports_data, read_action, allow

  # Nhưng cấm cụ thể việc đọc financial report
  p, auditor, /reports/financial, read_action, deny
  ```
- **Phân tích:**
  - Khi `charlie` yêu cầu đọc `/reports/operational`: Chỉ có policy `allow` khớp. Request được **chấp nhận**.
  - Khi `charlie` yêu cầu đọc `/reports/financial`: Cả hai policy `allow` và `deny` đều khớp. Do `policy_effect` có `!some(where (p.eft == deny))`, vế này sẽ `false`. Request bị **từ chối**.
