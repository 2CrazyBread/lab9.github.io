    let userName = prompt("Введіть своє ім’я:");
    if (!userName || userName.trim() === "") userName = "Гравець";
    document.getElementById("userName").textContent = userName;

    let userTotal = 0, compTotal = 0;
    let attempt = 1;
    const maxAttempts = 3;

    const cards = [
      { name: '6', value: 6, image: 'https://cdn.pixabay.com/photo/2012/04/11/13/38/six-28274_1280.png' },
      { name: '7', value: 7, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfmYHMo_aq65apBggIJgRkRTnMkX89X50aKQ&s' },
      { name: '8', value: 8, image: 'https://cdn.pixabay.com/photo/2012/04/11/13/46/hearts-28302_1280.png' },
      { name: '9', value: 9, image: 'https://cdn.pixabay.com/photo/2012/04/11/13/43/diamonds-28290_1280.png' },
      { name: '10', value: 10, image: 'https://cdn.pixabay.com/photo/2012/04/11/13/49/spades-28310_1280.png' },
      { name: 'В', value: 2, image: 'https://cdn.pixabay.com/photo/2012/04/11/13/47/games-28305_1280.png' },
      { name: 'Д', value: 3, image: 'https://cdn.pixabay.com/photo/2012/04/11/13/41/clubs-28281_1280.png' },
      { name: 'К', value: 4, image: 'https://cdn.pixabay.com/photo/2012/04/11/13/47/hearts-28306_1280.png' },
      { name: 'Т', value: 11, image: 'https://cdn.pixabay.com/photo/2012/04/11/13/47/ace-28304_1280.png' }
    ];

    const buttonContainer = document.getElementById("buttonContainer");
    const generateBtn = document.createElement("button");
    
    generateBtn.textContent = "Згенерувати";
    buttonContainer.appendChild(generateBtn);

    function updateAttemptInfo() {
      document.getElementById("roundInfo").textContent = `Спроба ${attempt} з ${maxAttempts}`;
    }

    function addCardWithImage(player, card) {
      const cardsContainer = document.getElementById(`${player}Cards`);
      const cardElement = document.createElement('div');
      cardElement.className = 'card';
      
      const imgElement = document.createElement('img');
      imgElement.src = card.image;
      imgElement.alt = card.name;
      
      cardElement.appendChild(imgElement);
      cardsContainer.appendChild(cardElement);
    }

    generateBtn.addEventListener("click", function() {
      if (attempt > maxAttempts) return;
      
      const userCard = cards[Math.floor(Math.random() * cards.length)];
      userTotal += userCard.value;
      
      const compCard = cards[Math.floor(Math.random() * cards.length)];
      compTotal += compCard.value;
      
      addCardWithImage('user', userCard);
      addCardWithImage('comp', compCard);
      
      document.getElementById("userScore").textContent = userTotal;
      document.getElementById("compScore").textContent = compTotal;
      document.getElementById("userWinsText").textContent = `Очки: ${userTotal}`;
      document.getElementById("compWinsText").textContent = `Очки: ${compTotal}`;
      
      attempt++;
      if (attempt <= maxAttempts) {
        updateAttemptInfo();
    } else {
        document.getElementById("roundInfo").textContent = "Гра завершена!";
        generateBtn.disabled = true;
      
        let resultText = "";
        if (userTotal > compTotal) {
            resultText = `${userName} переміг з ${userTotal} очками!`;
        } else if (compTotal > userTotal) {
            resultText = `Комп’ютер переміг з ${compTotal} очками!`;
        } else {
            resultText = "Нічия!";
        }
        
        document.getElementById("result").textContent = resultText;
        
        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Грати знову";
        restartBtn.addEventListener("click", function() {
          location.reload();
        });
        buttonContainer.appendChild(restartBtn);
      }
    });

    updateAttemptInfo();