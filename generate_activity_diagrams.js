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
    
    // Check if Activity Diagram already exists
    if (content.includes('### Activity Diagram')) {
        // console.log(`Skipping ${path.basename(file)} (Already has Activity Diagram)`);
        return;
    }

    // Extract Sequence Diagram block
    const seqRegex = /```mermaid\s+sequenceDiagram([\s\S]*?)```/;
    const match = content.match(seqRegex);
    
    if (!match) return;
    
    const seqBody = match[1];
    const lines = seqBody.split('\n');
    
    let activitySteps = [];
    let stepCount = 1;
    
    lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        
        // Parse "A->>B: Message"
        // Regex: ([^-]+)->>([A-Za-z0-9_]+):\s*(.*)
        // Also handle "->", "-->>"
        const arrowRegex = /([^-]+)-+>>?([^\s:]+):\s*(.*)/;
        const arrowMatch = line.match(arrowRegex);
        
        if (arrowMatch) {
            const source = arrowMatch[1].trim();
            const target = arrowMatch[2].trim();
            const msg = arrowMatch[3].trim();
            
            // formatting label: "User: POST /api/..."
            // shorten source/target if they are aliases (but here they are usually short)
            
            // Clean up text for Mermaid label
            let label = msg.replace(/["()]/g, '').replace(/<br\/>/g, ' ');
            if (label.length > 40) label = label.substring(0, 37) + '...';
            
            activitySteps.push(`    Step${stepCount}["${source} -> ${target}: ${label}"]`);
            stepCount++;
        }
        
        // Handle 'alt' / 'else' / 'opt' as simple notes or simplified flow?
        // Implementing full logic is hard.
        // Let's just capture the flow sequentially for now, it's a "Happy Path" + "Alt Path" linear view.
        // Or detect "alt" lines to add a label.
        if (line.startsWith('alt ') || line.startsWith('opt ')) {
            const condition = line.replace(/^(alt|opt)\s+/, '');
             activitySteps.push(`    %% Condition: ${condition}`);
        }
    });
    
    if (activitySteps.length === 0) return;
    
    // Build Activity Diagram
    let diag = `### Activity Diagram\n\n\`\`\`mermaid\ngraph TD\n    Start((Start))\n`;
    
    // Link nodes
    diag += `    Start --> Step1\n`;
    
    for (let i = 0; i < activitySteps.length; i++) {
        diag += activitySteps[i] + '\n';
        if (i < activitySteps.length - 1) {
            diag += `    Step${i+1} --> Step${i+2}\n`;
        }
    }
    
    diag += `    Step${activitySteps.length} --> End((End))\n\`\`\`\n\n`;
    
    // Insert into file
    // Find where to insert. After "### Communication Diagram" block.
    // Regex for Communication Diagram block:
    // ### Communication Diagram\s+```mermaid[\s\S]*?```
    
    const commBlockRegex = /(### Communication Diagram\s+```mermaid[\s\S]*?```)/;
    const commMatch = content.match(commBlockRegex);
    
    if (commMatch) {
        // Append after
        const insertionPoint = commMatch.index + commMatch[0].length;
        const newContent = content.slice(0, insertionPoint) + '\n\n' + diag + content.slice(insertionPoint);
        
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Added Activity Diagram to: ${path.basename(file)}`);
        fixedCount++;
    } else {
        // Fallback: Append to end of file if "System Diagrams" exists
        if (content.includes('Biểu đồ hệ thống (System Diagrams)')) {
             const newContent = content + '\n' + diag;
             fs.writeFileSync(file, newContent, 'utf8');
             console.log(`Added Activity Diagram to (fallback): ${path.basename(file)}`);
             fixedCount++;
        }
    }
});

console.log(`Finished. Added diagram to ${fixedCount} files.`);
