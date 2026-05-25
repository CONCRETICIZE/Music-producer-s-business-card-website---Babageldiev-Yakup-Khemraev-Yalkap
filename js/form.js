export function initForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.reset();

    const notice = document.createElement('div');
    notice.className = 'form-notice';
    notice.textContent = 'Сообщение отправлено. Я свяжусь с вами в ближайшее время.';
    form.prepend(notice);

    setTimeout(() => notice.remove(), 3500);
  });
}