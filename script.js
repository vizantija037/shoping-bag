// -------  arr of objects ----------//
let content = [
  {
    id: 1,
    phoneTitle: "Samsung Galaxy S8",
    phonePrice: 399,
    imgSrc: "img/samsungS8.png",
    value: 1,
  },
  {
    id: 2,
    phoneTitle: "Google Pixel",
    phonePrice: 499,
    imgSrc: "img/googlePixel.png",
    value: 1,
  },
  {
    id: 3,
    phoneTitle: "Xiaomi Redmi Note 2",
    phonePrice: 699,
    imgSrc: "img/xiaomi.png",
    value: 1,
  },
  {
    id: 4,
    phoneTitle: "Samsung Galaxy S7",
    phonePrice: 599,
    imgSrc: "img/samsungS7.png",
    value: 1,
  },
];
// -------  show all items ----------//
content.forEach((item) => {
  let output = ``;
  output += `
  <div class="card" data-id=${item.id} id="card-${item.id}">
      <div class="card-left">
        <img class="card-left-img" src="${item.imgSrc}">
        <div class="card-left-desc">
          <h5>${item.phoneTitle}</h5>
          <h5 class="price" id="price-${item.id}" data-price="${item.phonePrice}">$ ${item.phonePrice}</h5>
          <h5 class="remove-btn" id="remove-${item.id}" data-id=${item.id}>remove</h5>
        </div>
      </div>
      <div class="card-right">
        <button class="plus" data-id=${item.id}>+</button>
        <input type="text" class="single-counter" id="value-${item.id}" value=${item.value} readonly>
        <button class="minus" data-id=${item.id}>-</button>
      </div>
    </div>
  `;

  document.querySelector(".card-holder").innerHTML += output;
});
// -------  set the increaser ----------//
let allIncreaser = document.querySelectorAll(".plus");
allIncreaser.forEach((btnIncrease) => {
  btnIncrease.addEventListener("click", increase);

  function increase(e) {
    let id = e.target.dataset.id;
    let valueID = document.getElementById(`value-${id}`);
    valueID.value++;
    let bagCounter = document.getElementById("bag-counter");
    bagCounter.value++;
    itemPriceAdd(id, valueID);
  }
});
// -------  set the decreaser ----------//
let allDecreaser = document.querySelectorAll(".minus");
allDecreaser.forEach((btnDecrease) => {
  btnDecrease.addEventListener("click", decrease);

  function decrease(e) {
    let id = e.target.dataset.id;
    let valueID = document.getElementById(`value-${id}`);
    valueID.value--;
    let bagCounter = document.getElementById("bag-counter");
    bagCounter.value--;
    let singleQuantity = valueID.value;
    if (singleQuantity === "0") {
      let cardDelete = document.getElementById(`card-${id}`);
      cardDelete.style.display = "none";
    }
    itemPriceSubtrac(id, valueID);
  }
});
// ------- function to add to total ----------//
function itemPriceAdd(myid) {
  let itemPrice = document.getElementById(`price-${myid}`).dataset.price;
  let itemSum = Number(itemPrice);
  total += itemSum;
  console.log(total);
  let totalInner = document.getElementById("total");
  totalInner.innerHTML = `$ ${total}`;
}
// ------- function to subtract from total ----------//
function itemPriceSubtrac(myid) {
  let itemPrice = document.getElementById(`price-${myid}`).dataset.price;
  let itemSum = Number(itemPrice);
  total -= itemSum;
  console.log(total);
  let totalInner = document.getElementById("total");
  totalInner.innerHTML = `$ ${total}`;
}
// ------- display none for quantity of 0 ----------//
let removeBtn = document.querySelectorAll(".remove-btn");
let btnsArr = [...removeBtn];

btnsArr.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let id = e.target.dataset.id;
    let bagCounter = document.getElementById("bag-counter");
    let currentValue = document.querySelectorAll(".remove-btn");
    document.getElementById(`card-${id}`).style.display = "none";
  });
});
// ------- setting the Clear All button  ----------//
const clearAll = document.getElementById("clear");
clearAll.addEventListener("click", clearEverything);
function clearEverything() {
  const card = document.querySelectorAll(".card");
  [...card].forEach((item) => (item.style.display = "none"));
  document.querySelector(".total-div").style.display = "none";
  document.querySelector(".clear").style.display = "none";
  document.getElementById("bag-counter").value = 0;
  document.querySelector(".p-is-empty").style.display = "flex";
}
// ------- showing of bag counter  ----------//
document.addEventListener("click", checkBag);
function checkBag() {
  let bagCounter = document.getElementById("bag-counter").value;
  if (bagCounter === "0") {
    clearEverything();
  }
}
// ------- total price  ----------//
let pricesArr = content.map((item) => {
  return item.phonePrice;
});
let total = pricesArr.reduce((a, b) => a + b);
let sum = Math.round(total*100)/100
document.getElementById("total").innerHTML = `$ ${total}`;

console.log(sum)