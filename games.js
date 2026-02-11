// Game Modal Management
const gameModal = document.getElementById('gameModal');
const gameContainer = document.getElementById('gameContainer');

function openGameModal(gameType) {
    gameModal.classList.add('active');
    loadGame(gameType);
}

function closeGameModal() {
    gameModal.classList.remove('active');
    gameContainer.innerHTML = '';
}

gameModal.addEventListener('click', (e) => {
    if (e.target === gameModal) {
        closeGameModal();
    }
});

function loadGame(gameType) {
    switch(gameType) {
        case 'quiz':
            loadQuizGame();
            break;
        case 'memory':
            loadMemoryGame();
            break;
        case 'lovecalc':
            loadLoveCalculator();
            break;
        case 'fortune':
            loadFortuneCookie();
            break;
        case 'tictactoe':
            loadTicTacToe();
            break;
        case 'catch':
            loadCatchHearts();
            break;
    }
}

// ========== QUIZ GAME ==========
function loadQuizGame() {
    const questions = [
        {
            question: "¿Cuál es mi comida favorita?",
            options: ["Pizza", "Hamburguesa", "Sushi", "Pasta"],
            correct: 0,
            feedback: "¡Correcto! Amo la pizza 🍕"
        },
        {
            question: "¿Qué es lo que más me gusta de ti?",
            options: ["Tu sonrisa", "Todo de ti", "Tus ojos", "Tu risa"],
            correct: 1,
            feedback: "¡Exacto! Me encanta todo de ti 💕"
        },
        {
            question: "¿Cuál fue nuestro primer beso?",
            options: ["25 Octubre", "26 Octubre", "27 Octubre", "28 Octubre"],
            correct: 1,
            feedback: "¡Sí! El 26 de Octubre, un día inolvidable 💋"
        },
        {
            question: "¿Qué fecha empezamos oficialmente?",
            options: ["30 Noviembre", "1 Diciembre", "2 Diciembre", "3 Diciembre"],
            correct: 1,
            feedback: "¡Correcto! El 1 de Diciembre comenzó nuestra historia 💖"
        },
        {
            question: "¿Cuántas salidas hemos tenido aproximadamente?",
            options: ["15", "18", "20", "25"],
            correct: 1,
            feedback: "¡Exacto! Y cada una ha sido especial 🌟"
        },
        {
            question: "¿Qué me hace más feliz?",
            options: ["Estar contigo", "Comer", "Dormir", "Jugar"],
            correct: 0,
            feedback: "¡Por supuesto! Estar contigo es mi felicidad 😊"
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    function displayQuestion() {
        if (currentQuestion >= questions.length) {
            showResults();
            return;
        }

        const q = questions[currentQuestion];
        gameContainer.innerHTML = `
            <div class="quiz-container">
                <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 36px; color: var(--primary); margin-bottom: 20px;">
                    Quiz del Amor 💕
                </h3>
                <div class="quiz-question">Pregunta ${currentQuestion + 1} de ${questions.length}</div>
                <div class="quiz-question">${q.question}</div>
                <div class="quiz-options">
                    ${q.options.map((opt, idx) => `
                        <div class="quiz-option" onclick="answerQuestion(${idx})">
                            ${opt}
                        </div>
                    `).join('')}
                </div>
                <div class="quiz-score">Puntaje: ${score}/${questions.length}</div>
            </div>
        `;
    }

    window.answerQuestion = function(selected) {
        const q = questions[currentQuestion];
        if (selected === q.correct) {
            score++;
            alert(q.feedback);
        } else {
            alert("¡Ups! " + q.feedback);
        }
        currentQuestion++;
        displayQuestion();
    };

    function showResults() {
        const percentage = (score / questions.length) * 100;
        let message = "";
        
        if (percentage === 100) {
            message = "¡PERFECTO! Me conoces completamente 💖";
        } else if (percentage >= 80) {
            message = "¡Excelente! Nos conocemos muy bien 😊";
        } else if (percentage >= 60) {
            message = "¡Bien! Vamos conociendo más cada día 💕";
        } else {
            message = "¡Hay que pasar más tiempo juntos! 😄";
        }

        gameContainer.innerHTML = `
            <div class="quiz-container">
                <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 48px; color: var(--primary); margin-bottom: 20px;">
                    Resultados
                </h3>
                <div class="love-percentage">${score}/${questions.length}</div>
                <div class="love-message">${message}</div>
                <button class="game-btn" style="margin-top: 30px;" onclick="loadQuizGame()">
                    Jugar de Nuevo
                </button>
            </div>
        `;
    }

    displayQuestion();
}

// ========== MEMORY GAME ==========
function loadMemoryGame() {
    const emojis = ['💕', '💖', '💗', '💝', '💘', '❤️', '🌹', '💐'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let timer = 0;
    let timerInterval;

    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById('memoryTimer').textContent = `⏱️ ${timer}s`;
        }, 1000);
    }

    gameContainer.innerHTML = `
        <div class="memory-container">
            <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 36px; color: var(--primary); text-align: center; margin-bottom: 20px;">
                Memoria del Amor 🃏
            </h3>
            <div class="memory-stats">
                <span>Movimientos: <strong id="memoryMoves">0</strong></span>
                <span id="memoryTimer">⏱️ 0s</span>
                <span>Parejas: <strong id="memoryPairs">0/8</strong></span>
            </div>
            <div class="memory-grid" id="memoryGrid"></div>
        </div>
    `;

    const grid = document.getElementById('memoryGrid');
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerHTML = '❓';
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });

    function flipCard(card) {
        if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        if (flippedCards.length === 0) {
            startTimer();
        }

        card.classList.add('flipped');
        card.innerHTML = card.dataset.emoji;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('memoryMoves').textContent = moves;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            document.getElementById('memoryPairs').textContent = `${matchedPairs}/8`;
            flippedCards = [];

            if (matchedPairs === 8) {
                clearInterval(timerInterval);
                setTimeout(() => {
                    alert(`¡Ganaste! 🎉\nMovimientos: ${moves}\nTiempo: ${timer}s`);
                }, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.innerHTML = '❓';
                card2.innerHTML = '❓';
                flippedCards = [];
            }, 1000);
        }
    }
}

// ========== LOVE CALCULATOR ==========
function loadLoveCalculator() {
    gameContainer.innerHTML = `
        <div class="lovecalc-container">
            <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 42px; color: var(--primary); margin-bottom: 20px;">
                Calculadora del Amor 💖
            </h3>
            <p style="font-size: 18px; color: var(--text-light); margin-bottom: 30px;">
                Descubre nuestro nivel de compatibilidad
            </p>
            <div class="lovecalc-result">
                <div class="love-percentage" id="lovePercentage">?</div>
                <div class="love-message" id="loveMessage">Haz click para calcular</div>
            </div>
            <button class="game-btn" onclick="calculateLove()">
                💕 Calcular Nuestro Amor
            </button>
        </div>
    `;

    window.calculateLove = function() {
        // Siempre da resultados altos porque están hechos el uno para el otro
        const percentage = Math.floor(Math.random() * 5) + 96; // 96-100%
        const percentageEl = document.getElementById('lovePercentage');
        const messageEl = document.getElementById('loveMessage');

        let currentPercent = 0;
        const interval = setInterval(() => {
            currentPercent += 2;
            if (currentPercent >= percentage) {
                currentPercent = percentage;
                clearInterval(interval);
                
                const messages = {
                    100: "¡AMOR PERFECTO! 💯 Están hechos el uno para el otro. La conexión entre ustedes es inquebrantable y mágica. ✨",
                    99: "¡CASI PERFECTO! 💝 Su amor es extraordinario. Cada día juntos es una bendición.",
                    98: "¡INCREÍBLE! 💖 La compatibilidad es asombrosa. Son almas gemelas.",
                    97: "¡MARAVILLOSO! 💕 Su amor supera todas las expectativas. Están destinados a estar juntos.",
                    96: "¡EXCEPCIONAL! 💗 La química entre ustedes es única y especial."
                };

                messageEl.textContent = messages[percentage] || messages[96];
                messageEl.style.animation = 'fadeInUp 0.8s ease';
                
                // Confetti effect
                createConfetti();
            }
            percentageEl.textContent = currentPercent + '%';
        }, 30);
    };

    function createConfetti() {
        const emojis = ['💕', '💖', '💗', '💝', '✨', '🌟'];
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-50px';
                confetti.style.fontSize = '30px';
                confetti.style.animation = 'fall 3s linear forwards';
                confetti.style.zIndex = '9999';
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 100);
        }
    }
}

// ========== FORTUNE COOKIE ==========
function loadFortuneCookie() {
    const fortunes = [
        "Tu amor crece más fuerte cada día que pasa. 💕",
        "Hoy es un día perfecto para crear recuerdos inolvidables juntos. ✨",
        "El universo conspiró para juntarlos, y seguirá protegiéndolos. 🌟",
        "Tu sonrisa iluminará el día de alguien especial hoy. 😊",
        "El amor que compartes es raro y hermoso. Cuídalo. 💖",
        "Pronto vivirán un momento que recordarán por siempre. 🎉",
        "Tu felicidad está en las pequeñas cosas que comparten. 🌸",
        "Hoy es un buen día para decir 'te amo' una vez más. 💝",
        "Los mejores momentos están por venir. ¡Prepárate! 🎊",
        "Tu amor es la inspiración de algo maravilloso. 🎨"
    ];

    gameContainer.innerHTML = `
        <div class="fortune-container">
            <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 42px; color: var(--primary); text-align: center; margin-bottom: 20px;">
                Galleta de la Fortuna 🥠
            </h3>
            <p style="font-size: 18px; color: var(--text-light); text-align: center; margin-bottom: 40px;">
                Haz click en la galleta para revelar tu mensaje del día
            </p>
            <div class="fortune-cookie" onclick="openFortune()">🥠</div>
            <div class="fortune-message" id="fortuneMessage"></div>
        </div>
    `;

    window.openFortune = function() {
        const fortuneMsg = document.getElementById('fortuneMessage');
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        
        fortuneMsg.textContent = randomFortune;
        fortuneMsg.classList.add('show');
        
        document.querySelector('.fortune-cookie').style.animation = 'crack 0.5s ease';
        setTimeout(() => {
            document.querySelector('.fortune-cookie').textContent = '💝';
        }, 250);
    };
}

// ========== TIC TAC TOE ==========
function loadTicTacToe() {
    let board = Array(9).fill(null);
    let currentPlayer = '💕'; // Player is hearts
    let gameActive = true;

    gameContainer.innerHTML = `
        <div class="tictactoe-container">
            <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 36px; color: var(--primary); text-align: center; margin-bottom: 20px;">
                Tres en Línea del Amor ⭕
            </h3>
            <div class="tictactoe-status" id="gameStatus">Tu turno (💕)</div>
            <div class="tictactoe-board" id="tictactoeBoard"></div>
            <button class="game-btn" style="margin-top: 20px;" onclick="resetTicTacToe()">
                Nueva Partida
            </button>
        </div>
    `;

    const boardEl = document.getElementById('tictactoeBoard');
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'tictactoe-cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => makeMove(i));
        boardEl.appendChild(cell);
    }

    function makeMove(index) {
        if (!gameActive || board[index]) return;

        board[index] = currentPlayer;
        updateBoard();

        if (checkWinner(currentPlayer)) {
            document.getElementById('gameStatus').textContent = currentPlayer === '💕' ? '¡Ganaste! 🎉' : '¡La computadora ganó! 🤖';
            gameActive = false;
            return;
        }

        if (board.every(cell => cell !== null)) {
            document.getElementById('gameStatus').textContent = '¡Empate! 🤝';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === '💕' ? '⭕' : '💕';
        
        if (currentPlayer === '⭕') {
            document.getElementById('gameStatus').textContent = 'Turno de la computadora...';
            setTimeout(computerMove, 500);
        } else {
            document.getElementById('gameStatus').textContent = 'Tu turno (💕)';
        }
    }

    function computerMove() {
        const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        makeMove(randomIndex);
    }

    function updateBoard() {
        const cells = document.querySelectorAll('.tictactoe-cell');
        cells.forEach((cell, idx) => {
            cell.textContent = board[idx] || '';
            if (board[idx]) cell.classList.add('taken');
        });
    }

    function checkWinner(player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winPatterns.some(pattern => 
            pattern.every(index => board[index] === player)
        );
    }

    window.resetTicTacToe = function() {
        board = Array(9).fill(null);
        currentPlayer = '💕';
        gameActive = true;
        document.getElementById('gameStatus').textContent = 'Tu turno (💕)';
        const cells = document.querySelectorAll('.tictactoe-cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken');
        });
    };
}

// ========== CATCH HEARTS ==========
function loadCatchHearts() {
    let score = 0;
    let timeLeft = 30;
    let gameActive = false;
    let gameInterval;
    let heartInterval;

    gameContainer.innerHTML = `
        <div style="text-align: center;">
            <h3 style="font-family: 'Cormorant Garamond', serif; font-size: 36px; color: var(--primary); margin-bottom: 20px;">
                Atrapa Corazones 💕
            </h3>
            <p style="font-size: 18px; color: var(--text-light); margin-bottom: 20px;">
                ¡Atrapa todos los corazones que puedas en 30 segundos!
            </p>
            <div class="catch-game" id="catchGame">
                <div class="catch-score">Puntaje: <span id="catchScore">0</span></div>
                <div class="catch-timer">Tiempo: <span id="catchTimer">30</span>s</div>
            </div>
            <button class="game-btn" style="margin-top: 20px;" onclick="startCatchGame()">
                Comenzar Juego
            </button>
        </div>
    `;

    window.startCatchGame = function() {
        if (gameActive) return;
        
        gameActive = true;
        score = 0;
        timeLeft = 30;
        document.getElementById('catchScore').textContent = score;
        document.getElementById('catchTimer').textContent = timeLeft;
        
        const gameArea = document.getElementById('catchGame');
        gameArea.innerHTML = `
            <div class="catch-score">Puntaje: <span id="catchScore">${score}</span></div>
            <div class="catch-timer">Tiempo: <span id="catchTimer">${timeLeft}</span>s</div>
        `;

        // Timer countdown
        gameInterval = setInterval(() => {
            timeLeft--;
            document.getElementById('catchTimer').textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);

        // Spawn hearts
        heartInterval = setInterval(() => {
            if (gameActive) spawnHeart();
        }, 800);
    };

    function spawnHeart() {
        const gameArea = document.getElementById('catchGame');
        const heart = document.createElement('div');
        const hearts = ['💕', '💖', '💗', '💝', '❤️'];
        
        heart.className = 'falling-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * (gameArea.offsetWidth - 40) + 'px';
        heart.style.top = '-40px';
        heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        heart.addEventListener('click', () => {
            if (gameActive) {
                score += 10;
                document.getElementById('catchScore').textContent = score;
                heart.remove();
            }
        });
        
        gameArea.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) heart.remove();
        }, 4000);
    }

    function endGame() {
        gameActive = false;
        clearInterval(gameInterval);
        clearInterval(heartInterval);
        
        const gameArea = document.getElementById('catchGame');
        gameArea.innerHTML = `
            <div class="catch-game-over">
                <h3>¡Juego Terminado!</h3>
                <div class="love-percentage">${score}</div>
                <p style="font-size: 20px; color: var(--text-dark);">
                    ${score >= 200 ? '¡Increíble! Eres súper rápido 🌟' :
                      score >= 150 ? '¡Muy bien! Excelente puntaje 💖' :
                      score >= 100 ? '¡Bien hecho! Buen trabajo 💕' :
                      '¡Sigue practicando! 😊'}
                </p>
            </div>
        `;
    }
}
