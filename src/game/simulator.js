
const GameBoard = require('./GameBoard')
const { RandomPlayer, ImpulsivePlayer, ExigenPlayer, CautiousPlayer } = require("./Players")

function simulator() {
    const randomPlayer = new RandomPlayer()
    const impulsivePlayer = new ImpulsivePlayer()
    const exigenPlayer = new ExigenPlayer()
    const cautiousPlayer = new CautiousPlayer()
    const game = new GameBoard([randomPlayer, impulsivePlayer, exigenPlayer, cautiousPlayer])
    game.simulate()
    return {
        winner: game.winner,
        metrics: {
            rounds: game.metrics.currentRound,
        },
        proprietys: game.proprietys
    }
}

module.exports = simulator

// simulator()
