// Unit tests for Red and Green Split color-switch functionality
// Run with: node tests.js

const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Simple test runner
let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  PASS: ${name}`);
    passed++;
  } catch (err) {
    console.log(`  FAIL: ${name}`);
    console.log(`        ${err.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message || 'Assertion failed');
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected "${expected}" but got "${actual}"`);
  }
}

// Load the HTML file
const htmlPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

function createDOM() {
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  return dom.window;
}

console.log('Running tests for Red and Green Split...\n');

// Test 1: Initial state - left panel should be red, right panel should be green
test('Initial state: left side is red, right side is green', () => {
  const win = createDOM();
  const container = win.document.getElementById('container');
  const leftPanel = win.document.getElementById('panel-left');
  const rightPanel = win.document.getElementById('panel-right');

  assert(leftPanel, 'Left panel element should exist');
  assert(rightPanel, 'Right panel element should exist');
  assert(!container.classList.contains('swapped'), 'Container should not have "swapped" class initially');
});

// Test 2: After one click, container should have "swapped" class
test('After one click: container has "swapped" class', () => {
  const win = createDOM();
  const container = win.document.getElementById('container');
  const btn = win.document.getElementById('btn-toggle');

  assert(btn, 'Toggle button should exist');
  btn.click();

  assert(container.classList.contains('swapped'), 'Container should have "swapped" class after one click');
});

// Test 3: After two clicks, container should return to original state
test('After two clicks: container returns to original state (no "swapped" class)', () => {
  const win = createDOM();
  const container = win.document.getElementById('container');
  const btn = win.document.getElementById('btn-toggle');

  btn.click();
  btn.click();

  assert(!container.classList.contains('swapped'), 'Container should not have "swapped" class after two clicks');
});

// Test 4: Toggle works repeatedly
test('Toggle works repeatedly (odd clicks = swapped, even clicks = original)', () => {
  const win = createDOM();
  const container = win.document.getElementById('container');
  const btn = win.document.getElementById('btn-toggle');

  for (let i = 1; i <= 6; i++) {
    btn.click();
    const isSwapped = container.classList.contains('swapped');
    if (i % 2 === 1) {
      assert(isSwapped, `After ${i} click(s), container should be swapped`);
    } else {
      assert(!isSwapped, `After ${i} click(s), container should not be swapped`);
    }
  }
});

// Test 5: Button exists and is centered (has the correct class)
test('Toggle button exists with correct class', () => {
  const win = createDOM();
  const btn = win.document.getElementById('btn-toggle');

  assert(btn, 'Button with id "btn-toggle" should exist');
  assert(btn.classList.contains('btn-toggle'), 'Button should have class "btn-toggle"');
});

// Test 6: Both panels exist with correct classes
test('Both panels exist with correct CSS classes', () => {
  const win = createDOM();
  const leftPanel = win.document.getElementById('panel-left');
  const rightPanel = win.document.getElementById('panel-right');

  assert(leftPanel.classList.contains('panel-left'), 'Left panel should have class "panel-left"');
  assert(rightPanel.classList.contains('panel-right'), 'Right panel should have class "panel-right"');
});

// Summary
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('All tests passed!');
}
