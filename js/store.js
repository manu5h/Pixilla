//Argument to check html is loaded or not
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready()
}


//Main function to run if the page done loading
function ready(){

  //Event listner to delete button in cart
    var removeCartItemButtons = document.getElementsByClassName('del-btn')
    console.log(removeCartItemButtons)
    for( var i =0; i<removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click',removeCartItem)
    }

  //Event listner to quantity input
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i=0; i< quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

  //Event listner to add to cart button  
    var addToCartButtons = document.getElementsByClassName('buy-button')
    for(var i=0; i< addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    //Event listner to purchase button
  const purchase = document.getElementsByClassName("btn-purchase")[0];
  purchase.addEventListener("click", validateFields);

  // event listner to change order button
  const editOrder = document.getElementsByClassName("btn-edit")[0];
  editOrder.addEventListener("click", hideInvoice);
}

//Function to remove item in cart when delete button clicked
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

//function to avoid user by entering minus numbers or zero
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <=0){
        input.value =1
    }
    updateCartTotal()
}

//function to add item to the cart when add to cart button clicked
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('pro-title')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('pro-card-img')[0].src
    console.log(title,price,imageSrc)
    addItemToCart(title,price,imageSrc)
    updateCartTotal()
}

//function to add the item row to cart table 
function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames= cartItems.getElementsByClassName('cart-item-title')
    for(var i=0; i<cartItemNames.length; i++){
        if(cartItemNames[i].innerText== title){
            alert('This item is already in the cart ')
            return
        }
    }
    var cartRowContents = `
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn del-btn" type="button">REMOVE<i class="fa-solid fa-trash-can fa-xs"></i></button>
                </div>`
    cartRow.innerHTML= cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('del-btn')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

//Function to update cart total 
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total=0;
    for( var i =0; i<cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price= parseFloat(priceElement.innerText.replace('$', ''))
        var quantity =quantityElement.value;
        total = total + (price * quantity) ;
        
    }
    //avoiding the decimal length  
    total= Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total;

}


//Function to validate user name and email
function validateFields(event) {
    var name = document.getElementById("user-name");
    var email = document.getElementById("user-email");
    let massages = [];
    if (name.value == "" || name.value == null) {
      massages.push("Name field cannot be empty.");
    } else if (name.value.length <= 2) {
      massages.push("Name must be longer than 2 letters.");
    } else if (/\d/.test(name.value)) {
      massages.push("Name cannot include numbers.");
    }
    validateEmail(email.value, massages);
  
    if (massages.length > 0) {
      alert(massages.join("\n"));
    } else {
      viewInvoice();
    }
  }
  

  //Function to validate email 
  function validateEmail(mail, massages) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    massages.push("Email must be valid.");
    return false;
  }
  
  //creating variables to assign values for invoice use
  const invoiceHeader = document.getElementsByClassName("pro-head")[0];
  const productContent = document.getElementsByClassName(
    "page-content"
  )[0];
  const invoiceContent = document.getElementsByClassName("invoice-content")[0];
  
  // Function to hide product cards and view invoice when purchase button clicked
  function viewInvoice() {
    addInvoiceRow();
    setCustomerDetails();
  
    invoiceHeader.innerText = "Invoice";
    productContent.classList.add("invisible");
    invoiceContent.classList.remove("invisible");
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  // Function to view product cards and hide invoice when change order button clicked
  function hideInvoice() {
    invoiceHeader.innerText = "Get Yours";
    productContent.classList.remove("invisible");
    invoiceContent.classList.add("invisible");
  }
  
  // Function to add purchased items from cart to invoice
  function addInvoiceRow() {
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var cartRow = cartItems.getElementsByClassName("cart-row");
    var cartTotal =
      document.getElementsByClassName("cart-total-price")[0].innerText;
    var invoiceRows = document.getElementsByClassName("invoice-rows")[0];
    invoiceRows.innerHTML = "";
    for (var i = 0; cartRow.length > i; i++) {
      var img = cartRow[i].getElementsByClassName("cart-item-image")[0].src;
      var product =
        cartRow[i].getElementsByClassName("cart-item-title")[0].innerText;
      var price = parseFloat(
        cartRow[i]
          .getElementsByClassName("cart-price")[0]
          .innerText.replace("$", "")
      );
      var quantity = cartRow[i].getElementsByClassName("cart-quantity-input")[0]
        .value;
      var itemTotalPrice = Math.round(price * quantity * 100) / 100;
  
      var invoiceRow = document.createElement("div");
      invoiceRow.classList.add("invoice-row");
      var invoiceRowContent = `
       <div class="product-details-wrapper flex">
         <div class="product-details-invoice">
           <p>Product : ${product}</p>
           <p>Quantity : ${quantity}</p>
           <p>Price : $${itemTotalPrice}</p>
         </div>
         <div class="product-image-invoice">
           <img src="${img}" alt="" />
         </div>
       </div>`;
      invoiceRow.innerHTML = invoiceRowContent;
  
      invoiceRows.append(invoiceRow);
    }
    var invoiceTotal = document.getElementsByClassName("invoice-total")[0];
    invoiceTotal.innerHTML = `<strong>Total Bill : </strong> ${cartTotal}`;
  }
  
  // Function to add user info to invoice 
  function setCustomerDetails() {
    var invoiceName = document.getElementsByClassName("customer-name-invoice")[0];
    var invoiceEmail = document.getElementsByClassName("customer-email-invoice")[0];
  
    invoiceName.innerHTML = `Name : ${document.getElementById("user-name").value}`;
    invoiceEmail.innerHTML = `Email : ${document.getElementById("user-email").value}`;
  }