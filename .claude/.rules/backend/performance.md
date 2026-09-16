# Backend Performance Rules

## Query

- `AsNoTracking()` cho mọi read-only query — xem [[backend/database]].
- Không `UseLazyLoadingProxies()` — navigation property lazy-load ẩn dễ gây N+1 không nhận ra khi
  review code (rủi ro thật đã xác nhận ở Device, ZKTime). Dùng `.Include()`/projection tường minh để
  N+1 hiện rõ trong code, dễ review.

## Pipeline behavior cho performance monitoring

Ở project dùng MediatR, có sẵn pattern 1 `Performance` pipeline behavior riêng (song song với
Validation/Transaction/Tracing) để đo/log request chạy chậm — đã thấy ở Face. Khi cần thêm
performance monitoring mới, implement ở behavior này (áp dụng đều cho mọi command/query), không thêm
timer thủ công rải rác trong từng handler.

## Pagination

List endpoint có khả năng dữ liệu lớn phải phân trang **ở tầng server** — không trả toàn bộ bảng để
FE tự cắt trang (đã là anti-pattern rõ ràng bị cấm trong `Face/frontend/SKILL_TONE.md`, áp dụng
tương tự cho backend: đừng thiết kế API trả full dataset rồi để FE lọc).

## Retry/resilience

Không lạm dụng execution-strategy retry cho lỗi không phải transient fault (retry chỉ nên cấu hình
cho lỗi kết nối/deadlock tạm thời — xem mã lỗi cụ thể trong `SqlServerRetryOptions`, không retry mù
mọi loại exception). Chi tiết transaction + retry: [[backend/database]].
