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

    // We look for:
    // ## [Num]. Sequence Diagram
    // ... content ...
    // ## [Num]. Communication Diagram
    // ... content ...
    
    // We want to merge them.
    // NOTE: Numbering might vary.
    
    // Strategy:
    // 1. Find "## [digit]. Sequence Diagram"
    // 2. Find "## [digit]. Communication Diagram"
    
    // Regex for Sequence Header
    const seqRegex = /##\s+(\d+)\.\s+Sequence Diagram/;
    const commRegex = /##\s+(\d+)\.\s+Communication Diagram/;
    
    const seqMatch = content.match(seqRegex);
    const commMatch = content.match(commRegex);
    
    if (seqMatch && commMatch) {
        // Assume they appear in order (Sequence then Communication, or vice versa, usually Sequence first).
        
        // We'll replace the first one we find (usually Sequence) with the Parent Header + Subsection
        // And the second one with just Subsection.
        
        // Let's rely on string replacement.
        // Replace "## X. Sequence Diagram" with "## X. Biểu đồ hệ thống (System Diagrams)\n\n### Sequence Diagram"
        // Replace "## Y. Communication Diagram" with "### Communication Diagram"
        
        // Use the index to check order?
        // Usually Sequence is #7, Communication is #8.
        // We want:
        // ## 7. Biểu đồ hệ thống (System Diagrams)
        // ### Sequence Diagram
        // ...
        // ### Communication Diagram
        // ...
        
        // Capture the number from Sequence Diagram to reuse for the Parent.
        const seqNum = seqMatch[1];
        
        content = content.replace(seqRegex, `## ${seqNum}. Biểu đồ hệ thống (System Diagrams)\n\n### Sequence Diagram`);
        content = content.replace(commRegex, `### Communication Diagram`);
        
        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Refactored: ${path.basename(file)}`);
            fixedCount++;
        }
    }
});

console.log(`Finished. Refactored ${fixedCount} files.`);
