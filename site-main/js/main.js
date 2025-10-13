document.addEventListener('DOMContentLoaded', () => {
  /* ======== Carrossel ======== */
  document.querySelectorAll('.carrossel').forEach(carrossel => {
    const track = carrossel.querySelector('.carrossel-transicao');
    const cards = carrossel.querySelectorAll('.card');
    const prevBtn = carrossel.querySelector('.prev');
    const nextBtn = carrossel.querySelector('.next');

    let index = 0;

    // Adiciona transição suave
    track.style.transition = 'transform 0.5s ease-in-out';

    const getCardWidth = () => cards[0].offsetWidth + 20;

    nextBtn.addEventListener('click', () => {
      if (index < cards.length - 1) index++;
      else index = 0;
      track.style.transform = `translateX(${-index * getCardWidth()}px)`;
    });

    prevBtn.addEventListener('click', () => {
      if (index > 0) index--;
      else index = cards.length - 1;
      track.style.transform = `translateX(${-index * getCardWidth()}px)`;
    });

    // Atualiza ao redimensionar
    window.addEventListener('resize', () => {
      track.style.transform = `translateX(${-index * getCardWidth()}px)`;
    });
  });

  /* ======== Carrinho ======== */
  const botoesCarrinho = document.querySelectorAll('.add-cart');
  const contadorCarrinho = document.getElementById('cart-count');

  function atualizarContador() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (contadorCarrinho) contadorCarrinho.textContent = carrinho.length;
  }

  function mostrarNotificacao(mensagem) {
    const notif = document.createElement('div');
    notif.textContent = mensagem;
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.background = 'rgba(255, 215, 0, 0.9)';
    notif.style.color = '#333';
    notif.style.padding = '10px 15px';
    notif.style.borderRadius = '8px';
    notif.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    notif.style.fontWeight = 'bold';
    notif.style.transition = 'opacity 0.5s';
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = '0';
      setTimeout(() => notif.remove(), 500);
    }, 1500);
  }

  botoesCarrinho.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.card');
      const produto = {
        nome: card.dataset.nome,
        preco: parseFloat(card.dataset.preco),
        img: card.dataset.img
      };

      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      atualizarContador();
      mostrarNotificacao(`${produto.nome} foi adicionado ao carrinho!`);
    });
  });

  atualizarContador();
});
