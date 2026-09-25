# Elite Design System — Standalone Tone Themes Catalog

Thư mục này chứa đầy đủ **136 tệp CSS độc lập** (Standalone Drop-in CSS), mỗi tệp đại diện cho 1 phối màu / biến thể Tone cụ thể của hệ thống **Elite Unified Design System**.

---

## 1. Cấu Trúc Đặt Tên Tệp Chuẩn
Các tệp được đặt tên theo quy ước 4 thành phần:
```text
{colorFamily}.{sidebarTone}.{toneIndex}.{font}.css
```
- **`colorFamily`**: Bộ màu chủ đạo
  - `green`: Xanh ngọc đậm Jade Emerald (`#12A97E`)
  - `blue`: Xanh công nghệ Sky / Modern Cloud (`#0284C7` / `#38BDF8`)
  - `grafana`: Cam hoàng hôn Sunset Amber (`#EA580C` / `#FF9830`)
  - `web3`: Tím công nghệ sâu FinTech Violet (`#7C3AED` / `#8B5CF6`)
  - `volt`: Xanh chuối năng lượng cao Binance High-Voltage Lime (`#65A30D` / `#D4FE00`)
  - `blueprint`: Bản vẽ kỹ thuật CAD (Đen #111111 / Neon #7ED957)
- **`sidebarTone`**: Biến thể nền Sidebar
  - `none`: Mặc định (Sidebar ăn theo nền Tone)
  - `navy`: Tone Sidebar 1 — Midnight Navy (`#1E293B`)
  - `charcoal`: Tone Sidebar 2 — Charcoal Obsidian (`#18181B`)
  - `spruce`: Tone Sidebar 3 — Deep Spruce Gentelella (`#2A3F54`)
- **`toneIndex`**: Mã tone (`01` đến `06` cho 5 họ màu, `07` và `08` cho Blueprint)
  - `01`: Soft Enterprise Light
  - `02`: Deep Midnight Dark
  - `03`: Corporate Azure Light
  - `04`: Obsidian Operations Dark
  - `05`: Modern Indigo Slate Dark
  - `06`: Warm Sandpaper Light
  - `07`: Technical CAD Blueprint Light
  - `08`: Technical CAD Blueprint Dark
- **`font`**: Font chữ mặc định
  - `inter`: Font sans-serif Enterprise chuẩn
  - `mono`: Font `IBM Plex Mono` (dành cho CAD Blueprint)

---

## 2. Cách Sử Dụng Trong Dự Án (Drop-in Ready)
Chỉ cần nhúng trực tiếp tệp tone mong muốn vào thẻ `<head>` của trang HTML:

```html
<!-- Ví dụ: Sử dụng Tone 01 Green với Sidebar mặc định và font Inter -->
<link rel="stylesheet" href="css/tones/green.none.01.inter.css">
<link rel="stylesheet" href="css/design-system.css">
```

Hoặc đổi sang Sidebar tối Midnight Navy:
```html
<link rel="stylesheet" href="css/tones/green.navy.01.inter.css">
<link rel="stylesheet" href="css/design-system.css">
```

---

## 3. Nội Dung Tự Trị (Self-Contained)
Mỗi tệp CSS đã đóng gói sẵn:
1. **Typography tokens** (`--font-system`, `--font-mono`, ...)
2. **Hình học & Bo góc chuẩn Dashboard** (`--radius-xs: 2px` đến `--radius-xl: 10px`, không bị phồng to)
3. **Độ sâu bóng đổ** (`--shadow-sm`, `--shadow-md`, `--shadow-lg`, ...)
4. **Toàn bộ bảng biến CSS Semantic** (`--page-bg`, `--surface-card`, `--border-color`, `--color-primary`, `--status-*`, `--badge-*`, `--chart-*`)
5. **Sidebar Overrides** (tự động điều chỉnh màu chữ, active item, header border nếu chọn `navy`, `charcoal`, `spruce`).
