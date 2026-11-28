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

// Only collapse navigation after its controls work; static links remain usable
// when JavaScript is disabled or the script cannot be loaded.
document.documentElement.classList.add('navigation-ready');

const packageSelect = document.querySelector('#package');
const packageSelection = document.querySelector('#package-selection');

function updatePackageSelection() {
  packageSelection.textContent = packageSelect.value;
}

packageSelect.addEventListener('change', updatePackageSelection);
updatePackageSelection();

document.querySelectorAll('[data-package]').forEach((link) => {
  link.addEventListener('click', () => {
    packageSelect.value = link.dataset.package;
    updatePackageSelection();
  });
});

const form = document.querySelector('#contact-form');
const dialog = document.querySelector('#draft-dialog');
const output = document.querySelector('#draft-output');
const copyStatus = document.querySelector('#copy-status');
const requiredTextFields = [form.elements.name, form.elements.message];
const english = document.documentElement.lang === 'en';
const messages = english ? {
  whitespace: 'Please enter more than spaces.',
  subject: 'Subject: Business automation enquiry',
  name: 'Name', company: 'Company', email: 'Email', interest: 'Interested in',
  unspecified: 'Not provided', task: 'The recurring task:',
  copied: 'Draft copied. No message was sent.',
  copyFailed: 'Could not copy automatically. The text is selected: use your device’s copy command.',
} : {
  whitespace: 'Kirjoita tähän muutakin kuin välilyöntejä.',
  subject: 'Aihe: Keskustelu yrityksen automaatiosta',
  name: 'Nimi', company: 'Yritys', email: 'Sähköposti', interest: 'Kiinnostaa',
  unspecified: 'Ei ilmoitettu', task: 'Toistuva homma:',
  copied: 'Luonnos kopioitu. Viestiä ei lähetetty.',
  copyFailed: 'Kopiointi ei onnistunut automaattisesti. Teksti on valittu: kopioi se laitteen kopiointitoiminnolla.',
};

function validateRequiredText(field) {
  field.setCustomValidity(field.value && !field.value.trim()
    ? messages.whitespace
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
    messages.subject,
    '',
    `${messages.name}: ${values.get('name').trim()}`,
    `${messages.company}: ${values.get('company').trim() || messages.unspecified}`,
    `${messages.email}: ${values.get('email').trim()}`,
    `${messages.interest}: ${values.get('package')}`,
    '',
    messages.task,
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
    copyStatus.textContent = messages.copied;
  } catch {
    output.focus();
    output.select();
    copyStatus.textContent = messages.copyFailed;
  }
});

// Without the draft handler, keep all fields disabled so native form submission
// cannot put contact details in a URL or send them to the static host.
document.querySelector('#contact-fields').disabled = false;
