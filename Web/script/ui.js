const game = new Game();

document.addEventListener('DOMContentLoaded', () => {
    const firstEvent = game.events[Math.floor(Math.random() * game.events.length)];
    document.getElementById('event-text').innerText = firstEvent.text;
    game.updateStats();
});
