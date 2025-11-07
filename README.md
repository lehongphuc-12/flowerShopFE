# Flower Shop - Frontend Application

Ứng dụng Frontend cho website cửa hàng hoa tươi được xây dựng bằng React và Vite.

## 📋 Giới thiệu

Đây là phần Frontend của hệ thống quản lý và bán hàng hoa tươi trực tuyến. Ứng dụng cung cấp giao diện người dùng hiện đại, thân thiện để khách hàng có thể duyệt và mua các sản phẩm hoa tươi.

## 🚀 Tính năng

- 🏠 **Trang chủ**: Giao diện chính với logo, tìm kiếm và menu điều hướng
- 🔍 **Tìm kiếm**: Chức năng tìm kiếm sản phẩm hoa
- 📱 **Responsive Design**: Giao diện tương thích với mọi thiết bị
- 🛒 **Giỏ hàng**: Quản lý giỏ hàng mua sắm
- 📂 **Danh mục sản phẩm**: 
  - Hoa sinh nhật
  - Hoa khai trương
  - Hoa theo chủ đề
  - Thiết kế
  - Hoa tươi
  - Hoa giảm giá
  - Best seller
- 🔗 **Liên kết mạng xã hội**: Facebook, Instagram, TikTok

## 🛠️ Công nghệ sử dụng

- **React** ^19.1.1 - Thư viện JavaScript cho xây dựng giao diện người dùng
- **Vite** ^7.1.7 - Build tool nhanh và hiện đại
- **React Router DOM** ^7.9.5 - Điều hướng và routing
- **Axios** ^1.13.2 - Thư viện HTTP client
- **FontAwesome** ^7.1.0 - Icon library
- **ESLint** - Linting tool cho code quality

## 📦 Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd FlowerShopFE
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng ở chế độ development:
```bash
npm run dev
```

4. Build ứng dụng cho production:
```bash
npm run build
```

5. Preview build production:
```bash
npm run preview
```

## 📁 Cấu trúc thư mục

```
src/
├── assets/          # Hình ảnh và tài nguyên tĩnh
├── components/      # Các component tái sử dụng
│   ├── common/      # Component chung
│   ├── layout/      # Component layout (Header, Navbar, Categories)
│   └── ui/          # Component UI
├── layouts/         # Layout templates
├── pages/           # Các trang chính
├── routes/          # Cấu hình routing
├── App.jsx          # Component chính
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## 🎨 Component chính

- **Header**: Header với logo, tìm kiếm, giỏ hàng và liên kết mạng xã hội
- **Navbar**: Navigation bar
- **Categories**: Menu danh mục sản phẩm
- **Home**: Trang chủ

## 🔧 Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build ứng dụng cho production
- `npm run preview` - Preview build production
- `npm run lint` - Chạy ESLint để kiểm tra code

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Lưu ý

- Đây là phần Frontend của ứng dụng, cần kết nối với Backend API để hoạt động đầy đủ
- Cấu hình API endpoint cần được thiết lập trong file cấu hình

## 📄 License

Private project

---

**Flower Shop Frontend** - Built with ❤️ using React and Vite
