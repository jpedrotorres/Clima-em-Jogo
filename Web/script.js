let citizens = 50;
let environment = 50;
let economy = 50;
let currentImpact = { citizensChange: 0, environmentChange: 0, economyChange: 0 };
let currentChoices = [];
let usedEvents = [];

const events = [
    {
        text: "A factory wants to open in the region. What do you decide?",
        choices: [
            { text: "Allow the factory.", citizensChange: 10, environmentChange: -10, economyChange: 15 },
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
    citizens = Math.max(0, Math.min(150, citizens));
    environment = Math.max(0, Math.min(150, environment));
    economy = Math.max(0, Math.min(150, economy));

    document.getElementById('citizens').innerText = citizens;
    document.getElementById('environment').innerText = environment;
    document.getElementById('economy').innerText = economy;

    checkMaxScores();
}

function checkMaxScores() {
    if (citizens === 150) {
        const citizensStat = document.getElementById('citizens');
        citizensStat.classList.add('maxCitizens');
        setTimeout(() => {
            citizensStat.classList.remove('maxCitizens');
        }, 1000);
    }
    if (environment === 150) {
        const environmentStat = document.getElementById('environment');
        environmentStat.classList.add('maxEnvironment');
        setTimeout(() => {
            environmentStat.classList.remove('maxEnvironment');
        }, 1000);
    }
    if (economy === 150) {
        const economyStat = document.getElementById('economy');
        economyStat.classList.add('maxEconomy');
        setTimeout(() => {
            economyStat.classList.remove('maxEconomy');
        }, 1000);
    }
    if (citizens === 150 || environment === 150 || economy === 150) {
        endGame(); // Call the end game function if any score is maxed out
    }
}

function endGame() {
    const gameContainer = document.getElementById('game');
    gameContainer.classList.add('gameOverEffect');
    setTimeout(() => {
        alert("Congratulations! You've achieved maximum points in one of the categories!");
        resetGame(); // Optionally reset the game after a message
    },10000); // Delay to allow the effect to show
}

function resetGame() {
    citizens = 50;
    environment = 50;
    economy = 50;
    usedEvents = [];
    showEvent();
}

function showEvent() {
    const availableEvents = events.filter(event => !usedEvents.includes(event.text));

    if (availableEvents.length === 0) {
        alert("All events have been used. Game over!");
        return;
    }

    const currentEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    usedEvents.push(currentEvent.text); // Mark event as used

    document.getElementById('impact').style.display = 'none';
    
    currentChoices = currentEvent.choices;
    document.getElementById('event-text').innerText = currentEvent.text; // Show event text
    document.getElementById('left-choice').innerText = currentChoices[0].text;
    document.getElementById('right-choice').innerText = currentChoices[1].text;
}

function makeChoice(choiceIndex) {
    const choice = currentChoices[choiceIndex];
    currentImpact.citizensChange = choice.citizensChange;
    currentImpact.environmentChange = choice.environmentChange;
    currentImpact.economyChange = choice.economyChange;

    const eventCard = document.getElementById('event-card');
    eventCard.style.transform = choiceIndex === 0 ? 'rotateY(-10deg)' : 'rotateY(10deg)'; // Tilt towards choice

    document.getElementById('impact-text').innerText = `Impact: Citizens: ${currentImpact.citizensChange}, Environment: ${currentImpact.environmentChange}, Economy: ${currentImpact.economyChange}`;
    document.getElementById('impact').style.display = 'block';
}

function confirmChoice() {
    citizens += currentImpact.citizensChange;
    environment += currentImpact.environmentChange;
    economy += currentImpact.economyChange;

    updateStats();

    const eventCard = document.getElementById('event-card');
    const impactDiv = document.getElementById('impact');

    const choiceIndex = currentChoices[0].citizensChange === currentImpact.citizensChange ? 0 : 1;
    const direction = choiceIndex === 0 ? '-150%' : '150%'; // Increase movement distance

    eventCard.style.transition = 'transform 0.5s ease';
    eventCard.style.transform = `translateX(${direction}) rotateY(${choiceIndex === 0 ? -20 : 20}deg)`; // Move and rotate away

    setTimeout(() => {
        eventCard.style.transform = 'none'; // Reset transform for next event
        showEvent(); // Show new event
    }, 500); // Delay for animation to complete
}

document.addEventListener('DOMContentLoaded', showEvent);
