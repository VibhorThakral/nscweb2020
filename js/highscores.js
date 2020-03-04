const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const secretKeyInput = document.getElementById('secretKey');
const keySubmit = document.getElementById('keySubmit');
const displayScoreList = document.getElementById('highScores');

let key = "";

fetch("key.json").then(res => {
    return res.json();
})
.then(secretKey => {
    key = secretKey.key;
})
.catch(err => {
    console.log(err);
});

highScoresList.innerHTML = highScores
.map(score => {
    return `<li class="high-score">${score.tid} : ${score.score}</li>`;
})
.join("");

secretKeyInput.addEventListener('keyup', ()=> {
    keySubmit.disabled = !secretKeyInput.value;
});

checkKey = (e) => {
    e.preventDefault();
    if(secretKeyInput.value === key) {
        displayScoreList.classList.toggle('displayList');
    } else {
        window.location.assign('/');
    }
}
