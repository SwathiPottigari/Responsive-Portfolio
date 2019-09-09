$.getScript("questions.js");

// Global variables
var timer = 5;
var question = $("#question");
var randomQstn = '';
var correct = 0;
var incorrect = 0;
var notAnswered = 0;
var askedQuestions = [];
var intervalId;

window.onload = function () {
    $(".questionWrapper").hide();
    $(".answerWrapper").hide();
    $(".scoreCard").hide();
};

//  This function is called when a Start button is clicked
// Functionality : It displays the question to the user
$("#start").click(function () {
    if ($(this).text() === "Sure") {
        reset();
    }
    displayQstn();
    $("#start").hide();
    $("#subTitle").hide();
});

// This function is called when any of the answer option is clicked
// Functionality: It displays if the user has answered correctly or not
$(".ans").click(function () {
    if ($(this).text() === randomQstn.ca) {
        revealAnswer("You got it!!", '');
        $("#wonAudio")[0].play();
        correct++;
    }
    else {
        revealAnswer("Nope!!", randomQstn.ca);
        // To play the audio element this is how you refer.
        // SRC:https://bugs.jquery.com/ticket/10374
        $("#lostAudio")[0].play();
        incorrect++;
    }
    resetTimer();
    setTimeout(checkIfGameOver, 2000);

});

//This function is called whenever an option from the answers list is selected
// Functionality: This reveals the user if the user has selected a correct option or not
function revealAnswer(status, answer) {
    $("#status").text(status);
    $(".answerWrapper").show();
    if (answer !== '') {
        $("#answer").text("The correct answer was:" + answer);
    }
    else {
        $("#answer").addClass("hide");;
    }
    $(".questionWrapper").hide();    
    addImage();
}

//This function is called when a user clicks on start button
// Functionality: It displays the questions to the user
function displayQstn() {
    $(".questionWrapper").show();
    randomQstn = generateRandom();
    $(".answerWrapper").hide();
    if (!askedQuestions.includes(randomQstn.q)) {
        intervalId = setInterval(decrement, 1000);
        askedQuestions.push(randomQstn.q);
        question.text(randomQstn.q);
        for (var i = 0; i < randomQstn.a.length; i++) {
            $("#answer" + (i + 1)).text(randomQstn.a[i]);
        }
    }
    else {
        displayQstn();
    }
};

//This function is called to select a random question from an array
function generateRandom() {
    var random = qstnsArray[Math.floor(Math.random() * qstnsArray.length)];
    return random;
}

// This function is used to decrease the timer
function decrement() {
    timer--;
    $("#timeRemaining").text(timer);
    if (timer === 0) {
        revealAnswer("Not answered", randomQstn.ca);
        notAnswered++;
        resetTimer();
        setTimeout(checkIfGameOver, 2000);
    }
}

// This function is used to reset the timer after each question
function resetTimer() {
    timer = 5;
    clearInterval(intervalId);
}

// This function is used to check if the questions are completed
function checkIfGameOver() {
    if (qstnsArray.length === askedQuestions.length) {
        $(".answerWrapper").hide();
        $(".scoreCard").show();
        $("#wins").text("Correct Answers : " + correct);
        $("#lost").text("Incorrect Answers : " + incorrect);
        $("#notanswered").text("Unanswered : " + notAnswered);
        $("#start").show();
        $("#start").text("Sure");
        $("#subTitle").show();
        $("#subTitle").text("Do you want to play again ?");
    }
    else {
        displayQstn();
    }
}

// This function resets the game if user wants to play again
function reset() {
    resetTimer();
    $(".scoreCard").hide();
    askedQuestions = [];
    correct = 0;
    incorrect = 0;
    notAnswered = 0;
}

function addImage(){
    $("#imageDiv img:last-child").remove();
    var newimageDiv=$("<img>");
    newimageDiv.attr("src","assets/images/"+randomQstn.image);
    newimageDiv.attr("id","images");
    newimageDiv.addClass("img-thumbnail");    
    $("#imageDiv").append(newimageDiv);
}