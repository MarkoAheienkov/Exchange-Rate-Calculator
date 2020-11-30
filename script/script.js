const swap = document.querySelector('#swap');

swap.addEventListener('mousedown', () => {
  swap.classList.remove('rotate-animate');
});

swap.addEventListener('mouseup', ()=>{
  swap.classList.add('rotate-animate');
});
