
//toggle light-dark theme
const dark=document.querySelector(".theme-dark");
const input=document.querySelector('input');
input.addEventListener('change',()=>{
    if(this.checked){
        dark.className="theme-dark";
    }
    else{
        dark.className="theme-light"
    }
    this.checked=!this.checked;
})

//Drop down
const dropdownButton=document.querySelectorAll(".dropdown-toggle")[1];
const dropdownDiv=document.querySelectorAll(".btn-group")[2];
const dropdownMenu=document.querySelector(".dropdown-menu");
const style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(5px, 36px, 0px);";
dropdownButton.addEventListener('click',()=>{
    const show=dropdownButton.ariaExpanded;
    console.log(show);
    if(show==="false"){
        dropdownDiv.classList.add("show");
        dropdownMenu.classList.add("show");
        dropdownMenu.style=style;
        dropdownMenu.setAttribute('x-placement',"bottom-start");
        dropdownButton.ariaExpanded="true";
    }
    else{
        dropdownDiv.classList.remove("show");
        dropdownMenu.classList.remove("show");
        dropdownMenu.style="";
        dropdownMenu.removeAttribute('x-placement',"bottom-start");
        dropdownButton.ariaExpanded="false";
    }

})

