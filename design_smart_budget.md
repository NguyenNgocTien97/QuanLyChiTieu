# Design Specification: Smart Daily Budget (Ngân sách an toàn mỗi ngày)

## 1. Tóm tắt định hướng (Understanding Summary)
- **Sản phẩm:** Ứng dụng Quản Lý Chi Tiêu Tuần.
- **Mục tiêu cốt lõi:** (1) Giúp người dùng thực sự tiết kiệm tiền và (2) Mang lại trải nghiệm siêu mượt mà.
- **Tính năng cốt lõi mới:** Phân bổ ngân sách hàng ngày thông minh. Tự động tính toán linh hoạt số tiền an toàn còn lại mỗi ngày.
- **Non-goals (Chưa làm lúc này):** Chưa phát triển tính năng quản lý nhóm/gia đình, đa tiền tệ hay quét hóa đơn AI.

## 2. Các giả định Phi chức năng (Assumptions)
- **Hiệu năng & UX:** Áp dụng **Optimistic UI** (cập nhật giao diện số tiền ngay lập tức) và **Data Caching** (không cần loading mỗi khi chuyển tab).
- **Độ tin cậy:** Ứng dụng vẫn yêu cầu kết nối mạng để lưu dữ liệu thành công (Không làm Offline-first toàn diện lúc này).
- **Bảo mật & Scale:** Phục vụ dữ liệu cá nhân (Single-user), bảo mật an toàn thông qua NextAuth session.

## 3. Decision Log (Nhật ký Quyết định)
- **Kiến trúc:** Sử dụng **Client-Side Derived State + Caching** (Ví dụ: SWR/React Query).
  - *Lý do:* Tối ưu UX tuyệt đối (nhanh như chớp), Backend cực kỳ gọn nhẹ (không cần cron job), tuân thủ triết lý YAGNI (Không làm thừa).
  - *Đã loại bỏ:* Lưu budget snapshot vào Database mỗi đêm (phức tạp), chia "phong bì" cứng mỗi ngày (trải nghiệm rườm rà).
- **Data Flow:** Tính toán `safeDailyBudget` hoàn toàn dựa trên dữ liệu tổng hợp của toàn tuần ngay trên thiết bị người dùng.

## 4. Final Design (Thiết kế chi tiết)

### 4.1 Data Flow
Tạo React Custom Hook (VD: `useWeeklyBudget`) kết hợp SWR/React Query:
1. Lấy `weekly_budget` từ Cài đặt người dùng.
2. Lấy danh sách `transactions` của tuần hiện tại.
3. Thực hiện công thức tính toán nội bộ:
   - `totalSpent` = Tổng chi tiêu của tuần.
   - `remainingWeekBudget` = `weekly_budget` - `totalSpent`.
   - `daysLeft` = Số ngày còn lại trong tuần (tính cả hôm nay).
   - **`safeDailyBudget`** = `remainingWeekBudget` / `daysLeft`.

### 4.2 Optimistic UI & Error Handling (Xử lý lỗi mạng)
Khi bấm Lưu một khoản chi tiêu:
- **Client lập tức:** Tự trừ tiền vào local cache, tính lại `safeDailyBudget` mới, update UI Dashboard ngay tức thì và đóng form nhập.
- **Background:** Gửi request lưu vào Database.
- **Nếu API thất bại (mất mạng):** Tự động hoàn tác (rollback) UI về con số cũ. Hiển thị thông báo Toast nhẹ nhàng *"Mất kết nối. Giao dịch chưa được lưu"*. Giữ nguyên số liệu trong form nhập để user không phải gõ lại.

### 4.3 Edge Cases (Tình huống ngoại lệ)
- **Tiêu âm quỹ tuần:** Nếu `remainingWeekBudget` < 0, `safeDailyBudget` không hiển thị số âm. Nó trả về `0đ` và UI chuyển trạng thái Báo động Đỏ: *"Đã vượt ngân sách tuần X đồng"*.
- **Nhập bù giao dịch (nhập cho ngày hôm qua):** Tổng chi toàn tuần `totalSpent` tăng, `safeDailyBudget` ngày hôm nay tự động giảm xuống để bù trừ (đúng đắn về mặt tài chính).
- **Ngày Chủ Nhật:** `daysLeft = 1`, `safeDailyBudget` tự động bằng đúng toàn bộ số tiền còn dư của tuần đó.
