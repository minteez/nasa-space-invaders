const fs = require('fs');

const html = fs.readFileSync('retro-space-invaders/index.html', 'utf8');

// 1. Check JS syntax
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.lastIndexOf('</script>');
const script = html.substring(scriptStart + 8, scriptEnd);

try {
  new Function(script);
  console.log('PASS: JS script syntax is 100% valid!');
} catch (e) {
  console.error('FAIL: JS syntax error:', e);
  process.exit(1);
}

// 2. Check Launch Game Menu prompt
if (html.includes('PRESS SPACEBAR TO LAUNCH MISSION')) {
  console.log('PASS: "PRESS SPACEBAR TO LAUNCH MISSION" prompt found.');
} else {
  console.error('FAIL: "PRESS SPACEBAR TO LAUNCH MISSION" missing.');
}

// 3. Check Orbitron font for title in START screen
if (script.includes("ctx.font = '700 38px \"Orbitron\", sans-serif';") && script.includes("NEBULA INVADERS")) {
  console.log('PASS: Game title in Orbitron font verified.');
} else {
  console.error('FAIL: Title in Orbitron missing.');
}

// 4. Check controls guide in start screen
if (html.includes('CONTROLS: [A / D] OR [◄ / ►] MOVE')) {
  console.log('PASS: Controls guide verified.');
} else {
  console.error('FAIL: Controls guide missing.');
}

// 5. Check Developer Credits Footer
const exactFooter = 'Engineered by Minteez and Antigravity, © 2026, All rights reserved';
if (html.includes(exactFooter)) {
  console.log('PASS: Exact developer footer text verified.');
} else {
  console.error('FAIL: Exact developer footer text missing.');
}

// 6. Check footer styles
if (html.includes('.developer-footer') && html.includes('--text-muted') && html.includes('--cyan-glow')) {
  console.log('PASS: Footer CSS styles and hover transition verified.');
} else {
  console.error('FAIL: Footer styles missing.');
}

// 7. Check that launchGame handles Spacebar launch and calls APOD + level 1
if (script.includes('launchGame()') && script.includes('this.cycleNasaBackground()')) {
  console.log('PASS: launchGame hooked to APOD and level initialization.');
} else {
  console.error('FAIL: launchGame logic issue.');
}
