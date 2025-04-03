let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let currentQuest=0;
let fighting;
let monsterHealth;
let questProgress = 0;
let questTarget = 0;   
let questEnemy = null;
let inventory_weapon = ["stick"];
let button4=document.createElement("button");
let button5=document.createElement("button");
let button6=document.createElement("button");
let button7=document.createElement("button");
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const buttonContainer=document.querySelector("#controls");
const text = document.querySelector("#text");
const quest_text=document.querySelector("#quest");
const itemsElement = document.querySelector("#items");
const quest_DESC=document.querySelector("#quest-Description");
const items_DESC=document.querySelector("#Items-Description");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
  
];
const quests=[
  {
    name:"Save a cat",
    reward:50,
    description:"Please save the cat of an little girl "
  },
  {
    name:"Kill 3 slimes",
    reward:80,
    description:"Kill these monsters for the town"
  },
  {
    name:"kill 5 fanged beast",
    reward:100,
    description:"Kill these fearsome monsters for the safety of the town",
  },
  {
    name:"kill first 2 slimes and then 3 fanged beast",
    reward:120,
  description:"Kill these group of monsters for the the town"
  },
  {
    name:"save the princes",
    reward:200,
    description:"Please kill two Wolf Kings and save the princes"
  }
]
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15
  },
  {
    name:"poisonous slime",
    level:4,
    health:30
  },
  {
    name:"toxic slime",
    level:6,
    health:45
  },
  {
    name: "Fanged Beast",
    level: 8,
    health: 60
  },
  {
    name:"Wolf King",
    level:12,
    health:100
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Path of the slime", "Path of the beast", "Go to town square"],
    "button functions": [chooseFightSlimes,chooseFightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  },
  {
    name:"slime cave",
    "button text": ["Fight slime", "Fight poisonous ","Fight toxic slime", "Go back to the cave"],
    "button functions": [fightSlime,fightPoisonousSlime,fightToxicSlime, goCave],
    text: "You enter the slime cave. You see some monsters."
  },
  {
    name:"beast cave",
    "button text": ["Fight Fanged Beast", "Fight the wolf king","Go back to the cave"],
    "button functions": [fightFangedBeast, fightWolfKing, goCave],
    text: "You enter the beast cave. You see some monsters."
  },
  {
    name:"Board quest",
    "button text":["Accept","Next","Go back to town square"],
    "button functions":[AcceptRequest,NextQuest,goTown],
    text:"You are looking for quests."
  }
  
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;


function lookAtTheQuestBoard(){
update(locations[10]);
currentQuest = 0;
  quest_text.innerText = quests[currentQuest].name;
  quest_DESC.innerText = quests[currentQuest].description + " The reward is: " + quests[currentQuest].reward+"gold";
}
function AcceptRequest() {
  if (currentQuest < quests.length) {
    text.innerText = "Quest Accepted: " + quests[currentQuest].description;
    quest_text.innerText = "Current Quest: " + quests[currentQuest].name;
    quest_DESC.innerText = "Reward: " + quests[currentQuest].reward;
    
    questProgress = 0; 
    switch (currentQuest) {
      case 0:
        questTarget = 1;
        questEnemy = "Slime";
        break;
      case 1:
        questTarget = 3;
        questEnemy = "Slime";
        break;
      case 2:
        questTarget = 5;
        questEnemy = "Fanged Beast";
        break;
      case 3:
        questTarget = 5; 
        questEnemy = "mixed";
        break;
      case 4:
        questTarget = 2;
        questEnemy = "Wolf King";
        break;
    }
    
    startQuestFight();
  } 
}


function prevButton(){
  if(currentQuest>0)
  {
    currentQuest--;
    quest_text.innerText=quests[currentQuest].name;
  quest_DESC.innerText=quests[currentQuest].description+" the reward is: "+quests[currentQuest].reward;
  
  }
}
function NextQuest(){
  if (currentQuest < quests.length - 1) {
    currentQuest++;
    quest_text.innerText = quests[currentQuest].name;
    quest_DESC.innerText = quests[currentQuest].description + " The reward is: " + quests[currentQuest].reward;
  } else {
    quest_text.innerText = "No more quests available!";
    quest_DESC.innerText = "";
  }
};


function update(location) {
  monsterStats.style.display = "none";
  const buttons = [button1, button2, button3];
  buttons.forEach((button, index) => {
      button.innerText = location["button text"][index];
      button.onclick = location["button functions"][index];
  });

  
  text.innerHTML = location.text;


  manageExtraButtons(location.name);
}

function manageExtraButtons(locationName) {
  [button4, button5, button6, button7].forEach(btn => btn.remove());

  switch (locationName) {
      case "town square":
          button4.innerText = "Look at Quest Board";
          button4.onclick = lookAtTheQuestBoard;
          buttonContainer.appendChild(button4);
          break;

      case "slime cave":
          button5.innerText = "Return to Cave";
          button5.onclick = goCave;
          buttonContainer.appendChild(button5);
          break;

      case "Board quest":
          button6.innerText = "Prev";
          button6.onclick = prevButton;
          button6.style.marginRight = "5px";
          buttonContainer.insertBefore(button6, button2);
          break;

      case "store":
          button7.innerText = "Sell Weapon";
          button7.onclick = sellWeapon;
          button7.style.marginBottom="5px";
          buttonContainer.insertBefore(button7, button3);
          break;
  }
}


function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function yourInventory()
{
  if (inventory_weapon.length >= 0) {
    itemsElement.innerText = "Weapons: " + inventory_weapon.join(", ");
  }

}
function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory_weapon.push(newWeapon);
      yourInventory();
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  }
  else{
    text.innerText="You already have the most powerful weapon";
  }

}

function startQuestFight()
{
  if (questTarget > 0 && questEnemy) {
    if (questEnemy === "mixed") {
      if (questProgress < 2) {
        fightSlime();
      } else {
        fightFangedBeast();
      }
    } else {
      switch (questEnemy) {
        case "Slime":
          fightSlime();
          break;
        case "Fanged Beast":
          fightFangedBeast();
          break;
        case "Wolf King":
          fightWolfKing();
          break;
      }
    }
  } 
}

function sellWeapon() {
  
  if (inventory_weapon.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory_weapon.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    yourInventory()
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
  
}
function fightPoisonousSlime() {
  fighting = 1;
  goFight();
}
function fightToxicSlime() {
  fighting = 2;
  goFight();
}
function fightFangedBeast(){
  fighting=3;
  goFight();
}
function  fightWolfKing(){
  fighting=4;
  goFight();
}

function fightDragon() {
  fighting = 5;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function resetQuestBoard() {
  currentQuest = -1;
  quest_text.innerText = "No active quests";
  quest_DESC.innerText = "Check the quest board to pick a new quest.";
  questProgress = 0;
  questTarget = 0;
  questEnemy = null; 
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (monsters[fighting].name === "dragon") {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory_weapon.length !== 1) {
    text.innerText += " Your " + inventory_weapon.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  if (questTarget > 0 && questEnemy) {
    if (questEnemy === "mixed") {
      if (monsters[fighting].name === "Slime" && questProgress < 2) {
        questProgress++;
      } else if (monsters[fighting].name === "Fanged Beast" && questProgress >= 2) {
        questProgress++;
      }
    } else if (monsters[fighting].name.toLowerCase() === questEnemy.toLowerCase()) {
      questProgress++;
    }

    text.innerText += ` Quest Progress: ${questProgress}/${questTarget}.`;
    if (questProgress >= questTarget) {
      completeQuest();
    } else {
      startQuestFight(); 
    }
  } else {
    text.innerText += "Keep fighting for more XP and gold!";
    goCave();
  }

  update(locations[4]); 
}

function completeQuest() {
  text.innerText = `Quest Complete: ${quests[currentQuest].name}!`;
  let reward = quests[currentQuest].reward;
    gold += reward;
  goldText.innerText = gold;
  yourInventory();
  resetQuestBoard();
}

function lose() {
  update(locations[5]);
  resetQuestBoard();
}

function winGame() {
  update(locations[6]);
  resetQuestBoard();
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory_weapon = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  yourInventory();
  goTown();
  resetQuestBoard();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}
function chooseFightSlimes() {
  update(locations[8]);
}

function chooseFightBeast()
{
  update(locations[9]);
}
function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

yourInventory();
button4.innerText = "Look at Quest Board";
goTown();