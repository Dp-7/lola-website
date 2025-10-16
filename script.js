// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click', () => nav.classList.toggle('active'));

// Set current year
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;
});

// EmailJS setup
const serviceID = 'service_j6kud69';
const templateID = 'template_uu3ekge';
const publicKey = 'ySovE-RPs6UgJTE3u';

window.initEmailJS = function(){
  try{
    if(window.emailjs){
      emailjs.init(publicKey);
    }
  } catch(e){console.warn('EmailJS init failed', e);}
}

if(window.emailjs){initEmailJS();}
else{window.addEventListener('emailjs.loaded', initEmailJS);}

// Booking form submit
const bookingForm = document.getElementById('bookingForm');
if(bookingForm){
  bookingForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = {
      fullname: bookingForm.fullname.value.trim(),
      phone: bookingForm.phone.value.trim(),
      email: bookingForm.email.value.trim(),
      service: bookingForm.service.value,
      date: bookingForm.date.value,
      time: bookingForm.time.value,
      notes: bookingForm.notes.value.trim()
    };
    if(!data.fullname || !data.phone || !data.email || !data.service || !data.date || !data.time){
      alert('Please complete all required fields.');
      return;
    }
    const templateParams = {
      to_name: 'LolaLux',
      from_name: data.fullname,
      from_email: data.email,
      phone: data.phone,
      service: data.service,
      date: data.date,
      time: data.time,
      notes: data.notes
    };
    if(window.emailjs && serviceID && templateID){
      emailjs.send(serviceID, templateID, templateParams)
        .then(()=>{
          alert('Booking request sent! We will contact you shortly.');
          bookingForm.reset();
        }, (err)=>{
          console.error('EmailJS error:', err);
          alert('Error sending request. Try again or email hello@lolaluxexperience.com');
        });
    } else { alert('EmailJS credentials missing.'); }
  });
}

// Lightbox for portfolio
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;
const portfolioItems = document.querySelectorAll('.portfolio-item img');
const images = Array.from(portfolioItems).map(img=>img.src);

function openLightbox(index){
  currentIndex = index;
  lightboxImg.src = images[currentIndex];
  lightbox.style.display = 'flex';
}
function closeLightbox(){ lightbox.style.display = 'none'; }
function showNext(){ currentIndex=(currentIndex+1)%images.length; lightboxImg.src=images[currentIndex]; }
function showPrev(){ currentIndex=(currentIndex-1+images.length)%images.length; lightboxImg.src=images[currentIndex]; }

portfolioItems.forEach((img, idx)=>{ img.addEventListener('click', ()=>openLightbox(idx)); });
lightboxClose.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLightbox(); });
document.addEventListener('keydown', e=>{
  if(lightbox.style.display==='flex'){
    if(e.key==='ArrowRight') showNext();
    if(e.key==='ArrowLeft') showPrev();
    if(e.key==='Escape') closeLightbox();
  }
});
