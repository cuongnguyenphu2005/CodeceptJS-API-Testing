# RiderVolt API Tests

Kho lưu trữ này chứa các bài kiểm tra API tự động cho ứng dụng backend RiderVolt sử dụng CodeceptJS.

## Tổng quan

RiderVolt API Tests là bộ kiểm tra được thiết kế để xác thực chức năng và độ tin cậy của các endpoint API của RiderVolt backend. Các bài kiểm tra tập trung vào các luồng xác thực, quản lý người dùng và các chức năng API quan trọng khác.

## Tính năng

- Kiểm tra xác thực toàn diện
- Xác thực yêu cầu REST API
- Báo cáo kiểm tra tự động
- Tổ chức kiểm tra theo mô-đun

## Stack công nghệ

- [Node.js](https://nodejs.org/) - Môi trường chạy JavaScript
- [CodeceptJS](https://codecept.io/) - Framework kiểm tra end-to-end
- [REST Helper](https://codecept.io/helpers/REST/) - Hỗ trợ kiểm tra API cho CodeceptJS

## Bắt đầu

### Điều kiện tiên quyết

- Node.js (v16 hoặc cao hơn)
- npm (v7 hoặc cao hơn)

### Cài đặt

1. Clone repository này:
   ```bash
   git clone https://github.com/your-username/ridervolt-api-tests.git
   cd ridervolt-api-tests
   ```

2. Cài đặt các dependencies:
   ```bash
   npm install
   ```

### Cấu hình

Các bài kiểm tra được cấu hình để chạy với API backend của RiderVolt. Bạn có thể cập nhật endpoint API trong file `codecept.conf.js`:

```javascript
helpers: {
  REST: {
    endpoint: 'https://backend.ridervolt.app', // Thay thế bằng endpoint API của bạn
    defaultHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
}
```

### Chạy kiểm tra

Để chạy tất cả các bài kiểm tra:

```bash
npm test
```

Để chỉ chạy các bài kiểm tra xác thực:

```bash
npm run test:auth
```

## Cấu trúc bài kiểm tra

Các bài kiểm tra được tổ chức thành các file khác nhau theo chức năng:

- `auth_test.js` - Kiểm tra cho các endpoint xác thực (đăng nhập, đăng ký, đặt lại mật khẩu)
- `users_test.js` - Kiểm tra cho các endpoint quản lý và hồ sơ người dùng

## Kiểm tra xác thực

Các bài kiểm tra xác thực bao gồm:

- Đăng nhập với thông tin đăng nhập hợp lệ
- Đăng nhập với thông tin đăng nhập không hợp lệ
- Đăng nhập với thông tin đăng nhập bị thiếu
- Quy trình đăng ký
- Chức năng đặt lại mật khẩu
- Xác thực token

## Mở rộng bài kiểm tra

Để thêm bài kiểm tra mới:

1. Tạo một file kiểm tra mới trong thư mục `tests` (ví dụ: `payments_test.js`)
2. Cấu trúc bài kiểm tra của bạn sử dụng cú pháp CodeceptJS:
   ```javascript
   Feature('Payment API');

   Scenario('Process payment', async ({ I }) => {
     // Mã kiểm tra của bạn ở đây
   });
   ```

3. Chạy các bài kiểm tra mới của bạn với:
   ```bash
   npx codeceptjs run --grep "Payment API"
   ```

## Các nguyên tắc tốt nhất cho kiểm tra API

- Giữ các bài kiểm tra độc lập với nhau
- Dọn dẹp dữ liệu kiểm tra sau khi chạy
- Sử dụng tên kịch bản mô tả rõ ràng
- Xác thực cả phản hồi thành công và lỗi
- Kiểm tra các trường hợp biên và điều kiện ranh giới

## Đóng góp

1. Fork repository
2. Tạo nhánh tính năng của bạn (`git checkout -b feature/amazing-feature`)
3. Commit các thay đổi của bạn (`git commit -m 'Add some amazing feature'`)
4. Push lên nhánh (`git push origin feature/amazing-feature`)
5. Mở một Pull Request

## Giấy phép

Dự án này được cấp phép theo Giấy phép ISC - xem file `package.json` để biết chi tiết.

## Lời cảm ơn

- [Tài liệu CodeceptJS](https://codecept.io/helpers/REST/)
- [Các nguyên tắc tốt nhất cho kiểm tra REST API](https://restfulapi.net/testing-restful-services/)