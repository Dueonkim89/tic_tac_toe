const ticTacToe = {
	//Global DOM References
	DOMReferences: 	{
						board: document.getElementById('board'),
						header: document.querySelector('header'),
						headline: document.querySelector('h1'),
						body: document.querySelector('body'),
						player1: document.getElementById('player1'),
						player2: document.getElementById('player2'),
						ul: document.querySelector('.boxes')
						li: document.querySelectorAll('.box');
					},		
			
	userPromptQuestion: 'What is your name?',
	userFriendPromptQuestion: "What is your friend's name?",
	
	//put in the win patterns
	winPatterns = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], 
		[0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]
	],
	
	//Constructor function for the players, to be worked on....
	createPlayer: function(name, DOMElement, symbol, className) {
		this.name = name;
		this.DOMElement = DOMElement;
		this.symbol = symbol;
		this.className = className;
		this.makeMove = function() {
			//if DOMElement contains .active class
			if (this.DOMElement.classList.contains('active') {
				//mouse over event on .box
				//if .box doesnt contain the word filled 
				//set css background of .box to this.symbol
				
				//mouseout event back to #EFEFEF;
				
				
				
				//click event on .box
				//if .box doesnt contain class box-filled-1 or box-filled-2
				//add the proper this.className on click event
				//remove .active from this.DOMElement
				//traverse to sibling element
				//add .active class to sibling
				
				
			}
		};
		
		
	
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
		
		//show board and allow game to continue
		this.showBoard();
		this.checkGameProgress(firstPlayer, secondPlayer);
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
			this.DOMReferences.li[i].classList.remove('box box-filled-1');
			this.DOMReferences.li[i].classList.remove('box box-filled-2');
			this.DOMReferences.li[i].classList.add('box');
		}
	
		const startDiv = document.querySelector('.screen-start');
		startDiv.style.display = 'none';
		this.DOMReferences.board.style.display = '';	
	}, 

	checkGameProgress: function(p1, p2) {
		console.log(p1.name);
		console.log(p2.name);
		
		
		//invoke function on constructor function to see who has active class.
		
	
		
		// if no winning combo || 9 boxes are not filled
			// return this.checkGameProgress(p1, p2);
		// else 
		// print draw screen
		
	}


//func to check if array has win pattern
//bring in constructor fuction
	//loop through winPatterns.
		// if all 3 contain a certain class game is over
		//look up array method. (map)
		// index of false is -1
		
	/*for (let i = 0; i < this.winPatterns.length; i++) {
		var eachPattern = this.winPatterns[i];
		var result = eachPattern.map(function(x) {
			return this.li[x].classList.contains('box-filled-2');
		});
		console.log(result);
		if (result.indexOf(false) === -1) {
			//print win screen for the proper class.
			console.log('box-filled-2');
		} 
	}
	console.log(true);
	*/

//func to see if all 9 li has a class or not.	
	//loop thru li
	//if li doesnt have class of box-filled-1 or box-filled-2
	//return true
	
	
	
//func winScreen	
	//take in constructor function color (to be added)
	//use the constructor function symbol
	//use the constructor func name
	//see template


//func draw screen	



};


