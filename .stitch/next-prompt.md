---
page: profile
---
Create a high-fidelity mobile user profile and settings screen ("Cá Nhân & Cài Đặt") for the "Weekly Spending Tracker" (Quản Lý Chi Tiêu Tuần) application.

**DESIGN SYSTEM REQUIREMENTS:**
- Font: Inter (from Google Fonts)
- Target Layout: Mobile Responsive Viewport (390px width)
- Color Palette:
  * Brand Primary: #2563EB (Vibrant Blue)
  * Secondary Accent: #DBEAFE (Light Indigo)
  * Main Background: #FFFFFF (White) or clean subtle background #F9FAFB
  * Dark Text: #111827
  * Gray Text: #6B7280
  * Success Green: #22C55E
  * Warning Amber: #F59E0B
  * Danger Red: #EF4444
- Roundness: rounded-2xl (16px) for cards, rounded-full for pills and action buttons.
- Sticky Bottom Nav: 5 tabs (Home, Transactions, Statistics, Budget, Profile) with a prominent circular Floating Action Button (+) in the center.
- Premium styling: Soft drop shadows, smooth hover scaling, and clean grid alignments. No placeholders; write full realistic copy.

**Page Structure & Details:**
1. **Header**:
   - Center: Page Title "Cá Nhân".
   - Right: Log out icon (exit_to_app).
2. **User Info Profile Section**:
   - High-quality round user avatar.
   - User Name: "Nguyễn Văn A" (Inter Bold, approx 20px).
   - User Email: "nguyenvana@example.com" (Gray Text, 14px).
   - Account detail pill/badge: "Thành viên từ: 05/2026" (using Secondary Accent background).
3. **Settings Menu List (Grouped inside a card or separate cards)**:
   - Category 1: Tài khoản
     * **Thông tin tài khoản** (Person icon): Click to view account info.
     * **Đơn vị & Ngôn ngữ** (Translate icon): Shows "VND | Tiếng Việt".
   - Category 2: Tùy chỉnh & Bảo mật
     * **Tùy chỉnh danh mục** (Category icon): Adjust food, shopping, transit labels.
     * **Chế độ tối (Dark Mode)** (Dark Mode icon): Toggle switch on the right side. Toggling it should trigger an interactive Javascript class toggle on the body or custom styling to simulate dark mode.
   - Category 3: Dữ liệu & Hỗ trợ
     * **Xuất dữ liệu (CSV/Excel)** (Download icon): Shows "Báo cáo chi tiêu". Clicking it should display a mock success toast "Xuất dữ liệu thành công!" that disappears after 2 seconds.
     * **Trợ giúp & Phản hồi** (Help icon): Open support options.
4. **Sticky Bottom Navigation**:
   - 5 Tabs:
     - Home - links to `index.html`
     - Giao dịch - links to `transactions.html`
     - (+) Floating Action Button in the center (opens a slide-up transaction form modal)
     - Thống kê - links to `statistics.html`
     - Ngân sách - links to `budget.html`
     - Cá nhân (Active: blue highlight) - links to `profile.html`

**Interactivity & Javascript**:
- Implement JavaScript to toggle the Dark Mode switch (switching classes/colors on the screen to represent dark style).
- Implement JavaScript to trigger a success toast when "Xuất dữ liệu" is clicked.
- Floating Action Button (+) opens the slide-up Quick Add form modal (consistent layout).
- Smooth animations and hover states.
- Copy: All text in Vietnamese.
