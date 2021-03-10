let landing_background = document.getElementById('landing_jumbo')
let nav_bar = document.querySelector('.navbar');
let btn_start = document.getElementById('btn-start')
let username_input = document.getElementById('username')

document.addEventListener('DOMContentLoaded', function() {
    setBackgroundHeight();
})

btn_start.addEventListener('click', function() {
    window.location.href = `topic.html?username=${username_input.value}`;
})

function setBackgroundHeight() {
    height = window.innerHeight - nav_bar.offsetHeight;
    landing_background.style.height = `${height}px`;
}