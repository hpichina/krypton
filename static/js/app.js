if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

$(document).ready(function() {
    $('#wechat-link').click(function() {
        $('#weiLayer').show();
    });
    $('#hide-wechat-link').click(function() {
        $('#weiLayer').hide();
    });
    $(document).click(function(event) {
        if($(event.target).closest('.region-selector').length > 0) {
            $('#region-list').toggle();
        } else {
            $('#region-list').hide();
        }
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
            
        case 'coop-region':
        case 'product-region':
            var region_list = $('#region-list');
            if(!region_list) break;
            region_list
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
                    a.addClass('btn-warning');
                    $('#current-region').text(a.text());
                });
            break;
            
        case 'coops': 
            var main_menu = $('#main-menu');
            if(!main_menu) break;
            main_menu
                .find('li')
                .toArray()
                .map(function(li) { return $(li).find('a'); })
                .forEach(function(a) {
                    var href = a.attr('href');
                    if(href.indexOf('coop') >= 0) {
                        a.addClass('is-active');
                    }
                });
            break;
    }
}

// function initLink() {
//     if(location.search === '') return;
//     var query = parseQuery(location.search);
    
//     var product_types = $('#product-types');
//     if(type in query && product_types.length > 0) {
//         product_types
//             .find('li')
//             .toArray()
//             .map(function(li) { return $(li).find('a'); })
//             .forEach(function(a) {
//                 var href = a.attr('href');
                
//             });
//     }
    
//     var 
    
// }

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
