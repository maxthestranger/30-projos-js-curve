let sideNav = document.querySelectorAll('.side');
let row_like = document.querySelector('.row_like.product');
let cart_number = document.querySelector('.cart_number');
let col_1 = document.querySelector('.col_1');
let cartNum = 0;

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

const cartObj = [];

sideNav.forEach((side) => {
  side.addEventListener('click', function () {
    if (this.innerText === 'NEW IN') {
      // Array.from(col_1.children).forEach((child) => {
      //   if (child.classList.contains('active')) {
      //     child.classList.romove('active');
      //   }
      // });
      this.classList.add('active');
      row_like.innerHTML = '';
      allClothes.map((cloth, index) => {
        crtElem(cloth, index);
      });
    }

    if (this.innerText === 'BEAUTY') {
      this.classList.add('active');
      row_like.innerHTML = '';
      allClothes.map((cloth, index) => {
        if (cloth.category === 'beauty') {
          crtElem(cloth, index);
        }
      });
    }

    if (this.innerText === 'BAGS') {
      this.classList.add('active');
      row_like.innerHTML = '';
      allClothes.map((cloth, index) => {
        if (cloth.category === 'bags') {
          crtElem(cloth, index);
        }
      });
    }

    if (this.innerText === 'KNITWEAR') {
      this.classList.add('active');
      row_like.innerHTML = '';
      allClothes.map((cloth, index) => {
        if (cloth.category === 'knitwear') {
          crtElem(cloth, index);
        }
      });
    }
  });
});

function crtElem(cloth, index) {
  let newDiv = document.createElement('div');
  newDiv.classList.add('prod');
  newDiv.innerHTML = `
        <img src="${cloth.imgUrl}" />
        <span class="fav">
            <i class="bi bi-heart"></i>
        </span>
        <div class="prod_info">
          <h4>${cloth.name}</h4>
          <h2>${cloth.price}</h2>
          <button class="add_to_cart" type="button" onClick="handleClick(this)" data-value="${index}">
            <i class="bi bi-cart me-2"></i> Add to Cart
          </button>
      `;

  row_like.append(newDiv);
}

function handleClick(self) {
  let prodIndex = self.getAttribute('data-value');
  cartNum++;
  cart_number.innerText = cartNum;
}

window.addEventListener('load', function () {
  allClothes.map((cloth, index) => {
    crtElem(cloth, index);
  });
});
