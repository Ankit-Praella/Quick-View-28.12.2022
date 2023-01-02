class QuickView extends HTMLElement {
  constructor() {
    super();
    this.bindEvents();
  }
  /**
  *  bind Events
  */
  bindEvents() {
    this.openeBy = document.querySelectorAll(".quickview--button");
    this.openeBy.forEach((btn) =>
      btn.addEventListener("click", this.openQuickShop.bind(this))
    );
  }
  /**
  *  Open Modal
  */
  openQuickShop(event) {
    event.preventDefault();
    let currentTarget = event.currentTarget;
    var dataHandle = currentTarget.dataset.handle;
    this.loadQuickShop(dataHandle);
    this.closeQuickView(dataHandle);
  }
  /**
  *  Close Modal
  */
  closeQuickView() {
    document.querySelectorAll(".close-quickview").forEach((item) => {
      item.addEventListener("click", (event) => {
        document.querySelector(".quick-modal").style.display = "none";
      });
    });
  }
  /**
  *  render Product data using Product handle
  */
  loadQuickShop(dataHandle) {
    fetch(
      `/products/${dataHandle}?view=quickview&sections=template-product-quickview`
    )
      .then((response) => response.json())
      .then((result) => {
        document
          .querySelector("quick-view")
          .setAttribute("quick-viewhandle", dataHandle);
        document.querySelector("quick-view").innerHTML =
          result[`template-product-quickview`];
        var quickViewData = (document.querySelectorAll("quick-view").innerHTML = result[`template-product-quickview`]);
        document.querySelector("quick-view").setAttribute("id", "main");
        this.closeQuickView(quickViewData);
        this.ajaxCart(quickViewData);
        this.VariantChange(quickViewData);
        this.manageQuantity(quickViewData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
  *  manageQuantity Item
  */
  manageQuantity(qtyButton) {
    var qtyButton = document.querySelectorAll('[data-qty-btn]');
    qtyButton.forEach((item) => {
      item.addEventListener("click", (event) => {
        let currentTarget = event.currentTarget;
        let $qtyInputBox = currentTarget.closest('[data-qty-container]').querySelector('[data-qty-input]');
        var currentQty = parseInt($qtyInputBox.value) || 1;
        let finalQty = 1;
        if (currentTarget == 'minus' && currentQty <= 1) {
          return false
        } else if (currentTarget == 'minus') {
          finalQty = currentQty - 1;
        } else {
          finalQty = currentQty + 1;
          $qtyInputBox.value = finalQty;
        }
      });
    });
  }

  /**
  *  Variant Change of Item
  */
  variantChange(selectVariant) {
    var selectVariant = document.querySelector("[select_variants]");
    selectVariant.addEventListener("change", (event) => {
      var varId = event.target.selectedOptions[0].getAttribute("variant-id");
      const jsonStr = document.getElementById("json-data").textContent;
      const jsonData = JSON.parse(jsonStr);
      jsonData.variants.filter((variant) => {
        if (variant.id == varId) {
          var productPrice = Shopify.formatMoney(variant.price);
          var productComparePrice = Shopify.formatMoney(variant.compare_at_price);
          document.querySelector(".actual-price").innerHTML = `${productPrice}`;
          document.querySelector(".compare-price").innerHTML = `${productComparePrice}`;
          if (variant.available === true) {
            document.getElementById("add_cart").removeAttribute("disabled", "");
            document.getElementById("add_cart").innerHTML = "ADD TO CART";
          } else {
            document.getElementById("add_cart").setAttribute("disabled", "");
            document.getElementById("add_cart").innerHTML = "Sold Out";
          }
        }
      });
      var data_indexno = event.target.selectedOptions[0].getAttribute("data-indexno");
      quickShopSlider.slideTo(data_indexno, 1000);
    });
  }
  /**
  *  addCart of Item
  */
  ajaxCart(currentQty) {
    var items = document.querySelector("[addCart]");
      items.addEventListener("click", (event) => {
       var quickView = document.querySelector("quick-view"); 
       var quantityValue = quickView.querySelector("[data-qty-input]").value
       const addCart = document.getElementById("add_cart");
        let mainPro = addCart.getAttribute("product_id");
        var variantId = document.querySelector(`select[product_id="${mainPro}"]`).value;
          let formData = {
            items: [
              {
                id: variantId,
                quantity: quantityValue,
              },
            ],
          };
          fetch(window.Shopify.routes.root + "cart/add.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((response) => {
              document.getElementById("add_cart").classList.add("loading");
              if (response.status == 200) {
                let cartElementx = document.querySelector("ajax-cart");
                cartElementx.getCartData("open_drawer");
              }
              setTimeout(function () {
                document.querySelectorAll(".close-quickview").forEach((item) => {
                  document.querySelector(".quick-modal").style.display = "none";
                });
              }, 100);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
  }
}
customElements.define("quick-view", QuickView);
