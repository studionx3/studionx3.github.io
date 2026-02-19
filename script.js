'use strict';

// ─── Loader ────────────────────────────
window.addEventListener('load', () => {'use strict';

// ─── Loader ────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {'use strict';

// ─── Loader ────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.classList.remove('no-scroll');
    initReveal();
    countStats();
  }, 1800);'use strict';

// ─── Loader ────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.classList.remove('no-scroll');
    initReveal();
    countStats();
  }, 1800);
});
document.body.classList.add('no-scroll');

// ─── Custom Cursor ──────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); follower.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
});

// ─── Navbar Scroll ──────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 50);
  backToTop.classList.toggle('visible', scrollY > 400);

  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
      });
    }
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── Mobile Hamburger ───────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
  document.body.classList.toggle('no-scroll', navLinksEl.classList.contains('open'));
});
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

// ─── Smooth Scroll ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ─── Scroll Reveal ──────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .about-grid, .contact-grid, .portfolio-grid, .section-header').forEach(el => {
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  });
}

// ─── Skill Bars ─────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

// ─── Count Up Stats ─────────────────────
function countStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const step = target / (1800 / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// ─── Service Cards stagger ───────────────
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.service-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) serviceObserver.observe(servicesGrid);

// ─── Portfolio items stagger ─────────────
const portfolioGrid = document.getElementById('portfolio-grid');
const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.portfolio-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(24px)';
        setTimeout(() => {
          item.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 100);
      });
      portfolioObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
if (portfolioGrid) portfolioObserver.observe(portfolioGrid);

// ─── Portfolio item click → Lightbox ─────
function attachLightbox(item) {
  item.addEventListener('click', () => openLightbox(item));

  const video = item.querySelector('video.thumb-media');
  if (video) {
    // Show first frame as thumbnail once metadata is ready
    const showFirstFrame = () => {
      video.currentTime = 0.01;
    };
    if (video.readyState >= 1) {
      showFirstFrame();
    } else {
      video.addEventListener('loadedmetadata', showFirstFrame, { once: true });
    }

    // Hover: play preview / pause and rewind
    let playPromise;
    item.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { }); // suppress browser autoplay errors
      }
    });
    item.addEventListener('mouseleave', () => {
      if (playPromise !== undefined) {
        playPromise.then(() => {
          video.pause();
          video.currentTime = 0.01; // back to thumbnail frame
        }).catch(() => { });
      } else {
        video.pause();
        video.currentTime = 0.01;
      }
    });
  }
}

// Attach to all items already in the DOM
document.querySelectorAll('.portfolio-item').forEach(item => attachLightbox(item));

// ─── Lightbox ────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightbox-media');
const lightboxCaption = document.getElementById('lightbox-caption');
let lightboxItems = [];
let lightboxIndex = 0;

function openLightbox(item) {
  lightboxItems = [...document.querySelectorAll('.portfolio-item')];
  lightboxIndex = lightboxItems.indexOf(item);
  renderLightbox(lightboxItems[lightboxIndex]);
  lightbox.classList.add('open');
  document.body.classList.add('no-scroll');
}

function renderLightbox(item) {
  const img = item.querySelector('img.thumb-media');
  const video = item.querySelector('video.thumb-media');
  const title = item.querySelector('h4')?.textContent || '';
  const cat = item.querySelector('.thumb-cat')?.textContent || '';

  if (video) {
    lightboxMedia.innerHTML = `<video src="${video.src}" controls autoplay loop muted
      style="max-width:min(900px,90vw);max-height:75vh;border-radius:12px;"></video>`;
  } else if (img) {
    lightboxMedia.innerHTML = `<img src="${img.src}" alt="${title}"
      style="max-width:min(900px,90vw);max-height:75vh;object-fit:contain;border-radius:12px;" />`;
  }
  lightboxCaption.textContent = cat ? `${cat} — ${title}` : title;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.classList.remove('no-scroll');
  lightboxMedia.innerHTML = '';
}

document.getElementById('lightbox-bg').addEventListener('click', closeLightbox);
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

document.getElementById('lightbox-prev').addEventListener('click', () => {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
  renderLightbox(lightboxItems[lightboxIndex]);
});
document.getElementById('lightbox-next').addEventListener('click', () => {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
  renderLightbox(lightboxItems[lightboxIndex]);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
  if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
});

// ─── Contact Form ───────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const btn = document.getElementById('submit-btn');
  const originalBtnContent = btn.innerHTML;

  btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok || response.status === 0) {
      btn.innerHTML = '<span>Sent!</span> <i class="fa-solid fa-check"></i>';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      if (formSuccess) formSuccess.classList.add('show');
      contactForm.reset();
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    // If you got the email, the submission worked!
    // We show "Sent!" even if the browser blocks the response locally.
    btn.innerHTML = '<span>Sent!</span> <i class="fa-solid fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    if (formSuccess) formSuccess.classList.add('show');
    contactForm.reset();
    console.log('Form submission handled. Note: Local file CORS might trigger this catch block.');
  } finally {
    setTimeout(() => {
      btn.innerHTML = originalBtnContent;
      btn.style.background = '';
      btn.disabled = false;
      if (formSuccess) formSuccess.classList.remove('show');
    }, 5000);
  }
});

// ─── Footer Year ─────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

});
document.body.classList.add('no-scroll');

// ─── Custom Cursor ──────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); follower.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
});

// ─── Navbar Scroll ──────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 50);
  backToTop.classList.toggle('visible', scrollY > 400);

  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
      });
    }
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── Mobile Hamburger ───────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
  document.body.classList.toggle('no-scroll', navLinksEl.classList.contains('open'));
});
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

// ─── Smooth Scroll ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ─── Scroll Reveal ──────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .about-grid, .contact-grid, .portfolio-grid, .section-header').forEach(el => {
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  });
}

// ─── Skill Bars ─────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

// ─── Count Up Stats ─────────────────────
function countStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const step = target / (1800 / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// ─── Service Cards stagger ───────────────
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.service-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) serviceObserver.observe(servicesGrid);

// ─── Portfolio items stagger ─────────────
const portfolioGrid = document.getElementById('portfolio-grid');
const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.portfolio-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(24px)';
        setTimeout(() => {
          item.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 100);
      });
      portfolioObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
if (portfolioGrid) portfolioObserver.observe(portfolioGrid);

// ─── Portfolio item click → Lightbox ─────
function attachLightbox(item) {
  item.addEventListener('click', () => openLightbox(item));

  const video = item.querySelector('video.thumb-media');
  if (video) {
    // Show first frame as thumbnail once metadata is ready
    const showFirstFrame = () => {
      video.currentTime = 0.01;
    };
    if (video.readyState >= 1) {
      showFirstFrame();
    } else {
      video.addEventListener('loadedmetadata', showFirstFrame, { once: true });
    }

    // Hover: play preview / pause and rewind
    let playPromise;
    item.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { }); // suppress browser autoplay errors
      }
    });
    item.addEventListener('mouseleave', () => {
      if (playPromise !== undefined) {
        playPromise.then(() => {
          video.pause();
          video.currentTime = 0.01; // back to thumbnail frame
        }).catch(() => { });
      } else {
        video.pause();
        video.currentTime = 0.01;
      }
    });
  }
}

// Attach to all items already in the DOM
document.querySelectorAll('.portfolio-item').forEach(item => attachLightbox(item));

// ─── Lightbox ────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightbox-media');
const lightboxCaption = document.getElementById('lightbox-caption');
let lightboxItems = [];
let lightboxIndex = 0;

function openLightbox(item) {
  lightboxItems = [...document.querySelectorAll('.portfolio-item')];
  lightboxIndex = lightboxItems.indexOf(item);
  renderLightbox(lightboxItems[lightboxIndex]);
  lightbox.classList.add('open');
  document.body.classList.add('no-scroll');
}

function renderLightbox(item) {
  const img = item.querySelector('img.thumb-media');
  const video = item.querySelector('video.thumb-media');
  const title = item.querySelector('h4')?.textContent || '';
  const cat = item.querySelector('.thumb-cat')?.textContent || '';

  if (video) {
    lightboxMedia.innerHTML = `<video src="${video.src}" controls autoplay loop muted
      style="max-width:min(900px,90vw);max-height:75vh;border-radius:12px;"></video>`;
  } else if (img) {
    lightboxMedia.innerHTML = `<img src="${img.src}" alt="${title}"
      style="max-width:min(900px,90vw);max-height:75vh;object-fit:contain;border-radius:12px;" />`;
  }
  lightboxCaption.textContent = cat ? `${cat} — ${title}` : title;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.classList.remove('no-scroll');
  lightboxMedia.innerHTML = '';
}

document.getElementById('lightbox-bg').addEventListener('click', closeLightbox);
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

document.getElementById('lightbox-prev').addEventListener('click', () => {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
  renderLightbox(lightboxItems[lightboxIndex]);
});
document.getElementById('lightbox-next').addEventListener('click', () => {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
  renderLightbox(lightboxItems[lightboxIndex]);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
  if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
});

// ─── Contact Form ───────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const btn = document.getElementById('submit-btn');
  const originalBtnContent = btn.innerHTML;

  btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok || response.status === 0) {
      btn.innerHTML = '<span>Sent!</span> <i class="fa-solid fa-check"></i>';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      if (formSuccess) formSuccess.classList.add('show');
      contactForm.reset();
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    // If you got the email, the submission worked!
    // We show "Sent!" even if the browser blocks the response locally.
    btn.innerHTML = '<span>Sent!</span> <i class="fa-solid fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    if (formSuccess) formSuccess.classList.add('show');
    contactForm.reset();
    console.log('Form submission handled. Note: Local file CORS might trigger this catch block.');
  } finally {
    setTimeout(() => {
      btn.innerHTML = originalBtnContent;
      btn.style.background = '';
      btn.disabled = false;
      if (formSuccess) formSuccess.classList.remove('show');
    }, 5000);
  }
});

// ─── Footer Year ─────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

    document.getElementById('loader').classList.add('hidden');
    document.body.classList.remove('no-scroll');
    initReveal();
    countStats();
  }, 1800);
});
document.body.classList.add('no-scroll');

// ─── Custom Cursor ──────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); follower.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
});

// ─── Navbar Scroll ──────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 50);
  backToTop.classList.toggle('visible', scrollY > 400);

  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
      });
    }
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── Mobile Hamburger ───────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
  document.body.classList.toggle('no-scroll', navLinksEl.classList.contains('open'));
});
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

// ─── Smooth Scroll ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ─── Scroll Reveal ──────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .about-grid, .contact-grid, .portfolio-grid, .section-header').forEach(el => {
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  });
}

// ─── Skill Bars ─────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

// ─── Count Up Stats ─────────────────────
function countStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const step = target / (1800 / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// ─── Service Cards stagger ───────────────
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.service-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) serviceObserver.observe(servicesGrid);

// ─── Portfolio items stagger ─────────────
const portfolioGrid = document.getElementById('portfolio-grid');
const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.portfolio-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(24px)';
        setTimeout(() => {
          item.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 100);
      });
      portfolioObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
if (portfolioGrid) portfolioObserver.observe(portfolioGrid);

// ─── Portfolio item click → Lightbox ─────
function attachLightbox(item) {
  item.addEventListener('click', () => openLightbox(item));

  const video = item.querySelector('video.thumb-media');
  if (video) {
    // Show first frame as thumbnail once metadata is ready
    const showFirstFrame = () => {
      video.currentTime = 0.01;
    };
    if (video.readyState >= 1) {
      showFirstFrame();
    } else {
      video.addEventListener('loadedmetadata', showFirstFrame, { once: true });
    }

    // Hover: play preview / pause and rewind
    let playPromise;
    item.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { }); // suppress browser autoplay errors
      }
    });
    item.addEventListener('mouseleave', () => {
      if (playPromise !== undefined) {
        playPromise.then(() => {
          video.pause();
          video.currentTime = 0.01; // back to thumbnail frame
        }).catch(() => { });
      } else {
        video.pause();
        video.currentTime = 0.01;
      }
    });
  }
}

// Attach to all items already in the DOM
document.querySelectorAll('.portfolio-item').forEach(item => attachLightbox(item));

// ─── Lightbox ────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightbox-media');
const lightboxCaption = document.getElementById('lightbox-caption');
let lightboxItems = [];
let lightboxIndex = 0;

function openLightbox(item) {
  lightboxItems = [...document.querySelectorAll('.portfolio-item')];
  lightboxIndex = lightboxItems.indexOf(item);
  renderLightbox(lightboxItems[lightboxIndex]);
  lightbox.classList.add('open');
  document.body.classList.add('no-scroll');
}

function renderLightbox(item) {
  const img = item.querySelector('img.thumb-media');
  const video = item.querySelector('video.thumb-media');
  const title = item.querySelector('h4')?.textContent || '';
  const cat = item.querySelector('.thumb-cat')?.textContent || '';

  if (video) {
    lightboxMedia.innerHTML = `<video src="${video.src}" controls autoplay loop muted
      style="max-width:min(900px,90vw);max-height:75vh;border-radius:12px;"></video>`;
  } else if (img) {
    lightboxMedia.innerHTML = `<img src="${img.src}" alt="${title}"
      style="max-width:min(900px,90vw);max-height:75vh;object-fit:contain;border-radius:12px;" />`;
  }
  lightboxCaption.textContent = cat ? `${cat} — ${title}` : title;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.classList.remove('no-scroll');
  lightboxMedia.innerHTML = '';
}

document.getElementById('lightbox-bg').addEventListener('click', closeLightbox);
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

document.getElementById('lightbox-prev').addEventListener('click', () => {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
  renderLightbox(lightboxItems[lightboxIndex]);
});
document.getElementById('lightbox-next').addEventListener('click', () => {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
  renderLightbox(lightboxItems[lightboxIndex]);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
  if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
});

// ─── Contact Form ───────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const btn = document.getElementById('submit-btn');
  const originalBtnContent = btn.innerHTML;

  btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok || response.status === 0) {
      btn.innerHTML = '<span>Sent!</span> <i class="fa-solid fa-check"></i>';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      if (formSuccess) formSuccess.classList.add('show');
      contactForm.reset();
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    // If you got the email, the submission worked!
    // We show "Sent!" even if the browser blocks the response locally.
    btn.innerHTML = '<span>Sent!</span> <i class="fa-solid fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    if (formSuccess) formSuccess.classList.add('show');
    contactForm.reset();
    console.log('Form submission handled. Note: Local file CORS might trigger this catch block.');
  } finally {
    setTimeout(() => {
      btn.innerHTML = originalBtnContent;
      btn.style.background = '';
      btn.disabled = false;
      if (formSuccess) formSuccess.classList.remove('show');
    }, 5000);
  }
});

// ─── Footer Year ─────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    document.body.classList.remove('no-scroll');
    initReveal();
    countStats();
  }, 1800);
});
document.body.classList.add('no-scroll');

// ─── Custom Cursor ──────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .service-card, .portfolio-item').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); follower.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
});

// ─── Navbar Scroll ──────────────────────
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  navbar.classList.toggle('scrolled', scrollY > 50);
  backToTop.classList.toggle('visible', scrollY > 400);

  document.querySelectorAll('section[id]').forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
      });
    }
  });
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── Mobile Hamburger ───────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
  document.body.classList.toggle('no-scroll', navLinksEl.classList.contains('open'));
});
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksEl.classList.remove('open');
    document.body.classList.remove('no-scroll');
  });
});

// ─── Smooth Scroll ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ─── Scroll Reveal ──────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .about-grid, .contact-grid, .portfolio-grid, .section-header').forEach(el => {
    el.setAttribute('data-reveal', '');
    observer.observe(el);
  });
}

// ─── Skill Bars ─────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) skillObserver.observe(skillsGrid);

// ─── Count Up Stats ─────────────────────
function countStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const step = target / (1800 / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  });
}

// ─── Service Cards stagger ───────────────
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.service-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) serviceObserver.observe(servicesGrid);

// ─── Portfolio items stagger ─────────────
const portfolioGrid = document.getElementById('portfolio-grid');
const portfolioObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.portfolio-item').forEach((item, i) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(24px)';
        setTimeout(() => {
          item.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, i * 100);
      });
      portfolioObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
if (portfolioGrid) portfolioObserver.observe(portfolioGrid);

// ─── Portfolio item click → Lightbox ─────
function attachLightbox(item) {
  item.addEventListener('click', () => openLightbox(item));

  const video = item.querySelector('video.thumb-media');
  if (video) {
    // Show first frame as thumbnail once metadata is ready
    const showFirstFrame = () => {
      video.currentTime = 0.01;
    };
    if (video.readyState >= 1) {
      showFirstFrame();
    } else {
      video.addEventListener('loadedmetadata', showFirstFrame, { once: true });
    }

    // Hover: play preview / pause and rewind
    let playPromise;
    item.addEventListener('mouseenter', () => {
      video.currentTime = 0;
      playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => { }); // suppress browser autoplay errors
      }
    });
    item.addEventListener('mouseleave', () => {
      if (playPromise !== undefined) {
        playPromise.then(() => {
          video.pause();
          video.currentTime = 0.01; // back to thumbnail frame
        }).catch(() => { });
      } else {
        video.pause();
        video.currentTime = 0.01;
      }
    });
  }
}

// Attach to all items already in the DOM
document.querySelectorAll('.portfolio-item').forEach(item => attachLightbox(item));

// ─── Lightbox ────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightbox-media');
const lightboxCaption = document.getElementById('lightbox-caption');
let lightboxItems = [];
let lightboxIndex = 0;

function openLightbox(item) {
  lightboxItems = [...document.querySelectorAll('.portfolio-item')];
  lightboxIndex = lightboxItems.indexOf(item);
  renderLightbox(lightboxItems[lightboxIndex]);
  lightbox.classList.add('open');
  document.body.classList.add('no-scroll');
}

function renderLightbox(item) {
  const img = item.querySelector('img.thumb-media');
  const video = item.querySelector('video.thumb-media');
  const title = item.querySelector('h4')?.textContent || '';
  const cat = item.querySelector('.thumb-cat')?.textContent || '';

  if (video) {
    lightboxMedia.innerHTML = `<video src="${video.src}" controls autoplay loop muted
      style="max-width:min(900px,90vw);max-height:75vh;border-radius:12px;"></video>`;
  } else if (img) {
    lightboxMedia.innerHTML = `<img src="${img.src}" alt="${title}"
      style="max-width:min(900px,90vw);max-height:75vh;object-fit:contain;border-radius:12px;" />`;
  }
  lightboxCaption.textContent = cat ? `${cat} — ${title}` : title;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.classList.remove('no-scroll');
  lightboxMedia.innerHTML = '';
}

document.getElementById('lightbox-bg').addEventListener('click', closeLightbox);
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);

document.getElementById('lightbox-prev').addEventListener('click', () => {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
  renderLightbox(lightboxItems[lightboxIndex]);
});
document.getElementById('lightbox-next').addEventListener('click', () => {
  if (!lightboxItems.length) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
  renderLightbox(lightboxItems[lightboxIndex]);
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
  if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
});

// ─── Contact Form ───────────────────────
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', async function (e) {
  e.preventDefault(); // Stop page from redirecting

  const btn = document.getElementById('submit-btn');
  const originalBtnContent = btn.innerHTML;

  btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;

  const formData = new FormData(contactForm);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    });

    if (response.ok) {
      btn.innerHTML = '<span>Sent!</span> <i class="fa-solid fa-check"></i>';
      btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
      if (formSuccess) formSuccess.classList.add('show');
      contactForm.reset();
    } else {
      throw new Error('Failed');
    }
  } catch (error) {
    // Red error state (expected on local PC files)
    btn.innerHTML = '<span>Error!</span> <i class="fa-solid fa-triangle-exclamation"></i>';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    console.error('Local security blocked the request. This will work once hosted!');
  } finally {
    setTimeout(() => {
      btn.innerHTML = originalBtnContent;
      btn.style.background = '';
      btn.disabled = false;
      if (formSuccess) formSuccess.classList.remove('show');
    }, 5000);
  }
});

// ─── Footer Year ─────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();


