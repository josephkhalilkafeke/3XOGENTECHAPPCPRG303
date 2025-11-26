const $ = sel => document.querySelector(sel);

if (document.body.dataset.page === 'home') {
  const player1Input = $('#player1');
  const player2Input = $('#player2');
  const choices = document.querySelectorAll('.choice');
  let selected = 'X';
  choices.forEach(c => c.addEventListener('click', () => {
    choices.forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    selected = c.dataset.choice;
  }));

  $('#startBtn').addEventListener('click', () => {
    const p1 = player1Input.value.trim() || 'Player 1';
    const p2 = player2Input.value.trim() || 'Player 2';
    const qp = `?p1=${encodeURIComponent(p1)}&p2=${encodeURIComponent(p2)}&first=${selected}`;
    window.location.href = `game.html${qp}`;
  });
}


if (document.body.dataset.page === 'game') {
  const params = new URLSearchParams(window.location.search);
  const p1 = params.get('p1') || 'Player 1';
  const p2 = params.get('p2') || 'Player 2';
  const first = params.get('first') || 'X';
  $('#playersLabel').textContent = `${p1} vs ${p2} • ${first} starts`;

  const cells = document.querySelectorAll('.cell');
  let turn = first;
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (cell.textContent.trim() !== '') return; 
      cell.textContent = turn;
      cell.style.color = (turn === 'X') ? '#0f172a' : '#1e40af';
      turn = (turn === 'X') ? 'O' : 'X';
      $('#turnPill').textContent = `${turn}'s turn`;
    });
  });
  
  $('#toScore').addEventListener('click', () => {
    window.location.href = 'scoreboard.html';
  });
}


if (document.body.dataset.page === 'scoreboard') {
  $('#backHome').addEventListener('click', () => window.location.href = 'index.html');
}
