const form = document.querySelector('form');
const thankYouMessage = document.querySelector('#thank-you-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  thankYouMessage.classList.add('show');

  setTimeout(() => form.submit(), 2000);
});