const ticTacToe = {
	//Global DOM References
	DOMReferences: 	{
						board: document.getElementById('board'),
						header: document.querySelector('header'),
						headline: document.querySelector('h1'),
						body: document.querySelector('body'),
						player1: document.getElementById('player1'),
						player2: document.getElementById('player2'),
						ul: document.querySelector('.boxes'),
						li: document.querySelectorAll('.box')
					},	
					
	//counter
	count: 0,

	//null value for now, will add value of instantiated constructor functions.		
	playerOne: null,
	playerTwo: null,
	
	userPromptQuestion: 'What is your name?',
	userFriendPromptQuestion: "What is your friend's name?",
	
	//put in the win patterns
	winPatterns: [
					[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], 
					[0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]
				],
	
	//Constructor function for the players, to be worked on....
	createPlayer: function(name, DOMElement, symbol, className, winClass) {
		this.name = name;
		this.DOMElement = DOMElement;
		this.symbol = symbol;
		this.className = className;	
		this.winClass = winClass;
	},
	
	makeMove: function() {
		//reference to object keys before going deep into callback
		let p1 = this.playerOne;
		let p2 = this.playerTwo;	
		let emptyBoard = this.emptyBoard;
		let winComboOrDraw = this.winComboOrDraw;
		let toggleActive = this.toggleActive;
		
		for (let i = 0; i< this.DOMReferences.li.length; i++) {	
			//mouseover event.
			this.DOMReferences.li[i].addEventListener('mouseover',  function(event) {
				//if player1 has class active and square is not filled.
				if ( !(event.target.classList.contains('box-filled-1')) && !(event.target.classList.contains('box-filled-2')) && p1.DOMElement.classList.contains('active')  ) {				
					//set the square to playerOne's svg image
					event.target.style.backgroundImage = `url(./img/${p1.symbol})`;
				} else if ( !(event.target.classList.contains('box-filled-1')) && !(event.target.classList.contains('box-filled-2')) && p2.DOMElement.classList.contains('active')) {
					event.target.style.backgroundImage = `url(./img/${p2.symbol})`;	
				}
			});			
			
			//mouseout event
			this.DOMReferences.li[i].addEventListener('mouseout',  function(event) {
				if (!(event.target.classList.contains('box-filled-1')) && !(event.target.classList.contains('box-filled-2'))) {
					//reset image back to grey
					event.target.style.backgroundImage = '';
					event.target.style.backgroundImage = '#EFEFEF';
				}
			});			
			
			//click event
			this.DOMReferences.li[i].addEventListener('click',  function(event) {
				if ( !(event.target.classList.contains('box-filled-1')) && !(event.target.classList.contains('box-filled-2')) && p1.DOMElement.classList.contains('active') ) {	
					ticTacToe.count ++;
					console.log(ticTacToe.count);
					//add proper class to that square.
					event.target.classList.add(p1.className);
					//check if move is a win combo 
					winComboOrDraw(p1);				
					//toggle active class only when condition is met.
					toggleActive();
				} else if ( !(event.target.classList.contains('box-filled-1')) && !(event.target.classList.contains('box-filled-2')) && p2.DOMElement.classList.contains('active') ) {
					ticTacToe.count ++;
					console.log(ticTacToe.count);
					event.target.classList.add(p2.className);
					winComboOrDraw(p2);
					toggleActive();
				}					
			});							
		}
	},
	
	winScreen: function(player) {
		ticTacToe.count = 0;
		ticTacToe.DOMReferences.board.style.display = 'none';
		ticTacToe.endingScreenTemplate();
		const message = document.querySelector('.message');
		//put in name provided on constructor function	
		message.textContent = `Winner: ${player.name}`;
		let screenDiv = document.getElementById('finish');
		//give proper class name provided on constructor function. 
		screenDiv.className = `screen screen-win ${player.winClass}`;
		//delegated event handler when button is clicked to start new game.
		ticTacToe.DOMReferences.body.addEventListener('click', function (event) {
			if (event.target.tagName === 'A' && event.target.id === 'newButton') {
				//remove #finish
				screenDiv.parentNode.removeChild(screenDiv);
				//run this.showBoard();
				ticTacToe.showBoard();
				//if computer has random class, then make it generate first move.
				if ( (ticTacToe.playerTwo.DOMElement.classList.contains('active')) && (ticTacToe.playerTwo.name.includes('Computer')) ) {
					ticTacToe.computersFirstMove();
					ticTacToe.count ++;
				}
				//remove event handler after it is ran, don't want it to stack.
				ticTacToe.DOMReferences.body.removeEventListener('click', arguments.callee);
			} 							
		});					
	},
	
	winComboOrDraw: function(player) {
		//provide boolean value as flag checker.
		let win = false;
	/*	NOTE: IF A METHOD IS CALLED WITHIN A CALLBACK, BE CAREFUL WITH THIS KEYWORD. 
		THIS WILL REFER TO THE DOM ELEMENT THAT TRIGGERED THE CALLBACK EVEN WHEN YOU ARE INSIDE
		ANOTHER METHOD.	*/
		for (let i = 0; i < ticTacToe.winPatterns.length; i++) {
			let eachPattern = ticTacToe.winPatterns[i];
			//map each winPattern to see if true or false
			let result = eachPattern.map(function(x) {
				return ticTacToe.DOMReferences.li[x].classList.contains(player.className);
		
			});
			//if array doesnt contain any false values, then winning combo exists.
			if (result.indexOf(false) === -1) {
				let win = true;
				//winScreen method
				return ticTacToe.winScreen(player);
			}		
		}
		if (!win && ticTacToe.count === 9) {
			ticTacToe.drawScreen();
		} else {
			return true;
		}	
	},
		
	initialize: function() {
		this.DOMReferences.board.style.display = 'none';
		this.startPage();
	},

	startPage: function() {
		//create DOM elements for start page and inject into DOM
		const mainDiv = document.createElement('div');
		const friendButton = document.createElement('a');
		const computerButton = document.createElement('a');
		const h1 = document.createElement('h1');
		const header = document.createElement('header');
		this.DOMReferences.body.insertBefore(mainDiv, board);
		mainDiv.className = "screen screen-start";
		friendButton.className = "button";
		friendButton.id = "friendButton";
		h1.textContent = 'Tic Tac Toe';
		friendButton.textContent = 'Play against friend';
		computerButton.textContent = 'Play against computer';
		computerButton.className = "button";
		computerButton.id = "computerButton";
		mainDiv.appendChild(header);
		header.appendChild(h1);
		header.appendChild(friendButton);
		header.appendChild(computerButton);
		
		//delegated event listener for the two buttons
		this.DOMReferences.body.addEventListener('click', function (event) {
			if (event.target.tagName === 'A' && event.target.id === 'friendButton') {
				ticTacToe.playWithFriend();
			} else if (event.target.tagName === 'A' && event.target.id === 'computerButton') {
				ticTacToe.playWithComputer();
			}
		});
	},
	
	inputNamesAndBeginGame: function(player1, player2) {
		//create span element put in userName and friendName and insert into the DOM as child of li.
		const span1 = document.createElement('span');
		const span2 = document.createElement('span');
		span1.textContent = player1.name + ':';
		span2.textContent = player2.name + ':';
		this.DOMReferences.player1.insertBefore(span1, this.DOMReferences.player1.firstChild);
		this.DOMReferences.player2.insertBefore(span2, this.DOMReferences.player2.firstChild);
		
		//give random player active class
		const randomPlayer = document.getElementById(`player${Math.ceil((Math.random() * 2))}`);
		randomPlayer.classList.add('active');
		
		//set up ticTacToe keys to the two instances of createPlayer constructor function.
		this.playerOne = player1;
		this.playerTwo = player2;
		//show board and allow game to continue
		this.showBoard();
		this.makeMove();	
	}, 
	
	playWithFriend: function() {
		//prompt for names
		const userName = this.checkIfNameValid(this.userPromptQuestion);
		const friendName = this.checkIfNameValid(this.userFriendPromptQuestion);
		//2 constructor functions for player names
		const firstPlayer = new this.createPlayer(userName, this.DOMReferences.player1, 'o.svg', 'box-filled-1', 'screen-win-one');
		const secondPlayer = new this.createPlayer(friendName, this.DOMReferences.player2, 'x.svg', 'box-filled-2', 'screen-win-two');
		
		//call method to input name and start game.
		this.inputNamesAndBeginGame(firstPlayer, secondPlayer);						
	},
	
	playWithComputer: function() {
		const userName = this.checkIfNameValid(this.userPromptQuestion);
		//2 constructor functions for player and computer
		const firstPlayer = new this.createPlayer(userName, this.DOMReferences.player1, 'o.svg', 'box-filled-1', 'screen-win-one');
		const computer = new this.createPlayer('Computer', this.DOMReferences.player2, 'x.svg', 'box-filled-2', 'screen-win-two');
		this.inputNamesAndBeginGame(firstPlayer, computer);		

		//if computer has active class first, then draw random move.
		if ( (ticTacToe.playerTwo.DOMElement.classList.contains('active')) && (ticTacToe.playerTwo.name.includes('Computer')) ) {
			this.computersFirstMove();
			ticTacToe.count ++;
		}
		
		
		//func to get an array representation of current game state to provide to MM
	
		//add event listeners here, for click event
	
		//minimax will run everytime human player clicks on .box
		//once optimal position found
		//place class on that square
		// increment count by 1
	
		//then toggle the active class.
			
		
		
		
	},
	
	checkIfNameValid: function(question) {
		const validName = prompt(question);
		if (validName === '' || validName === null) {
			return this.checkIfNameValid(question);
		} else {
			return validName;
		}
	},
	
	showBoard: function() {
		//for loop to remove all the previous X's and O's from game board
		for (let i = 0; i < this.DOMReferences.li.length; i++) {
			this.DOMReferences.li[i].classList.remove('box-filled-1');
			this.DOMReferences.li[i].classList.remove('box-filled-2');
			this.DOMReferences.li[i].style.backgroundImage = '';
			this.DOMReferences.li[i].style.backgroundImage = '#EFEFEF';
		}
		const startDiv = document.querySelector('.screen-start');
		startDiv.style.display = 'none';
		this.DOMReferences.board.style.display = '';	
	}, 

	toggleActive: function () {
		let activePlayer = document.querySelector('.active');
		//remove active class from current DOM element
		activePlayer.classList.remove('active');
		//traverse to sibling and give sibling active class	
		if (activePlayer.nextElementSibling) {
			activePlayer.nextElementSibling.classList.add('active');
		} else {
			activePlayer.previousElementSibling.classList.add('active');
		}								
	},
	
/* 	emptyBoard: function() { 
		let filledUp = true;
		for (let i = 0; i < ticTacToe.DOMReferences.li.length; i++) {
			if (!(ticTacToe.DOMReferences.li[i].classList.contains('box-filled-1')) && !(ticTacToe.DOMReferences.li[i].classList.contains('box-filled-2'))) {
				filledUp = false;
				return;
			}
		}
		if (filledUp) {
			return ticTacToe.drawScreen();
		}	
	}, */

	drawScreen: function() {
		ticTacToe.count = 0;
		ticTacToe.DOMReferences.board.style.display = 'none';
		ticTacToe.endingScreenTemplate();
		const message = document.querySelector('.message');
		message.textContent = "It's a Tie!";
		let screenDiv = document.getElementById('finish');
		//give proper class name
		screenDiv.className = "screen screen-win screen-win-tie";
		//delegated event handler when button is clicked to start new game.
		ticTacToe.DOMReferences.body.addEventListener('click', function (event) {
			if (event.target.tagName === 'A' && event.target.id === 'newButton') {
				//remove #finish
				screenDiv.parentNode.removeChild(screenDiv);
				//run this.showBoard();
				ticTacToe.showBoard();
				ticTacToe.DOMReferences.body.removeEventListener('click', arguments.callee);
			}							
		});
	},
	
	endingScreenTemplate: function() {
		//generic template for ending screen
		//can be specialized when invoked to the winner and draw results.
		const screenDiv = document.createElement('div');
		screenDiv.id = "finish";
		ticTacToe.DOMReferences.body.insertBefore(screenDiv, ticTacToe.DOMReferences.board);
		const header = document.createElement('header');
		const h1 = document.createElement('h1');
		h1.textContent = 'Tic Tac Toe';
		const message = document.createElement('p');
		message.className = "message";	
		const newButton = document.createElement('a');
		newButton.className = "button";	
		newButton.textContent = 'New Game';
		newButton.id = "newButton";
		screenDiv.appendChild(header);
		header.appendChild(h1);
		header.appendChild(message);
		header.appendChild(newButton);		
	},
	
	computersFirstMove: function() {
		/* permutation of 9 open slots takes way too long to calculate. 
		fill in random spot on the board. If comp is going first. */
		ticTacToe.DOMReferences.li[Math.floor((Math.random() * 9))].classList.add(ticTacToe.playerTwo.className);
		ticTacToe.toggleActive();		
	},

	//minimax algorithm function, heavily influenced from FCC source. 
	miniMax: function(board, player, depth) {
		
		//func to see if comp or player has won on board state.
		
		//new func to get array of open slots within MM
		
		// mm will be recursive.
		
		
		
	}	
};