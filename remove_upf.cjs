const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// I will parse the JS out, or just use regex. Regex is risky for arrays of objects.
// Let's create a script that removes 'upf' directly from the data.ts file using string manipulation or by modifying the TS AST?
// No, a simple node script to read data.ts, extract the arrays, filter them, and rewrite the file would be best.

// Wait, I can just use a regex if it's well formatted.
// Actually, data.ts has `export const UNIVERSITIES: University[] = [ ... ]`
