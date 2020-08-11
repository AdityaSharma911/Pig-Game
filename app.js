/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/* 
Attributes for classes and ID's are:
Dice image = .dice
_________________________________
Player0:
total score = #score-0
current score = #current-0
_________________________________
Player1:
total score = #score-1
current score = #current-1
_________________________________
new game button = .btn-new
roll dice button = .btn-roll
hold = .btn-hold
dice image = .dice
*/ 

//taking user names:
/*
var name0 = prompt('Enter the name of first player:');
var name1 = prompt('Enter the name of second player:');
document.getElementById('name-0').textContent = name0;
document.getElementById('name-1').textContent = name1;
*/

var scores, roundScore, gamePlaying;

initialize();

//dice = Math.floor(Math.random()*6) + 1;


//following are setter methods where we are set the value for dice variable
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
//document.querySelector('#current-' + activePlayer).textContent = dice;

//following is the getter method where we get the value of total score for each player:
//var x = document.querySelector('#score-0').textContent


//DOM manipulation to change CSS property using JS to hide the dice image in the starting:
document.querySelector('.dice').style.display = 'none';



//Making the dice-roll button functional:
/*
function btn(){
    //Do something here
}

document.querySelector('.btn-roll').addEventListener('click',btn);
*/

document.querySelector('.btn-instructions').addEventListener('click',function(){
    alert('Game Instructions \n1. The game has 2 players, playing in rounds. In each turn, a player rolls a dice as many times as he whishes.\n2. Each result get added to his ROUND score. BUT, if the player rolls a one on the dice, all his ROUND score gets lost.\n3. After that, it the next player gets the.\n4. The first player to reach 100 points on GLOBAL score wins the game');
});

//concept of anonymous function for making button functional:
document.querySelector('.btn-roll').addEventListener('click' , function(){

    if(gamePlaying)
    {
        
    //1.get random no.
    var dice = Math.floor(Math.random()*6) + 1;

    //2. Display that number in current score:
    //Remember using DOM manipulation we had chosen to hide the card in the starting, and now the die has to be displayed
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    //the png's containing the dice name have index number corresponding to the number appearing:
    diceDOM.src = 'dice-' + dice + '.png';
    
    
    //3. Update the round score only if the score is not 1
    if(dice !== 1)
    {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore
    }
    else
    {   
        
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        /*
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        */

        roundScore = 0;
        
        //next player:
        nextPlayer();
    }
        
    }
});

document.querySelector('.btn-hold').addEventListener('click' , function(){

    if(gamePlaying)
    {
    //add current score to user score:
    scores[activePlayer] += roundScore;
    //Update the UI:
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    roundScore = 0;
    //If the player won the game:
    if(scores[activePlayer]>=100)
    {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!'
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }
    else{
    //Next Player
    nextPlayer();
    }
    }
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click' , initialize);

function initialize(){

scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;

//Initializing all scores to zero
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
/*
document.getElementById('player-0').textContent = 'Player 1';
document.getElementById('player-1').textContent = 'Player 2';
*/

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
}

