const printHighscores = () => {
    let highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];
  
    highscores.sort(function (a, b) {
      return b.score - a.score;
    });
  
    for (let i = 0; i < highscores.length; i += 1) {
  
      let liTag = document.createElement('li');
      liTag.textContent = highscores[i].initials + ' - ' + highscores[i].score;
  
      let olEl = document.getElementById('highscores');
      olEl.appendChild(liTag);
    }
  }
  
  const clearHighscores = () => {
    window.localStorage.removeItem('highscores');
    window.location.reload();
  }
  
  document.getElementById('clear').onclick = clearHighscores;
  
  printHighscores();