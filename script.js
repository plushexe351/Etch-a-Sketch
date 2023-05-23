const container = document.querySelector('.container');
const grid = 16;
for (let i = 0; i < (grid * grid); i++) {
    container.innerHTML += `<div class="cell"></div>`;
}
document.querySelectorAll('.cell').forEach(cell => {
    cell.style.cssText = `height : calc(500px / ${grid})`;
    cell.style.cssText = `width : calc(500px / ${grid})`;
    cell.addEventListener('mouseover', () => {
        cell.style.background = `pink`;
    })
})

document.querySelector('h1').addEventListener('click', () => {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.background = "purple";
    })
})