// let minusButton = document.querySelectorAll(".fa-minus");
// let plusButton = document.querySelectorAll(".fa-plus");
// let removeButton = document.querySelectorAll(".remove-product");
// let quantity = document.querySelectorAll("#product-quantity");




// function totalCalculate(){
//     let subTotal = document.querySelectorAll("#cart-subtotal")[0].children[1];
//     let taxTotal = document.querySelectorAll("#cart-tax")[0].children[1];
//     let shippingTotal = document.querySelectorAll("#cart-shipping")[0].children[1];
//     let total = document.querySelectorAll("#cart-total")[0].children[1];
//     let productTotal = document.querySelectorAll(".product-line-price");
   
// }


class Item {
    constructor(title, image, newPrice, oldPrice, quantity) {
      this.title = title;
      this.image = image;
      this.newPrice = newPrice;
      this.oldPrice = oldPrice;
      this.quantity = quantity;
    }
    reduce() {
      this.quantity > 1 ? this.quantity-- : 1;
    }
    increase() {
      this.quantity++;
    }
  }
  const itemList = [
    new Item('Vintage Backbag', 'photo1.png', 25.98, 34.99, 1),
    new Item('Levi Shoes', 'photo2.png', 45.99, 54.99, 1),
    new Item('Antique Clock', 'photo3.jpg', 74.99, 94.99, 1),
  ];
  function generate() {
    const prdPanel = document.querySelector('#product-painel');
    prdPanel.innerHTML = '';
    let subTotal = 0;
    let tax = 0;
    let total = 0;
    for (let i = 0; i < itemList.length; i++) {
      const item = itemList[i];
      let prdTotal = decimalGenerator(item.quantity * item.newPrice, 2);
      subTotal += prdTotal;
      prdPanel.innerHTML += `
      <div class="product">
          <img src="${item.image}" alt="">
          <div class="product-info">
              <h2>${item.title}</h2>
              <div class="product-price">
                  <p><strong>${item.newPrice}</strong>
                  <span class="line-through">${item.oldPrice}</span></p>
              </div>
              <div class="quantity-controller">
                  <button onClick='reduce(${i})'>
                      <i class="fas fa-minus"></i>
                  </button>
                  <p id="product-quantity">${item.quantity}</p>
                  <button onClick='increase(${i})'>
                      <i class="fas fa-plus"></i>
                  </button>
              </div>
              <div class="product-removal">
                  <button onClick='remove(${i})' class="remove-product">
                      Remove
                  </button>
              </div>
              <div class="product-line-price">${prdTotal}</div>
          </div>
      </div>
    `;
    }

    subTotal = decimalGenerator(subTotal,2);
    tax = decimalGenerator(subTotal * 0.18, 2);
    total = decimalGenerator(subTotal + tax + 15.0, 2)

    
    prdPanel.innerHTML += `
      <div class="buy-detail" id="cart-subtotal">
          <p>Subtotal</p>
          <p>${subTotal}</p>
      </div>
      <div class="buy-detail" id="cart-tax">
          <p>Tax(%18)</p>
          <p>${tax}</p>
      </div>
      <div class="buy-detail" id="cart-shipping">
          <p>Shipping</p>
          <p>15.00</p>
      </div>
      <div class="buy-detail" id="cart-total">
          <p>Total</p>
          <p>${total}</p>
      </div>
    `;
  }
  generate();
  function reduce(index) {
    itemList[index].reduce();
    generate();
  }
  function increase(index) {
    itemList[index].increase();
    generate();
  }
  function remove(index) {
    itemList.splice(index, 1);
    generate();
  }
  function decimalGenerator(inputNumber, decimalCount) {
    let dclCnt = 10;
    for (let i = 1; i < decimalCount; i++) dclCnt *= 10;
    console.log(dclCnt);
    return Math.round(inputNumber * dclCnt) / dclCnt;
  }