let citizens = 100;
let environment = 100;
let economy = 100;

const events = [
    {
        text: "A factory wants to open in the region. What do you decide?",
        choices: [
            { text: "Allow the factory.", citizensChange: 5, environmentChange: -10, economyChange: 15 },
            { text: "Reject the factory.", citizensChange: -5, environmentChange: 5, economyChange: -10 }
        ]
    },
    {
        text: "Citizens are protesting pollution. How do you respond?",
        choices: [
            { text: "Increase regulations on factories.", citizensChange: -10, environmentChange: 15, economyChange: -5 },
            { text: "Ignore the protests.", citizensChange: 10, environmentChange: -5, economyChange: 10 }
        ]
    }
];

function updateStats() {
    document.getElementById('citizens').innerText = citizens;
    document.getElementById('environment').innerText = environment;
    document.getElementById('economy').innerText = economy;
}

function makeChoice(choiceIndex) {
    const currentEvent = events[Math.floor(Math.random() * events.length)];
    const choice = currentEvent.choices[choiceIndex];

    citizens += choice.citizensChange;
    environment += choice.environmentChange;
    economy += choice.economyChange;

    document.getElementById('event-text').innerText = currentEvent.text;
    document.getElementById('choices').innerHTML = `
        <button class="choice" onclick="makeChoice(0)">${currentEvent.choices[0].text}</button>
        <button class="choice" onclick="makeChoice(1)">${currentEvent.choices[1].text}</button>
    `;

    updateStats();
}

document.addEventListener('DOMContentLoaded', () => {
    const firstEvent = events[Math.floor(Math.random() * events.length)];
    document.getElementById('event-text').innerText = firstEvent.text;
    updateStats();
});