const grid = document.getElementById("grid");
const header = document.getElementById("header")
const row = document.getElementById('row');
const col = document.getElementById('column');
const buttonGenerate = document.querySelector('.generate');
let rows=cols=1;
let tempRows = 0;
let countLoad = 1;

let values = [];

window.onscroll = function() {setFixHeader()};
var sticky = header.offsetTop;

function setFixHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function load(){
  console.log("load more")
  let restedRows = tempRows - 100*countLoad;
  let cols = col.value;

  if(restedRows <= 0){
    return;
  }
  
  for (c = 0; c < (restedRows * cols); c++) {
    let cell = document.createElement("div");
    let value = Math.floor(Math.random() *1000);
    values.push(value);
    cell.innerText = (value);
    grid.appendChild(cell).className = "grid-item";
  };

  countLoad ++ ;
}

function generateGrid(rows, cols) {
  grid.innerHTML=''
  grid.style.setProperty('--grid-rows', rows);
  grid.style.setProperty('--grid-cols', cols);  

  if(cols > 100){
    tempRows = cols;
    cols = 100;
  }
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    let value = Math.floor(Math.random() *1000);
    values.push(value);
    cell.innerText = (value);
    grid.appendChild(cell).className = "grid-item";

  };
};

function generateHeader(cols){
  header.innerHTML=''
    header.style.setProperty('--grid-rows', 1);
    header.style.setProperty('--grid-cols', cols);


    for (c = 0; c < cols; c++) {
        let cell = document.createElement("div");
        cell.innerText = (c + 1);
        header.appendChild(cell).className = "header-item";
    };


}


function handleSort(){
  let indexClick = this.innerHTML;
  let cols = Number(col.value)|| 20 ;
  let gridValues = grid.querySelectorAll('.grid-item');
  let originValues = [];

  //get item
  gridValues.forEach((item, index) =>{
    
    item.classList.remove('grid-item-sorted')
    if(index % cols === indexClick -1 ){
      originValues.push(item.innerHTML)
      item.classList.add('grid-item-sorted')

    }
  })

  //sort
  originValues.sort((a,b) =>  Number(a)>=Number(b)? 1:-1)

  //update grid item
  gridValues.forEach((item, index) =>{
    if(index % cols === indexClick -1 ){
      item.innerHTML = originValues.shift();
    }
  })




}


function handleGenerate(){
  rows = row.value;
  cols = col.value;
  generateHeader(cols || 20);
  generateGrid(rows || 20, cols ||20);

  const index = header.querySelectorAll('.header-item');
  index.forEach(item => item.addEventListener('click', handleSort))
}


buttonGenerate.addEventListener('click', handleGenerate);

window.addEventListener('scroll', function() {
  if (window.innerHeight + window.scrollY + header.offsetTop>= grid.clientHeight) {
    load();
  }

});

