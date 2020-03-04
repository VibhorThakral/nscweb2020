const teamid = document.getElementById('teamID');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

teamid.addEventListener('keyup', ()=> {
    saveScoreBtn.disabled = !teamid.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        tid: teamid.value
    };

    highScores.push(score);
    highScores.sort((a,b) =>  b.score - a.score);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign("https://vibhorthakral.github.io/nscweb2020");
}