# KIẾN TRÚC VÀ DANH MỤC THÀNH PHẦN (ARCHITECTURE & COMPONENTS)

Tài liệu này mô tả chi tiết cơ chế điều hướng, kiến trúc quản lý trạng thái (State Management), cấu trúc stylesheet và danh mục các thành phần (Components & Pages) trong hệ thống **Sắc Khảm**.

---

## 1. CƠ CHẾ ĐIỀU HƯỚNG (CLIENT-SIDE ROUTING)

Hệ thống sử dụng cơ chế **State-driven Navigation** trực tiếp trong component gốc `App.jsx` mà không cần cài đặt các thư viện định tuyến bên thứ ba (như `react-router-dom`). Cách tiếp cận này giúp ứng dụng:
* Tối giản bundle size (tiết kiệm tài nguyên tải về).
* Không gặp lỗi 404 khi người dùng refresh trên các máy chủ tĩnh (Static Web Hosting).
* Tốc độ chuyển trang tức thì, tự động cuộn lên đầu trang (`window.scrollTo({ top: 0, behavior: 'smooth' })`).

### Bảng định tuyến nội bộ:

| Đường dẫn ảo (`currentRoute`) | Component View tương ứng | Mô tả chức năng |
| :--- | :--- | :--- |
| `/` | `<HomePage />` | Trang chủ hoàn chỉnh với đầy đủ các khối trình chiếu |
| `/collections/:slug` | `<CollectionPage />` | Trang danh mục sản phẩm (Bút ngọc trai, Trang sức, Quà tặng...) kèm bộ lọc |
| `/product/:slug` | `<ProductDetailPage />` | Trang chi tiết sản phẩm, gallery ảnh, tabs thông số và tính năng khắc laser |

---

## 2. QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT)

Tất cả các trạng thái tương tác toàn cục được quản lý tập trung tại component cha `App.jsx` và truyền xuống qua Props:

* **`currentRoute` (string):** Lưu trữ route hiện tại để xác định trang cần render (`/`, `/collections/...`, `/product/...`).
* **`cartItems` (Array):** Danh sách các mặt hàng trong giỏ hàng. Mỗi item bao gồm:
  * `id`, `slug`, `name`, `price`, `quantity`, `primaryImage`
  * `engravedText` (nội dung khắc laser cá nhân hóa nếu có)
  * `engravedColor` (màu khắc vàng 18K hoặc bạc bạch kim)
* **`isCartOpen` (boolean):** Trạng thái đóng/mở của thanh giỏ hàng trượt cạnh phải.
* **`isSearchOpen` (boolean):** Trạng thái đóng/mở của modal tìm kiếm nhanh.
* **`isEngraveOpen` (boolean):** Trạng thái đóng/mở của modal mô phỏng khắc laser.
* **`customEngraving` (Object):** Dữ liệu cấu hình khắc tên hiện thời (`{ text, font, color }`).

---

## 3. DANH MỤC TRANG (PAGES)

### 3.1. HomePage (`src/pages/HomePage.jsx`)
Tập hợp các phân đoạn thị giác hấp dẫn của thương hiệu:
1. **HeroSlider:** Băng chuyền banner lớn tương tác tự động.
2. **GiftCategories:** Thanh cuộn ngang danh mục quà tặng với ảnh tròn viền ánh kim.
3. **FeaturedGifts:** Khối hình ảnh phong cách tạp chí cho *Trang Sức* và *Quà Tặng Truyền Thống*.
4. **Featured Products:** Lưới 4 sản phẩm bán chạy nhất, hỗ trợ rê chuột đổi ảnh thứ 2 và nút thêm nhanh vào giỏ.
5. **CorporateBanner:** Giới thiệu giải pháp quà tặng đối tác doanh nghiệp.
6. **AboutSection:** Tôn vinh nghệ thuật khảm trai, sơn mài truyền thống Việt Nam.
7. **LookbookSection:** Bộ ảnh phối hợp thời trang và Instagram feed.
8. **StoreBanner:** Hình ảnh không gian trải nghiệm Flagship Boutique.
9. **PoliciesSection:** 4 cam kết dịch vụ miễn phí tạo niềm tin cho khách hàng.

### 3.2. CollectionPage (`src/pages/CollectionPage.jsx`)
* **Breadcrumb navigation:** Điều hướng đa cấp (`Trang chủ` / `Danh mục` / `Tên danh mục`).
* **Filter Sidebar:**
  * Lọc theo mức giá: *Dưới 2.000.000₫*, *2.000.000₫ - 5.000.000₫*, *Trên 5.000.000₫*.
  * Lọc theo dòng sản phẩm: *Bút Bi*, *Bút Dạ Bi*, *Bút Máy*, *Kẹp Cà Vạt*.
* **Sort Controls:** Sắp xếp theo tên A-Z, Z-A, giá tăng dần, giá giảm dần hoặc hàng mới nhất.
* **Mobile Drawer Filter:** Tự động chuyển đổi thành menu trượt trên màn hình nhỏ.

### 3.3. ProductDetailPage (`src/pages/ProductDetailPage.jsx`)
* **Gallery đa ảnh:** Hiển thị ảnh lớn cùng dải thumbnail tương tác bên dưới.
* **Khối tùy chỉnh khắc laser:** Hiển thị huy hiệu khắc tên kèm nút mở modal tùy biến.
* **Bộ chọn số lượng & Nút hành động:** "Thêm Vào Giỏ Hàng" và "Mua Ngay".
* **Tabs nội dung:**
  * Tab 1: Mô tả nguồn gốc chất liệu xà cừ ngọc trai tự nhiên.
  * Tab 2: Bảng thông số kỹ thuật (vật liệu, cơ chế ngòi, ruột thay thế, xuất xứ).
  * Tab 3: Chính sách bảo hành 24 tháng và bảo dưỡng làm mới trọn đời.
* **Sản phẩm liên quan:** Gợi ý các sản phẩm cùng bộ sưu tập ở chân trang.

---

## 4. DANH MỤC TIỆN ÍCH TƯƠNG TÁC (INTERACTIVE MODALS & DRAWERS)

### 4.1. CartDrawer (`src/components/CartDrawer.jsx`)
* Giỏ hàng dạng slide-out drawer từ mép phải màn hình.
* **Thanh tiến trình Freeship:** Tự động tính khoảng tiền còn thiếu so với mốc 1.000.000₫ để đạt điều kiện Miễn phí vận chuyển.
* Cho phép tăng/giảm số lượng hoặc xóa sản phẩm ngay tại chỗ.
* Hiển thị chi tiết nội dung khắc tên đi kèm từng sản phẩm.

### 4.2. EngraveModal (`src/components/EngraveModal.jsx`)
* **Tính năng đột phá:** Mô phỏng trực quan nét khắc laser trên thân bút thời gian thực.
* Hỗ trợ 4 kiểu font chữ:
  * Antiqua Serif (quý phái cổ điển)
  * Thư pháp mềm mại (uyển chuyển nghệ thuật)
  * Hiện đại Sans (tối giản mạnh mẽ)
  * In hoa cổ điển (trang nghiêm)
* Hỗ trợ 2 màu ánh kim: Vàng 18K và Bạc Bạch Kim.
* Cập nhật tức thời lên thân bút ảo và lưu thông tin vào cấu hình sản phẩm.

### 4.3. SearchModal (`src/components/SearchModal.jsx`)
* Tìm kiếm tức thời (real-time filtering) theo tên, phân loại hoặc bộ sưu tập.
* Cung cấp các từ khóa gợi ý thông minh (*Trường Hải*, *Minh Sa*, *Khuê Văn*, *Kẹp Cà Vạt*).
* Bấm vào kết quả để chuyển trực tiếp đến trang chi tiết sản phẩm.

---

## 5. HỆ THỐNG THIẾT KẾ & BẢNG MÀU (DESIGN SYSTEM)

Quy định tại `src/index.css`:

```css
:root {
  --navy: #121d59;         /* Màu xanh Navy chủ đạo của thương hiệu */
  --gold: #c5a880;         /* Màu vàng ánh xà cừ quý tộc */
  --gold-dark: #9e7f52;    /* Vàng trầm cho viền & text phụ */
  --gold-light: #f7ede0;   /* Nền vàng nhạt cho badge */
  --bg-main: #ffffff;      /* Nền sáng tinh khiết */
  --bg-subtle: #f8f8f8;    /* Nền xám nhạt phân tách khối */
  --text-main: #111111;    /* Màu chữ chính độ tương phản cao */
  --text-secondary: #868d9e;
  
  --font-serif: 'Noto Serif Display', Georgia, serif;
  --font-sans: 'Montserrat', system-ui, sans-serif;
}
```
