document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#mainNav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item button').forEach(button => {
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('active');
        const otherButton = other.querySelector('button');
        if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Animated counters — start only when the stats section enters the screen
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target || 0);
    const suffix = counter.dataset.suffix || '';
    const duration = 1600;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      counter.textContent = value.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString() + suffix;
      }
    };

    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(animateCounter);
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.35 });

    const stats = document.querySelector('.stats');
    if (stats) statsObserver.observe(stats);
  } else {
    counters.forEach(animateCounter);
  }

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // Current year
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
});

  // Simple predefined chatbot
  const chatbotLauncher = document.querySelector('#chatbotLauncher');
  const chatbotPanel = document.querySelector('#chatbotPanel');
  const chatbotMinimize = document.querySelector('#chatbotMinimize');
  const chatbotBody = document.querySelector('#chatbotBody');
  const chatbotOptions = document.querySelector('#chatbotOptions');

  const chatbotReplies = {
    products: {
      text: 'We manufacture and supply Medical & Hospital products, School & College products, Corporate & Office files, and Corporate Gifts.',
      options: [
        ['🏥 Medical & Hospital', 'pages/medical.html'],
        ['🎓 Schools & Colleges', 'pages/schools.html'],
        ['💼 Corporate & Office', 'pages/corporate.html'],
        ['🎁 Corporate Gifts', 'pages/corporate-gifts.html'],
        ['💬 Ask about a product on WhatsApp', 'https://wa.me/919884404660?text=Hello%20Abu%20Files%20%26%20Stationery%2C%20I%20would%20like%20to%20ask%20about%20a%20product.']
      ]
    },
    bulk: {
      text: 'Yes. We accept bulk requirements. Please share the product, quantity and specifications with our team.',
      options: [['📦 Discuss a bulk order on WhatsApp', 'https://wa.me/919884404660?text=Hello%20Abu%20Files%20%26%20Stationery%2C%20I%20have%20a%20bulk%20order%20requirement.']]
    },
    custom: {
      text: 'Yes. We can discuss size, material, colour, design, printing, logo, pages, internal layout and other specifications.',
      options: [['🎨 Send customization requirement', 'https://wa.me/919884404660?text=Hello%20Abu%20Files%20%26%20Stationery%2C%20I%20have%20a%20customization%20requirement.']]
    },
    contact: {
      text: '📍 45, Malayaperumal Street, Opposite to BSNL Office, Parrys, Chennai, Tamil Nadu 600001.<br><br>📞 +91 98844 04660<br><br>We supply customers across Tamil Nadu.',
      options: [
        ['📍 Open location in Google Maps', 'https://maps.google.com/?q=45%20Malayaperumal%20Street%20Parrys%20Chennai%20600001'],
        ['📞 Call +91 98844 04660', 'tel:+919884404660']
      ]
    },
    whatsapp: {
      text: 'You can contact Abu Files &amp; Stationery directly on WhatsApp for product enquiries, bulk orders and customization.',
      options: [
        ['💬 Chat with us on WhatsApp', 'https://wa.me/919884404660'],
        ['🛍️ Open WhatsApp Catalogue', 'https://wa.me/c/919884404660']
      ]
    }
  };

  const openChatbot = () => {
    if (!chatbotPanel || !chatbotLauncher) return;
    chatbotPanel.classList.add('open');
    chatbotLauncher.classList.add('open');
    chatbotLauncher.setAttribute('aria-expanded', 'true');
    chatbotPanel.setAttribute('aria-hidden', 'false');
  };

  const closeChatbot = () => {
    if (!chatbotPanel || !chatbotLauncher) return;
    chatbotPanel.classList.remove('open');
    chatbotLauncher.classList.remove('open');
    chatbotLauncher.setAttribute('aria-expanded', 'false');
    chatbotPanel.setAttribute('aria-hidden', 'true');
  };

  const resetChatbot = () => {
    if (!chatbotBody) return;
    chatbotBody.innerHTML = `
      <div class="chatbot-message">Hello! 👋 Welcome to <strong>Abu Files &amp; Stationery</strong>. How can we help you today?</div>
      <div class="chatbot-options" id="chatbotOptions">
        <button class="chatbot-option" data-chat="products" type="button">📁 Product enquiries</button>
        <button class="chatbot-option" data-chat="bulk" type="button">📦 Bulk orders</button>
        <button class="chatbot-option" data-chat="custom" type="button">🎨 Customization enquiries</button>
        <button class="chatbot-option" data-chat="contact" type="button">📍 Shop address &amp; contact details</button>
        <button class="chatbot-option" data-chat="whatsapp" type="button">💬 Connect on WhatsApp</button>
      </div>`;
    bindChatbotOptions();
  };

  const showChatbotReply = (key) => {
    const reply = chatbotReplies[key];
    if (!reply || !chatbotBody) return;

    const message = document.createElement('div');
    message.className = 'chatbot-message';
    message.innerHTML = reply.text;

    const options = document.createElement('div');
    options.className = 'chatbot-options';

    reply.options.forEach(([label, href]) => {
      const link = document.createElement('a');
      link.className = 'chatbot-option';
      link.textContent = label;
      const internalPrefix = window.location.pathname.includes('/pages/') ? '../' : '';
      link.href = href.startsWith('pages/') ? internalPrefix + href : href;
      if (/^https?:\/\//.test(href)) {
        link.target = '_blank';
        link.rel = 'noopener';
      }
      options.appendChild(link);
    });

    const back = document.createElement('button');
    back.className = 'chatbot-option';
    back.type = 'button';
    back.textContent = '↩ Back to main options';
    back.addEventListener('click', resetChatbot);
    options.appendChild(back);

    chatbotBody.innerHTML = '';
    chatbotBody.appendChild(message);
    chatbotBody.appendChild(options);
    chatbotBody.scrollTop = 0;
  };

  function bindChatbotOptions() {
    document.querySelectorAll('#chatbotOptions [data-chat]').forEach(button => {
      button.addEventListener('click', () => showChatbotReply(button.dataset.chat));
    });
  }

  if (chatbotLauncher && chatbotPanel) {
    chatbotLauncher.addEventListener('click', () => {
      if (chatbotPanel.classList.contains('open')) closeChatbot();
      else openChatbot();
    });
    chatbotMinimize?.addEventListener('click', closeChatbot);
    bindChatbotOptions();
  }

