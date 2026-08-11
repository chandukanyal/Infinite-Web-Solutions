/**
 * Infinite Web Solutions - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Navigation Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });

    const closeMobileMenu = () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    };

    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Header Scroll Effect & Active Section Indicator
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow background change
    if (window.scrollY > 40) {
      header.classList.add('py-3', 'shadow-2xl', 'shadow-purple-950/20');
      header.classList.remove('py-5');
    } else {
      header.classList.add('py-5');
      header.classList.remove('py-3', 'shadow-2xl', 'shadow-purple-950/20');
    }

    // ScrollSpy for Nav Links
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-purple-400', 'font-semibold');
      link.classList.add('text-gray-300');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-purple-400', 'font-semibold');
        link.classList.remove('text-gray-300');
      }
    });
  });

  // Contact Form Handling & Validation
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const projectType = document.getElementById('form-project');
      const messageInput = document.getElementById('form-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      // Basic validation
      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Simulate loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending Request...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        showFormMessage('Thank you! Your project query has been received. Our team will reach out to you within 24 hours.', 'success');
        contactForm.reset();
      }, 1500);
    });
  }

  function showFormMessage(msg, type) {
    if (!formStatus) return;
    formStatus.classList.remove('hidden', 'bg-red-500/20', 'text-red-300', 'border-red-500/30', 'bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/30');
    
    if (type === 'error') {
      formStatus.classList.add('bg-red-500/20', 'text-red-300', 'border', 'border-red-500/30');
    } else {
      formStatus.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border', 'border-emerald-500/30');
    }
    
    formStatus.innerHTML = msg;
    
    setTimeout(() => {
      formStatus.classList.add('hidden');
    }, 6000);
  }

  // Portfolio Modal Preview Trigger
  const modal = document.getElementById('project-modal');
  const modalImage = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTags = document.getElementById('modal-tags');
  const closeModal = document.getElementById('close-modal');

  const portfolioData = {
    '1': {
      title: 'E-Commerce Rebrand & Digital Storefront',
      desc: 'Complete digital makeover for a luxury brand including a psychology-driven UX workflow, custom Python/Django backend architecture, ultra-fast dynamic catalog rendering, and streamlined multi-currency checkout integration.',
      tags: ['E-Commerce', 'Python/Django', 'UI/UX Redesign', 'Stripe Integration'],
      img: 'assets/images/portfolio-ecommerce.png'
    },
    '2': {
      title: 'Secure Web Architecture & Enterprise SaaS',
      desc: 'High-performance cloud architecture engineered with Python, Flask, and PostgreSQL. Built for high-frequency user concurrency, real-time data visual telemetry, and strict military-grade access control security.',
      tags: ['Python / Flask', 'Enterprise SaaS', 'Cybersecurity', 'REST API Architecture'],
      img: 'assets/images/portfolio-secure-platform.png'
    },
    '3': {
      title: 'AI-Driven Visual & Brand Identity Suite',
      desc: 'A comprehensive brand identity overhaul leveraging generative AI design tools, custom typography systems, multi-platform banner design, and custom digital asset guidelines for global digital campaigns.',
      tags: ['AI Asset Creation', 'Brand Identity', 'Graphic Design', 'Video Production'],
      img: 'assets/images/portfolio-brand-identity.png'
    }
  };

  const projectCards = document.querySelectorAll('.portfolio-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const item = portfolioData[id];
      if (item && modal) {
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.desc;
        modalImage.src = item.img;
        
        modalTags.innerHTML = item.tags.map(tag => 
          `<span class="px-3 py-1 text-xs font-medium rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30">${tag}</span>`
        ).join('');
        
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  }
});
