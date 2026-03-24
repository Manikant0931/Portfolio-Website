window.addEventListener('load', () => document.getElementById('preloader').classList.add('hidden'));

AOS.init({ duration: 700, easing: 'ease-in-out', once: true });

const words = ['Full Stack Developer', 'MERN Stack Learner', 'Competitive Programmer', 'CSE Student'];
let wi = 0;
let ci = 0;
let del = false;
const tel = document.getElementById('typed-out');

(function type() {
  const w = words[wi];
  tel.textContent = del ? w.slice(0, --ci) : w.slice(0, ++ci);

  if (!del && ci === w.length) {
    del = true;
    return setTimeout(type, 1800);
  }

  if (del && ci === 0) {
    del = false;
    wi = (wi + 1) % words.length;
  }

  setTimeout(type, del ? 55 : 100);
})();

const counters = document.querySelectorAll('.counter');
const cObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;

    const el = e.target;
    const target = +el.dataset.target;
    let v = 0;
    const step = Math.ceil(target / 60);

    const t = setInterval(() => {
      v = Math.min(v + step, target);
      el.textContent = v;
      if (v >= target) clearInterval(t);
    }, 20);

    cObs.unobserve(el);
  });
}, { threshold: 0.4 });

counters.forEach(c => cObs.observe(c));

const st = document.getElementById('scroll-top');
window.addEventListener('scroll', () => st.classList.toggle('active', scrollY > 100));
st.addEventListener('click', e => {
  e.preventDefault();
  scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('headerToggle').addEventListener('click', () => {
  document.getElementById('header').classList.toggle('open');
});

const secs = [...document.querySelectorAll('section[id]')];
const links = [...document.querySelectorAll('#navmenu a')];

window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => {
    if (scrollY >= s.offsetTop - 120) cur = s.id;
  });

  links.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + cur) a.classList.add('active');
  });
});

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !subject || !message) {
    alert('Please fill all fields before sending.');
    return;
  }

  const mailSubject = encodeURIComponent(subject);
  const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:manimishra2006@gmail.com?subject=${mailSubject}&body=${mailBody}`;
});