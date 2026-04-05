let time = 1500;
let timer;

function startTimer() {
    timer = setInterval(() => {
        time--;
        
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        document.getElementById("time").innerText =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (time <= 0) {
            clearInterval(timer);
        }

    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    time = 1500;
    document.getElementById("time").innerText = "25:00";
}