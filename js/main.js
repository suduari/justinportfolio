/* ============================================
   JUSTIN S. PORCINCULA — Portfolio Scripts
   ============================================ */

/* ---- Active Nav Highlight ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        const active = a.getAttribute('href') === '#' + entry.target.id;
        a.style.color      = active ? 'var(--pixel-green)' : '';
        a.style.textShadow = active ? '0 0 8px var(--pixel-green)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));


/* ---- Typing Effect (hero subtitle) ---- */
const sub      = document.querySelector('.hero-sub');
const fullText = sub.textContent;
sub.textContent = '';
let i = 0;
const typeInterval = setInterval(() => {
  sub.textContent += fullText[i];
  i++;
  if (i >= fullText.length) clearInterval(typeInterval);
}, 40);


/* ---- Gallery Filter ---- */
let galleryMainFilter = 'all';
let psCategoryFilter = 'all';

function applyGalleryFilter() {
  document.querySelectorAll('.gallery-item').forEach(item => {
    const itemType = item.dataset.type;
    let show = false;

    if (galleryMainFilter === 'all') {
      show = true;
    } else if (galleryMainFilter === 'ps') {
      if (itemType === 'ps') {
        show = psCategoryFilter === 'all' || item.dataset.category === psCategoryFilter;
      }
    } else if (galleryMainFilter === 'ai') {
      show = itemType === 'ai';
    }

    item.classList.toggle('hidden', !show);
  });
}

function setMainTabActive(type, btn) {
  document.querySelectorAll('.gallery-tab').forEach(t => {
    t.classList.remove('active-all', 'active-ps', 'active-ai');
  });
  const cls = type === 'all' ? 'active-all' : type === 'ps' ? 'active-ps' : 'active-ai';
  btn.classList.add(cls);
}

function setPsSubtabActive(category, btn) {
  document.querySelectorAll('.gallery-subtab').forEach(t => {
    t.classList.remove('active-ps-sub');
  });
  btn.classList.add('active-ps-sub');
}

function filterGallery(type, btn) {
  galleryMainFilter = type;
  const psSubtabs = document.getElementById('psSubtabs');

  if (type === 'ps') {
    psCategoryFilter = 'all';
    psSubtabs.hidden = false;
    const allSubBtn = psSubtabs.querySelector('.gallery-subtab');
    setPsSubtabActive('all', allSubBtn);
  } else {
    psSubtabs.hidden = true;
    psCategoryFilter = 'all';
  }

  setMainTabActive(type, btn);
  applyGalleryFilter();
}

function filterPsCategory(category, btn) {
  psCategoryFilter = category;
  setPsSubtabActive(category, btn);
  applyGalleryFilter();
}


/* ---- Lightbox ---- */
function openLightbox(card) {
  const lb     = document.getElementById('lightbox');
  const title  = card.querySelector('.gallery-caption-title').textContent;
  const img    = card.querySelector('img');
  const lbImg  = document.getElementById('lightboxImg');
  const lbPh   = document.getElementById('lbPlaceholder');

  document.getElementById('lightboxTitle').textContent = title;

  if (img) {
    lbImg.src   = img.src;
    lbImg.alt   = img.alt;
    lbImg.style.display = 'block';
    lbPh.style.display  = 'none';
  } else {
    lbImg.style.display = 'none';
    lbPh.style.display  = 'flex';
  }

  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  const lb = document.getElementById('lightbox');
  if (!e || e.target === lb || e.target.classList.contains('lightbox-close')) {
    lb.classList.remove('open');
    const certOpen = document.getElementById('certModal').classList.contains('open');
    if (!certOpen) document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const certModal = document.getElementById('certModal');
  const lightbox  = document.getElementById('lightbox');
  if (lightbox.classList.contains('open')) {
    closeLightbox({ target: lightbox });
  } else if (certModal.classList.contains('open')) {
    closeCertificates();
  }
});


/* ---- Certificates ---- */
function openCertificates() {
  document.getElementById('certModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertificates(e) {
  const modal = document.getElementById('certModal');
  if (e && e.target !== modal && !e.target.classList.contains('cert-modal-close')) return;
  modal.classList.remove('open');
  if (!document.getElementById('lightbox').classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

function openCertificateView(btn) {
  const src   = btn.dataset.src;
  const title = btn.dataset.title;
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbPh  = document.getElementById('lbPlaceholder');

  document.getElementById('lightboxTitle').textContent = title;
  lbImg.src = src;
  lbImg.alt = title;
  lbImg.style.display = 'block';
  lbPh.style.display  = 'none';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
