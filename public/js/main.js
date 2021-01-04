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

    $('#current-page').css({
        'background-color': 'rgb(52, 127, 224)',
        color: '#fff'
    });
});
$(document).ready(function () {
    let min = $('#minPrice').val();
    let max = $('#maxPrice').val();
    var rangeSlider = $('#slider-range-price').get(0);
    var moneyFormat = wNumb({
        decimals: 0,
        thousand: '.',
        prefix: ' VNĐ'
    });
    noUiSlider.create(rangeSlider, {
        start: [min, max],
        step: 1,
        range: {
            min: [0],
            max: [5000000]
        },
        format: moneyFormat,
        connect: true
    });

    // Set visual min and max values and also update value hidden form inputs
    rangeSlider.noUiSlider.on('update', function (values, handle) {
        $('#slider-range-min').html(values[0]);
        $('#slider-range-max').html(values[1]);
        $('#minPrice').val(moneyFormat.from(values[0]));
        $('#maxPrice').val(moneyFormat.from(values[1]));
    });
});