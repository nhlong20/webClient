$(document).ready(function () {
    function showPage(response) {
        $('#loader').css('display', 'none');
        $('#product-content').css('display', 'block');
        $('#products').html(response);
        $('#current-page').css({
            'background-color': 'rgb(52, 127, 224)',
            color: '#fff'
        });
    }
    function configEventListener(value, DOM) {
        $('#loader').css('display', 'block');
        $('#product-content').css('display', 'none');
        let query = '';
        if (DOM != null) {
            query = value + '=' + DOM.data('view-label');
        } else {
            query = value;
        }
        getProductAjax(query);
    }
    function getQuery(url) {
        query = url.split('?').pop();
        return query;
    }

    $('.brand-label').click(function (e) {
        e.preventDefault();
        configEventListener('brand', $(this));
    });
    $('.color-label').click(function (e) {
        e.preventDefault();
        configEventListener('color', $(this));
    });
    // $('.page-link').click(function (e) {
    //     e.preventDefault();
    //     const query = getQuery($(this).attr('href'));
    //     configEventListener(query, null);
    // });
    function getProductAjax(query) {
        const data = `category=${window.location.pathname.split('/').pop()}`;
        $.ajax({
            type: 'GET',
            url: '/api/v1/products?' + query,
            data,
            contentType: 'application/json',
            success: function (response) {
                if (history.pushState) {
                    var newurl =
                        window.location.protocol +
                        '//' +
                        window.location.host +
                        window.location.pathname +
                        '?' +
                        query;
                    window.history.pushState({}, '', newurl);
                }
                showPage(response);
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
    $('.add-to-cart-btn').click(function (e) {
        e.preventDefault();

        $('.cart-bg-overlay').toggleClass('cart-bg-overlay-on');
        $('.right-side-cart-area').toggleClass('cart-on');
        $.ajax({
            type: 'POST',
            url: '/api/v1/cart/' + $(this).data('product-id'),
            contentType: 'application/json',
            success: function (response) {
                const { cart } = response;
                let htmlCartItems = '';
                for (let id in cart.items) {
                    htmlCartItems += `  <ul class="cart-list">
                    <!-- Single Cart Item -->
                        <li class="cart-item">
                          <div class="cart-item-image--container">
                            <img class="cart-item-image"
                              src="${cart.items[id].item.coverImage}"
                              class="cart-thumb" alt="">
                          </div>
                          <div class="cart-item-content">
                            <div class="cart-item-label"><span class="cart-item-name">${
                                cart.items[id].item.name
                            } </span><span>${cart.items[id].item.brand}- ${
                        cart.items[id].item.size
                    } </span></div>
              
                            <div class="cart-item-quantity">
                              <form action="/api/v1/cart/change" method="POST">
                                <div class="quantity-group">
                                  <input class="quantity-input" type="number" name="quantity" min=0 pattern="[0-9]" value="${
                                      cart.items[id].qty
                                  }">
                                </div>
                              </form>
                              <span class="cart-item-oxF">x</span>
                              <div class="cart-item-price">${
                                numberWithCommas(cart.items[id].item.price * cart.items[id].qty)
                              } VNĐ</div>
                            </div>
              
                          </div>
                          <div class="cart-item-action">
                            <i data-product-id="${id}" class="fal fa-trash-alt fa-lg"></i>
                          </div>
                        </li>
                  </ul>`;
                }
                $('.value-summary').html(`${numberWithCommas(cart.totalPrice)} VNĐ`)
                $('#cart-content-ajax').html(htmlCartItems);
                $('#cart-no')
                    .html(`<a href="#" id="essenceCartBtn"><i class="fal fa-shopping-cart fa-lg"></i>
                    <span>${cart.totalQty}</span>         
            </a>`);
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
    $('.right-side-cart-area').on('click','.fa-trash-alt', function(e){
        e.preventDefault();
        console.log("OK?")
        $.ajax({
            type: 'DELETE',
            url: '/api/v1/cart/' + $(this).data('product-id'),
            contentType: 'application/json',
            success: function (response) {
                const { cart } = response;
                let htmlCartItems = '';
                for (let id in cart.items) {
                    htmlCartItems += `  <ul class="cart-list">
                    <!-- Single Cart Item -->
                        <li class="cart-item">
                          <div class="cart-item-image--container">
                            <img class="cart-item-image"
                              src="${cart.items[id].item.coverImage}"
                              class="cart-thumb" alt="">
                          </div>
                          <div class="cart-item-content">
                            <div class="cart-item-label"><span class="cart-item-name">${
                                cart.items[id].item.name
                            } </span><span>${cart.items[id].item.brand}- ${
                        cart.items[id].item.size
                    } </span></div>
              
                            <div class="cart-item-quantity">
                              <form action="/api/v1/cart/change" method="POST">
                                <div class="quantity-group">
                                  <input class="quantity-input" type="number" name="quantity" min=0 pattern="[0-9]" value="${
                                      cart.items[id].qty
                                  }">
                                </div>
                              </form>
                              <span class="cart-item-oxF">x</span>
                              <div class="cart-item-price">${
                                numberWithCommas(cart.items[id].item.price * cart.items[id].qty)
                              } VNĐ</div>
                            </div>
              
                          </div>
                          <div class="cart-item-action">
                            <i data-product-id="${id}" class="fal fa-trash-alt fa-lg"></i>
                          </div>
                        </li>
                  </ul>`;
                }
                $('.value-summary').html(`${numberWithCommas(cart.totalPrice)} VNĐ`)
                $('#cart-content-ajax').html(htmlCartItems);
                $('#cart-no')
                    .html(`<a href="#" id="essenceCartBtn"><i class="fal fa-shopping-cart fa-lg"></i>
                    <span>${cart.totalQty}</span>         
            </a>`);
            },
            error: function (err) {
                console.log(err);
            }
        });
    })
    // $('#change-password').click(function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         type: 'GET',
    //         url: '/api/v1/password/change',
    //         contentType: 'application/json',
    //         success: function (response) {
    //             if (history.pushState) {
    //                 var newurl =
    //                     window.location.protocol +
    //                     '//' +
    //                     window.location.host +
    //                     window.location.pathname +
    //                     '/password/change';
    //                 window.history.pushState({}, '', newurl);
    //             }
    //             $('#profile-wrapper').html(response);
    //         },
    //         error: function (err) {
    //             console.log(err);
    //         }
    //     });
    // });
    function numberWithCommas(price) {
        var parts = price.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parts.join(',');
    }
    $('#current-page').css({
        'background-color': 'rgb(52, 127, 224)',
        color: '#fff'
    });
});
