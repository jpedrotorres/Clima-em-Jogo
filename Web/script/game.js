class Game {
    constructor() {
        this.citizens = 50;
        this.environment = 50;
        this.economy = 50;

        this.events = [
            new Event("A factory wants to open in the region. What do you decide?", [
                new Choice("Allow the factory.", 5, -10, 15),
                new Choice("Reject the factory.", -5, 5, -10)
            ]),
            new Event("Citizens are protesting pollution. How do you respond?", [
                new Choice("Increase regulations on factories.", -10, 15, -5),
                new Choice("Ignore the protests.", 10, -5, 10)
            ]),
        ];
    }

    updateStats() {
        document.getElementById('citizens').innerText = this.citizens;
        document.getElementById('environment').innerText = this.environment;
        document.getElementById('economy').innerText = this.economy;
    }

    makeChoice(choiceIndex) {
        const currentEvent = this.events[Math.floor(Math.random() * this.events.length)];
        const choice = currentEvent.choices[choiceIndex];

        this.citizens += choice.citizensChange;
        this.environment += choice.environmentChange;
        this.economy += choice.economyChange;

        document.getElementById('event-text').innerText = currentEvent.text;
        document.getElementById('choices').innerHTML = `
            <button class="choice" onclick="game.makeChoice(0)">${currentEvent.choices[0].text}</button>
            <button class="choice" onclick="game.makeChoice(1)">${currentEvent.choices[1].text}</button>
        `;

        this.updateStats();
        this.checkGameOver();
    }

    checkGameOver() {
        if (this.citizens <= 0 || this.environment <= 0 || this.economy <= 0) {
            this.showGameOver();
        }
    }

    showGameOver() {
        document.getElementById('event-text').innerText = "Game Over! You failed to balance the needs of the citizens, environment, and economy.";
        document.getElementById('choices').innerHTML = '';
    }
}
