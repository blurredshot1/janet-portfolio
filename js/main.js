const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '×' : '☰';
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const copyButton = document.getElementById('copy-bio');
const speakerBio = document.getElementById('speaker-bio-text');
const copyStatus = document.querySelector('.copy-status');

if (copyButton && speakerBio && copyStatus) {
  copyButton.addEventListener('click', async () => {
    if (!navigator.clipboard || !window.isSecureContext) {
      copyStatus.textContent = 'Clipboard access is unavailable here. Please select and copy the speaker introduction.';
      return;
    }

    try {
      await navigator.clipboard.writeText(speakerBio.textContent.trim());
      copyStatus.textContent = 'Speaker introduction copied.';
    } catch (error) {
      copyStatus.textContent = 'Could not copy the introduction. Please select and copy the text above.';
    }
  });
}

const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    formStatus.hidden = true;
    formStatus.classList.remove('is-success', 'is-error');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Formspree submission failed.');

      contactForm.reset();
      contactForm.hidden = true;
      formStatus.textContent = 'Your message has been sent.';
      formStatus.classList.add('is-success');
    } catch (error) {
      formStatus.textContent = 'Your message could not be sent. Please try again.';
      formStatus.classList.add('is-error');
    } finally {
      submitButton.disabled = false;
      formStatus.hidden = false;
    }
  });
}
