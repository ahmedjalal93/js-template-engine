var template = {
    element: null,
    default: null,
    prepare: function (templ) {
        this.element = window.document.getElementById(templ);
        this.default = this.element.cloneNode(true);
        return this;
    },
    functions: function(varname, x){
                if(x === undefined){
                    var newval = data;
                }else{
                    var newval = data[x];
                }
                if(varname.indexOf("|") > -1){
                    var filters = varname.split(/\|/g);
                    var filter = filters[1].replace(/\s+/g, '').split(/\,/g);
                    return this.Filters(eval('newval.'+filters[0]), filter);
                }else{
                    return eval('newval.'+varname);
                }
        console.log(value);
    },
    Filters: function(value, filter){
        switch(filter[0]){
        case 'Replace':
            return value.replace(eval(filter[1]), eval(filter[2]));
        }
    },
    append: function (data) {
        if (data instanceof Array) {
            for (var x in data) {
                var clone = this.default.cloneNode(true);
                var text = clone.innerHTML;
                var matches = text.match(/\{{.*?}\}/g);
                for (var i = 0; i < matches.length; i++) {
                    var varname = matches[i].substring(2, matches[i].length - 2);
                    var text = text.replace(matches[i], eval('data[x].' + varname));
                    clone.innerHTML = text;
                    this.element.parentNode.appendChild(clone);
                }
            }
        } else {
            var clone = this.default.cloneNode(true);
            var text = clone.innerHTML;
            var matches = text.match(/\{{.*?}\}/g);
            for (var i = 0; i < matches.length; i++) {
                var varname = matches[i].substring(2, matches[i].length - 2);
                var text = text.replace(matches[i], eval('data.' + varname));
                clone.innerHTML = text;
                this.element.parentNode.appendChild(clone);
            }
        }
    },

    render: function (data) {
        if (data instanceof Array) {
            for (var x in data) {
                var clone = this.default.cloneNode(true);
                var text = clone.innerHTML;
                var matches = text.match(/\{{.*?}\}/g);
                for (var i = 0; i < matches.length; i++) {
                    var varname = matches[i].substring(2, matches[i].length - 2);
                    var text = text.replace(matches[i], this.functions(varname, x));
console.log(text);
                    clone.innerHTML = text;
                    this.element.parentNode.appendChild(clone);
                }
            }
        } else {
            var text = this.default.innerHTML;
            var matches = text.match(/\{{.*?}\}/g);
            for (var i = 0; i < matches.length; i++) {
                var varname = matches[i].substring(2, matches[i].length - 2);
                var text = text.replace(matches[i], this.functions(varname));
                this.element.innerHTML = text;
            }
        }
    }
}

window.onload = function () {
template.prepare("mytemplate").render(data);
}
