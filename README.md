# Management Clinic

Hệ thống quản lý phòng khám

## Cấu trúc dự án

```
├── public/              # Các tệp tĩnh (favicon, index.html, manifest.json)
├── src/
│   ├── assets/          # Ảnh, font, icons, CSS, SCSS...
│   ├── components/      # Các component dùng chung
│   │   ├── ui/          # Các component UI chung (Button, Modal, Input)
│   │   ├── layout/      # Các layout như Navbar, Sidebar, Footer
│   │   ├── hooks/       # Custom hooks (useAuth, useTheme...)
│   │   └── utils/       # Hàm tiện ích (formatDate, debounce...)
│   ├── pages/           # Các trang (Home, About, Dashboard...)
│   │   ├── Home/        # Mỗi page có thư mục riêng
│   │   ├── About/
│   │   └── Dashboard/
│   ├── store/           # Quản lý state (Redux, Zustand...)
│   │   ├── slices/      # Redux slices (authSlice, userSlice)
│   │   └── index.js     # Combine các reducers
│   ├── routes/          # Cấu hình Router
│   │   ├── privateRoutes.js  # Route yêu cầu đăng nhập
│   │   ├── publicRoutes.js   # Route không yêu cầu đăng nhập
│   │   └── index.jsx         # App Router chính
│   ├── services/        # API services (Axios, Fetch)
│   │   ├── authService.js    # Service xác thực
│   │   └── userService.js    # Service người dùng
│   ├── config/          # Cấu hình chung (axios, env, theme...)
│   │   ├── axios.js     # Cấu hình axios
│   │   ├── env.js       # Load biến môi trường
│   │   └── theme.js     # Dark/Light Theme config
│   ├── types/           # Chứa các định nghĩa kiểu dữ liệu
│   │   ├── user.js      # Định nghĩa kiểu dữ liệu User
│   │   └── auth.js      # Định nghĩa kiểu dữ liệu Auth
│   ├── App.jsx          # Component gốc của ứng dụng
│   └── main.jsx         # Entry point của ứng dụng
├── .env                 # Biến môi trường
├── vite.config.js       # Cấu hình Vite
├── tailwind.config.js   # Cấu hình Tailwind CSS
├── package.json         # Danh sách dependencies
└── README.md            # Tài liệu dự án
```

## Cài đặt

```bash
npm install
```

## Chạy development

```bash
npm run dev
```

## Build production

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```
