//Global DOM References
const board = document.getElementById('board');
const header = document.querySelector('header');
const headline = document.querySelector('h1');
const body = document.querySelector('body');



const ticTacToe = function() {
	
	
	
	
	
	this.initialize = function() {
		console.log('Hello World');
		board.style.display = 'none';
		this.startPage();
	};


	this.startPage= function() {
		const mainDiv = document.createElement('div');
		const friendButton = document.createElement('a');
		const computerButton = document.createElement('a');
		const h1 = document.createElement('h1');
		const header = document.createElement('header');
		body.insertBefore(mainDiv, board);
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
	};















};


