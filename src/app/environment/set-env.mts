import * as dotenv from 'dotenv';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const environment = process.env['ENV'] || 'development';
const apiKey = process.env['TMDB_API_KEY'];

if (!apiKey) {
  throw new Error('❌ TMDB_API_KEY is not set in environment variables.');
}

const targetPath = path.resolve(__dirname, `environment.${environment}.ts`);

const fileContent = `
export const environment = {
  production: ${environment === 'production'},
  TMDB_API_KEY: '${apiKey}'
};
`;

await writeFile(targetPath, fileContent.trim(), { encoding: 'utf-8' });

console.log(`✅ Environment file created: ${targetPath}`);
