let sideNav = document.querySelectorAll('.side');
let row_like = document.querySelector('.row_like.product');

const allClothes = [
  {
    name: 'Rainbow Polka',
    imgUrl: '1.webp',
    price: 20.16,
    category: 'beauty',
  },
  {
    name: 'Green Jale',
    imgUrl: '2.webp',
    price: 30.42,
    category: 'bags',
  },
  {
    name: 'Flower Print',
    imgUrl: '3.webp',
    price: 26.13,
    category: 'knitwear',
  },
  {
    name: 'Pussy Print',
    imgUrl: '4.webp',
    price: 15.68,
    category: 'knitwear',
  },
  {
    name: 'Casual Leather',
    imgUrl: '5.webp',
    price: 19.48,
    category: 'bags',
  },
  {
    name: 'Oh Damn',
    imgUrl: '6.webp',
    price: 21.48,
    category: 'beauty',
  },
  {
    name: 'Vintage Plant',
    imgUrl: '7.webp',
    price: 24.64,
    category: 'knitwear',
  },
  {
    name: 'Crochet Sweater',
    imgUrl: '8.webp',
    price: 30.0,
    category: 'beauty',
  },
];

sideNav.forEach((side) => {
  side.addEventListener('click', function () {
    if (this.innerText === 'NEW IN') {
      this.classList.add('active');
      row_like.innerHTML = '';
      allClothes.map((cloth) => {
        crtElem(cloth);
      });
    }

    if (this.innerText === 'BEAUTY') {
      this.classList.add('active');
      row_like.innerHTML = '';
      allClothes.map((cloth) => {
        if (cloth.category === 'beauty') {
          crtElem(cloth);
        }
      });
    }

    if (this.innerText === 'BAGS') {
      this.classList.add('active');
      row_like.innerHTML = '';
      allClothes.map((cloth) => {
        if (cloth.category === 'bags') {
          crtElem(cloth);
        }
      });
    }

    if (this.innerText === 'KNITWEAR') {
      this.classList.add('active');
      row_like.innerHTML = '';
      allClothes.map((cloth) => {
        if (cloth.category === 'knitwear') {
          crtElem(cloth);
        }
      });
    }
  });
});

function crtElem(cloth) {
  let newDiv = document.createElement('div');
  newDiv.classList.add('prod');
  newDiv.innerHTML = `
        <img src="${cloth.imgUrl}" />
        <span class="fav">
            <i class="bi bi-heart"></i>
        </span>
        <span class="cart_cart">
            <i class="bi bi-cart"></i>
        </span>
      `;

  row_like.append(newDiv);
}

window.addEventListener('load', function () {
  allClothes.map((cloth) => {
    crtElem(cloth);
  });
});
