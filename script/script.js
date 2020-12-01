const getData = (url) => {
  return fetch(url)
  .then((res) => res.json())
};

const swap = document.querySelector('#swap');

const containerForIn = document.querySelector('[data-for="input"]');
const inputIn = containerForIn.querySelector('.exchange-input');
const selectIn = containerForIn.querySelector('.exchange-select');

const containerForOut = document.querySelector('[data-for="output"]');
const inputOut = containerForOut.querySelector('.exchange-input');
const selectOut = containerForOut.querySelector('.exchange-select');

inputIn.value = '';
inputOut.value = '';

getData('https://api.exchangeratesapi.io/latest')
.then((res)=>{
  const {rates} = res;
  const options = Object.keys(rates).map((rate)=>{
    return `<option value="${rate}">${rate}</option>`;
  })
  .concat('<option selected value="EUR">EUR</option>').join('');
  selectIn.innerHTML = options;
  selectOut.innerHTML = options;
});

swap.addEventListener('mousedown', () => {
  swap.classList.remove('rotate-animate');
});

swap.addEventListener('mouseup', ()=>{
  swap.classList.add('rotate-animate');
});

const isFloatOrEmpty = (value) => {
  return !isNaN(parseFloat(value)) || value.trim() === '';
};

const inputError = (inputEl) => {
  inputEl.classList.add('error');
};

const inputSuccess = (inputEl) => {
  inputEl.classList.remove('error');
};

const exchangeCalc = (value) => {
  if(isFloatOrEmpty(value)) {
    inputSuccess(inputIn);
    if (selectIn.value === selectOut.value) {
      inputOut.value = Number(value).toFixed(2);
    } else {
      getData(`https://api.exchangeratesapi.io/latest?base=${selectIn.value}`)
      .then((res)=>{
        const rate = res.rates[selectOut.value];
        inputOut.value = (value*rate).toFixed(2);
      });
    }
  } else {
    inputError(inputIn);
  }
  
};

inputIn.addEventListener('input', (event) => {
  exchangeCalc(event.target.value);
});

selectIn.addEventListener('change', (event) => {
  exchangeCalc(inputIn.value);
})

selectOut.addEventListener('change', (event) => {
  exchangeCalc(inputIn.value);
});

swap.addEventListener('click', (event) => {
  const selectInValue = selectIn.value;
  selectIn.value = selectOut.value;
  selectOut.value = selectInValue;
  exchangeCalc(inputIn.value);
})