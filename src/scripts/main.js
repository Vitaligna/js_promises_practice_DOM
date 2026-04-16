'use strict';

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = message;

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeoutId);
      resolve('First promise was resolved on a left click in the document');
    },
    { once: true },
  );
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((error) => showNotification(error.message, 'error'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

secondPromise.then((message) => showNotification(message, 'success'));

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise]).then(
  () =>
    'Third promise was resolved only after both left and right clicks happened',
);

thirdPromise.then((message) => showNotification(message, 'success'));
