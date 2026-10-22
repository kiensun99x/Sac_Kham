# TÀI LIỆU HỆ THỐNG WEBSITE SẮC KHẢM (SAC KHAM)

> **Tên dự án:** Sắc Khảm - Nền tảng thương mại điện tử quà tặng thủ công & bút khảm ngọc trai cao cấp  
> **Phiên bản:** 1.1.0  
> **Công nghệ:** React.js 19 + Vite 8 + Vanilla CSS (Luxury Design System) + Lucide Icons  
> **Mô hình triển khai:** 100% Client-Side Rendering (CSR), Static Mock Data, Zero-Backend, Zero-Database  

---

## 1. GIỚI THIỆU VÀ TỔNG QUAN

**Sắc Khảm** là nền tảng web thương mại điện tử được thiết kế tinh xảo dành riêng cho các dòng sản phẩm quà tặng thủ công cao cấp Việt Nam: bút khảm xà cừ ngọc trai, kẹp cà vạt mạ vàng, khuy măng sét và trang sức khảm xà cừ tự nhiên.

Hệ thống được phát triển với triết lý:
1. **Trải nghiệm thị giác đẳng cấp (Luxury Aesthetics):** Bố cục tạp chí, tương phản sang trọng giữa xanh Navy (#121D59), đen huyền bí (#050000), ánh vàng kim (#C5A880) và typography kết hợp giữa font có chân cổ điển (*Noto Serif Display*) và font hiện đại (*Montserrat*).
2. **Khởi chạy tức thì & Hoạt động độc lập:** Toàn bộ dữ liệu sản phẩm, danh mục, câu chuyện thương hiệu, hình ảnh độ phân giải cao và bảng thông số được mô phỏng hoàn chỉnh trong mã nguồn (`src/data/mockData.js`), không cần thiết lập cơ sở dữ liệu hay máy chủ API.
3. **Tính năng độc quyền vượt trội:**
   * **Mô phỏng khắc tên laser trực quan (Live Engraving Preview):** Cho phép khách hàng nhập tên/lời chúc, chọn font chữ nghệ thuật và xem kết quả khắc laser phản chiếu thời gian thực trên thân bút.
   * **Giỏ hàng trượt thông minh (Cart Drawer):** Tính toán khoảng tiền cần mua thêm để đạt điều kiện Miễn phí vận chuyển toàn quốc.
   * **Bộ lọc và sắp xếp động (Dynamic Filter & Sort):** Lọc theo tầm giá và chủng loại trên trang Bộ sưu tập.

---

## 2. TRACE & PHÂN TÍCH LỊCH SỬ THAY ĐỔI (GIT COMMIT TRACING)

Trong quá trình hoàn thiện, hệ thống đã ghi nhận các đợt tinh chỉnh quan trọng từ người phát triển để định vị lại thương hiệu sang **"Sắc Khảm"** và tối ưu độ gọn gàng của giao diện:

### 2.1. Commit `7fcf814` - *"chỉnh sửa một chút các title"*
* **Đổi tên nhóm quà tặng tại Trang chủ (`src/data/mockData.js`):**
  * Thẻ bên trái: `QUÀ TẶNG NAM` &rarr; đổi thành **`TRANG SỨC`**.
  * Thẻ bên phải: `QUÀ TẶNG NỮ` &rarr; đổi thành **`QUÀ TẶNG TRUYỀN THỐNG`**.
  * Tạm ẩn (comment) dòng mô tả dài (`subtitle`) ở cả 2 thẻ để hình ảnh sản phẩm trở thành tâm điểm thị giác.
* **Tinh giản Menu điều hướng (`src/data/mockData.js`):**
  * Tạm ẩn mục menu `Dòng Bút` (gồm Bút Bi, Bút Gel, Bút Nước, Bút Máy) trong thanh điều hướng chính, giúp menu cân đối và tập trung trực tiếp vào **Bộ Sưu Tập** và **Trang Sức**.
* **Tối giản hóa Typography Tiêu đề (`src/index.css`):**
  * Comment out pseudo-element `.head-title-style::after` (dòng kẻ gạch chân vàng nhỏ dưới các tiêu đề h2), mang lại nét thẩm mỹ hiện đại và thông thoáng hơn.

### 2.2. Commit `c5a591e` - *"change title"* (HEAD -> main)
* **Cập nhật Title trình duyệt (`index.html`):**
  * Thay đổi từ `<title>BLUS - Để Lại Dấu Ấn | Bút Khảm Ngọc Trai Cao Cấp</title>` sang **`<title>Sắc Khảm</title>`**, chính thức đặt tên thương hiệu là **Sắc Khảm**.
* **Ẩn Thanh Topbar thông báo ưu đãi (`src/App.jsx`):**
  * Comment out component `<TopBanner />` ("Nhập mã WELCOME nhận ngay ưu đãi 100.000 VND...").
* **Ẩn Thanh Topbar tiện ích ngôn ngữ (`src/components/Header.jsx`):**
  * Comment out khối `header-topbar` chứa bộ chuyển ngôn ngữ (Tiếng Việt / English).
  * Giúp thanh điều hướng chính (Main Header) nằm ngay sát mép trên màn hình, tối ưu không gian hiển thị cho Hero Banner.

---

## 3. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
Sac_Kham/
├── docs/                                      # Thư mục tài liệu kỹ thuật
│   ├── README.md                              # Tài liệu tổng quan & trace lịch sử (file này)
│   ├── ARCHITECTURE_AND_COMPONENTS.md        # Kiến trúc ứng dụng, routing & components
│   └── DATA_DICTIONARY_AND_CUSTOMIZATION.md     # Cấu trúc mockData & hướng dẫn tùy biến
├── public/                                    # Assets tĩnh phục vụ build
├── src/
│   ├── assets/                                # SVG & hình ảnh mặc định
│   ├── components/                            # 14 UI Components chuyên biệt
│   │   ├── AboutSection.jsx                   # Giới thiệu di sản khảm xà cừ & sơn mài
│   │   ├── CartDrawer.jsx                     # Giỏ hàng trượt, tiến trình freeship
│   │   ├── CorporateBanner.jsx                # Banner quà tặng doanh nghiệp
│   │   ├── EngraveModal.jsx                   # Modal mô phỏng khắc laser thời gian thực
│   │   ├── FeaturedGifts.jsx                  # Khối Trang sức & Quà tặng truyền thống
│   │   ├── Footer.jsx                         # Chân trang, chính sách & thông tin pháp lý
│   │   ├── GiftCategories.jsx                 # Băng chuyền cuộn ngang danh mục tặng phẩm
│   │   ├── Header.jsx                         # Thanh điều hướng sticky & Mega menu
│   │   ├── HeroSlider.jsx                     # Slider banner trang chủ tự chuyển động
│   │   ├── LookbookSection.jsx                # Bộ sưu tập Lookbook & Instagram feed
│   │   ├── PoliciesSection.jsx                # 4 cam kết dịch vụ miễn phí của thương hiệu
│   │   ├── SearchModal.jsx                    # Hộp thoại tìm kiếm sản phẩm tức thì
│   │   ├── StoreBanner.jsx                    # Showroom Boutique Flagship
│   │   └── TopBanner.jsx                      # Thanh thông báo khuyến mãi đầu trang
│   ├── data/
│   │   └── mockData.js                        # Toàn bộ kho dữ liệu tĩnh của hệ thống
│   ├── pages/                                 # 3 View chính của ứng dụng
│   │   ├── HomePage.jsx                       # Trang chủ
│   │   ├── CollectionPage.jsx                 # Trang danh mục & bộ lọc sản phẩm
│   │   └── ProductDetailPage.jsx              # Trang chi tiết sản phẩm, tabs & đặt hàng
│   ├── App.css                                # Stylesheet chi tiết cho toàn bộ components
│   ├── App.jsx                                # Quản trị state toàn cục & Client-side router
│   ├── index.css                              # Design system tokens, biến màu & CSS reset
│   └── main.jsx                               # Entry point của React DOM
├── index.html                                 # HTML template & nạp Google Fonts
├── package.json                               # Danh sách thư viện & scripts
└── vite.config.js                             # Cấu hình Vite bundler
```

---

## 4. HƯỚNG DẪN CÀI ĐẶT VÀ VẬN HÀNH

### 4.1. Yêu cầu hệ thống
* **Node.js:** >= 18.0.0 (đã kiểm thử tương thích tốt trên Node 20.x và Node 22.x).
* **NPM:** >= 9.0.0.

### 4.2. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 4.3. Khởi động môi trường phát triển (Dev Server)
```bash
npm run dev
```
Mở trình duyệt truy cập: **http://localhost:5173/**

### 4.4. Đóng gói cho Production (Build)
```bash
npm run build
```
Sản phẩm đóng gói được xuất ra thư mục `dist/`, bao gồm HTML, CSS gộp tối ưu và JS chia chunk.

### 4.5. Chạy thử bản Build nội bộ
```bash
npm run preview
```

---

## 5. MỤC LỤC TÀI LIỆU KỸ THUẬT BỔ TRỢ

* [ARCHITECTURE_AND_COMPONENTS.md](./ARCHITECTURE_AND_COMPONENTS.md): Phân tích chi tiết kiến trúc điều hướng, cơ chế quản lý state giỏ hàng và danh mục component.
* [DATA_DICTIONARY_AND_CUSTOMIZATION.md](./DATA_DICTIONARY_AND_CUSTOMIZATION.md): Mô tả chi tiết schema sản phẩm, menu và cẩm nang thêm/bớt dữ liệu trong `mockData.js`.
