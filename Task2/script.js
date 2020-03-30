const grid = document.getElementById("grid");
const header = document.getElementById("header")
const row = document.getElementById('row');
const col = document.getElementById('column');
const buttonGenerate = document.querySelector('.generate');

let values = [];

window.onscroll = function() {myFunction()};
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


function generateGrid(rows, cols) {
  grid.style.setProperty('--grid-rows', rows);
  grid.style.setProperty('--grid-cols', cols);  

  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    let value = Math.floor(Math.random() *1000);
    while(true){
        if(values.length === 0){
            values.push(value);
            break;
        }
        if(values.indexOf(value) === -1){
            values.push(value);
            break;
        }        
        value = Math.floor(Math.random() *1000);
    }
    cell.innerText = (value);
    grid.appendChild(cell).className = "grid-item";
  };
};

function generateHeader(cols){
    header.style.setProperty('--grid-rows', 1);
    header.style.setProperty('--grid-cols', cols);

    // header.style.width = grid.style.width;

    for (c = 0; c < cols; c++) {
        let cell = document.createElement("div");
        cell.innerText = (c + 1);
        header.appendChild(cell).className = "header-item";
    };


}



function handleGenerate(){
    const rows = row.value;
    const cols = col.value;
    generateGrid(rows, cols);
    generateHeader(cols);


}


buttonGenerate.addEventListener('click', handleGenerate)



