const fs = require('fs');
const path = require('path');

const targetDir = "d:\\PhongVan\\nest-store-document\\docs\\00-giai-phap-cong-nghe\\02-tai-lieu-ky-thuat\\02-thiet-ke\\02-use-cases";

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
        if (file.endsWith('.md')) {
            arrayOfFiles.push(fullPath);
        }
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles(targetDir);
let fixedCount = 0;

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix "ch\uFFFD0" -> "chỉ"
    content = content.replace(/ch\uFFFD0/g, 'chỉ');
    
    // Fix "chuy\uFFFD n" -> "chuyển"
    content = content.replace(/chuy\uFFFD n/g, 'chuyển');
    // Also "chuy n" if \uFFFD is dropped? (regex above covers replacement char)
    
    // Fix "kh\uFFFDxi" -> "khởi"
    content = content.replace(/kh\uFFFDxi/g, 'khởi');
    
    // Fix "b\uFFFDxi" -> "bởi"
    content = content.replace(/b\uFFFDxi/g, 'bởi');
    
    // Fix "l\uFFFD i" -> "lỗi"
    content = content.replace(/l\uFFFD i/g, 'lỗi');
    
    // Fix "ki\uFFFD m" -> "kiểm" (re-run just in case)
    content = content.replace(/ki\uFFFD m/g, 'kiểm');

    // Fix "trư:c" -> "trước"
    content = content.replace(/trư:c/g, 'trước');

    // Fix "m:i" -> "mới"
    content = content.replace(/m:i/g, 'mới');
    
    // Fix "hợp l!" -> "hợp lệ"
    content = content.replace(/hợp l!/g, 'hợp lệ');

    // "địa ch0" might be "địa ch\uFFFD0"
    content = content.replace(/địa ch0/g, 'địa chỉ');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fixed: ${path.basename(file)}`);
        fixedCount++;
    }
});

console.log(`Finished. Fixed ${fixedCount} files.`);
