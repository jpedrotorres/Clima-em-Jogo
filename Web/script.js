let citizens = 50;
let environment = 50;
let economy = 50;

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
    },
    {
        text: "A new renewable energy project is proposed. What do you do?",
        choices: [
            { text: "Invest in the project.", citizensChange: 10, environmentChange: 20, economyChange: -15 },
            { text: "Reject the proposal.", citizensChange: -5, environmentChange: -5, economyChange: 10 }
        ]
    },
    {
        text: "There’s a drought affecting the region. How do you respond?",
        choices: [
            { text: "Implement water conservation measures.", citizensChange: -5, environmentChange: 10, economyChange: -10 },
            { text: "Do nothing and hope for rain.", citizensChange: 5, environmentChange: -15, economyChange: 10 }
        ]
    },
    {
        text: "A major corporation offers to sponsor your city's events. What is your choice?",
        choices: [
            { text: "Accept the sponsorship.", citizensChange: 5, environmentChange: -5, economyChange: 20 },
            { text: "Decline the offer.", citizensChange: -5, environmentChange: 5, economyChange: -10 }
        ]
    },
    {
        text: "Citizens are concerned about waste management. How will you act?",
        choices: [
            { text: "Launch a recycling initiative.", citizensChange: 5, environmentChange: 15, economyChange: -5 },
            { text: "Ignore the concerns.", citizensChange: -5, environmentChange: -10, economyChange: 10 }
        ]
    },
    {
        text: "A wildfire threatens the area. What’s your decision?",
        choices: [
            { text: "Allocate resources for firefighting.", citizensChange: -10, environmentChange: -5, economyChange: -20 },
            { text: "Evacuate citizens to safety.", citizensChange: -20, environmentChange: 0, economyChange: -10 }
        ]
    },
    {
        text: "The city is considering building a new park. What will you do?",
        choices: [
            { text: "Support the park development.", citizensChange: 15, environmentChange: 10, economyChange: -5 },
            { text: "Oppose the development.", citizensChange: -5, environmentChange: -5, economyChange: 5 }
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
