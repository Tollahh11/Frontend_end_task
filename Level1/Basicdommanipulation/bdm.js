let counter = 0
let result = document.getElementById("result");
let add = document.getElementById("add");
let minus = document.getElementById("minus");
let reset = document.getElementById("reset");

// function
result.textContent = 0
add.addEventListener("click",()=>{
    counter += 1;
    result.textContent = counter;
})

minus.addEventListener("click", ()=>{
    counter -= 1;
    result.textContent = counter
})
reset.addEventListener("click",()=>{
    counter = 0
    result.textContent = counter
})