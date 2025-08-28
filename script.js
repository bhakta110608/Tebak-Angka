// Angka acak antara 1-30!
let randomNumber = Math.floor(Math.random() * 30) + 1;
let attempts = 0;
const maxAttempts = 6;

const benarSound = new Audio('benar.mp3');
const salahSound = new Audio('salah.mp3');

// Fungsi cek tebakan
function checkGuess() {
  const input = document.getElementById('guessInput');
  const message = document.getElementById('message');
  const attemptsDisplay = document.getElementById('attempts');
  const progressBar = document.getElementById('progress');

  const guess = parseInt(input.value);

  if (isNaN(guess) || guess < 1 || guess > 30) {
    message.textContent = "Masukkan angka antara 1 dan 30!";
    message.style.color = "orange";
    return;
  }

  attempts++;
  progressBar.style.width = `${(attempts / maxAttempts) * 100}%`;
  input.value = "";


  if (guess === randomNumber) {
    message.textContent = `🎉 Benar! Angkanya ${randomNumber}. Kamu butuh ${attempts} percobaan.`;
    message.style.color = "green";
    benarSound.play();
    document.body.classList.add('win');
    updateLeaderboard();
    showConfetti();
    endGame();
  } else if (attempts >= maxAttempts) {
    message.textContent = `💥 Game Over! Angka yang benar: ${randomNumber}.`;
    message.style.color = "gray";
    salahSound.play();      
    document.body.classList.add('lose');
    endGame();
  } else {
    message.textContent = guess < randomNumber ? "Terlalu kecil!" : "Terlalu besar!";
    message.style.color = "red";
    salahSound.play();
  }

  attemptsDisplay.textContent = `Percobaan: ${attempts} / ${maxAttempts}`;
}

// Akhiri permainan
function endGame() {
  document.getElementById('guessInput').disabled = true;
  document.querySelector('button[onclick="checkGuess()"]').disabled = true;
  document.getElementById('resetBtn').style.display = 'inline-block';
}

// Reset permainan
function resetGame() {
  randomNumber = Math.floor(Math.random() * 30) + 1;
  attempts = 0;

  document.getElementById('guessInput').value = ""; // ✅ Perbaikan di sini
  document.getElementById('guessInput').disabled = false;
  document.querySelector('button[onclick="checkGuess()"]').disabled = false;

  document.getElementById('message').textContent = "";
  document.getElementById('attempts').textContent = "";
  document.getElementById('progress').style.width = "0%";
  document.getElementById('resetBtn').style.display = 'none';

  document.body.classList.remove('win', 'lose');

  displayLeaderboard();
}


// ========== LEADERBOARD ==========

function updateLeaderboard() {
  let scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
  scores.push(attempts);
  scores.sort((a, b) => a - b);
  scores = scores.slice(0, 3); // Ambil 3 terbaik

  localStorage.setItem('leaderboard', JSON.stringify(scores));
  displayLeaderboard();
}

function displayLeaderboard() {
  const leaderboard = document.getElementById('leaderboard');
  const scores = JSON.parse(localStorage.getItem('leaderboard')) || [];

  if (scores.length === 0) {
    leaderboard.innerHTML = 'Belum ada skor terbaik';
    return;
  }

  let html = '<h4>🏆 Leaderboard</h4><ol>';
  scores.forEach(score => {
    html += `<li>${score} percobaan</li>`;
  });
  html += '</ol>';

  leaderboard.innerHTML = html;
}

function resetLeaderboard() {
  localStorage.removeItem('leaderboard');
  displayLeaderboard();
}

// Tampilkan leaderboard saat awal
displayLeaderboard();
function showConfetti() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
}







