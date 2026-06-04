import fs from 'node:fs';
import path from 'node:path';

const nextDirectory = path.join(process.cwd(), '.next');
const nextDevDirectory = path.join(process.cwd(), '.next-dev');

fs.rmSync(nextDirectory, {recursive: true, force: true});
fs.rmSync(nextDevDirectory, {recursive: true, force: true});
console.log('Removed .next and .next-dev cache directories.');
