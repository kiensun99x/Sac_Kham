# TỪ ĐIỂN DỮ LIỆU VÀ CẨM NANG TÙY BIẾN (DATA DICTIONARY & CUSTOMIZATION)

Toàn bộ dữ liệu của hệ thống **Sắc Khảm** được lưu trữ tập trung tại file:  
📁 `src/data/mockData.js`

Tài liệu này cung cấp định dạng dữ liệu (Schema) của từng đối tượng và hướng dẫn các thao tác mở rộng, thay đổi nội dung website một cách dễ dàng.

---

## 1. TỪ ĐIỂN CÁC BIẾN DỮ LIỆU CHÍNH

### 1.1. `mockNavigation` (Cấu trúc Menu Điều Hướng)
Quản lý các cấp menu xuất hiện trên thanh điều hướng chính (Header) và Mobile Drawer.

```javascript
{
  title: 'Bộ Sưu Tập',       // Tiêu đề hiển thị trên menu
  href: '/collections/all',   // Đường dẫn điều hướng
  hasSubmenu: true,          // Có menu con hay không
  isMega: true,              // Hiển thị dạng Mega Menu đa cột (true) hoặc Dropdown thường (false)
  columns: [                 // Danh sách các cột của Mega Menu
    {
      heading: 'Bút Ngọc Trai',
      href: '/collections/but-ngoc-trai',
      items: [
        { title: 'Khuê Văn', href: '/collections/khue-van' },
        ...
      ]
    }
  ]
}
```

> **Lưu ý:** Trong commit `7fcf814`, mục `Dòng Bút` đã được comment lại để làm gọn menu. Khi cần bật lại, chỉ cần bỏ dấu comment `//` xung quanh khối dữ liệu này.

---

### 1.2. `mockHeroBanners` (Banner Xoay Trang Chủ)
Quản lý danh sách slide banner toàn màn hình tại đầu trang chủ.

| Thuộc tính | Kiểu dữ liệu | Ý nghĩa |
| :--- | :--- | :--- |
| `id` | Number | Định danh duy nhất |
| `image` | String (URL) | Link ảnh cho màn hình Desktop (tỉ lệ khuyến nghị ~2500x775px) |
| `mobileImage` | String (URL) | Link ảnh tối ưu cho màn hình điện thoại |
| `title` | String | Tiêu đề banner |
| `subtitle` | String | Dòng phụ đề giới thiệu |
| `link` | String | Đường dẫn khi khách hàng bấm vào slide |

---

### 1.3. `mockGiftCategories` (Khám Phá Tặng Phẩm)
Danh sách các danh mục quà tặng xuất hiện trong băng chuyền cuộn ngang:
* `id`: Mã danh mục.
* `name`: Tên danh mục (ví dụ: *KẸP CÀ VẠT*, *CHẶN GIẤY*, *BÚT KÝ MINH SA*, *DÂY CHUYỀN*, *KHUY MĂNG SÉT*, *AURA BOX*...).
* `image`: Ảnh đại diện dạng tròn.
* `link`: Liên kết đến bộ sưu tập tương ứng.

---

### 1.4. `mockFeaturedCards` (Thẻ Nổi Bật Trang Chủ)
Cặp thẻ ảnh lớn giới thiệu 2 phân nhóm nổi bật:
* Trong commit `7fcf814`, tiêu đề đã được cập nhật thành:
  * Thẻ 1 (`id: 'men'`): `title: 'TRANG SỨC'`
  * Thẻ 2 (`id: 'women'`): `title: 'QUÀ TẶNG TRUYỀN THỐNG'`

---

### 1.5. `mockProducts` (Kho Sản Phẩm Cốt Lõi)
Mỗi sản phẩm trong danh sách tuân theo cấu trúc chuẩn sau:

```javascript
{
  id: 1,
  slug: 'truong-hai-inspired-edition',     // Định danh trên URL (/product/:slug)
  name: 'Trường Hải - Inspired Edition',   // Tên sản phẩm đầy đủ
  collection: 'Bút Ngọc Trai',             // Tên bộ sưu tập hiển thị
  collectionSlug: 'but-ngoc-trai',         // Slug dùng cho bộ lọc
  type: 'Bút Bi',                          // Dòng ngòi: 'Bút Bi' | 'Bút Dạ Bi' | 'Bút Máy' | 'Kẹp Cà Vạt'
  price: 1699000,                          // Giá bán thực tế (VND)
  originalPrice: 1999000,                  // Giá niêm yết cũ (dùng gạch ngang giảm giá)
  badge: 'Best Seller',                    // Huy hiệu: 'Best Seller' | 'Mới' | 'Đặc Quyền' | 'Iconic'
  primaryImage: 'https://...',             // Ảnh đại diện chính
  secondaryImage: 'https://...',           // Ảnh thứ 2 xuất hiện khi rê chuột vào card
  gallery: [                               // Dải ảnh thumbnail chi tiết trong trang sản phẩm
    'https://...',
    'https://...'
  ],
  rating: 5,                               // Điểm đánh giá (1-5)
  reviewsCount: 38,                        // Số lượng đánh giá khách hàng
  inStock: true,                           // Còn hàng trong kho
  material: 'Vỏ ngọc trai đại dương...',   // Tóm tắt chất liệu
  size: 'Chiều dài 140mm...',              // Kích thước vật lý
  weight: '38g',                           // Trọng lượng
  refill: 'Ruột Parker tiêu chuẩn...',     // Loại ruột thay thế
  description: 'Mô tả chi tiết...',        // Văn bản bài viết giới thiệu
  specs: [                                 // Bảng thông số kỹ thuật (Key-Value)
    { label: 'Thương hiệu', value: 'BLUSAIGON' },
    { label: 'Chất liệu thân bút', value: 'Khảm xà cừ ngọc trai tự nhiên 100%' },
    ...
  ],
  warranty: 'Chính sách bảo hành...'       // Nội dung tab bảo hành & đổi trả
}
```

---

## 2. HƯỚNG DẪN TÙY BIẾN HỆ THỐNG

### 2.1. Cách thêm một sản phẩm mới
1. Mở file `src/data/mockData.js`.
2. Tìm mảng `mockProducts`.
3. Sao chép một đối tượng sản phẩm mẫu và dán vào cuối mảng.
4. Đổi `id` thành số kế tiếp, đổi `slug` thành chuỗi không dấu (ví dụ: `but-ngoc-trai-bach-long`), cập nhật tên, giá và link hình ảnh.
5. Lưu file; Vite sẽ tự động cập nhật nóng (Hot Module Replacement) ngay trên trình duyệt mà không cần khởi động lại server.

### 2.2. Cách thay đổi thông tin liên hệ / Hotline / Địa chỉ Showroom
Thông tin liên hệ được quản lý ở 2 vị trí:
1. **Chân trang (Footer):** Mở `src/components/Footer.jsx` để cập nhật số điện thoại cá nhân, doanh nghiệp, email và địa chỉ showroom.
2. **Khối Showroom Flagship:** Mở `src/data/mockData.js` và chỉnh sửa biến `mockStoreBanner`.

### 2.3. Bật/Tắt các khối đã ẩn trong các commit trước
* **Bật lại Thanh thông báo trên cùng (TopBanner):** Mở `src/App.jsx`, bỏ comment dòng `<TopBanner />`.
* **Bật lại Thanh chọn ngôn ngữ (Header Topbar):** Mở `src/components/Header.jsx`, bỏ comment khối `<div className="header-topbar">...</div>`.
* **Bật lại gạch chân vàng dưới tiêu đề:** Mở `src/index.css`, bỏ comment khối `.head-title-style::after`.
