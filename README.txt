
## Cấu trúc thư mục
- /assets
  - style.css
  - app.js
- /pages
  - home.html
  - network.html
  - store.html
  - system.html
  - about.html
- index.html
- web.config
- README.txt


Chạy local:
- Mở file index.html bằng trình duyệt (protocol file://). Badge sẽ hiển thị "Local • file://".

Triển khai server (IIS/Static host):
- Đặt toàn bộ thư mục lên web root. web.config đã cấu hình một số header bảo mật (CSP, X-Content-Type-Options, Referrer-Policy...).
