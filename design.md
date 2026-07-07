# Design System Documentation - Quản Lý Chi Tiêu Tuần

## 1. Visual Identity (Bản sắc hình ảnh)
- **Phong cách:** Hiện đại, tối giản, chuyên nghiệp nhưng gần gũi. Sử dụng nhiều khoảng trắng (whitespace) để tạo sự thông thoáng.
- **Mục tiêu:** Tạo cảm giác tin cậy và minh bạch cho dữ liệu tài chính.

## 2. Color Palette (Bảng màu)
- **Primary (Chủ đạo):** `#2563eb` (Blue) - Tượng trưng cho sự tin cậy và tài chính.
- **Secondary (Phụ):** Các sắc độ của xanh dương nhạt và xám.
- **Semantic Colors (Màu trạng thái):**
  - **Success:** Xanh lá (Chi tiêu trong mức).
  - **Warning:** Cam (Chi tiêu đạt ngưỡng 65-75%).
  - **Error/Alert:** Đỏ (Vượt mức ngân sách).
- **Surfaces:** Màu nền trắng (`#ffffff`) hoặc xám cực nhạt (`#faf8ff`) cho các thẻ (cards).

## 3. Typography (Kiểu chữ)
- **Font Family:** Inter (hoặc các font Sans-serif hiện đại).
- **Hierarchy:**
  - **Headlines:** Bold, kích thước lớn cho số dư và tiêu đề màn hình.
  - **Body:** Regular/Medium cho các chi tiết giao dịch.
  - **Labels:** Kích thước nhỏ, xám cho các thông tin phụ như thời gian, phương thức thanh toán.

## 4. Components (Thành phần UI)
- **Cards:** Bo góc (`rounded-2xl`), có shadow nhẹ hoặc viền mảnh để phân tách nội dung.
- **Buttons:** Bo góc hoàn toàn (Pill-shaped) hoặc bo góc theo chuẩn DS.
- **Progress Bars:** Thanh tiến trình bo tròn, đổi màu theo trạng thái (Xanh -> Cam -> Đỏ).
- **Icons:** Sử dụng hệ thống icon đơn giản (Filled hoặc Outlined) đồng nhất về độ dày nét.
- **Bottom Navigation:** 5 tab (Trang chủ, Giao dịch, Thêm (+), Thống kê, Ngân sách/Cá nhân).

## 5. Spacing & Grid
- Sử dụng hệ thống padding/margin dựa trên bội số của 4 hoặc 8 (8px, 16px, 24px).
- Khoảng cách giữa các thẻ trên danh mục thường là 12px - 16px.
