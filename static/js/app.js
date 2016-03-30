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
    initLink();
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
                    var query = parseQuery(href);
                    if(id === '' && query.type) { return; }
                    else if(query.type !== parseQuery(id).type) { return; }
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
                    var query = parseQuery(href);
                    console.log(id, query);
                    if(id === '' && query.region) { return; }
                    else if(query.region !== parseQuery(id).region) { return; }
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

function initLink() {
    if(location.search === '') return;
    var query = parseQuery(location.search);

    var types = $('#product-types');
    if(types.length > 0) {
        types.find('li')
            .toArray()
            .map(function(li) { return $(li).find('a'); })
            .forEach(function(a) {
                var href = a.attr('href');
                var localQuery = parseQuery(href);
                var targetQuery = mixin(query.region ? { region: query.region }: {}, localQuery);
                var targetQueryString = compileQuery(targetQuery);
                var targetHref = href.split('?')[0] + targetQueryString;
                a.attr('href', targetHref);
            });
    }   
    
    var regions = $('#region-list');
    if(regions.length > 0) {
        regions.find('li')
            .toArray()
            .map(function(li) { return $(li).find('a'); })
            .forEach(function(a) {
                var href = a.attr('href');
                var localQuery = parseQuery(href);
                var targetQuery = mixin(query.type ? { type: query.type }: {}, localQuery);
                var targetQueryString = compileQuery(targetQuery);
                var targetHref = href.split('?')[0] + targetQueryString;
                a.attr('href', targetHref);
            });
    }   
}

function parseQuery(query) {
    var res = {};
    if(query.indexOf('?') >= 0) {
        query = query.split('?')[1];
        
        var pairs = query.split('&');
        pairs.forEach(function(pair) {
            var datas = pair.split('=');
            res[datas[0]] = datas[1];
        });
    }
    
    return res;
}

function compileQuery(object) {
    var res = '';
    if(JSON.stringify(object) !== '{}') {
        for(var key in object) {
            res += ('&' + key + '=' + object[key]);
        }
        res = '?' + res.substring(1);
    }
    return res;
}

function mixin(base, extend) {
    var res = {};
    for(var key in base) {
        res[key] = base[key];
    }
    for(var key in extend) {
        res[key] = extend[key];
    }
    return res;
}


/*
 * This is the function that actually highlights a text string by
 * adding HTML tags before and after all occurrences of the search
 * term. You can pass your own tags if you'd like, or if the
 * highlightStartTag or highlightEndTag parameters are omitted or
 * are empty strings then the default <font> tags will be used.
 */
function doHighlight(bodyText, searchTerm, highlightStartTag, highlightEndTag) 
{
  // the highlightStartTag and highlightEndTag parameters are optional
  if ((!highlightStartTag) || (!highlightEndTag)) {
    highlightStartTag = '<span class="highlight">';
    highlightEndTag = '</span>';
  }
  
  // find all occurences of the search term in the given text,
  // and add some "highlight" tags to them (we're not using a
  // regular expression search, because we want to filter out
  // matches that occur within HTML tags and script blocks, so
  // we have to do a little extra validation)
  var newText = "";
  var i = -1;
  var lcSearchTerm = searchTerm.toLowerCase();
  var lcBodyText = bodyText.toLowerCase();
    
  while (bodyText.length > 0) {
    i = lcBodyText.indexOf(lcSearchTerm, i+1);
    if (i < 0) {
      newText += bodyText;
      bodyText = "";
    } else {
      // skip anything inside an HTML tag
      if (bodyText.lastIndexOf(">", i) >= bodyText.lastIndexOf("<", i)) {
        // skip anything inside a <script> block
        if (lcBodyText.lastIndexOf("/script>", i) >= lcBodyText.lastIndexOf("<script", i)) {
          newText += bodyText.substring(0, i) + highlightStartTag + bodyText.substr(i, searchTerm.length) + highlightEndTag;
          bodyText = bodyText.substr(i + searchTerm.length);
          lcBodyText = bodyText.toLowerCase();
          i = -1;
        }
      }
    }
  }
  
  return newText;
}


/*
 * This is sort of a wrapper function to the doHighlight function.
 * It takes the searchText that you pass, optionally splits it into
 * separate words, and transforms the text on the current web page.
 * Only the "searchText" parameter is required; all other parameters
 * are optional and can be omitted.
 */
function highlightSearchTerms(searchText, treatAsPhrase, warnOnFailure, highlightStartTag, highlightEndTag)
{
  // if the treatAsPhrase parameter is true, then we should search for 
  // the entire phrase that was entered; otherwise, we will split the
  // search string so that each word is searched for and highlighted
  // individually
  if (treatAsPhrase) {
    searchArray = [searchText];
  } else {
    searchArray = searchText.split(" ");
  }
  
  var range = $('#list-search-result');
  if (!range || range.length <= 0) {
    return false;
  }
  
  var bodyText = range.html();
  for (var i = 0; i < searchArray.length; i++) {
    bodyText = doHighlight(bodyText, searchArray[i], highlightStartTag, highlightEndTag);
  }
  
  range.html(bodyText);
  return true;
}

