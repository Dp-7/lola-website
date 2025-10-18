document.addEventListener('DOMContentLoaded', () => {
  // Utility selectors
  const q = (selector) => document.querySelector(selector);
  const qa = (selector) => document.querySelectorAll(selector);

  // Mobile navigation toggle
  const navToggle = q('#navToggle');
  const mainNav = q('.nav');
  navToggle?.addEventListener('click', () => {
    mainNav.style.display = mainNav.style.display === 'flex' ? '' : 'flex';
  });

  // Lightbox functionality for portfolio
  const lightbox = q('#lightbox');
  const lightboxImg = q('.lightbox-img');
  const lightboxClose = q('.lightbox-close');
  const portfolioItems = qa('.portfolio-item');

  portfolioItems.forEach(item => {
    const openLightbox = () => {
      const src = item.querySelector('img').src;
      if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    };
    item.addEventListener('click', openLightbox);
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter') openLightbox(); });
  });

  const closeLightbox = () => {
    if (lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  // Booking form submit with EmailJS
  const bookingForm = q('#bookingForm');
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // --- IMPORTANT: Replace with your actual EmailJS details ---
    const serviceID = 'service_j6kud69';
    const templateID = 'template_uu3ekge';
    const userID = 'ySovE-RPs6UgJTE3u';
    // ---------------------------------------------------------

    emailjs.sendForm(serviceID, templateID, bookingForm, userID)
      .then(() => {
        alert('Thank you! Your booking request has been sent successfully. We will contact you shortly.');
        bookingForm.reset();
      }, (err) => {
        alert('Oops! Something went wrong. Please try again.\n' + JSON.stringify(err));
      });
  });

  // Footer year
  const yearSpan = q('#year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Smooth scrolling for internal links (if you add any)
  qa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href.length > 1 && q(href)) {
        e.preventDefault();
        q(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav when clicking a link
        if (window.innerWidth < 768 && mainNav) mainNav.style.display = '';
      }
    });
  });

  // Accessibility: close lightbox with Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
      closeLightbox();
    }
  });
});