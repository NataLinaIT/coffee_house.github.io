//popup open
document.querySelector(".header_btn").addEventListener("click", toggleReservationPopup);

document.querySelector("#reservation .close").addEventListener("click", toggleReservationPopup);

function toggleReservationPopup(){
  document.getElementById("reservation").classList.toggle("opened");
  document.querySelector("body").classList.toggle("opened");
  totop.classList.toggle("opened");
  date_input.classList.remove("opened");
}

//toggle style checked 
let checkbox_reservation = document.querySelector(".input_05");

document.addEventListener("click", e => {
  let targetID = e.target;
  if(targetID.classList.contains("day")){
    toggleDatePicker();
  }else if(targetID.parentNode.classList.contains("input_05") || targetID.classList.contains("input_05") || targetID.classList.contains("checkbox_checked")){
    toggleCheckedStatus();
  }
})

function toggleCheckedStatus(){
  checkbox_reservation.classList.toggle('checked');
}

//submit
document.getElementById("reservation_form").addEventListener("submit", e => {
  submitForm(e);
});

function submitForm(e){
  e.preventDefault();
  toggleReservationPopup();
  document.querySelector('#thanks_popup').style.display = "block";
}

document.querySelector('#thanks_popup .close').onclick = e => {
  document.querySelector('#thanks_popup').style.display = "none";
}

//date_picker
const date_input = document.querySelector('.input_03');
const selected_date_element = document.querySelector('.choose_date');
const date_picker_element = document.querySelector('.datepicker_wrapper');
const mth_element = document.querySelector('.mth');
const date_element = document.querySelector('.dates');
const days = document.querySelector('.days');
const days_element = document.querySelector('.days');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const next_mnth_element = document.querySelector('.next_mth');
const prev_mnth_element = document.querySelector('.prev_mth');

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

//month output
mth_element.textContent = formatDate(date);
function formatDate(date) {
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;

  var yy = date.getFullYear();
  if (yy < 10) yy = "0" + yy;

  return dd + '.' + mm + '.' + yy;
};

//open_close datapicker
date_input.addEventListener("click", e => {
  let targetID = e.target;

  if(!(targetID.classList.contains("prev_mth") || targetID.classList.contains("next_mth") || targetID.tagName == "svg" || targetID.tagName == "polygon")){
    toggleDatePicker();
  } else if(targetID.classList.contains("day")){
    toggleDatePicker();
  }
})

//populate date
populateDates();
function populateDates(e){
  days_element.innerHTML = '';
  let amount_days = 31;
  if(month == 1){
    amount_days = 28;
  }

  for(let i = 0; i < amount_days; i++){
    const day_element = document.createElement('div');
    day_element.classList.add('day');
    day_element.textContent = i + 1;
    if(selectedDay == (i + 1) && selectedMonth == month && selectedYear == year){
      day_element.classList.add('day_selected');
    }
    //choose date value & add to input
    day_element.addEventListener('click', function(){
      selectedDate = new Date(year + '.' + (month + 1) + '.' + (i+ 1));
      selectedDay = (i + 1);
      selectedMonth = month;
      selectedYear = year;

      selected_date_element.textContent = formatDate(selectedDate);
      selected_date_element.dataset.value = selectedDate;
      selected_date_element.style.weight = "500";
      selected_date_element.style.fontSize = "1em";
      selected_date_element.style.color = "#f7d6bc";

      populateDates();
      toggleDatePicker();
    })
    days_element.appendChild(day_element);
  }
}

//next previous month
next_mnth_element.addEventListener('click', goToNextMonth);
prev_mnth_element.addEventListener('click', goToPrevMonth);

function goToNextMonth(e){
  month++;
  if(month > 11){
    month = 0;
    year++;
  }
  mth_element.textContent = setMonth(month, year);
  populateDates();
}

function goToPrevMonth(e){
  month--;
  if(month < 0){
    month = 11;
    year--;
  }
  mth_element.textContent = setMonth(month, year);
  populateDates();
}

//helper function
function toggleDatePicker(){
  date_input.classList.toggle("opened");
}

// check language status & set month
function setMonth(monthIndex, year){
  return months[monthIndex] + ' ' + year;
};
//sorts section slider
const sliderSortsToleft = document.querySelector("#sorts .controll_left");
const sliderSortsToright = document.querySelector("#sorts .controll_right");
const sliderArr = document.querySelectorAll(".slider_item");
let sortSliderIndicationItems = document.querySelectorAll("#sorts .indicator_item");

const sortSlider = {
  01: {
    title: "Matari",
    text: "Grown on volcanic soil in the highlands of Yemen and has light notes of smoke and ash.",
  },
  02: {
    title: "Blue Mountain",
    text: "Grow in Jamaica on Blue Mountain, at about 1200 meters above sea level.",
  },
  03: {
    title: "Yellow bourbon",
    text: "Grown only on a couple of tiny coffee plantations in Brazil.",
  },
  04: {
    title: "Colombia",
    text: "Freshly roasted Columbia has a bright acidity, full body and powerful aroma.",
  },
  05: {
    title: "Margojeep",
    text: "Known for its exceptionally large grains. Mutated in vivo.",
  },
  06: {
    title: "Moka",
    text: "Very aromatic coffee. It got its name from the large port of Moha in Yemen",
  },
  07: {
    title: "Ethiopia Harar",
    text: "Grown in the highlands. One of the oldest coffee varieties. Known for its wine flavor.",
  },
  08: {
    title: "К7",
    text: "A selection of Bourbon grown in Kenya, has a bright acidity and powerful aroma.",
  },
  09: {
    title: "Mundo Nuovo",
    text: "A relatively new type of coffee appeared in the 1940s thanks to blend of Bourbon and Typica",
  },
}
let currentSortIndex = 2;
let startIndicatorSorts = true;

const sortSliderArr = Object.entries(sortSlider);

sliderSortsToright.addEventListener("click", sliderToright);
sliderSortsToleft.addEventListener("click", sliderToleft);

function sliderToright(){
  updateFirstItemToright();
  updateSecondItemToright();
  updateThirdItemToright();
  // startIndicatorSorts = false;
}
function updateFirstItemToright(){
  if(currentSortIndex == 0){
    currentSortIndex = 9;
    renderCart(1);
    currentSortIndex = 1;
  } else{
    renderCart(1);
    currentSortIndex++;
  }
}
function updateSecondItemToright(){
  if(currentSortIndex == 10){
    renderCart(2, 1);
    updateSliderIndication(1);
    console.log("error 10");
  } else{
    renderCart(2, currentSortIndex);
    updateSliderIndication(currentSortIndex)
    currentSortIndex++;
  }
}
function updateThirdItemToright(){
  if(currentSortIndex == 10){
    currentSortIndex = 1;
  }
  renderCart(3);
  currentSortIndex--;
}

function sliderToleft(){
  updateFirstItemToleft();
  updateSecondItemToleft();
  updateThirdItemToleft()
}
function updateFirstItemToleft(){
  if(currentSortIndex == 2 && startIndicatorSorts){
    currentSortIndex = 9;
    startIndicatorSorts = false;
    renderCart(1);
  } else if(currentSortIndex <= 1){
    currentSortIndex = 9;
    renderCart(1);
  }else{
    currentSortIndex--;
    renderCart(1);
  }
}
function updateSecondItemToleft(){
  if(currentSortIndex == 9){
    let curentNum = 1
    renderCart(2, curentNum);
    updateSliderIndication(curentNum)
  } else{
    let curentNum = currentSortIndex + 1
    renderCart(2, curentNum);
    updateSliderIndication(curentNum)
  }
}
function updateThirdItemToleft(){
  if(currentSortIndex == 9){
    let curentNum = 2;
    renderCart(3, curentNum);
  } else if(currentSortIndex == 8){
    let curentNum = 1;
    renderCart(3, curentNum);
  } else{
    let curentNum = currentSortIndex + 2;
    renderCart(3, curentNum);
  }
}

//helper function
function renderCart(num, img_num){
  //image
  let imageNum = img_num || currentSortIndex;
  document.querySelector(`#sorts .slider_item_0${num} img`).src = `img/sorts_0${imageNum}.png")`;
  document.querySelector(`#sorts .slider_item_0${num} .srcset_01`).setAttribute("srcset", `img/sorts_0${imageNum}.webp`);
  document.querySelector(`#sorts .slider_item_0${num} .srcset_02`).setAttribute("srcset", `img/sorts_0${imageNum}.png`);

  //title
  document.querySelector(`#sorts .slider_item_0${num} .slider_item_title`).textContent = `${sortSliderArr[imageNum-1][1].title}`;
  document.querySelector(`#sorts .slider_item_0${num} .slider_item_text`).textContent = `${sortSliderArr[imageNum-1][1].text}`;
}

//indication
function updateSliderIndication(active){
  sortSliderIndicationItems.forEach(e => {
    e.classList.remove("_active");
  });
  document.querySelector(`#sorts .indicator_item_0${active}`).classList.add("_active");
}

;
//review section slider
const sliderReviewToleft = document.querySelector("#review .controll_left");
const sliderReviewToright = document.querySelector("#review .controll_right");
let reviewSliderIndicationItems = document.querySelectorAll("#review .indicator_item");

const reviewObj = {
  01: {
    text: "I like coffee shop Coffee House because here you can calmly to wotk in quiet atmosphere. Its non so easy to fins such place, where for such nice price you can comfortably spend ypur time. Personal is very friendly and professional. There is a big choise of coffe drinks very high quolity. I recommend to everyona this lovely place for coffe pause or nice time with friends or as a work space.",
    name: "Max",
  },
  02: {
    text: "Coffee House it’s a place with friendly and cozy atmosphere. Here you can find any coffe drink for you taste and mood. Usually I come here dayly for my coffee brake to enjoy my favourite Macchiato. Only here they can make it with a such special taste as I like. As well I like to invite here my friends for a nice talks with a cup of coffee, because I am sure they will enjoy it same as me. I highly recommend this place to everyone! :)",
    name: "Maria",
  },
  03: {
    text: "Favorite place!! A very warm place with delicious 100% Arabica coffee and a wide selection of desserts. I would like to mention the barista Lara. Very friendly and smiling, she will instantly cheer you up with her unusual sense of humor)) I regularly visit this place and advise everyone! Fly in for a coffee break)",
    name: "Alex",
  },
  04: {
    text: "Best coffee!! Accidentally stopping by, intrigued by the awesome coffee signboard I remained a loyal fan of this place. Raff coffee, cappuccino with baked milk cannot be tastier! Everything as needed, temperature, foam, smell I love it! Very nice interior and music. A great place to meet friends for nice coffee and talk.",
    name: "Yana",
  },
  05: {
    text: "Definitely the best coffee shop in the city center. I go to the coffee shop every day before work :) The best part is that I will recognize you, and immediately prepare what you usually take. Nice staff and service. Suitable for both business meetings and simple gatherings with friends. Generally a very pleasant coffee shop, to spend time at work or just run in for a coffee.",
    name: "Slava",
  },
}

const reviewSliderArr = Object.entries(reviewObj);
let currentReviewIndex = 2;
let startIndicatorReview = true;

sliderReviewToright.addEventListener("click", reviewToright);
sliderReviewToleft.addEventListener("click", reviewToleft);

function reviewToright(){
  updateReviewFirstItemToright();
  updateReviewSecondItemToright();
  updateReviewThirdItemToright();
}
function updateReviewFirstItemToright(){
  if(currentReviewIndex == 0){
    currentReviewIndex = 5;
    renderReviewCart(1);
    currentReviewIndex = 1;
  } else{
    renderReviewCart(1);
    currentReviewIndex++;
  }
}
function updateReviewSecondItemToright(){
  if(currentReviewIndex == 6){
    renderReviewCart(2, 1);
    updateSliderReviewIndication(1);
    console.log("error 10");
  } else{
    renderReviewCart(2, currentReviewIndex);
    updateSliderReviewIndication(currentReviewIndex)
    currentReviewIndex++;
  }
}
function updateReviewThirdItemToright(){
  if(currentReviewIndex == 6){
    currentReviewIndex = 1;
  }
  renderReviewCart(3);
  currentReviewIndex--;
}

function reviewToleft(){
  updateReviewFirstItemToleft();
  updateReviewSecondItemToleft();
  updateReviewThirdItemToleft()
}
function updateReviewFirstItemToleft(){
  if(currentReviewIndex == 2 && startIndicatorReview){
    currentReviewIndex = 5;
    startIndicatorReview = false;
    renderReviewCart(1);
  } else if(currentReviewIndex <= 1){
    currentReviewIndex = 5;
    renderReviewCart(1);
  } else{
    currentReviewIndex--;
    renderReviewCart(1);
  }
}
function updateReviewSecondItemToleft(){
  if(currentReviewIndex == 5){
    let curentNum = 1
    renderReviewCart(2, curentNum);
    updateSliderReviewIndication(curentNum)
  } else{
    let curentNum = currentReviewIndex + 1
    renderReviewCart(2, curentNum);
    updateSliderReviewIndication(curentNum)
  }
}
function updateReviewThirdItemToleft(){
  if(currentReviewIndex == 5){
    let curentNum = 2;
    renderReviewCart(3, curentNum);
  } else if(currentReviewIndex == 4){
    let curentNum = 1;
    renderReviewCart(3, curentNum);
  } else{
    let curentNum = currentReviewIndex + 2;
    renderReviewCart(3, curentNum);
  }
}

//helper function
function renderReviewCart(num, img_num){
  //image
  let imageNum = img_num || currentReviewIndex;
  document.querySelector(`#review .slider_item_0${num} img`).src = `img/testimonial_0${imageNum}.png")`;
  document.querySelector(`#review .slider_item_0${num} .srcset_01`).setAttribute("srcset", `img/testimonial_0${imageNum}.webp`);
  document.querySelector(`#review .slider_item_0${num} .srcset_02`).setAttribute("srcset", `img/testimonial_0${imageNum}.png`);

  //title
  document.querySelector(`#review .slider_item_0${num} .slider_item_text`).textContent = `${reviewSliderArr[imageNum-1][1].text}`;
  document.querySelector(`#review .slider_item_0${num} .slider_item_name`).textContent = `${reviewSliderArr[imageNum-1][1].name}`;

}

//indication
function updateSliderReviewIndication(active){
  reviewSliderIndicationItems.forEach(e => {
    e.classList.remove("_active");
  });
  document.querySelector(`#review .indicator_item_0${active}`).classList.add("_active");
}
;
//menu section
const tab_espresso = document.querySelector(".tab_espresso");
const tab_milkbased = document.querySelector(".tab_milkbased");
const tab_iced = document.querySelector(".tab_iced");
const tab_deserts = document.querySelector(".tab_deserts");
const tabs_arr = document.querySelectorAll(".tabs_wrapprer li");
const tab_arrow_right = document.querySelector(".tabs_wrapprer .controll_right");
const tab_arrow_left = document.querySelector(".tabs_wrapprer .controll_left");
const cardsArr = document.querySelectorAll(".card_coffee");
const card_01 = document.querySelector(".card_coffee_01");
const card_02 = document.querySelector(".card_coffee_02");
const card_03 = document.querySelector(".card_coffee_03");
const card_04 = document.querySelector(".card_coffee_04");
const pagination = document.querySelector(".pagination_wrapper");
const pagination_item_arr = document.querySelectorAll(".pagination_item");
const pagination_item_01 = document.querySelector(".pagination_item_01");
const pagination_item_02 = document.querySelector(".pagination_item_02");
const pagination_item_03 = document.querySelector(".pagination_item_03");
const pagination_item_04 = document.querySelector(".pagination_item_04");
const pagination_arrow_left = document.querySelector(".pagination_wrapper .controll_left svg");
const pagination_arrow_right = document.querySelector(".pagination_wrapper .controll_right svg");
let pagination_default = true;
let paginationItemActive = 1;
let tabIndexActive = 2;

const coffee_espresso = {
  01: {
    src: "menu_espresso_01",
    title: "Mocca",
    description: "Coffee astringency and aroma, chocolate sweetness and creamy tenderness. Perfect!",
    ingridient_01: "Espresso",
    ingridient_02: "Dark chocolate sauce",
    ingridient_03: "Steamed milk",
    ingridient_04: "Whipped cream.",
    ingridient_05: "-",
    size: "250 ml",
    price: "5 $",
  },
  02: {
    src: "menu_espresso_02",
    title: "Flat White",
    description: " Want a rich coffee flavor without giving up a creamy addition? Flat White is exactly what you need.",
    ingridient_01: "Espresso",
    ingridient_02: "Milk",
    ingridient_03: "Water",
    ingridient_04: "-",
    ingridient_05: "-",
    size: "200 ml",
    price: "6 $",
  },
  03: {
    src: "menu_espresso_03",
    title: "Raff Vanilla",
    description: "Want a sweeter coffee? Choose a delicate raff with vanilla sugar or any other syrup. Experiment with taste!",
    ingridient_01: "Espresso",
    ingridient_02: "Milk",
    ingridient_03: "Cream 10%",
    ingridient_04: "Vanilla sugar/syrup",
    ingridient_05: "-",
    size: "300 ml",
    price: "7 $",
  },
  04: {
    src: "menu_espresso_04",
    title: "Americano",
    description: "Fans of a lesser strength than espresso choose Americano. Enjoy the pure taste of coffee or add cinnamon.",
    ingridient_01: "Espresso",
    ingridient_02: "Water",
    ingridient_03: "-",
    ingridient_04: "-",
    ingridient_05: "-",
    size: "200 ml",
    price: "5 $",
  },
}
const coffee_with_milk = {
  01: {
    src: "menu_01",
    title: "Bonbon Cafe",
    description: "With wooded notes of the Fortissio Lungo Grand Cru and an intense chocolate and milk flavour.",
    ingridient_01: "Fortissio Lungo Grand Crucapsule",
    ingridient_02: "Sachet of Cailler chocolate",
    ingridient_03: "Cocoa powder",
    ingridient_04: "30ml of condensed milk",
    ingridient_05: "Milk",
    size: "350 ml",
    price: "5 $",
  },
  02: {
    src: "menu_02",
    title: "Mocha Latte Coconut",
    description: "With rich aromas of grilled Fortissio Lungo Grand Cru beans, enveloped in creamy milk, bitter chocolate and mellow coconut.",
    ingridient_01: "Fortissio Lungo Grand Cru capsule",
    ingridient_02: "Full fat milk",
    ingridient_03: "7cl of liquid chocolate",
    ingridient_04: "Coconut syrup",
    ingridient_05: "Chocolate pieces",
    size: "350 ml",
    price: "7 $",
  },
  03: {
    src: "menu_03",
    title: "Banana coffee break",
    description: "Make your coffee break memorable, savoury and sweet with this smooth, creamy beguiling banana coffee.",
    ingridient_01: "Grand Cru Arpeggio capsule",
    ingridient_02: "Banana syrup",
    ingridient_03: "Chantilly cream",
    ingridient_04: "Teaspoons of dulce de leche",
    ingridient_05: "Chocolate chips",
    size: "350 ml",
    price: "6 $",
  },
  04: {
    src: "menu_04",
    title: "Downtown Macchiato",
    description: "Urbane and sophisticated - a Macchiatto accented with nutty notes and jammy sweetness.",
    ingridient_01: "Roma or Arpeggio Grand Cru capsule",
    ingridient_02: "Fig jam",
    ingridient_03: "Vanilla sugar",
    ingridient_04: "Hazelnut cream",
    ingridient_05: "Milk",
    size: "350 ml",
    price: "5 $",
  },
}
const coffee_cold = {
  01: {
    src: "menu_cold_01",
    title: "Brewed Iced Coffee",
    description: "If you are a true coffee lover, you are going to love these refreshing ice coffee drink. With espresso or with instant coffee.",
    ingridient_01: "120ml brewed coffee",
    ingridient_02: "Cold water",
    ingridient_03: "Sugar",
    ingridient_04: "Ice cubes",
    ingridient_05: "-",
    size: "300 ml",
    price: "4 $",
  },
  02: {
    src: "menu_cold_02",
    title: "Iced Mocha Coffee",
    description: "If you are a true coffee lover, you are going to love these refreshing ice coffee drink. With espresso or with instant coffee.",
    ingridient_01: "Instant coffee",
    ingridient_02: "Hot water and milk",
    ingridient_03: "Cocoa powder",
    ingridient_04: "Ice cubes",
    ingridient_05: "Whipped cream",
    size: "300 ml",
    price: "7 $",
  },
  03: {
    src: "menu_cold_03",
    title: "Coconut Iced coffee",
    description: "If you are a true coffee lover, you are going to love these refreshing ice coffee drink. With espresso or with instant coffee.",
    ingridient_01: "120ml Brewed coffee or espresso",
    ingridient_02: "Coconut milk",
    ingridient_03: "Sweetened condensed milk",
    ingridient_04: "Ice cubes",
    ingridient_05: "-",
    size: "300 ml",
    price: "8 $",
  },
  04: {
    src: "menu_cold_04",
    title: "Coconut Iced coffee",
    description: "If you are a true coffee lover, you are going to love these refreshing ice coffee drink. With espresso or with instant coffee.",
    ingridient_01: "120ml Brewed coffee or espresso",
    ingridient_02: "Milk",
    ingridient_03: "Vanilla ice cream",
    ingridient_04: "Ice cubes",
    ingridient_05: "-",
    size: "300 ml",
    price: "7 $",
  },
  
}
const coffee_desert = {
  01: {
    src: "menu_desert_01",
    title: "Vanilla panna cotta",
    description: "Is a traditional Italian dessert which literally translates as 'cooked cream'. Hailing from the region of Piedmont in Italy",
    ingridient_01: "Double cream",
    ingridient_02: "Vanilla",
    ingridient_03: "Milk",
    ingridient_04: "Strawberry jam",
    ingridient_05: "Nuts",
    size: "45 gr",
    price: "7 $",
  },
  02: {
    src: "menu_desert_02",
    title: "Chia pudding",
    description: "Chia pudding is a wonderful and healthy dessert. Chia seeds contain a variety of fiber, vitamins, and minerals.",
    ingridient_01: "Chia seeds",
    ingridient_02: "Сoconut milk",
    ingridient_03: "Granola",
    ingridient_04: "Orange curly",
    ingridient_05: "-",
    size: "40 gr",
    price: "8 $",
  },
  03: {
    src: "menu_desert_03",
    title: "Сhocolate grenade",
    description: "The most famous chocolate ganache desert that drives all chocolate lovers crazy",
    ingridient_01: "Сhocolate crumble",
    ingridient_02: "Cacao",
    ingridient_03: "Cream",
    ingridient_04: "Сherry curly",
    ingridient_05: "-",
    size: "40 gr",
    price: "7 $",
  },
  04: {
    src: "menu_desert_04",
    title: "Tiramisu",
    description: "Very airy, delicate Italian dessert, with an amazing contrast of sweet butter cream and the bitter taste of strong coffee.",
    ingridient_01: "Cream cheese mascarpone",
    ingridient_02: "Savoyardi cookies",
    ingridient_03: "Espresso coffee",
    ingridient_04: "Cocoa",
    ingridient_05: "Cognac",
    size: "40 gr",
    price: "9 $",
  },
}

const coffee_espresso_arr = Object.entries(coffee_espresso);
const tab_milkbased_arr = Object.entries(coffee_with_milk);
const tab_iced_arr = Object.entries(coffee_cold);
const tab_deserts_arr = Object.entries(coffee_desert);

//tab chenge on click
tab_espresso.addEventListener("click", loadEspressoCards);
tab_milkbased.addEventListener("click", loadMilkbasedCards);
tab_iced.addEventListener("click", loadIcedCards);
tab_deserts.addEventListener("click", loadDesertsCards);

function loadEspressoCards(){
  loadCards(1, tab_espresso, coffee_espresso_arr, "menu_espresso_0");
}
function loadMilkbasedCards(){
  loadCards(1, tab_milkbased, tab_milkbased_arr, "menu_0");
}
function loadIcedCards(){
  loadCards(1, tab_iced, tab_iced_arr, "menu_cold_0");
}
function loadDesertsCards(){
  loadCards(1, tab_deserts, tab_deserts_arr, "menu_desert_0");
}

function loadCards(pag_indicator, tab, arr, src){
  pagination_default = true;
  updateMenuLayout();
  updatePaginationIndicator(pag_indicator);
  setactivetab(tab);
  renderMenuCards(arr, src);
}

//add active tab style
function setactivetab(active_tab){
  tabs_arr.forEach( e => {
    e.classList.remove("active_tab");
  })
  active_tab.classList.add("active_tab");
}

//mobile tabs arrow
tab_arrow_right.addEventListener("click", tabsToRight);
tab_arrow_left.addEventListener("click", tabsToLeft);

function tabsToRight(){
  let index = tabIndexActive;
  if(index == 1){
    updateActiveTab(2);
    loadMilkbasedCards();
  }
  if(index == 2){
    updateActiveTab(3);
    loadIcedCards();
  }
  if(index == 3){
    updateActiveTab(4);
    loadDesertsCards();
  }
}
function tabsToLeft(){
  let index = tabIndexActive;
  if(index == 2){
    updateActiveTab(1);
    loadEspressoCards();
  }
  if(index == 3){
    updateActiveTab(2);
    loadMilkbasedCards();
  }
  if(index == 4){
    updateActiveTab(3);
    loadIcedCards();
  }
}

function updateActiveTab(num){
  tabs_arr.forEach( e => {
    e.style.display = "none"
  })
  for(let i = 0; i < tabs_arr.length; i++){
    if (i == num-1){
      tabs_arr[i].style.display = "block";
      setactivetab(tabs_arr[i]);
      tabIndexActive = num;
    }
  }
}

//set card content 
function renderMenuCards(arr, src_img){
  for(let i = 1; i <= cardsArr.length; i++){
    //img
    document.querySelector(`#menu .card_coffee_0${i} img`).src = `img/${src_img}${i}.png`;
    document.querySelector(`#menu .card_coffee_0${i} .srcset_01`).setAttribute("srcset", `img/${src_img}${i}.webp`);
    document.querySelector(`#menu .card_coffee_0${i} .srcset_02`).setAttribute("srcset", `img/${src_img}${i}.png`);

    //text content
    document.querySelector(`#menu .card_coffee_0${i} h5`).textContent = `${arr[i-1][1].title}`;
    document.querySelector(`#menu .card_coffee_0${i} .coffee_description`).textContent = `${arr[i-1][1].description}`;
    document.querySelector(`#menu .card_coffee_0${i} .ingridient_01`).textContent = `${arr[i-1][1].ingridient_01}`;
    document.querySelector(`#menu .card_coffee_0${i} .ingridient_02`).textContent = `${arr[i-1][1].ingridient_02}`;
    document.querySelector(`#menu .card_coffee_0${i} .ingridient_03`).textContent = `${arr[i-1][1].ingridient_03}`;
    document.querySelector(`#menu .card_coffee_0${i} .ingridient_04`).textContent = `${arr[i-1][1].ingridient_04}`;
    document.querySelector(`#menu .card_coffee_0${i} .ingridient_05`).textContent = `${arr[i-1][1].ingridient_05}`;
    
    //details
    document.querySelector(`#menu .card_coffee_0${i} .size`).textContent = `${arr[i-1][1].size}`;
    document.querySelector(`#menu .card_coffee_0${i} .price`).textContent = `${arr[i-1][1].price}`;
  }
}

//update pagination layout 
window.addEventListener("resize", updateMenuLayout);
document.addEventListener("DOMContentLoaded", updateMenuLayout);

//pagination layout and cards display in responsive mode
function updateMenuLayout(){
  if(window.innerWidth > 1180){
    pagination.style.opacity = "0";
    displayAllCards();
  }
  if(window.innerWidth <= 1180 && window.innerWidth > 700){
    pagination.style.opacity = "1";
    pagination_item_03.style.display = "none";
    pagination_item_04.style.display = "none";
  } 
  if(window.innerWidth <= 1180 && window.innerWidth > 940){
    if(pagination_default){
      setCardsDisplayStyle("flex", "flex", "flex", "none");
      updatePaginationIndicator(1);
    } else{
      setCardsDisplayStyle("none", "flex", "flex", "flex");
      updatePaginationIndicator(2);
    }
  } 
  if(window.innerWidth <= 940 && window.innerWidth > 700){
    if(pagination_default){
      setCardsDisplayStyle("flex", "flex", "none", "none");
      updatePaginationIndicator(1);
    } else{
      setCardsDisplayStyle("none", "none", "flex", "flex");
      updatePaginationIndicator(2);
    }
  } 
  if(window.innerWidth <= 700){
    if(pagination_default && paginationItemActive == 1){
      setCardsDisplayStyle("flex", "none", "none", "none");
    }
    if(pagination_default && (paginationItemActive == 2 || paginationItemActive == 3 || paginationItemActive == 4)){
      setCardsDisplayStyle("flex", "none", "none", "none");
      updatePaginationIndicator(1);
    }
    if(!pagination_default && paginationItemActive == 2){
      setCardsDisplayStyle("none", "flex", "none", "none");
      updatePaginationIndicator(2);
    }
    if(!pagination_default && paginationItemActive == 3){
      setCardsDisplayStyle("none", "none", "flex", "none");
      updatePaginationIndicator(3);
    }
    if(!pagination_default && paginationItemActive == 4){
      setCardsDisplayStyle("none", "none", "none", "flex");
      updatePaginationIndicator(4);
    }
    pagination.style.opacity = "1";
    pagination_item_03.style.display = "flex";
    pagination_item_04.style.display = "flex";
  } 
}

//display all cards
function displayAllCards(){
  cardsArr.forEach(e => {
    e.style.display = "flex";
  })
  if(pagination_default){
    updatePaginationIndicator(1);
  }
}

//pagination item onclick
pagination_item_01.addEventListener("click", () => {
  paginationItemActive = 1;
  showHiddenCards(1)
});
pagination_item_02.addEventListener("click", () => {
  paginationItemActive = 2;
  showHiddenCards(2)
});
pagination_item_03.addEventListener("click", () => {
  paginationItemActive = 3;
  showHiddenCards(3)
});
pagination_item_04.addEventListener("click", () => {
  paginationItemActive = 4;
  showHiddenCards(4)
});

//pagination arrows onclick
pagination_arrow_right.addEventListener("click", () => {
  let index = paginationItemActive;
  if(window.innerWidth <= 1180 && window.innerWidth > 700 && paginationItemActive == 1){
    updateIdexes(false, 2);
  }
  if(window.innerWidth < 700 && index == 1){
    updateIdexes(false, 2);
  }
  if(window.innerWidth < 700 && index == 2){
    updateIdexes(false, 3);
  }
  if(window.innerWidth < 700 && index == 3){
    updateIdexes(false, 4);
  }
})

pagination_arrow_left.addEventListener("click", () => {
  if(window.innerWidth <= 1180 && window.innerWidth > 700 && paginationItemActive == 2){
    updateIdexes(true, 1);
  }
  if(window.innerWidth < 700 && paginationItemActive == 2){
    updateIdexes(true, 1);
    updatePaginationIndicator(1)
  }
  if(window.innerWidth < 700 && paginationItemActive == 3){
    updateIdexes(false, 2);
  }
  if(window.innerWidth < 700 && paginationItemActive == 4){
    updateIdexes(false, 3);
  }
})

function updateIdexes(_default, _active){
  pagination_default = _default;
  paginationItemActive = _active;
  updateMenuLayout();
}

//display & hide cards according active pagination item
function showHiddenCards(tab_num){
  updatePaginationIndicator(tab_num);
  pagination_default = false;
  if(window.innerWidth <= 1180 && window.innerWidth > 940){
    if(paginationItemActive == 1){
      setCardsDisplayStyle("flex", "flex", "flex", "none");
    }
    if(paginationItemActive == 2){
      setCardsDisplayStyle("none", "flex", "flex", "flex");
    }
  }
  if(window.innerWidth <= 940 && window.innerWidth > 700){
    if(paginationItemActive == 1){
    setCardsDisplayStyle("flex", "flex", "none", "none");
    }
    if(paginationItemActive == 2){
    setCardsDisplayStyle("none", "none", "flex", "flex");
    }
  }
  if(window.innerWidth <= 700){
    if(paginationItemActive == 1){
      setCardsDisplayStyle("flex", "none", "none", "none");
    }
    if(paginationItemActive == 2){
      setCardsDisplayStyle("none", "flex", "none", "none");
    }
    if(paginationItemActive == 3){
      setCardsDisplayStyle("none", "none", "flex", "none");
    }
    if(paginationItemActive == 4){
      setCardsDisplayStyle("none", "none", "none", "flex");
    }
  }
}

//render pagination active item
function updatePaginationIndicator(tab_num){
  paginationActiveRemove();
  document.querySelector(`.pagination_item_0${tab_num}`).classList.add("_active");
  paginationItemActive = tab_num;
}

//remove all active pagination items
function paginationActiveRemove(){
  pagination_item_arr.forEach( e => {
    e.classList.remove("_active");
  })
}

function setCardsDisplayStyle(style_01, style_02, style_03, style_04){
  card_01.style.display = style_01;
  card_02.style.display = style_02;
  card_03.style.display = style_03;
  card_04.style.display = style_04;
}
;

//smooth scroll
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("scroll")) {
    event.preventDefault();
    var target = event.target.getAttribute("href");
    var targetPosition = document.querySelector(target).offsetTop;
    window.scrollTo({
      top: targetPosition,
      left: 0,
      behavior: "smooth",
    });
  }
});

//hide totop on header
const totop =  document.querySelector(".totop");
document.addEventListener("scroll", function(){
  if(pageYOffset <= 80){
    totop.style.opacity = "0";
  } else {
    totop.style.opacity = "1";
  }
})

// burger
document.querySelector(".burger").onclick = () => {
  togglemenu();
};
document.querySelector(".nav_menu").onclick = () => {
  if(window.innerWidth <= 414){
    togglemenu();
  }
};

function togglemenu() {
  document.querySelector(".burger").classList.toggle("opened");
  document.querySelector(".nav_menu").classList.toggle("opened");
  document.querySelector("body").classList.toggle("opened");
  document.querySelector(".socials").classList.toggle("opened");
  document.querySelector(".contact_phone").classList.toggle("opened");
}

//read more
document.querySelector(".button_with_border").onclick = () => {
  document.querySelectorAll(".mobile_hide").forEach(e => {
    e.style.display = "block";
  })
}

//callback
document.querySelector(".call_backbtn").onclick = () => {
  document.querySelector("#callback").style.display = "block";
  totop.classList.toggle("opened");
  document.querySelector("body").classList.toggle("opened");
}
document.querySelector("#callback .close").onclick = () => {
  document.querySelector("#callback").style.display = "none";
  totop.classList.toggle("opened");
  document.querySelector("body").classList.toggle("opened");
}