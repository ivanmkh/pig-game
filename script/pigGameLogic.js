/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
class PigGameLogic {
    constructor(score, currentPlayer, roundScore) {
        score = [0, 0];
        currentPlayer = 0;
        roundScore = 0;
    }

    rollDice = () => {
        document.querySelector('.btn-roll').addEventListener('click', () => {
            // dice process
            let dice = Math.round(Math.random() * 5 + 1);
            document.querySelector('.dice').src = `assets/dice-${dice}.png`;
            // show currecnt round score
            this.roundScore += dice;
            document.getElementById(`current-${this.currentPlayer}`).textContent = this.roundScore;
            // if the player rolls a 1, all his ROUND score gets lost.
            if (dice == 1) {
                this.roundScore = 0;
                document.getElementById(`current-${this.currentPlayer}`).textContent = this.roundScore;
                this.switchPlayer();
            }
        });
    };

    hold = () => {
        document.querySelector('.btn-hold').addEventListener('click', this.switchPlayer);
    };

    switchPlayer = () => {
        this.score[this.currentPlayer] += this.roundScore;
        this.roundScore = 0;
        document.getElementById(`current-${this.currentPlayer}`).textContent = this.roundScore;
        document.getElementById(`score-${this.currentPlayer}`).textContent = this.score[this.currentPlayer];

        // the first player to reach 100 points on GLOBAL score wins the game
        let winner = this.score.map((v, i) => { return { v, number: i + 1 } }).filter(v => v.v >= 100)[0];
        if (winner) {
            alert(`Congratulations !!! \n\r Player ${winner.number} has won!`);
            this.resetScore();
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
        this.roundScore = this.currentPlayer = 0;
        this.score = [0, 0];
        [0, 1].forEach(player => {
            document.getElementById(`current-${player}`).textContent = this.roundScore;
            document.getElementById(`score-${player}`).textContent = this.roundScore;
        });
        this.showActivePlayer();
    };

    newGame() {
        this.resetScore();
        this.hold();
        document.querySelector('.btn-new').addEventListener('click', this.resetScore);
    };

    run() {
        this.newGame();
        this.rollDice();
    }
}