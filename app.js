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
// Dynamic copyright date
/////////////////////////////////////////
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

/////////////////////////////////////////
// Gallery cards carousel, zoom and slider
/////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all sliders
  document.querySelectorAll('.image-slider').forEach((slider) => {
    let currentSlide = 0;
    const slides = slider.querySelector('.slider-images');
    const totalSlides = slides.children.length;

    // Previous button click
    slider.querySelector('.prev').addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });

    // Next button click
    slider.querySelector('.next').addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });

    // Zoom button click
    slider.querySelector('.zoom-btn').addEventListener('click', () => {
      const modal = document.getElementById('imageModal');
      const modalImg = modal.querySelector('.modal-image');
      const currentImage = slides.children[currentSlide].src;

      modalImg.src = currentImage;
      modal.classList.add('active');
    });

    function updateSlider() {
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  });

  // Modal close button
  document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('imageModal').classList.remove('active');
  });

  // Close modal when clicking outside the image
  document.getElementById('imageModal').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });
});
