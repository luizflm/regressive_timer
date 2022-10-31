/* Initial Data */
let input = document.querySelector('.input input');
let time = document.querySelector('.time');

let interval;

let hours = 0;
let minutes = 0;
let seconds = 59;

let start = document.querySelector('.buttons .start');
let resume = document.querySelector('.buttons .resume');
let pause = document.querySelector('.buttons .pause');
let reset = document.querySelector('.buttons .reset');

/* Events */
input.addEventListener('focus', (e)=>{
    let span = e.target.previousElementSibling;
    span.classList.add('active');
});

input.addEventListener('focusout', (e)=>{
    let span = e.target.previousElementSibling;
    let inputValue = input.value;
    if(inputValue == '') {
        span.classList.remove('active');
    }
});


start.addEventListener("click", () => {
    let timeInput = document.querySelector('.input input').value;

    seconds = 59;

    if(timeInput >= 60) {
        hours = Math.floor(timeInput / 60);
        minutes = (timeInput % 60) - 1;
    } else {
        minutes = timeInput - 1;
    };

    time.innerHTML = `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;

    interval = setInterval(showTime, 60);


});

resume.addEventListener('click', () => {
    interval = setInterval(showTime, 60);
})

pause.addEventListener('click', () => {
    clearInterval(interval);
});

reset.addEventListener('click', resetCount);

/* Functions */ 

function twoDigits(number) {
    return number < 10? `0${number}` : number;
}
function resetCount() {
    clearInterval(interval);
    time.innerHTML = "00:00:00";
    input.value = '';
}

function showTime() {
    seconds--;
    if(seconds == 0) {
        seconds = 59;
        
        if(hours > 0) {
            if(minutes > 0) { // 01:05:00 >> 01:04:59
                minutes--;
            } else { // 01:00:00 >> 00:59:00
                hours--;
                minutes = 59;
            };

        } else { // hours == 0
            if(minutes > 0) { // 00:05:00 >> 00:04:59
                minutes--;
            } else { // 00:00:00
                resetCount();
                seconds = 0;
            };

        };
    };

    time.innerHTML = `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(seconds)}`;
};




