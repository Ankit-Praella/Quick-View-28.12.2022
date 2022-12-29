// class ProductDetails extends HTMLElement {
  
//   constructor() {
//     super()
//     this.bindEvents()
//     var selectVariant = document.querySelector('[select_variants]');
//     if (selectVariant.length > 0) {
//       this.variantChange(selectVariant);
//     }
    
//   }
//   /**
//   *  bind Events
//   */
//   bindEvents() {
//     // this.addcart = document.querySelectorAll('[addCart]');
//     // this.addcart.forEach(btn => btn.addEventListener('click', this.addCart.bind(this)));
//     this.qtyButton = document.querySelectorAll('[data-qty-btn]');
//     this.qtyButton.forEach(btn => btn.addEventListener('click', this.manageQuantity.bind(this)));
//   }
//   /**
//   *  addCart of Item
//   */
//   addCart(event) {
//     const addCart = document.getElementById('add_cart');
//     let mainPro = addCart.getAttribute("product_id");
//     var variantId = document.querySelector(`select[product_id="${mainPro}"]`).value;
//     let quantityValue = document.querySelector('[data-qty-input]').value;
//     let formData = {
//       'items': [{
//         'id': variantId,
//         'quantity': quantityValue
//       }]
//     };
//     fetch(window.Shopify.routes.root + 'cart/add.js', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(formData)
//     })
//     .then(response => {
//       document.getElementById('add_cart').classList.add("loading");
//       if (response.status == 200) {
//         let cartElementx = document.querySelector('ajax-cart');
//         cartElementx.getCartData('open_drawer');
//       }
//       setTimeout(function() {
//         document.querySelectorAll('.close-quickview').forEach(item => {
//           document.querySelector('.quick-modal').style.display = "none";
//         })
//       }, 100)
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
//   }
//   /**
//   * Dropdown selection for options
//   */
//   async variantChange(selectVariant) {
//     var getHandle = document.querySelector('[quick-viewhandle]').getAttribute("quick-viewhandle");  
//     var itemObject = await this.renderProductInfo(getHandle);
//     selectVariant.addEventListener('change', (event) => {
//       let getVariantQuantity = event.target.selectedOptions[0].getAttribute("variant_quantity");
//       if (getVariantQuantity == 0) {
//         document.getElementById("add_cart").setAttribute("disabled", "");
//         document.getElementById('add_cart').innerHTML = "Sold Out"
//       } else {
//         document.getElementById("add_cart").removeAttribute("disabled", "");
//         document.getElementById('add_cart').innerHTML = "ADD TO CART"
//       }
//       var varId =  event.target.selectedOptions[0].getAttribute("variant-id");
//       itemObject.product.variants.filter(variant => {
//         if (variant.id == varId) {
//           console.log(variant);
//           document.querySelector('.actual-price').innerHTML = `${variant.price}`
//           document.querySelector('.compare-price').innerHTML = `${variant.compare_at_price}`;  
//           console.log(variant.inventory_quantity)
//         }
//       })
//       var data_indexno = event.target.selectedOptions[0].getAttribute("data-indexno");
//       quickShopSlider.slideTo(data_indexno, 1000);
//     }); 
//   }
//   /**
//   *  manageQuantity Item
//   */
//   manageQuantity(event) {
//     event.preventDefault();
//     let currentTarget = event.currentTarget;
//     let $qtyInputBox = currentTarget.closest('[data-qty-container]').querySelector('[data-qty-input]');
//     let currentQty = parseInt($qtyInputBox.value) || 1;
//     let finalQty = 1;
//     if (currentTarget == 'minus' && currentQty <= 1) {
//       return false
//     } else if (currentTarget == 'minus') {
//       finalQty = currentQty - 1;
//     } else {
//       finalQty = currentQty + 1;
//       $qtyInputBox.value = finalQty;
//     }
//   }
  
//   async  renderProductInfo(varChange) {
//     const result = await fetch(`/products/${varChange}?view=quickview&sections=template-product-quickview.json`, {
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"
//       }
//     });
//     return result.json();
//   }
  
// }
// customElements.define("product-details", ProductDetails)
