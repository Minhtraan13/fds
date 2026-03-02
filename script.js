function saveKey() {
  const key = document.getElementById('apikey').value;
  const provider = document.getElementById('provider').value;
  localStorage.setItem(provider + '_key', key);
  alert('Đã lưu API key cho ' + provider);
}

async function generate() {
  const provider = document.getElementById('provider').value;
  const key = localStorage.getItem(provider + '_key');
  const prompt = document.getElementById('prompt').value;

  if (!key) {
    alert('Chưa có API key');
    return;
  }

  document.getElementById('result').innerText = 'Đang gọi AI...';

  if (provider === 'gemini') {
    const res = await fetch(
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=' + key,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await res.json();
    document.getElementById('result').innerText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || 'Lỗi Gemini';
  } 
  else {
    document.getElementById('result').innerText =
      'Demo này mới kích hoạt Gemini. ChatGPT & DeepSeek có thể nối tương tự.';
  }
}
