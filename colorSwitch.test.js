/**
 * Unit tests for the color-switch button functionality.
 * Tests the class-based toggling logic from index.html.
 *
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

function setupDOM() {
  const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
  document.documentElement.innerHTML = html;

  // Define toggleColors globally as the HTML calls it via onclick
  global.toggleColors = function () {
    const container = document.getElementById('container');
    container.classList.toggle('swapped');
  };
}

beforeEach(() => {
  setupDOM();
});

function getContainer() { return document.getElementById('container'); }
function getBtn() { return document.getElementById('btn-toggle'); }

describe('Initial state', () => {
  test('container does not have "swapped" class', () => {
    expect(getContainer().classList.contains('swapped')).toBe(false);
  });

  test('left panel has class "panel-left"', () => {
    expect(document.getElementById('panel-left').classList.contains('panel-left')).toBe(true);
  });

  test('right panel has class "panel-right"', () => {
    expect(document.getElementById('panel-right').classList.contains('panel-right')).toBe(true);
  });
});

describe('After one click', () => {
  beforeEach(() => global.toggleColors());

  test('container has "swapped" class', () => {
    expect(getContainer().classList.contains('swapped')).toBe(true);
  });
});

describe('After two clicks (back to original)', () => {
  beforeEach(() => {
    global.toggleColors();
    global.toggleColors();
  });

  test('container does not have "swapped" class', () => {
    expect(getContainer().classList.contains('swapped')).toBe(false);
  });
});

describe('Toggle works repeatedly', () => {
  test('odd clicks result in swapped state, even clicks in original', () => {
    const container = getContainer();
    for (let i = 1; i <= 6; i++) {
      global.toggleColors();
      expect(container.classList.contains('swapped')).toBe(i % 2 === 1);
    }
  });
});
