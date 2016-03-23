$(document).ready(function() {
    $('#wechat-link').click(function() {
        $('#weiLayer').show();
    });
    $('#hide-wechat-link').click(function() {
        $('#weiLayer').hide();
    });
    $('#coop-region-dropdown').click(function() {
        $('#coop-region-list').toggle();
    });
});

function highlight(type, id) {
    switch(type) {
        case 'product_type':
            var product_types = $('#product-types');
            if(!product_types) break;
            product_types
                .find('li')
                .toArray()
                .map(function(li) { return $(li).find('a'); })
                .forEach(function(a) {
                    var href = a.attr('href');
                    if(id === '') {
                        var query = parseQuery(href);
                        if(JSON.stringify(query) !== '{}') { return; }
                    }
                    else if(!href.endsWith(id)) { return; }
                    a.removeClass('btn-default');
                    a.addClass('btn-warning');
                });
            break;
            
        case 'products': 
            var main_menu = $('#main-menu');
            if(!main_menu) break;
            main_menu
                .find('li')
                .toArray()
                .map(function(li) { return $(li).find('a'); })
                .forEach(function(a) {
                    var href = a.attr('href');
                    if(href.indexOf('product') >= 0) {
                        a.addClass('is-active');
                    }
                });
            break;
    }
}

function parseQuery(query) {
    var res = {};
    if(query.indexOf('?') >= 0) {
        query = query.split('?')[1];
    }
    var pairs = query.split('&');
    pairs.forEach(function(pair) {
        var datas = pair.split('=');
        res[datas[0]] = datas[1];
    });
    return res;
}
