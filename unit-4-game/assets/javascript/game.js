var randomNumber = Math.floor(Math.random() * 102) + 19;
var randomNumberDiv = $("#randomNumber");
var userScore = 0;
var userScoreDiv = $("#userScore");
var crystal1 = (Math.floor(Math.random() * 6) + 1) * 2;
var crystal2 = (Math.floor(Math.random() * 6) + 1) * 2;
var crystal3 = ((Math.floor(Math.random() * 6)) * 2) + 1;
var crystal4 = ((Math.floor(Math.random() * 6)) * 2) + 1;
var wins = 0;
var losses = 0;
var winAudio=document.getElementById("wonAudio");
var lostAudio=document.getElementById("lostAudio");
var status='';

// This function loads when the page loads
window.onload = function () {
    randomNumberDiv.text(randomNumber);
    userScoreDiv.text(userScore);
    $("#wins").text("Wins :"+wins);
    $("#loss").text("Losses :"+losses);
};

// This function is executed when Crystal1 is clicked
$("img").click(function () {
    var score = '';
    console.log(this);
    switch ($(this).data('value')) {
        case "crystal1":
            score = crystal1;
            break;
        case "crystal2":
            score = crystal2;
            break;
        case "crystal3":
            score = crystal3;
            break;
        default:
            score = crystal4;
    }    
    updateUserScore(score);
});

// This function is executed when Crystals are clicked
function updateUserScore(score) {    
    userScore = userScore + score;
    if (!checkIfWon()) {
        // alert('Hello');
        userScoreDiv.text(userScore);
    }
};


// This function checks if the user is won or lost
function checkIfWon() {
    if (userScore === randomNumber) {
        wins++;
        winAudio.play();
        status='You won!!';
        reset();        
        return true;
    }
    if (userScore > randomNumber) {
        losses++;
        lostAudio.play();
        status='You lost!!';
        reset();
        return true;
    }
    
        return false;
    
};

// This function resets the game
function reset() {
    $("#status").text(status);
    $("#wins").text("Wins :"+wins);
    $("#loss").text("Losses :"+losses);
    userScore = 0;
    randomNumber = Math.floor(Math.random() * 102) + 19;
    crystal1 = (Math.floor(Math.random() * 6) + 1) * 2;
    crystal2 = (Math.floor(Math.random() * 6) + 1) * 2;
    crystal3 = ((Math.floor(Math.random() * 6)) * 2) + 1;
    crystal4 = ((Math.floor(Math.random() * 6)) * 2) + 1;
    userScoreDiv.text(userScore);
    randomNumberDiv.text(randomNumber);
};
