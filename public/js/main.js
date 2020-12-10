(function ($) {
    function showPage(response) {
        $('#loader').css('display', 'none');
        $('#products').css('display', 'block');
        $('#products').html(response);
    }
    function configEventListener(value, DOM) {
        $('#loader').css('display', 'block');
        $('#products').css('display', 'none');
        const query = value + '=' + DOM.data('view-label');
        getProductAjax(query);
    }
    $('.brand-label').click(function (e) {
        e.preventDefault();
        configEventListener('brand', $(this));
    });
    $('.color-label').click(function (e) {
        e.preventDefault();
        configEventListener('color', $(this));
    });
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
})(jQuery);
