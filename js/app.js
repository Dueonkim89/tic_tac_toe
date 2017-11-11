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
	createPlayer: function(name, DOMElement, symbol, className) {
		this.name = name;
		this.DOMElement = DOMElement;
		this.symbol = symbol;
		this.className = className;	
	},
	
	makeMove: function() {
		//counter
		let count = 0;
		//reference to object keys before going deep into callback
		let p1 = this.playerOne;
		let p2 = this.playerTwo;	
		let emptyBoard = this.emptyBoard;
		let winCombo = this.winCombo;
		let toggleActive = this.toggleActive;
		
		
		for (let i = 0; i< this.DOMReferences.li.length; i++) {	
			//mouseover event.
			this.DOMReferences.li[i].addEventListener('mouseover',  function(event) {
				//if player1 has class active and square is not filled.
				if ( !(event.target.classList.contains('box-filled-1')) && !(event.target.classList.contains('box-filled-2')) && p1.DOMElement.classList.contains('active')  ) {				
					//set the square to playerOne's svg image
					event.target.style.backgroundImage = `url(./img/${p1.symbol})`;
					//code below for future reference when wanting to remove callback from anon function.
					//this.DOMReferences.li[i].removeEventListener('mouseover', arguments.callee);
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
					count ++
					//check if no more empty squares 
					emptyBoard(count);	
					//add proper class to that square.
					event.target.classList.add(p1.className);
					//check if move is a win combo
					winCombo(p1.className);
				} else if ( !(event.target.classList.contains('box-filled-1')) && !(event.target.classList.contains('box-filled-2')) && p2.DOMElement.classList.contains('active') ) {
					count ++
					emptyBoard(count);
					event.target.classList.add(p2.className);
					winCombo(p2.className);
				}					
				//toggle active class
				toggleActive();
			});							
		}

	
	},
	
	winScreen: function() {
		console.log('win screen to be built');
		//func winScreen	
			//take in constructor function color (to be added)
			//use the constructor function symbol
			//use the constructor func name
			//see template			
	},
	
	winCombo: function(className) {
		//provide boolean value as flag checker.
		let gameOver = false;
	/*	NOTE: IF A METHOD IS CALLED WITHIN A CALLBACK, BE CAREFUL WITH THIS KEYWORD. 
		THIS WILL REFER TO THE EVENT THAT TRIGGERED THE CALLBACK EVEN WHEN YOU ARE INSIDE
		ANOTHER METHOD.	*/
		for (let i = 0; i < ticTacToe.winPatterns.length; i++) {
			let eachPattern = ticTacToe.winPatterns[i];
			//map each winPattern to see if true or false
			let result = eachPattern.map(function(x) {
				return ticTacToe.DOMReferences.li[x].classList.contains(className);
		
			});
			//if array doesnt contain any false values, then winning combo exists.
			if (result.indexOf(false) === -1) {
				let gameOver = true;
				//winScreen method
				return ticTacToe.winScreen();
			}		
		}
		if (!gameOver) {
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
	
	playWithFriend: function() {
		//prompt for names
		const userName = this.checkIfNameValid(this.userPromptQuestion);
		const friendName = this.checkIfNameValid(this.userFriendPromptQuestion);
		//2 constructor functions for player names
		const firstPlayer = new this.createPlayer(userName, this.DOMReferences.player1, 'o.svg', 'box-filled-1');
		const secondPlayer = new this.createPlayer(friendName, this.DOMReferences.player2, 'x.svg', 'box-filled-2');
			
		//create span element put in userName and friendName and insert into the DOM as child of li.
		const span1 = document.createElement('span');
		const span2 = document.createElement('span');
		span1.textContent = userName + ':';
		span2.textContent = friendName + ':';
		this.DOMReferences.player1.insertBefore(span1, this.DOMReferences.player1.firstChild);
		this.DOMReferences.player2.insertBefore(span2, this.DOMReferences.player2.firstChild);
		
		//give random player active class
		const randomPlayer = document.getElementById(`player${Math.ceil((Math.random() * 2))}`);
		randomPlayer.classList.add('active');
		
		//set up ticTacToe keys to the two instances of createPlayer constructor function.
		this.playerOne = firstPlayer;
		this.playerTwo = secondPlayer;
		//show board and allow game to continue
		this.showBoard();
		this.makeMove();
	},
	
	playWithComputer: function() {
		console.log('research minimax algorithm');
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
	
	emptyBoard: function(count) {
		if (count === 9) {
			return ticTacToe.drawScreen(ticTacToe.player1, ticTacToe.player2);
		} else {
			return;
		}		
	},

	drawScreen: function(p1, p2) {
		//gradient background of orange and blue
		console.log('draw game screen to be built');
	}

};


