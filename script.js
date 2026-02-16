/* =========================
   НОВОГОДНЯЯ МУЗЫКА
========================= */
const music = document.getElementById("music");

function toggleMusic() {
    if (!music) return;
    music.paused ? music.play() : music.pause();
}

/* =========================
   СНЕГ
========================= */
function createSnow() {
    const snow = document.createElement("div");
    snow.className = "snow";
    snow.innerHTML = "❄";
    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.animationDuration = (Math.random() * 3 + 2) + "s";
    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), 5000);
}
setInterval(createSnow, 200);

/* =========================
   БАЗА ВОПРОСОВ
========================= */
const questions = {
    trig: {
        easy: [
            {q:"sin(90°)?", a:["0","1","-1","0.5"], c:1},
            {q:"cos(0°)?", a:["1","0","-1","0.5"], c:0},
            {q:"tan(45°)?", a:["1","0","-1","2"], c:0},
            {q:"sin(30°)?", a:["0.5","1","0","2"], c:0},
            {q:"cos(60°)?", a:["0.5","1","0","2"], c:0},
            {q:"sin²x+cos²x?", a:["1","0","2","x"], c:0},
            {q:"cos(90°)?", a:["0","1","-1","2"], c:0},
            {q:"tan(0°)?", a:["0","1","-1","2"], c:0},
            {q:"sin(45°)≈?", a:["0.7","1","0","2"], c:0},
            {q:"cos(180°)?", a:["-1","1","0","2"], c:0}
        ],
        hard: [
            {q:"tan(60°)≈?", a:["1.73","1","0","2"], c:0},
            {q:"sin(60°)≈?", a:["0.87","1","0","2"], c:0},
            {q:"cos(30°)≈?", a:["0.87","1","0","2"], c:0},
            {q:"sin(120°)?", a:["0.87","-0.87","1","0"], c:0},
            {q:"cos(120°)?", a:["-0.5","0.5","1","0"], c:0},
            {q:"sin(180°)?", a:["0","1","-1","2"], c:0},
            {q:"tan(90°)?", a:["не существует","0","1","-1"], c:0},
            {q:"sec(0°)?", a:["1","0","-1","2"], c:0},
            {q:"sin(270°)?", a:["-1","1","0","2"], c:0},
            {q:"cos(360°)?", a:["1","0","-1","2"], c:0}
        ]
    },
    log: {
        easy: [
            {q:"log₁₀(100)?", a:["2","1","0","3"], c:0},
            {q:"log₂(4)?", a:["2","1","0","3"], c:0},
            {q:"log₁₀(1000)?", a:["3","1","0","2"], c:0},
            {q:"log₃(9)?", a:["2","1","0","3"], c:0},
            {q:"log₅(25)?", a:["2","1","0","3"], c:0},
            {q:"log₂(8)?", a:["3","1","0","2"], c:0},
            {q:"log₁₀(1)?", a:["0","1","2","3"], c:0},
            {q:"log₄(16)?", a:["2","1","0","3"], c:0},
            {q:"log₉(3)?", a:["0.5","1","2","3"], c:0},
            {q:"log₂(1)?", a:["0","1","2","3"], c:0}
        ],
        hard: [
            {q:"log₂(32)?", a:["5","4","3","2"], c:0},
            {q:"log₃(27)?", a:["3","2","1","4"], c:0},
            {q:"log₅(125)?", a:["3","2","1","4"], c:0},
            {q:"log₇(49)?", a:["2","1","3","4"], c:0},
            {q:"log₁₀(0.1)?", a:["-1","1","0","2"], c:0},
            {q:"log₂(0.5)?", a:["-1","1","0","2"], c:0},
            {q:"log₄(64)?", a:["3","2","1","4"], c:0},
            {q:"log₁₀(10000)?", a:["4","3","2","1"], c:0},
            {q:"log₃(1)?", a:["0","1","2","3"], c:0},
            {q:"log₂(16)?", a:["4","3","2","5"], c:0}
        ]
    }
};

/* =========================
   ПЕРЕМЕННЫЕ ИГРЫ
========================= */
let topic, level;
let current = 0;
let score = 0;
let timer;
let timeLeft = 15;

/* =========================
   СТАРТ ИГРЫ
========================= */
function startGame(t, l){
    topic = t;
    level = l;
    current = 0;
    score = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    showQuestion();
}

/* =========================
   ПОКАЗАТЬ ВОПРОС
========================= */
function shuffle(array){
    return array.sort(()=>Math.random()-0.5);
}

function showQuestion(){
    if(current >= 10){
        endGame();
        return;
    }
    const q = questions[topic][level][current];
    const answers = shuffle([...q.a]);

    let html = `<h3>${q.q}</h3>`;
    answers.forEach(a=>{
        html += `<button onclick="checkAnswer('${a}','${q.a[q.c]}')">${a}</button>`;
    });

    document.getElementById("questionBox").innerHTML = html;
    startTimer();
}

/* =========================
   ПРОВЕРКА ОТВЕТА
========================= */
function checkAnswer(answer, correct){
    clearInterval(timer);
    if(answer === correct) score += 10;
    document.getElementById("score").innerText = score;
    current++;
    showQuestion();
}

/* =========================
   ТАЙМЕР
========================= */
function startTimer(){
    timeLeft = 15;
    document.getElementById("timer").innerText = timeLeft;
    timer = setInterval(()=>{
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if(timeLeft <= 0){
            clearInterval(timer);
            current++;
            showQuestion();
        }
    }, 1000);
}

/* =========================
   КОНЕЦ ИГРЫ
========================= */
function endGame(){
    let message = `<h2>🎉 Игра окончена!</h2><p>Ваши очки: ${score}</p>
                   <button onclick="location.reload()">В меню</button>`;
    document.getElementById("questionBox").innerHTML = message;
}
