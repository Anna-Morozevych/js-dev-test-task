'use strict';

const body = document.querySelector('body');

/* -----Add/remove a Open Button----- */

const openBox = document.createElement('div');
const openButton = document.createElement('button');

openBox.className = 'open';
openButton.className = 'open__button';
openButton.innerText = 'Open Form';

openBox.append(openButton);
body.append(openBox);

openButton.addEventListener('click', () => {
  body.append(popup);
  openBox.remove();
});

/* -----Add/remove a form----- */

const popup = document.createElement('div');
const form = document.createElement('form');
const cross = document.createElement('div');

popup.className = 'popup';
form.className = 'popup__form';
cross.className = 'popup__close';
cross.innerText = 'X';
popup.append(form, cross);

cross.addEventListener('click', () => {
  clean();
  body.append(openBox);
  popup.remove();
});

form.insertAdjacentHTML('beforeend', `
  <label class="popup__form-label" for="name">User Name</label>
  <input
    class="popup__form-field"
    type="text"
    name="name"
    placeholder="Enter name"
  >

  <label class="popup__form-label" for="email">Email</label>
  <input
    class="popup__form-field"
    type="email"
    name="email"
    placeholder="Enter email"
  >

  <label class="popup__form-label" for="phone">Phone</label>
  <input
    class="popup__form-field"
    type="tel"
    name="phone"
    placeholder="Enter phone number"
  >

  <button class="popup__form-button" type="submit">Submit</button>
`);

/* -----Show notification if form data is invalid----- */

const pushNotification = (value, div) => {
  div.classList = `notification`;

  switch (value) {
    case 'error':
      div.insertAdjacentHTML('afterbegin', `
      <h2 class='notification__title'>
        Error
      </h2>
      <p class='notification__text'>
        Value must be more than 2 symbols
      </p>
  `);
      div.classList.add('notification__error');
      break;

    case 'email':
      div.insertAdjacentHTML('afterbegin', `
      <h2 class='notification__title'>
        Warning
      </h2>
      <p class='notification__text'>
        Email format is example@email.com
      </p>
  `);
      div.classList.add('notification__warning');
      break;

    case 'phone':
      div.insertAdjacentHTML('afterbegin', `
      <h2 class='notification__title'>
        Warning
      </h2>
      <p class='notification__text'>
        The field should contain only numbers
      </p>
  `);
      div.classList.add('notification__warning');
      break;

    case 'success':
      div.insertAdjacentHTML('afterbegin', `
      <h2 class='notification__title'>
        Success
      </h2>
      <p class='notification__text'>
        Form submitted successfully
      </p>
  `);
      div.classList.add('notification__success');
      break;
  }
};

function showNotification(element) {
  body.append(element);

  setTimeout(() => {
    element.remove();
  }, 2000);
}

form.addEventListener('click', (eventObj) => {
  eventObj.preventDefault();

  const target = eventObj.target.closest('button');

  if (!target) {
    return;
  }

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const phone = form.elements.phone.value.trim();

  const div = document.createElement('div');

  // eslint-disable-next-line max-len
  if (!(/([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(form.elements.email.value))) {
    pushNotification('email', div);
    showNotification(div);

    return;
  }

  if (!(/^[1-9]+[0-9]*$/.test(form.elements.phone.value))) {
    pushNotification('phone', div);
    showNotification(div);

    return;
  }

  if (name.length < 2
    || email.length < 2
    || phone.length < 2) {
    pushNotification('error', div);
    showNotification(div);

    return;
  }

  pushNotification('success', div);
  showNotification(div);

  clean();
});

function clean() {
  form.elements.name.value = '';
  form.elements.email.value = '';
  form.elements.phone.value = '';
}
