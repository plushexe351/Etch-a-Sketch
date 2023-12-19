const grid = document.querySelector('.grid');
const jazzyBtn = document.querySelector('.jazzy');
const grayscaleBtn = document.querySelector('.grayscale');
const defBtn = document.querySelector('.default');
const eraserBtn = document.querySelector('.eraser');
const clearBtn = document.querySelector('.clear');
const header = document.querySelector('header');
const baColorBtn = document.getElementById('ba-color');
const penBtn = document.querySelector('.pen');
const colorBtn = document.getElementById('color');
const toggleGridView = document.querySelector('.toggle-grid');
const pickrange = document.querySelector('#pickrange');
const togglePen = document.querySelector('.toggle-pen');
const toggleSettings = document.querySelector('.toggleSettings');
const navItems = document.querySelectorAll('ul *');

const defaultBackground = "white";
const defaultCells = 50;
const defaultColor = "#9754cb";

let backgroundColor = defaultBackground;
let currentMode = 'default';
let cells;

pickrange.addEventListener('input', () => {
    cells = pickrange.value;
    clearGrid();
    createCells(cells);
})

let cellcolor = defaultColor;

toggleGridView.addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.toggle('gridview');

    })
    toggleGridView.classList.toggle('active');
})


colorBtn.addEventListener('input', () => {
    currentMode = "pen";
    cellcolor = colorBtn.value;
    togglePen.classList.add('active');
    grayscaleBtn.classList.remove('current');
    jazzyBtn.classList.remove('current');
})


baColorBtn.addEventListener('input', () => {

    backgroundColor = baColorBtn.value;
    document.querySelectorAll('.cell').forEach(cell => {
        if (!(cell.classList.contains('drawn')))
            cell.style.background = backgroundColor;
    })
    grid.style.backgroundColor = backgroundColor;
})


window.onload = () => {
    currentMode = "default";
    cells = defaultCells;
    createCells(defaultCells);
}

let mousedown = false;

document.body.onmousedown = () => (mousedown = true);
document.body.onmouseup = () => (mousedown = false);


function draw(e) {
    e.preventDefault();
    let targetElement;
    if ((e.type === 'mouseover') && !mousedown)
        return
    if (e.type === 'touchstart' || e.type === 'touchmove') {
        const touch = e.touches[0];
        targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!targetElement || !targetElement.classList.contains('cell')) {
            return;
        }
        console.log(targetElement);
    }
    if (currentMode == "jazzy") {
        e.target.style.background = randomColor();
        targetElement.style.background = randomColor();
    }
    else if (currentMode == "default") {
        e.target.style.background = defaultColor;
        targetElement.style.background = defaultColor || null;

    }
    else if (currentMode == "eraser") {
        e.target.style.background = "none";
        targetElement.style.background = "none";

    }
    else if (currentMode == "grayscale") {
        e.target.style.background = generateGrayscale();
        targetElement.style.background = generateGrayscale();
    }
    else if (currentMode == "pen") {
        e.target.style.background = cellcolor;
        targetElement.style.background = cellcolor;
    }
}

function updateCells(newCells) {
    cells = newCells;
}

function clearGrid() {
    grid.innerHTML = "";
}

clearBtn.addEventListener('click', () => {
    clearGrid();
    createCells(cells);

})
defBtn.addEventListener('click', () => {
    clearGrid();
    currentMode = "default";
    grayscaleBtn.classList.remove('current');
    jazzyBtn.classList.remove('current');
    cells = defaultCells;
    backgroundColor = defaultBackground;
    cellcolor = "#9754cb";
    toggleGridView.classList.remove('active');
    createCells(cells);
})

function randomColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
}

function generateGrayscale() {
    let rgb = Math.floor(Math.random() * 250);

    return `rgb(${rgb},${rgb},${rgb})`;

}
togglePen.addEventListener('click', () => {
    currentMode = "pen";
    grayscaleBtn.classList.remove('current');
    jazzyBtn.classList.remove('current');
    cellcolor = colorBtn.value;
    togglePen.classList.add('active');

})
grayscaleBtn.addEventListener('click', () => {
    currentMode = "grayscale";
    grayscaleBtn.classList.add('current');
    jazzyBtn.classList.remove('current');

    cellcolor = "black";
});
jazzyBtn.addEventListener('click', () => {
    currentMode = "jazzy";
    jazzyBtn.classList.add('current');
    grayscaleBtn.classList.remove('current');

    cellcolor = randomColor();
});
eraserBtn.addEventListener('click', () => {
    grayscaleBtn.classList.remove('current');
    jazzyBtn.classList.remove('current');
    currentMode = "eraser";
    cellcolor = "black";
    togglePen.classList.remove('active');
});

function createCells(size) {

    for (let i = 0; i < (size * size); i++) {

        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (!(toggleGridView.classList.contains('active')) || currentMode == "default")
            cell.classList.add('gridview');

        cell.style.cssText = `height : calc(100vw / ${cells})`;
        cell.style.cssText = `width : calc(100vw/ ${cells})`;
        cell.style.background = backgroundColor;

        cell.addEventListener('mousedown', draw);
        cell.addEventListener('touchstart', draw);
        cell.addEventListener('touchmove', draw);
        cell.addEventListener('mouseover', draw);

        cell.addEventListener('touchend', () => {
            mousedown = false;
        });
        cell.addEventListener('mouseenter', () => {
            cell.style.boxShadow = `inset 0 0 50px ${cellcolor}`;
        })
        cell.addEventListener('mouseleave', () => {
            cell.style.boxShadow = "none";
        })

        grid.appendChild(cell);
    }
    grid.style.backgroundColor = backgroundColor;
}

toggleSettings.addEventListener('click', () => {
    header.classList.toggle('nav-active');
    navItems.forEach(item => {
        item.classList.toggle('nav-active');
    })
})