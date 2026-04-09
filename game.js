const levels = [
  {
    word: "casa",
    display: "ca__",
    missing: "sa",
    options: ["sa", "se", "si", "so"],
    emoji: "🏠",
    hint: "Lugar donde vivimos."
  },
  {
    word: "pato",
    display: "pa__",
    missing: "to",
    options: ["to", "ta", "te", "ti"],
    emoji: "🦆",
    hint: "Animal que dice \"cuac\"."
  },
  {
    word: "mesa",
    display: "me__",
    missing: "sa",
    options: ["sa", "se", "si", "so"],
    emoji: "🍽️",
    hint: "Mueble donde comemos."
  },
  {
    word: "taza",
    display: "ta__",
    missing: "za",
    options: ["za", "ca", "sa", "cha"],
    emoji: "☕",
    hint: "Se usa para tomar café."
  },
  {
    word: "pelota",
    display: "__lota",
    missing: "pe",
    options: ["pe", "pa", "pi", "po"],
    emoji: "⚽",
    hint: "Se usa para jugar al fútbol."
  }
];

let currentLevel = 0;
let score = 0;
let streak = 0;
let hearts = 3;

function updateDisplay() {
  document.getElementById('score').textContent = score;
  document.getElementById('streak').textContent = streak;
  document.getElementById('currentLevel').textContent = currentLevel + 1;
  document.getElementById('totalLevels').textContent = levels.length;
  document.getElementById('progressFill').style.width = `${(currentLevel / levels.length) * 100}%`;

  const heartsContainer = document.getElementById('hearts');
  heartsContainer.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart ' + (i < hearts ? 'active' : 'inactive');
    heart.textContent = '❤️';
    heartsContainer.appendChild(heart);
  }

  const level = levels[currentLevel];
  document.getElementById('characterEmoji').textContent = level.emoji;
  document.getElementById('characterName').textContent = level.display;
  document.getElementById('characterHint').textContent = level.hint;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';
  level.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.onclick = () => handleAnswer(option);
    optionsContainer.appendChild(btn);
  });
}

function handleAnswer(answer) {
  const optionsContainer = document.getElementById('options');
  Array.from(optionsContainer.children).forEach(btn => (btn.disabled = true));

  const level = levels[currentLevel];
  const isCorrect = answer === level.missing;

  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.remove('hidden');
  document.getElementById('tipBox').classList.add('hidden');

  document.getElementById('resultIcon').textContent = isCorrect ? '✅' : '❌';
  document.getElementById('resultText').textContent = isCorrect ? '¡Correcto!' : '¡Incorrecto!';
  document.getElementById('resultText').className = `result-text ${isCorrect ? 'result-correct' : 'result-incorrect'}`;
  document.getElementById('correctAnswer').textContent = `La palabra completa es: ${level.word}`;

  setTimeout(() => {
    if (isCorrect) {
      score += 100;
      streak += 1;
      if (currentLevel < levels.length - 1) {
        currentLevel += 1;
        showNextLevel();
      } else {
        showGameOver(true);
      }
    } else {
      hearts -= 1;
      streak = 0;
      if (hearts <= 0) {
        showGameOver(false);
      } else {
        showNextLevel();
      }
    }
  }, 3000);
}

function showNextLevel() {
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');
  document.getElementById('tipBox').classList.remove('hidden');
  updateDisplay();
}

function showGameOver(isVictory) {
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('gameOverScreen').classList.remove('hidden');
  document.getElementById('tipBox').classList.add('hidden');

  document.getElementById('gameOverEmoji').textContent = isVictory ? '🏆' : '💔';
  document.getElementById('gameOverTitle').textContent = isVictory ? '¡Felicitaciones!' : '¡Inténtalo de nuevo!';
  document.getElementById('finalScore').textContent = `Puntuación Final: ${score}`;
  const levelsText = `Niveles completados: ${currentLevel + (isVictory ? 1 : 0)}/${levels.length}`;
  document.getElementById('finalLevels').textContent = levelsText;
}


function resetGame() {
  currentLevel = 0;
  score = 0;
  streak = 0;
  hearts = 3;
  document.getElementById('gameOverScreen').classList.add('hidden');
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');
  document.getElementById('tipBox').classList.remove('hidden');
  updateDisplay();
}

updateDisplay();
