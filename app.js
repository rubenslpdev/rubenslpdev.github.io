//////////////////////////////////////////////
// Mudar a cor do background conforme o scroll
//////////////////////////////////////////////
window.addEventListener('scroll', () => {
  // Seletores
  const body = document.body;
  const panels = document.querySelectorAll('.panel');

  // Calcula a posição de scroll ajustada
  const scroll = window.scrollY + window.innerHeight / 2;

  panels.forEach((panel) => {
    const panelTop = panel.offsetTop;
    const panelBottom = panelTop + panel.offsetHeight;

    // Verifica se o scroll está dentro da área do painel
    if (panelTop <= scroll && panelBottom > scroll) {
      // Remove todas as classes "color-" do body
      body.className = body.className.replace(/\bcolor-\S+/g, '');

      // Adiciona a classe correspondente ao painel atual
      const colorClass = `color-${panel.dataset.color}`;
      body.classList.add(colorClass);
    }
  });
});

// Executa o código uma vez ao carregar a página para aplicar a cor inicial
window.dispatchEvent(new Event('scroll'));

/////////////////////////////////////////
// Mostrar os títulos e iniciar animação
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card-animate');
  const headers = document.querySelectorAll('.header-container');

  // Configurações e função do Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Lógica para '.card-animate'
          if (entry.target.classList.contains('card-animate')) {
            entry.target.classList.add('is-visible');
          }

          // Lógica para '.header-container'
          if (entry.target.classList.contains('header-container')) {
            const svgPaths = entry.target.querySelectorAll('svg path');
            svgPaths.forEach((path) => (path.style.animationPlayState = 'running'));
          }

          // Para observar apenas uma vez
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5, // Ajustar para 0.5 se necessário
    }
  );

  // Configura a animação inicial dos headers para 'paused'
  headers.forEach((header) => {
    const svgPaths = header.querySelectorAll('svg path');
    svgPaths.forEach((path) => {
      path.style.animationPlayState = 'paused';
    });
  });

  // Observa todos os elementos
  [...cards, ...headers].forEach((element) => {
    observer.observe(element);
  });
});

/////////////////////////////////////////
// Hidden text
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.collapsible');
  const hiddenContent = document.querySelector('.hidden-content');

  toggleButton.addEventListener('click', () => {
    if (hiddenContent.style.maxHeight) {
      hiddenContent.style.maxHeight = null; // Oculta o conteúdo
    } else {
      hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px'; // Mostra o conteúdo
      toggleButton.style.display = 'none'; // Esconde o botão
    }
  });
});

/////////////////////////////////////////
// Ver mais trabalhos recentes
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const loadMoreBtn = document.querySelector('.works-more-btn');
  if (!loadMoreBtn) return;

  const container = loadMoreBtn.closest('.section-container');
  const allCards = [...container.querySelectorAll('.cards-container .card')];
  const getHiddenCards = () => allCards.filter((card) => card.classList.contains('card--hidden'));

  // Normaliza o estado inicial: os 4 primeiros cards sempre visíveis,
  // independentemente da ordem em que foram escritos no HTML
  allCards.forEach((card) => card.classList.remove('card--hidden', 'card--revealed'));
  allCards.slice(4).forEach((card) => card.classList.add('card--hidden'));

  const updateButtonVisibility = () => {
    loadMoreBtn.closest('.works-more').style.display = getHiddenCards().length ? 'flex' : 'none';
  };

  updateButtonVisibility();

  loadMoreBtn.addEventListener('click', () => {
    // Revela os próximos 4 cards, mantendo o botão enquanto houver mais
    getHiddenCards()
      .slice(0, 4)
      .forEach((card) => {
        card.classList.remove('card--hidden');
        card.classList.add('card--revealed');
      });

    updateButtonVisibility();
  });
});

/////////////////////////////////////////
// Dynamic copyright date
/////////////////////////////////////////
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

/////////////////////////////////////////
// Gallery cards carousel, zoom and slider
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = modal ? modal.querySelector('.modal-image') : null;

  const openModal = (image) => {
    if (!modal || !modalImg) return;
    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modal.classList.add('active');
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    if (modalImg) modalImg.removeAttribute('src');
  };

  // Initialize all sliders
  document.querySelectorAll('.image-slider').forEach((slider) => {
    const slides = slider.querySelector('.slider-images');
    if (!slides) return;

    const images = [...slides.querySelectorAll('img')];
    if (!images.length) return;

    const totalSlides = images.length;
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let currentSlide = 0;

    const updateSlider = () => {
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    // Só inicializa as setas quando existem e há mais de uma imagem
    if (prevBtn && totalSlides > 1) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
      });
    }

    if (nextBtn && totalSlides > 1) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      });
    }

    // O ícone de zoom é apenas uma referência visual
    slider.querySelectorAll('.zoom-btn').forEach((btn) => {
      btn.setAttribute('tabindex', '-1');
      btn.setAttribute('aria-hidden', 'true');
    });

    // Clicar na imagem expande a respectiva imagem
    images.forEach((image) => {
      image.tabIndex = 0;
      image.setAttribute('role', 'button');

      image.addEventListener('click', () => openModal(image));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal(image);
        }
      });
    });
  });

  if (!modal) return;

  // O botão de fechar é apenas uma referência visual
  const modalClose = modal.querySelector('.modal-close');
  if (modalClose) {
    modalClose.setAttribute('tabindex', '-1');
    modalClose.setAttribute('aria-hidden', 'true');
  }

  // Clicar em qualquer lugar do modal fecha a imagem
  modal.addEventListener('click', closeModal);

  // Fecha também com a tecla Esc
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});

/////////////////////////////////////////
// Botão flutuante de contato
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const floatingContact = document.getElementById('floatingContact');
  const contactSection = document.querySelector('.panel[data-color="green"]');
  const panels = document.querySelectorAll('.panel');

  if (!floatingContact || !contactSection) return;

  // Mostra o botão apenas quando a seção em foco não for a de contato
  const updateFloatingContact = () => {
    const scroll = window.scrollY + window.innerHeight / 2;
    let activePanel = null;

    panels.forEach((panel) => {
      const panelTop = panel.offsetTop;
      const panelBottom = panelTop + panel.offsetHeight;

      if (panelTop <= scroll && panelBottom > scroll) {
        activePanel = panel;
      }
    });

    floatingContact.classList.toggle('is-hidden', activePanel === contactSection);
  };

  window.addEventListener('scroll', updateFloatingContact);
  updateFloatingContact();

  // Rola suavemente até o contato
  floatingContact.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

/////////////////////////////////////////
// Copiar o e-mail para o clipboard
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const copyBtn = document.querySelector('.contact-copy-btn');
  if (!copyBtn) return;

  const label = copyBtn.querySelector('.contact-copy-label');
  const email = copyBtn.dataset.email;
  const defaultLabel = label.textContent;
  const copiedLabel = copyBtn.dataset.copiedLabel || defaultLabel;
  let resetTimer;

  const copyToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // Fallback para contextos sem a Clipboard API (ex.: file://)
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();

    if (!copied) throw new Error('Copy command failed');
  };

  copyBtn.addEventListener('click', async () => {
    try {
      await copyToClipboard(email);
    } catch (error) {
      return;
    }

    copyBtn.classList.add('is-copied');
    label.textContent = copiedLabel;

    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copyBtn.classList.remove('is-copied');
      label.textContent = defaultLabel;
    }, 1600);
  });
});
