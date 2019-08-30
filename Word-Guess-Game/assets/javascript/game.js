var words = [{w:"hello",c:"It's a greeting !!",img:"img1"}, {w:"happy",c:"It's an emotion !!",img:"img2"},{w:"smile",c:"you do it when you are happy !!",img:"smiley"}];
var randomWord = words[Math.floor(Math.random() * words.length)];
var hide = document.getElementById("hide");
var guessLeft=document.getElementById("guessLeft");
var clue=document.getElementById("clue");
var image=document.getElementById("images");
var chancesLeft = randomWord.w.length;
var userGuessedArray=[];
var tempUserWord=[];
var wins=0;
var lostAudio=document.getElementById("lostAudio");
var wonAudio=document.getElementById("wonAudio");

// This method is called when browser is loaded or refreshed
window.onload = function () {
    clue.textContent="Hint : "+randomWord.c;
    image.innerHTML= '<img  src="assets/images/'+randomWord.img+'.png" alt="">';
    hide.innerHTML = hideWord(randomWord.w);
    guessLeft.textContent=chancesLeft;
};

// This method is called when a key is pressed and released
document.onkeyup=function(event){
   
    if(chancesLeft-1>0)
    {
        chosenWord(event.key);
        guessLeft.textContent=chancesLeft;
    }
    else{
        lostAudio.play();
       resetGame();
    }    
};

// This function is called when browser is loaded and used for hiding the word
function hideWord(word) {
    var hidingword = '';
    for(let i=0;i<word.length;i++)
    {
        hidingword=hidingword+' ' + '<span id="' + i + '">_</span>';
    }
    return   hidingword;

};

// This method reveals the letter as the user selects letter
function chosenWord(userKey){ 
    if(randomWord.w.indexOf(userKey)>-1)
    {    
        for (let i = 0; i < randomWord.w.length; i++) {        
            if (userKey ===randomWord.w[i])
            {
                document.getElementById(i).textContent=userKey;
                tempUserWord.push(userKey);            
            }  
        }
        // isSameWord(userWord);
        if(tempUserWord.length===randomWord.w.length)
        {
            wonAudio.play();
            wins++;
            resetGame();
        }
    }
    else if(!(userGuessedArray.indexOf(userKey)>-1)){
        chancesLeft--;
        userGuessedLetters(userKey);        
    }    
}

// This function displays the user guessed letters
function userGuessedLetters(letter){  
    var letters='';  
    userGuessedArray.push(letter);
    for(let i=0;i<userGuessedArray.length;i++)
    {
        if(i===0)
        {
            letters=userGuessedArray[i];
        }
        else
        {
            letters=letters+" , "+userGuessedArray[i];       
        }
        
    }
    document.getElementById("userLetters").textContent=letters;
}

// This function resets the game
function resetGame(){
    randomWord = words[Math.floor(Math.random() * words.length)];
    hide.innerHTML = hideWord(randomWord.w);
    chancesLeft = randomWord.w.length;
    userGuessedArray=[];
    guessLeft.textContent=chancesLeft;
    tempUserWord=[];
    document.getElementById("userLetters").textContent='';
    document.getElementById("wins").textContent=wins;
    clue.textContent="Hint : "+randomWord.c;
}

