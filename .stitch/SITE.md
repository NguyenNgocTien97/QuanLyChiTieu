# Site Vision & Roadmap - Weekly Spending Tracker

This site is a mobile web application for managing weekly personal finances. It offers a dashboard, transaction history, reports/statistics, budget adjustments, and user profile management.

## 1. Project Information
- **Stitch Project ID**: `10498530398007459118`
- **Device Type**: `MOBILE`

## 2. Sitemap (Pages Status)
- [x] Homepage (`index.html`) - Main dashboard with stats, column chart, recent activities.
- [x] Transactions (`transactions.html`) - Detailed list, filters, search, edit transaction.
- [x] Statistics (`statistics.html`) - Trend analysis and category breakdowns.
- [x] Budget (`budget.html`) - Custom budget limits for categories.
- [x] Profile (`profile.html`) - Settings, configurations, and exports.

## 4. Decision Log (Nhật ký quyết định)
- **Quyết định ngày 07/07/2026**: Cân đối thanh điều hướng Bottom Navigation.
  - *Vấn đề*: Thanh điều hướng bị lệch do có 5 tab chức năng + 1 FAB ở giữa (tổng cộng 6 phần tử).
  - *Giải pháp được chọn*: Loại bỏ tab "Cá nhân" khỏi Bottom Nav và đưa liên kết trang "Cá nhân" (`profile.html`) lên Header (ảnh đại diện người dùng). Cấu trúc Bottom Nav mới gồm 4 tab và 1 FAB ở giữa (`Trang chủ`, `Giao dịch` || `FAB +` || `Thống kê`, `Ngân sách`).
  - *Phương án thay thế đã xem xét*: 
    1. Đưa FAB (+) thành nút nổi ở góc dưới bên phải màn hình (FAB độc lập).
    2. Gộp "Thống kê" và "Ngân sách" thành tab "Báo cáo" để giữ nguyên 4 tab + FAB + Cá nhân.
  - *Lý do chọn*: Phương án này tạo sự đối xứng tuyệt đối (2 trái, 1 giữa, 2 phải), là thiết kế chuẩn mobile rất phổ biến (truy cập cài đặt qua avatar ở Header) và giữ nguyên đầy đủ cả 5 màn hình chức năng độc lập.


## 3. Roadmap & Iteration Backlog
1. **Iteration 1**: Generate the Home Dashboard (`index.html`) using the approved layout.
2. **Iteration 2**: Generate the Transactions List (`transactions.html`) and wire the link from the dashboard/bottom navigation.
3. **Iteration 3**: Generate the Statistics Screen (`statistics.html`) and add links to bottom navigation.
4. **Iteration 4**: Generate the Budget Configuration Screen (`budget.html`).
5. **Iteration 5**: Generate the User Profile and Settings Screen (`profile.html`).
6. **Iteration 6**: Refine cross-page styling, mock state persistence using `localStorage`, and test all links.
