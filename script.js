const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  navLinks.classList.toggle('open', open);
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Ouvrir le menu');
}));

const filters = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.project-card')];

filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  const category = button.dataset.filter;
  projects.forEach(project => {
    project.hidden = category !== 'tout' && !project.dataset.category.split(' ').includes(category);
  });
}));

const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
const closeButton = dialog.querySelector('.dialog-close');
let lastTrigger = null;

document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
  const id = button.closest('.project-card').dataset.project;
  const template = document.getElementById(`detail-${id}`);
  if (!template) return;
  lastTrigger = button;
  dialogContent.replaceChildren(template.content.cloneNode(true));
  dialog.showModal();
  closeButton.focus();
}));

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  const video = dialog.querySelector('video');
  if (video) video.pause();
  if (lastTrigger) lastTrigger.focus();
});

document.querySelector('#year').textContent = new Date().getFullYear();
