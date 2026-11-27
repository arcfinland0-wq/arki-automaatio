const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(expanded));
  navigation.classList.toggle('is-open', expanded);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});

document.querySelectorAll('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('#package').value = link.dataset.package;
  });
});

const form = document.querySelector('#contact-form');
const dialog = document.querySelector('#draft-dialog');
const output = document.querySelector('#draft-output');
const copyStatus = document.querySelector('#copy-status');
const requiredTextFields = [form.elements.name, form.elements.message];

function validateRequiredText(field) {
  field.setCustomValidity(field.value && !field.value.trim()
    ? 'Kirjoita tähän muutakin kuin välilyöntejä.'
    : '');
}

requiredTextFields.forEach((field) => {
  field.addEventListener('input', () => validateRequiredText(field));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  requiredTextFields.forEach(validateRequiredText);
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  output.value = [
    'Aihe: Keskustelu yrityksen automaatiosta',
    '',
    `Nimi: ${values.get('name').trim()}`,
    `Yritys: ${values.get('company').trim() || 'Ei ilmoitettu'}`,
    `Sähköposti: ${values.get('email').trim()}`,
    `Kiinnostaa: ${values.get('package')}`,
    '',
    'Toistuva homma:',
    values.get('message').trim(),
  ].join('\n');
  copyStatus.textContent = '';
  dialog.showModal();
});

document.querySelectorAll('.close-dialog').forEach((button) => {
  button.addEventListener('click', () => dialog.close());
});

document.querySelector('#copy-draft').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    copyStatus.textContent = 'Luonnos kopioitu. Viestiä ei lähetetty.';
  } catch {
    output.focus();
    output.select();
    copyStatus.textContent = 'Kopiointi ei onnistunut automaattisesti. Teksti on valittu: kopioi se laitteen kopiointitoiminnolla.';
  }
});

// Without the draft handler, keep all fields disabled so native form submission
// cannot put contact details in a URL or send them to the static host.
document.querySelector('#contact-fields').disabled = false;
