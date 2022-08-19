class Players {
    constructor(name) {
        this.money = 300;
        this.name = name;
    }
    play() {
        return Math.floor(Math.random() * 6 + 1);
    }
}
class RandomPlayer extends Players {
    constructor() {
        super('RandomPlayer');
    }
    action() {
        return Math.floor(Math.random() * 2);
    }
}
exports.RandomPlayer = RandomPlayer;
class ImpulsivePlayer extends Players {
    constructor() {
        super('ImpulsivePlayer');
    }
    action() {
        return 1;
    }
}
exports.ImpulsivePlayer = ImpulsivePlayer;
class ExigenPlayer extends Players {
    constructor() {
        super('ExigenPlayer');
    }
    action(rent) {
        return (rent >= 50) ? 1 : 0;
    }
}
exports.ExigenPlayer = ExigenPlayer;
class CautiousPlayer extends Players {
    constructor() {
        super('CautiousPlayer');
    }
    action(rent, value) {
        return (this.money - value >= 80) ? 1 : 0;
    }
}
exports.CautiousPlayer = CautiousPlayer;
