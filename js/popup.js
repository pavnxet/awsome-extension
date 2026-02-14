document.addEventListener('DOMContentLoaded', () => {
  // Tabs
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.tab);
      if (target) {
        target.classList.add('active');
      }
    });
  });

  // Password Generator
  const pwdLength = document.getElementById('pwd-length');
  const pwdLengthVal = document.getElementById('pwd-length-val');
  const pwdUpper = document.getElementById('pwd-upper');
  const pwdLower = document.getElementById('pwd-lower');
  const pwdNumbers = document.getElementById('pwd-numbers');
  const pwdSymbols = document.getElementById('pwd-symbols');
  const generatePwdBtn = document.getElementById('generate-pwd');
  const pwdResult = document.getElementById('pwd-result');
  const copyPwdBtn = document.getElementById('copy-pwd');

  pwdLength.addEventListener('input', () => {
    pwdLengthVal.textContent = pwdLength.value;
  });

  generatePwdBtn.addEventListener('click', () => {
    const length = parseInt(pwdLength.value);
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let chars = "";
    if (pwdUpper.checked) chars += upper;
    if (pwdLower.checked) chars += lower;
    if (pwdNumbers.checked) chars += numbers;
    if (pwdSymbols.checked) chars += symbols;

    if (chars === "") {
      pwdResult.value = "Select at least one option!";
      return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    pwdResult.value = password;
  });

  copyPwdBtn.addEventListener('click', () => {
    if (pwdResult.value) {
      pwdResult.select();
      document.execCommand('copy');
      const originalText = copyPwdBtn.textContent;
      copyPwdBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyPwdBtn.textContent = originalText;
      }, 1500);
    }
  });

  // QR Code Generator
  const qrInput = document.getElementById('qr-input');
  const generateQrBtn = document.getElementById('generate-qr');
  const qrOutput = document.getElementById('qr-output');

  generateQrBtn.addEventListener('click', () => {
    const text = qrInput.value;
    qrOutput.innerHTML = "";
    if (text) {
      new QRCode(qrOutput, {
        text: text,
        width: 128,
        height: 128
      });
    }
  });

  // Text Tools
  const textInput = document.getElementById('text-input');
  const wordCount = document.getElementById('word-count');
  const charCount = document.getElementById('char-count');
  const loremBtn = document.getElementById('lorem-ipsum');

  textInput.addEventListener('input', () => {
    const text = textInput.value;
    charCount.textContent = text.length;
    
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;
  });

  loremBtn.addEventListener('click', () => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    textInput.value = lorem;
    // Trigger input event to update counts
    textInput.dispatchEvent(new Event('input'));
  });

  // Converters
  // Color Hex to RGB
  const colorHex = document.getElementById('color-hex');
  const colorRgb = document.getElementById('color-rgb');

  colorHex.addEventListener('input', () => {
    let hex = colorHex.value.trim();
    if (hex.startsWith('#')) {
      hex = hex.slice(1);
    }

    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    if (hex.length === 6 && /^[0-9A-Fa-f]{6}$/.test(hex)) {
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      colorRgb.value = `rgb(${r}, ${g}, ${b})`;
    } else {
      colorRgb.value = "";
    }
  });

  // Timestamp
  const timestampInput = document.getElementById('timestamp-input');
  const convertTimeBtn = document.getElementById('convert-time');
  const timeOutput = document.getElementById('time-output');
  const currentTimeBtn = document.getElementById('current-time');

  convertTimeBtn.addEventListener('click', () => {
    const ts = parseInt(timestampInput.value);
    if (!isNaN(ts)) {
      // Check if it's seconds or milliseconds. 
      // Usually seconds are 10 digits, ms are 13.
      // But let's assume if small it is seconds.
      let date;
      if (ts < 10000000000) {
         date = new Date(ts * 1000);
      } else {
         date = new Date(ts);
      }
      timeOutput.textContent = date.toLocaleString();
    } else {
        timeOutput.textContent = "Invalid Timestamp";
    }
  });

  currentTimeBtn.addEventListener('click', () => {
    const now = Math.floor(Date.now() / 1000);
    timestampInput.value = now;
    convertTimeBtn.click();
  });
});
