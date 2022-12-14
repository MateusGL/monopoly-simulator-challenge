class GameBoard {
    constructor(players) {
        this.properties = generateProprieties(20);
        this.players = players;
        this.winner = null;
        this.metrics = {
            positions: players.reduce((map, obj, idx) => { map[idx] = 0; return map; }, []),
            playing: () => { return this.players.filter(player => player.money >= 0); },
            currentRound: 0
        };
        this.config = {
            maxRounds: 1000,
        };
    }

    simulate() {
        do {
            this.round();
            this.metrics.currentRound++;
        } while (this.metrics.currentRound < this.config.maxRounds && !this.winner);
        if (this.metrics.currentRound >= this.config.maxRounds && this.winner == null) {
            this.winner = this.players.reduce((prev, curre) => {
                return (prev.money > curre.money) ? prev : curre;
            });
        }
    }

    round() {
        for (let index = 0; index < this.players.length; index++) {
            const player = this.players[index];
            if (player.money < 0)
                continue;
            const dice = player.play();
            this.setPosition(index, dice, player);
            const position = this.metrics.positions[index];
            this.moveAction(position, player, index);
            if (this.hasWinner())
                break;
        }
    }

    hasWinner() {
        const filtered = this.metrics.playing();
        if (filtered.length == 1) {
            this.winner = filtered[0];
            return true;
        }
    }

    moveAction(position, player, turn) {
        const { owner, rent, value } = this.properties[position];
        if (owner == null) {
            if (player.action(rent, value)) {
                this.properties[position].owner = turn;
                player.money -= value;
            } else {
                player.money -= rent;
            }
        } else {
            player.money -= rent;
            this.players[owner].money += rent;
        }
        this.ifPlayerLost(player, turn);
    }

    ifPlayerLost(player, turn) {
        if (player.money < 0) {
            this.releaseProprieties(turn);
        }
    }

    releaseProprieties(turn) {
        this.properties.forEach(propertie => {
            if (propertie.owner == turn) {
                propertie.owner = null;
            }
        });
    }

    setPosition(turn, dice, player) {
        if (this.metrics.positions[turn] + dice < 20) {
            this.metrics.positions[turn] += dice;
        } else {
            this.metrics.positions[turn] = dice + this.metrics.positions[turn] - 20;
            player.money += 100;
        }
    }
}

function generateProprieties(length) {
    const properties = []
    for (let index = 0; index < length; index++) {
        const value = Math.floor(Math.random() * 300 + 1)
        properties.push({
            value,
            rent: Math.floor(value * 0.2),
            owner: null
        })
    }
    return properties
}

module.exports = GameBoard