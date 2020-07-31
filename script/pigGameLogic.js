class PigGameLogic {
    constructor(score, currentPlayer, roundScore, winningScore) {
        this.score = [0, 0];
        this.currentPlayer = 0;
        this.roundScore = 0;
        this.winningScore = 20;
    }

    rollDice = () => {
        // dice process
        let dice = Math.round(Math.random() * 5 + 1);
        document.querySelector('.dice').src = `assets/dice-${dice}.png`;
        document.querySelector(`.dice`).style.display = 'block';
        // show currecnt round score
        this.roundScore += dice;
        document.getElementById(`current-${this.currentPlayer}`).textContent = this.roundScore;
        // if the player rolls a 1, all his ROUND score gets lost.
        if (dice == 1) {
            this.roundScore = 0;
            document.getElementById(`current-${this.currentPlayer}`).textContent = this.roundScore;
            this.switchPlayer();
        }
    };

    switchPlayer = () => {
        this.score[this.currentPlayer] += this.roundScore;
        this.roundScore = 0;
        document.getElementById(`current-${this.currentPlayer}`).textContent = this.roundScore;
        document.getElementById(`score-${this.currentPlayer}`).textContent = this.score[this.currentPlayer];

        // the first player to reach 100 points on GLOBAL score wins the game
        let winner = this.score.map((v, i) => { return { v, number: i } }).filter(v => v.v >= this.winningScore)[0];
        if (winner) {
            document.querySelector(`#name-${this.currentPlayer}`).textContent = 'Winner!';
            document.querySelector(`.dice`).style.display = 'none';
            document.querySelector(`.player-${this.currentPlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${this.currentPlayer}-panel`).classList.remove('active');
            document.querySelector('.btn-hold').removeEventListener('click', this.switchPlayer);
            document.querySelector('.btn-hold').classList.add('disabled');
            document.querySelector('.btn-roll').removeEventListener('click', this.rollDice);
            document.querySelector('.btn-roll').classList.add('disabled');
        } else this.currentPlayer = this.currentPlayer == 0 ? 1 : 0;
        this.showActivePlayer();
    }

    showActivePlayer = () => {
        [0, 1].forEach(player => {
            let classList = document.querySelector(`.player-${player}-panel`).classList;
            if (this.currentPlayer == player)
                classList.add('active');
            else
                classList.remove('active');
        });
    };

    resetScore = () => {
        // add event listeners for play buttons
        document.querySelector(`#name-${this.currentPlayer}`).textContent = `PLAYER ${this.currentPlayer + 1}`;
        document.querySelector(`.player-${this.currentPlayer}-panel`).classList.remove('winner');
        document.querySelector('.btn-hold').addEventListener('click', this.switchPlayer);
        document.querySelector('.btn-hold').classList.remove('disabled');
        document.querySelector('.btn-roll').addEventListener('click', this.rollDice);
        document.querySelector('.btn-roll').classList.remove('disabled');

        // reset all game score to zero
        this.roundScore = this.currentPlayer = 0;
        this.score = [0, 0];
        [0, 1].forEach(player => {
            document.getElementById(`current-${player}`).textContent = this.roundScore;
            document.getElementById(`score-${player}`).textContent = this.roundScore;
        });

        // switch to the first player
        this.showActivePlayer();
    };

    newGame() {
        this.resetScore();
        document.querySelector('.btn-new').addEventListener('click', this.resetScore);
    };

    run() {
        this.newGame();
    }
}