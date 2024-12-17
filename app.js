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
