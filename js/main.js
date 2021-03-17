/*let landing_background = document.getElementById('landing_jumbo')
let nav_bar = document.querySelector('.navbar');
let btn_start = document.getElementById('btn-start')
let username_input = document.getElementById('username')

document.addEventListener('DOMContentLoaded', function() {
    setBackgroundHeight();
})

btn_start.addEventListener('click', function() {
    window.location.href = `choosing.html?username=${username_input.value}`;
})

function setBackgroundHeight() {
    height = window.innerHeight - nav_bar.offsetHeight;
    landing_background.style.height = `${height}px`;
}*/

//hide navbar
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySelector(".navbar").style.top="0";
} else {
    document.querySelector(".navbar").style.top="-20vh";
}
  prevScrollpos = currentScrollPos;
}

//button unclickable
let username_input = document.getElementById("username");
let btn_start = document.getElementById("btn-start");

username_input.addEventListener("change",function(){
    if (this.value == null || this.value==''){
        btn_start.classList.add("disabled");
    }
    else{
        btn_start.classList.remove("disabled");
    }
});

btn_start.addEventListener("click",function(){
    if (this.classList.contains("disabled")){
        username_input.classList.add("shake");
        setTimeout(()=>{
            username_input.classList.remove("shake");
        },500);
    }
    else{
        window.location.href = `choosing.html?username=${username_input.value}`;
    }
})