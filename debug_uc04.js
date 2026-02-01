const fs = require('fs');
const file = "d:\\PhongVan\\nest-store-document\\docs\\00-giai-phap-cong-nghe\\02-tai-lieu-ky-thuat\\02-thiet-ke\\02-use-cases\\02-order-management\\uc04-tao-don-hang.md";
const buffer = fs.readFileSync(file);
// "dia ch" ...
const index = buffer.indexOf('địa ch');
if (index !== -1) {
    console.log('Offset:', index);
    console.log('Bytes:', buffer.slice(index, index + 20));
    console.log('Hex:', buffer.slice(index, index + 20).toString('hex'));
}
