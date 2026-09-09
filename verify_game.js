const fs = require('fs');

const html = fs.readFileSync('retro-space-invaders/index.html', 'utf8');
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const script = html.substring(scriptStart + 8, scriptEnd);

console.log('Total HTML characters:', html.length);
console.log('Script length:', script.length);

// Verify const k
const targetK = 'const k = "LJX1p0FHHvHTZUcSQTzigkTSaOZG1x1wWv8DsNVL";';
if (script.includes(targetK)) {
  console.log('PASS: const k is defined exactly as required.');
} else {
  console.error('FAIL: const k not found.');
}

// Verify fetchSpaceBackground
if (script.includes('async function fetchSpaceBackground(dateOffset = 0)')) {
  console.log('PASS: fetchSpaceBackground function defined.');
} else {
  console.error('FAIL: fetchSpaceBackground missing.');
}

// Verify getTargetDate
if (script.includes('function getTargetDate(dateOffset = 0)')) {
  console.log('PASS: getTargetDate function defined.');
} else {
  console.error('FAIL: getTargetDate missing.');
}

// Verify OmegaBoss
if (script.includes('class OmegaBoss')) {
  console.log('PASS: OmegaBoss class defined for Level 3 Boss Fights.');
} else {
  console.error('FAIL: OmegaBoss missing.');
}

// Verify Bento Grid classes
const requiredClasses = ['dashboard-grid', 'panel', 'game-hero', 'metadata-feed'];
for (const cls of requiredClasses) {
  if (html.includes(cls)) {
    console.log(`PASS: Bento class ${cls} found in markup.`);
  } else {
    console.error(`FAIL: Bento class ${cls} missing.`);
  }
}

// Test target date generation
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
// Extract and eval getTargetDate
const getTargetDateSrc = script.match(/function getTargetDate[\s\S]*?\n    \}/)[0];
eval(getTargetDateSrc);
for (let i = 0; i < 10; i++) {
  const d = getTargetDate(i);
  if (!dateRegex.test(d)) {
    console.error('FAIL: invalid date format:', d);
  }
}
console.log('PASS: getTargetDate produces valid YYYY-MM-DD dates, sample:', getTargetDate(0));
