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

let cellcolor = "#9754cb";

toggleGridView.addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.toggle('gridview');

    })
    toggleGridView.classList.toggle('active');
})


colorBtn.addEventListener('input', () => {
    currentMode = "pen";
    cellcolor = colorBtn.value;
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

grid.onmousedown = () => (mousedown = true);
grid.onmouseup = () => (mousedown = false);

function draw(e) {
    if (e.type === 'mouseover' && !mousedown)
        return
    e.target.classList.add('drawn');
    if (currentMode == "jazzy")
        e.target.style.background = randomColor();
    else if (currentMode == "default")
        e.target.style.background = defaultColor;
    else if (currentMode == "eraser")
        e.target.style.background = "none";
    else if (currentMode == "grayscale")
        e.target.style.background = generateGrayscale();
    else if (currentMode == "pen")
        e.target.style.background = cellcolor;
}

function updateCells(newCells) {
    cells = newCells;
}

function clearGrid() {
    grid.innerHTML = "";
}

clearBtn.addEventListener('click', () => {
    clearGrid();
    // cells = 30;
    createCells(cells);

})
defBtn.addEventListener('click', () => {
    clearGrid();
    currentMode = "default";
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

grayscaleBtn.addEventListener('click', () => {
    currentMode = "grayscale";
    cellcolor = "black";
});
jazzyBtn.addEventListener('click', () => {
    currentMode = "jazzy";
    cellcolor = randomColor();
});
eraserBtn.addEventListener('click', () => {
    currentMode = "eraser";
    cellcolor = "black";
});

function createCells(size) {

    for (let i = 0; i < (size * size); i++) {

        const cell = document.createElement('div');
        cell.classList.add('cell');

        if (!(toggleGridView.classList.contains('active')) || currentMode == "default")
            // if (!(toggleGridView.classList.contains('active')))
            cell.classList.add('gridview');

        cell.style.cssText = `height : calc(100vw / ${cells})`;
        cell.style.cssText = `width : calc(100vw/ ${cells})`;
        cell.style.background = backgroundColor;
        cell.addEventListener('mousedown', draw);
        cell.addEventListener('mouseover', draw);
        cell.addEventListener('mouseenter', () => {
            cell.style.boxShadow = `inset 0 0 60px ${cellcolor}`;
        })
        cell.addEventListener('mouseleave', () => {
            cell.style.boxShadow = "none";
        })

        grid.appendChild(cell);
    }
    grid.style.backgroundColor = backgroundColor;
}



