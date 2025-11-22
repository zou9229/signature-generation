/**
 * Script to update sitemap.xml with current date
 * Run with: node scripts/update-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

try {
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  
  // Update lastmod date
  sitemap = sitemap.replace(
    /<lastmod>[\d-]+<\/lastmod>/,
    `<lastmod>${today}</lastmod>`
  );
  
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log(`✅ Sitemap updated with date: ${today}`);
} catch (error) {
  console.error('❌ Error updating sitemap:', error.message);
  process.exit(1);
}

