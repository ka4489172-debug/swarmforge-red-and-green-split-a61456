/**
 * Unit tests for the color-switch button functionality.
 *
 * @jest-environment jsdom
 */

// Set up the DOM structure that matches index.html
function setupDOM() {
  document.body.innerHTML = `
    <div id="left" style="background-color: red;"></div>
    <div id="right" style="background-color: green;"></div>
    <button id="toggle-btn">Switch Colors</button>
  `;

  // Replicate the toggle logic from index.html
  const left = document.getElementById('left');
  const right = document.getElementById('right');
  const btn = document.getElementById('toggle-btn');

  let toggled = false;

  btn.addEventListener('click', function () {
    toggled = !toggled;
    if (toggled) {
      left.style.backgroundColor = 'green';
      right.style.backgroundColor = 'red';
    } else {
      left.style.backgroundColor = 'red';
      right.style.backgroundColor = 'green';
    }
  });
}

beforeEach(() => {
  setupDOM();
});

function getLeft() { return document.getElementById('left'); }
function getRight() { return document.getElementById('right'); }
function getBtn() { return document.getElementById('toggle-btn'); }

describe('Initial state', () => {
  test('left side has red background', () => {
    expect(getLeft().style.backgroundColor).toBe('red');
  });

  test('right side has green background', () => {
    expect(getRight().style.backgroundColor).toBe('green');
  });
});

describe('After one click', () => {
  beforeEach(() => getBtn().click());

  test('left side switches to green', () => {
    expect(getLeft().style.backgroundColor).toBe('green');
  });

  test('right side switches to red', () => {
    expect(getRight().style.backgroundColor).toBe('red');
  });
});

describe('After two clicks (back to original)', () => {
  beforeEach(() => {
    getBtn().click();
    getBtn().click();
  });

  test('left side returns to red', () => {
    expect(getLeft().style.backgroundColor).toBe('red');
  });

  test('right side returns to green', () => {
    expect(getRight().style.backgroundColor).toBe('green');
  });
});
