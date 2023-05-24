const grid = document.querySelector('.grid');
const jazzy = document.querySelector('.jazzy');
const grayscale = document.querySelector('.grayscale');
const def = document.querySelector('.default');
const eraser = document.querySelector('.eraser');
const clear = document.querySelector('.clear');
const header = document.querySelector('header');
const container = document.querySelector('.container');
const cells = 30;
let cellcolor = "#9754cb";


for (let i = 0; i < (cells * cells); i++) {
    grid.innerHTML += `<div class="cell"></div>`;
}

def.addEventListener('click', () => cellcolor = "#9754cb")
grayscale.addEventListener('click', () => cellcolor = "rgb(207, 207, 207)")
jazzy.addEventListener('click', () => cellcolor = "greenyellow");
eraser.addEventListener('click', () => cellcolor = "white");
clear.addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.background = "white";
    })
})

let mousedown = false;
// document.querySelectorAll('.cell').forEach(cell => {
//     // cell.addEventListener('mouseenter', () => {
//     //     cell.style.boxShadow = `inset 0 0 40px ${cellcolor}`;
//     // })
//     // cell.addEventListener('mouseleave', () => cell.style.boxShadow = "none");

//     // cell.addEventListener('click', () => mousedown = false);

// })
document.querySelectorAll('.cell').forEach(cell => {
    cell.style.cssText = `height : calc((100vw - ${cells}px)/ ${cells})`;
    cell.style.cssText = `width : calc((100vw - ${cells}px)/ ${cells})`;

    cell.addEventListener('mousedown', () => {
        cell.style.background = cellcolor;
        mousedown = true;

    })
    cell.addEventListener('mouseup', () => {
        mousedown = false;
    })

    cell.addEventListener('mouseover', () => {
        if (mousedown)
            cell.style.background = cellcolor;
    })
})
