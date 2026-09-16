# Testing Rules

## Backend (.NET)

- AAA pattern (Arrange-Act-Assert) làm baseline cho unit test mới — không có convention nào khác
  được ghi lại trong audit, và không project nào bắt buộc % coverage cụ thể.
- Test liên quan đến invariant ở tầng DB (vd filtered unique index chống trùng/chống race
  condition) **phải chạy với SQL Server thật**, không dùng EF Core InMemory provider — InMemory
  không enforce unique index nên sẽ pass giả dù logic sai. Case chuẩn: Face's
  `MealRedemptionConcurrencyTests`, kèm test 2 request đồng thời xác nhận chỉ 1 cái thành công.
  Connection string cho test lấy từ biến môi trường (vd `MEALREDEMPTION_TEST_CONNECTION`), không
  hardcode trong file test.
- Không claim "hoạt động trên thiết bị thật" chỉ từ suy đoán một field trạng thái trong DB (vd
  `Status=Success`) — phải có bằng chứng test/log thiết bị thật thực sự.

## Frontend (Angular)

Test stack **không đồng nhất** giữa 7 project — xác nhận trạng thái thật trước khi giả định:

| Trạng thái | Project |
|---|---|
| Vitest qua `@angular/build:unit-test` (config trong `angular.json`, không cần `vitest.config.ts` riêng) | CIO, CSR, Ops, ZKTime |
| Karma + Jasmine, chạy headless: `npx ng test --watch=false --browsers=ChromeHeadless` | Face |
| **Không có test target đăng ký** trong `angular.json` dù có script `npm test` (sẽ fail nếu chạy) | Device, TaskFlow |

Với Device và TaskFlow: đừng báo "chạy `npm test`" như thể nó hoạt động — trước tiên xác nhận có test
target thật chưa; nếu chưa và task không yêu cầu thêm test infra, ghi nhận đây là gap đã biết
(observation), không tự ý thêm Vitest/Karma config nếu không được yêu cầu.

## Báo cáo kết quả — không được gộp mơ hồ

Luôn tách riêng: Build / Unit test / Integration test / Mock external service test / Real external
service test / Real device test / Manual UI test — mỗi mục nêu rõ passed/failed/chưa chạy. Không
viết chung chung "đã test thành công".

## Không được làm để test "xanh"

- Không xoá/disable test đang fail.
- Không nới lỏng assertion để pass.
- Không thay config thật bằng config giả chỉ để test chạy qua (xem [[security]] phần B).
- Không sửa code không liên quan chỉ để thoả một test không liên quan đến task.
- Mặc định không gọi hệ thống/thiết bị thật (API đối tác, thiết bị chấm công, DB production) trong
  test trừ khi user yêu cầu rõ ràng test tích hợp thật cho đúng lần đó.
