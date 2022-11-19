const btn = document.getElementById('btn');

btn.addEventListener('click', function handleClick() {
    const initialText = '🎙 Запись';
  
  if (btn.textContent.toLowerCase().includes(initialText.toLowerCase())) {
    btn.textContent = '⭕Стоп';
  } else {
    btn.textContent = initialText;
  }
});