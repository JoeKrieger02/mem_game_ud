/*
 * Create a list that holds all of your cards
 */


var deck = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

/*
*   DECLARATIONS
*/

var started = false;
var openCard = [];
var moveCounter = 0;
var match = 0;
var numStars = "3";
var starts = 3;
var timer;


/*
* LAUNCH FUNCTIONS
*/

shuffle(deck);
createHtml();
cardOpener();
startClock();

/*
* Shuffle function from http://stackoverflow.com/a/2450976
* (provided by Udacity)
*/

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function createHtml() {
	let shuffled_deck = shuffle(deck);


	shuffled_deck.forEach(function (card) {
		let li_node = document.createElement("LI");
		let i_node = document.createElement("I");
		let re_deck = document.getElementsByClassName("deck");

		i_node.className = "card fa " + card;
		li_node.appendChild(i_node);
		re_deck[0].appendChild(li_node);
	})
}

/*
* OPEN CARDS
*/

function cardOpener() {


		$(".card").on("click", function() {
    if ($(this).hasClass("open show")) { return; }
    $(this).toggleClass("flip open show");
    openCard.push($(this));
    started = true;

		/*
		* IF 2 CARDS OPEN, CHECK FOR A MATCH
		* (found on GitHub)
		*/

		if (openCard.length === 2) {
      if (openCard[0][0].classList[2] === openCard[1][0].classList[2]) {
      openCard[0][0].classList.add("bounce", "match");
      openCard[1][0].classList.add("bounce", "match");
			$(openCard[0]).off("click");
      $(openCard[1]).off("click");

      match += 1;
      moveCounter++;
      removeOpenCards();
      findWinner();
      } else {
      // If classes don't match, add "wrong" class
      openCard[0][0].classList.add("shake", "wrong");
      openCard[1][0].classList.add("shake", "wrong");
      // Set timeout to remove "show" and "open" class
      setTimeout(removeClass, 1100);
      // Reset openCard.length to 0
      setTimeout(removeOpenCards, 1100);
      moveCounter++;
      }
    }
		updateMoves();
	})
}

/*
* POPUP prompt if WIN
* source: www.w3schools.com
*/

function findWinner() {
	if (match === 8) {

		// Get the modal
		var modal = document.getElementById('win-modal');
		var span = document.getElementsByClassName("close")[0];
		var totalMoves = document.getElementById('total-moves');
		var totalStars = document.getElementById('total-stars');
		var playAgain = document.getElementById('play-again-btn');

		totalMoves.textContent = moveCounter;
		totalStars.textContent = numStars;

		modal.style.display = "block";

		// close modal
		span.onclick = function () {
			modal.style.display = "none";
		}
		// play-again button
		playAgain.addEventListener("click", function () {
			location.reload()
		});
		//reset timer
		clearInterval(timer);

	}
}

/*
* USER INTERFACE "MOVES" TEXT
*/

function updateMoves() {
	var movesText = document.getElementById("movesText");
	var movesCounterText = document.getElementById("moves");
	var moves_string ;
	var movesCounterText_string;


	if (moveCounter <= 1) {
		moves_string = " Move";
	}
	else {
		moves_string = " Moves";
	}
	movesCounterText_string = moveCounter;

	if (moveCounter > 0 && moveCounter < 10) {
		numStars = numStars;
	}
	else if (moveCounter >= 10 && moveCounter <= 18) {
		var starOne = document.getElementById("starOne");
		starOne.className = "fa";
		numStars = "2";
	}
	else if (moveCounter > 18) {
		var starTwo = document.getElementById("starTwo");
		starTwo.className = "fa";
		numStars = "1";
	}

	movesCounterText.innerHTML = movesCounterText_string;
	movesText.innerHTML= moves_string;
}




/*
* REMOVE CARD CLASSES
*/

function removeClass() {
  $(".card").removeClass("show open flip bounce shake wrong");
  removeOpenCards();
}

function removeOpenCards() {
  openCard = [];
}

/*
* 	REMOVE EVENT LISTENER FOR OPEN CARDS
*/

function disableClick() {
 openCard.forEach(function (card) {
   card.off("click");
  })
}

/*
*	 TIMER 	(starts on first click)
* (found on GitHub)
*/
function startClock() {
	let clicks = 0;
	$(".card").on("click", function () {
		clicks += 1;
		if (clicks === 1) {
			var sec = 0;

			function time(val) {
				return val > 9 ? val : "0" + val;
			}
			timer = setInterval(function () {
				$(".seconds").html(time(++sec % 60));
				$(".minutes").html(time(parseInt(sec / 60, 10)));
			}, 1000);
		}
	})
}

/*
* RESTART BUTTON
*/
function NextRound() {
	var restart = document.getElementById("restart");

	restart.addEventListener("click", function () {
		location.reload()
	});

}

NextRound();
