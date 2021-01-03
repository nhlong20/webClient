(function($) {
    'use strict';

    var $window = $(window);
    // Initialize and add the map

    // :: Nav Active Code
    if ($.fn.classyNav) {
        $('#essenceNav').classyNav();
    }

    // :: Sliders Active Code
    if ($.fn.owlCarousel) {
        $('.popular-products-slides').owlCarousel({
            items: 4,
            margin: 30,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
        $('.product_thumbnail_slides').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: [
                "<img src='/img/core-img/long-arrow-left.svg' alt=''>",
                "<img src='/img/core-img/long-arrow-right.svg' alt=''>"
            ],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });
    }

    // :: Header Cart Active Code
    var cartOverlay = $('.cart-bg-overlay');
    var cartWrapper = $('.right-side-cart-area');
    var closeCartBtn = $('#close-cart-btn');
    var cartOverlayOn = 'cart-bg-overlay-on';
    var cartOn = 'cart-on';

    $('#cart-no').on('click', '#essenceCartBtn', function() {
        cartOverlay.toggleClass(cartOverlayOn);
        cartWrapper.toggleClass(cartOn);
    });
    cartOverlay.on('click', function() {
        $(this).removeClass(cartOverlayOn);
        cartWrapper.removeClass(cartOn);
    });
    closeCartBtn.on('click', function() {
        cartOverlay.removeClass(cartOverlayOn);
        cartWrapper.removeClass(cartOn);
    });

    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // :: Sticky Active Code
    $window.on('scroll', function() {
        if ($window.scrollTop() > 0) {
            $('.header_area').addClass('sticky');
        } else {
            $('.header_area').removeClass('sticky');
        }
    });

    // :: Nice Select Active Code
    if ($.fn.niceSelect) {
        $('select').niceSelect();
    }

    $('.add-to-cart-btn').click(function(e) {
        e.preventDefault();

        $('.cart-bg-overlay').toggleClass('cart-bg-overlay-on');
        $('.right-side-cart-area').toggleClass('cart-on');
        $.ajax({
            type: 'POST',
            url: '/api/v1/cart/' + $(this).data('product-id'),
            contentType: 'application/json',
            success: function(response) {
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
                              <div class="cart-item-price">${numberWithCommas(
                                  cart.items[id].item.price * cart.items[id].qty
                              )} VNĐ</div>
                            </div>
              
                          </div>
                          <div class="cart-item-action">
                            <i data-product-id="${id}" class="fal fa-trash-alt fa-lg"></i>
                          </div>
                        </li>
                  </ul>`;
                }
                $('.value-summary').html(
                    `${numberWithCommas(cart.totalPrice)} VNĐ`
                );
                $('#cart-content-ajax').html(htmlCartItems);
                $('#cart-no')
                    .html(`<a href="#" id="essenceCartBtn"><i class="fal fa-shopping-cart fa-lg"></i>
                    <span>${
                        cart.totalQty != 0 ? cart.totalQty : ''
                    }</span>         
            </a>`);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
    $('.right-side-cart-area').on('click', '.fa-trash-alt', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'DELETE',
            url: '/api/v1/cart/' + $(this).data('product-id'),
            contentType: 'application/json',
            success: function(response) {
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
                              <div class="cart-item-price">${numberWithCommas(
                                  cart.items[id].item.price * cart.items[id].qty
                              )} VNĐ</div>
                            </div>
              
                          </div>
                          <div class="cart-item-action">
                            <i data-product-id="${id}" class="fal fa-trash-alt fa-lg"></i>
                          </div>
                        </li>
                  </ul>`;
                }
                $('.value-summary').html(
                    `${numberWithCommas(cart.totalPrice)} VNĐ`
                );
                $('#cart-content-ajax').html(htmlCartItems);
                $('#cart-no')
                    .html(`<a href="#" id="essenceCartBtn"><i class="fal fa-shopping-cart fa-lg"></i>
                    <span>${
                        cart.totalQty != 0 ? cart.totalQty : ''
                    }</span>         
            </a>`);
            },
            error: function(err) {
                console.log(err);
            }
        });
    });

    $('.rating-body').on('click', '.review-change-btn', function(e) {
        e.preventDefault();
        let id = $(this).data('comment-id');
        let productId = window.location.pathname.split('/')[2];

        let title = $('#title-review-' + id)
            .text()
            .trim();
        let review = $('#content-review-' + id)
            .text()
            .trim();
        $.ajax({
            type: 'PATCH',
            url: '/api/v1/review/' + id,
            data: { title, review, productId },
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
                const { message, ratingAverage, reviews } = response;
                let htmlReviews = '';
                htmlReviews += `<div class="rating-inner ">
                <div class="reiview-rating-heading ">Đánh giá</div>`;
                if (reviews.length != 0) {
                    htmlReviews += ` <div class="d-flex flex-row bd-highlight mb-3 ">
                    <span class="fas fa-star " `;
                    if (ratingAverage >= 1) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += `></span>
                            <span class="fas fa-star " `;
                    if (ratingAverage >= 2) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += `></span>
                            <span class="fas fa-star " `;
                    if (ratingAverage >= 3) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += ` ></span>
                            <span class="fas fa-star " `;
                    if (ratingAverage >= 4) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += `></span>
                            <span class="fas fa-star " `;
                    if (ratingAverage == 5) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += `></span>
                    <span class="ml-2 ">
                        ${ratingAverage}   (${reviews.length} nhận xét)
                    </span>
                </div>`;
                } else {
                    htmlReviews += `<span> Chưa có bài đánh giá </span>
                    </div>`;
                }

                if (reviews.length != 0) {
                    reviews.forEach(review => {
                        let date = new Date(review.updatedAt);
                        htmlReviews += ` 
                        <hr>
                        <div class="rating-comment ">
                            <div class="d-flex flex-row bd-highlight mb-3 ">
                                <div class="rating-comment-avatar ">
                                `
                        if (review.user != null) {
                            htmlReviews += `<img src="${review.user.avatar}" alt="Ảnh đại diện người dùng ">`
                        } else { htmlReviews += `<img src="http://simpleicon.com/wp-content/uploads/user1.png" alt="Ảnh đại diện người dùng ">` }
                        htmlReviews += `
                                </div>
                                <div class="d-flex flex-column bd-highlight ml-15 ">`
                        if (review.user != null) {
                            htmlReviews += ` <span class="rating-comment-name "> ${review.user.name}</span>`
                        } else { htmlReviews += ` <span class="rating-comment-name "> ${review.guestName}  <span style="font-size: smaller;">(khách)</span></span>` }
                        htmlReviews += `<span class="rating-comment-date ">
                                        Nhận xét vào ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
                                    </span>
                                </div>
                            </div>`
                        if (review.user != null) {
                            htmlReviews += `<div class="d-flex flex-row bd-highlight mb-3 ">
                                <span class="fas fa-star " `;
                            if (review.rating >= 1) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }
                            htmlReviews += `></span>
                                <span class="fas fa-star " `;
                            if (review.rating >= 2) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }
                            htmlReviews += `></span>
                                <span class="fas fa-star " `;
                            if (review.rating >= 3) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }
                            htmlReviews += ` ></span>
                                <span class="fas fa-star " `;
                            if (review.rating >= 4) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }
                            htmlReviews += `></span>
                                <span class="fas fa-star " `;
                            if (review.rating == 5) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }

                            htmlReviews += `></span>
                            </div>
                            `
                        }
                        htmlReviews += `
                            <div class="rating-comment-title ">
                                ${review.title}
                            </div>
                            <div class="rating-comment-content ">
                                ${review.review}
                            </div>
                            
                        </div>`;
                    });
                }

                $('.all-rating-body').html(htmlReviews);
                let mes = document.getElementById('message');
                mes.style.display = 'block';
                mes.innerHTML = message;
            },
            error: function(err) {
                const message = err.responseJSON.message;

                let mes = document.getElementById('message');
                mes.style.display = 'block';
                mes.innerHTML = message;
            }
        });
    });

    $('.rating-body').on('click', '.review-delete-btn', function(e) {
        e.preventDefault();
        let id = $(this).data('comment-id');
        let productId = window.location.pathname.split('/')[2];
        $.ajax({
            type: 'DELETE',
            url: '/api/v1/review/' + id,
            data: {
                productId
            },
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
                const { message, reviews, uid, ratingAverage } = response;
                //update all revierw
                let htmlReviews = '';

                htmlReviews += `<div class="message alert text-center alert-success" id="message" style="display: block; color: #000;">${message}</div>`;
                if (reviews.length != 0)
                    reviews.forEach(comment => {
                        if (comment.user != null) {
                            if (comment.user._id == uid) {
                                let date = new Date(comment.updatedAt);
                                htmlReviews += ` 
                            <hr>
                            <div class="rating-comment ">
                                <div class="d-flex flex-row bd-highlight mb-3 ">
                                    <div class="rating-comment-avatar ">
                                        <img src="${
                                            comment.user.avatar
                                        }" alt="Ảnh đại diện người dùng ">
                                    </div>
                                    <div class="d-flex flex-column bd-highlight ml-15 ">
                                        <span class="rating-comment-name "> ${
                                            comment.user.name
                                        }</span>
                                        <span class="rating-comment-date ">
                                        Nhận xét vào ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
                                    </span>
                                    </div>
                                </div>
                                <div class="d-flex flex-row bd-highlight mb-3 ">
                                    <span class="fas fa-star " `;
                                if (comment.rating >= 1) {
                                    htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                                }
                                htmlReviews += `></span>
                                    <span class="fas fa-star " `;
                                if (comment.rating >= 2) {
                                    htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                                }
                                htmlReviews += `></span>
                                    <span class="fas fa-star " `;
                                if (comment.rating >= 3) {
                                    htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                                }
                                htmlReviews += ` ></span>
                                    <span class="fas fa-star " `;
                                if (comment.rating >= 4) {
                                    htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                                }
                                htmlReviews += `></span>
                                    <span class="fas fa-star " `;
                                if (comment.rating == 5) {
                                    htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                                }
                                htmlReviews += `></span>
                                </div>
                                <div contenteditable="true" class="rating-comment-title "  id="title-review-${comment._id}">
                                    ${comment.title}
                                </div>
                                <div contenteditable="true" class="rating-comment-content "  id="content-review-${comment._id}">
                                    ${comment.review}
                                </div>
                                <div class="d-flex flex-row mt-3 ">
                                <form data-comment-id="${comment._id}" class="review-change-btn">
                                 <button class="btn btn-primary">Thay đổi</button>
                                </form>
                                <form data-comment-id="${comment._id}" class="review-delete-btn">
                                    <button class="btn btn-danger">Xóa</button>
                                </form>
                            </div> 
                            </div>`;
                            }
                        };
                    });
                $('.rating-body').html(htmlReviews);

                // Render all reviews
                htmlReviews = '';
                htmlReviews += `<div class="rating-inner ">
                <div class="reiview-rating-heading ">Đánh giá</div>`;
                if (reviews.length != 0) {
                    htmlReviews += ` <div class="d-flex flex-row bd-highlight mb-3 ">
                    <span class="fas fa-star " `;
                    if (ratingAverage >= 1) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += `></span>
                            <span class="fas fa-star " `;
                    if (ratingAverage >= 2) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += `></span>
                            <span class="fas fa-star " `;
                    if (ratingAverage >= 3) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += ` ></span>
                            <span class="fas fa-star " `;
                    if (ratingAverage >= 4) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += `></span>
                            <span class="fas fa-star " `;
                    if (ratingAverage == 5) {
                        htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                    }
                    htmlReviews += `></span>
                    <span class="ml-2 ">
                        ${ratingAverage}   (${reviews.length} nhận xét)
                    </span>
                </div>`;
                } else {
                    htmlReviews += `<span> Chưa có bài đánh giá </span>
                    </div>`;
                }

                if (reviews.length != 0) {
                    reviews.forEach(review => {
                        let date = new Date(review.updatedAt);
                        htmlReviews += ` 
                        <hr>
                        <div class="rating-comment ">
                            <div class="d-flex flex-row bd-highlight mb-3 ">
                                <div class="rating-comment-avatar ">
                                `
                        if (review.user != null) {
                            htmlReviews += `<img src="${review.user.avatar}" alt="Ảnh đại diện người dùng ">`
                        } else { htmlReviews += `<img src="http://simpleicon.com/wp-content/uploads/user1.png" alt="Ảnh đại diện người dùng ">` }
                        htmlReviews += `
                                </div>
                                <div class="d-flex flex-column bd-highlight ml-15 ">`
                        if (review.user != null) {
                            htmlReviews += ` <span class="rating-comment-name "> ${review.user.name}</span>`
                        } else { htmlReviews += ` <span class="rating-comment-name "> ${review.guestName}  <span style="font-size: smaller;">(khách)</span></span>` }
                        htmlReviews += `<span class="rating-comment-date ">
                                        Nhận xét vào ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
                                    </span>
                                </div>
                            </div>`
                        if (review.user != null) {
                            htmlReviews += `<div class="d-flex flex-row bd-highlight mb-3 ">
                                <span class="fas fa-star " `;
                            if (review.rating >= 1) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }
                            htmlReviews += `></span>
                                <span class="fas fa-star " `;
                            if (review.rating >= 2) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }
                            htmlReviews += `></span>
                                <span class="fas fa-star " `;
                            if (review.rating >= 3) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }
                            htmlReviews += ` ></span>
                                <span class="fas fa-star " `;
                            if (review.rating >= 4) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }
                            htmlReviews += `></span>
                                <span class="fas fa-star " `;
                            if (review.rating == 5) {
                                htmlReviews += ` style="color:  rgb(0, 132, 255); " `;
                            }

                            htmlReviews += `></span>
                            </div>
                            `
                        }
                        htmlReviews += `
                            <div class="rating-comment-title ">
                                ${review.title}
                            </div>
                            <div class="rating-comment-content ">
                                ${review.review}
                            </div>
                            
                        </div>`;
                    });
                }

                $('.all-rating-body').html(htmlReviews);
            },
            error: function(err) {
                const message = err.responseJSON.message;
                let mes = document.getElementById('message');
                mes.style.display = 'block';
                mes.innerHTML = message;
            }
        });
    });

    // :: Slider Range Price Active Code

    // $('.slider-range-price').each(function () {
    //     var min = jQuery(this).data('min');
    //     var max = jQuery(this).data('max');
    //     var unit = jQuery(this).data('unit');
    //     var value_min = jQuery(this).data('value-min');
    //     var value_max = jQuery(this).data('value-max');
    //     var label_result = jQuery(this).data('label-result');
    //     var t = $(this);
    //     $(this).slider({
    //         range: true,
    //         min: min,
    //         max: max,
    //         values: [value_min, value_max],
    //         slide: function (event, ui) {
    //             var result =
    //                 label_result +
    //                 ' ' +
    //                 numberWithCommas(ui.values[0]) +
    //                 unit +
    //                 ' - ' +
    //                 numberWithCommas(ui.values[1]) +
    //                 unit;
    //             console.log(t);
    //             t.closest('.slider-range').find('.range-price').html(result);
    //         }
    //     });
    // });

    // :: Favorite Button Active Code
    var favme = $('.favme');

    favme.on('click', function() {
        $(this).toggleClass('active');
    });

    favme.on('click touchstart', function() {
        $(this).toggleClass('is_animating');
    });

    favme.on('animationend', function() {
        $(this).toggleClass('is_animating');
    });

    // :: Nicescroll Active Code
    if ($.fn.niceScroll) {
        $('.cart-list, .cart-content').niceScroll();
    }

    // :: wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

    // :: Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: PreventDefault a Click
    $("a[href='#']").on('click', function($) {
        $.preventDefault();
    });

    function numberWithCommas(price) {
        var parts = price.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parts.join(',');
    }

    $('#upload-file-btn').on('change', function() {
        const fileChosen = document.getElementById('file-chosen');
        fileChosen.textContent = this.files[0].name;
    });
})(jQuery);