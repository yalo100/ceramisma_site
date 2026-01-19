const SITE_CONFIG = {
  companyName: 'Ceramisma',
  phone: '+212661285876',
  whatsapp: '+212661285876',
  address: 'Zone industrielle, adresse à compléter.',
  email: 'contact@ceramisma.ma',
  hours: 'Lun - Sam : 08h30 - 18h30',
  aboutText:
    'Importateur engagé, Ceramisma accompagne les professionnels avec un sourcing rigoureux, un stock maîtrisé et un service après-vente fiable.',
  social: {
    linkedin: 'https://www.linkedin.com',
    instagram: 'https://www.instagram.com',
    facebook: 'https://www.facebook.com'
  }
};

const CATEGORY_DETAILS = {
  'carrelage-sol': {
    title: 'Carrelage sol',
    description: 'Carrelage haute résistance pour zones à fort passage et projets premium.',
    items: ['Formats XXL', 'Antidérapant R10/R11', 'Effets pierre, béton, marbre']
  },
  'carrelage-mural': {
    title: 'Carrelage mural',
    description: 'Solutions décoratives pour cuisines, salles de bain et espaces commerciaux.',
    items: ['Reliefs 3D', 'Couleurs tendance', 'Pose facile et durable']
  },
  plinthes: {
    title: 'Plinthes / habillage',
    description: 'Finitions coordonnées pour une continuité esthétique parfaite.',
    items: ['Plinthes grand format', 'Habillages muraux', 'Accessoires de finition']
  },
  sanitaires: {
    title: 'Sanitaires',
    description: 'Équipements sanitaires fiables et design pour projets résidentiels et hôteliers.',
    items: ['Vasques design', 'Receveurs extra-plats', 'WC suspendus']
  },
  robinetterie: {
    title: 'Robinetterie',
    description: 'Robinetterie haut de gamme pour salles de bain et cuisines contemporaines.',
    items: ['Finitions chrome et noir mat', 'Mitigeurs thermostatiques', 'Économies d’eau']
  },
  accessoires: {
    title: 'Accessoires',
    description: 'Tout le nécessaire pour une pose durable et conforme.',
    items: ['Colles flexibles', 'Joints hydrofuges', 'Profilés aluminium']
  }
};

const elements = {
  navToggle: document.querySelector('.nav-toggle'),
  navMenu: document.querySelector('.nav-menu'),
  modal: document.getElementById('categoryModal'),
  modalTitle: document.getElementById('modalTitle'),
  modalDescription: document.getElementById('modalDescription'),
  modalList: document.getElementById('modalList'),
  modalClose: document.querySelector('.modal-close'),
  filterButtons: document.querySelectorAll('.filter-btn'),
  collectionCards: document.querySelectorAll('[data-tags]'),
  searchInput: document.getElementById('searchInput'),
  lightbox: document.getElementById('lightbox'),
  lightboxImage: document.getElementById('lightboxImage'),
  lightboxClose: document.querySelector('.lightbox-close'),
  contactForm: document.getElementById('contactForm'),
  formMessage: document.querySelector('.form-message')
};

const sanitizePhone = (phone) => phone.replace(/\D/g, '');

const applyConfig = () => {
  document.querySelectorAll('[data-company]').forEach((el) => {
    el.textContent = SITE_CONFIG.companyName;
  });

  document.querySelectorAll('[data-phone]').forEach((el) => {
    el.textContent = SITE_CONFIG.phone;
    el.setAttribute('href', `tel:${SITE_CONFIG.phone}`);
  });

  document.querySelectorAll('[data-email]').forEach((el) => {
    el.textContent = SITE_CONFIG.email;
    el.setAttribute('href', `mailto:${SITE_CONFIG.email}`);
  });

  document.querySelectorAll('[data-address]').forEach((el) => {
    el.textContent = SITE_CONFIG.address;
  });

  document.querySelectorAll('[data-hours]').forEach((el) => {
    el.textContent = SITE_CONFIG.hours;
  });

  document.querySelectorAll('[data-about]').forEach((el) => {
    el.textContent = SITE_CONFIG.aboutText;
  });

  document.querySelectorAll('[data-social]').forEach((el) => {
    const platform = el.dataset.social;
    if (SITE_CONFIG.social[platform]) {
      el.setAttribute('href', SITE_CONFIG.social[platform]);
    }
  });

  const whatsappLink = `https://wa.me/${sanitizePhone(SITE_CONFIG.whatsapp)}`;
  document.querySelectorAll('[data-whatsapp]').forEach((el) => {
    el.setAttribute('href', whatsappLink);
  });
};

const setupNav = () => {
  if (!elements.navToggle || !elements.navMenu) return;
  elements.navToggle.addEventListener('click', () => {
    const isOpen = elements.navMenu.classList.toggle('is-open');
    elements.navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
};

const setupModal = () => {
  const categoryButtons = document.querySelectorAll('[data-category]');

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.category;
      const data = CATEGORY_DETAILS[key];
      if (!data) return;
      elements.modalTitle.textContent = data.title;
      elements.modalDescription.textContent = data.description;
      elements.modalList.innerHTML = '';
      data.items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        elements.modalList.appendChild(li);
      });
      elements.modal.classList.add('is-open');
      elements.modal.setAttribute('aria-hidden', 'false');
    });
  });

  const closeModal = () => {
    elements.modal.classList.remove('is-open');
    elements.modal.setAttribute('aria-hidden', 'true');
  };

  elements.modal.addEventListener('click', (event) => {
    if (event.target === elements.modal) closeModal();
  });

  elements.modalClose.addEventListener('click', closeModal);
};

const setupFilters = () => {
  const applyFilters = () => {
    const activeFilter = document.querySelector('.filter-btn.is-active')?.dataset.filter || 'all';
    const query = elements.searchInput.value.trim().toLowerCase();

    elements.collectionCards.forEach((card) => {
      const tags = card.dataset.tags;
      const name = card.dataset.name.toLowerCase();
      const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
      const matchesSearch = name.includes(query);
      card.style.display = matchesFilter && matchesSearch ? 'block' : 'none';
    });
  };

  elements.filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      elements.filterButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      applyFilters();
    });
  });

  elements.searchInput.addEventListener('input', applyFilters);
};

const setupLightbox = () => {
  document.querySelectorAll('[data-lightbox]').forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.dataset.lightbox;
      elements.lightboxImage.setAttribute('src', src);
      elements.lightbox.classList.add('is-open');
      elements.lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  const closeLightbox = () => {
    elements.lightbox.classList.remove('is-open');
    elements.lightbox.setAttribute('aria-hidden', 'true');
  };

  elements.lightbox.addEventListener('click', (event) => {
    if (event.target === elements.lightbox) closeLightbox();
  });

  elements.lightboxClose.addEventListener('click', closeLightbox);
};

const setupReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
};

const setupForm = () => {
  elements.contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(elements.contactForm);
    const isValid = Array.from(formData.values()).every((value) => value.toString().trim().length > 0);

    if (!isValid) {
      elements.formMessage.textContent = 'Merci de remplir tous les champs requis.';
      return;
    }

    elements.formMessage.textContent = 'Merci ! Votre message a bien été envoyé.';
    elements.contactForm.reset();
  });
};

const setupYear = () => {
  document.getElementById('year').textContent = new Date().getFullYear();
};

applyConfig();
setupNav();
setupModal();
setupFilters();
setupLightbox();
setupReveal();
setupForm();
setupYear();
