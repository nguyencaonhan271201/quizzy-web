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

btn_start.addEventListener("click", function(){
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