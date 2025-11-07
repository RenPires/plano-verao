// Script para verificar imports React nos arquivos
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, extname } from 'path';

function checkFile(filePath) {
  if (!existsSync(filePath)) return;
  
  const content = readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const hasReactImport = lines.some(line => 
    line.includes('import React') || 
    line.includes('from \'react\'') ||
    line.includes('from "react"')
  );
  
  const hasJSX = content.includes('</') || content.includes('/>');
  
  if (hasJSX && !hasReactImport && extname(filePath) === '.jsx') {
    console.log(`⚠️  Arquivo ${filePath} usa JSX mas não importa React`);
  }
}

function checkDirectory(dir) {
  const files = readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = resolve(dir, file.name);
    
    if (file.isDirectory()) {
      checkDirectory(fullPath);
    } else if (extname(file.name) === '.jsx') {
      checkFile(fullPath);
    }
  });
}

console.log('🔍 Verificando imports React...\n');
checkDirectory(resolve('./src'));
console.log('\n✅ Verificação concluída!');