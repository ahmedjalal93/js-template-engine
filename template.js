    var elem = window.document.getElementById("mytemplate");
    var template = elem.cloneNode(true);


    function append() {
        if (data instanceof Array) {
            for (var x in data) {
                var clone = template.cloneNode(true);
                var text = clone.innerHTML;
                var matches = text.match(/\{{.*?}\}/g);
                for (var i = 0; i < matches.length; i++) {
                    var varname = matches[i].substring(2, matches[i].length - 2);
                    var text = text.replace(matches[i], eval('data[x].' + varname));
                    clone.innerHTML = text;
                    elem.parentNode.appendChild(clone);
                }
            }
        } else {
            var clone = template.cloneNode(true);
            var text = clone.innerHTML;
            var matches = text.match(/\{{.*?}\}/g);
            for (var i = 0; i < matches.length; i++) {
                var varname = matches[i].substring(2, matches[i].length - 2);
                var text = text.replace(matches[i], eval('data.' + varname));
                clone.innerHTML = text;
                elem.parentNode.appendChild(clone);
            }
        }
    }

    function render() {
        if (data instanceof Array) {
            for (var x in data) {
                var clone = template.cloneNode(true);
                var text = clone.innerHTML;
                var matches = text.match(/\{{.*?}\}/g);
                for (var i = 0; i < matches.length; i++) {
                    var varname = matches[i].substring(2, matches[i].length - 2);
                    var text = text.replace(matches[i], eval('data[x].' + varname));
                    clone.innerHTML = text;
                    elem.innerHTML = '';
                    elem.parentNode.appendChild(clone);
                }
            }
        } else {
            var text = template.innerHTML;
            var matches = text.match(/\{{.*?}\}/g);
            for (var i = 0; i < matches.length; i++) {
                var varname = matches[i].substring(2, matches[i].length - 2);
                var text = text.replace(matches[i], eval('data.' + varname));
                elem.innerHTML = text;
            }
        }
    }
