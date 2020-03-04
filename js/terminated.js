let key = "";
const resetKeyInput = document.getElementById('resetKey');
const keySubmit = document.getElementById('keySubmit');

fetch("key.json").then(res => {
    return res.json();
})
.then(resetKey => {
    key = resetKey.reset;
})
.catch(err => {
    console.log(err);
});

resetKeyInput.addEventListener('keyup', ()=> {
    keySubmit.disabled = !resetKeyInput.value;
});

checkKey = (e) => {
    e.preventDefault();
    if(resetKeyInput.value === key) {
        localStorage.setItem('focus', 'true');
        window.location.assign('/');
    } else {
        console.log("Incorrect Key");
    }
}