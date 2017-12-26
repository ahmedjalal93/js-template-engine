var template = {
    element: null,
    default: null,
    prepare: function (templ) {
        this.element = document.getElementById(templ);
        this.default = this.element.cloneNode(true);
        return this;
    },
    functions: function(varname, x){
                if(x === undefined || !(data instanceof Array)){
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
                this.clone = this.default.cloneNode(true);
                this.setAttrs(this.clone);
                this.setData(x);
                this.element.insertAdjacentHTML("beforeend", this.clone);
            }
        } else {
            this.clone = this.default;
            this.setAttrs(this.clone);
            this.setData(0);
            this.element.insertAdjacentHTML("beforeend", this.clone);
        }
    },
    render: function (data) {
        this.element.innerHTML = '';
        if (data instanceof Array) {
            for (var x in data) {
                this.clone = this.default.cloneNode(true);
                this.setAttrs(this.clone);
                this.setData(x);
                this.element.insertAdjacentHTML("beforeend", this.clone);
            }
        } else {
            this.clone = this.default;
            this.setAttrs(this.clone);
            this.setData(0);
            this.element.insertAdjacentHTML("beforeend", this.clone);
        }
    },
    setAttrs: function(clone){
        var attrs = clone.innerHTML.match(/data-(.*)(\}\})/g);
        for(var attr in attrs){
            newattr = attrs[attr].replace("data-", "").split("=\"");
            clone = clone.querySelector('*['+newattr[0]+']');
            var varname = newattr[1].substring(2, newattr[1].length - 2);
            clone.setAttribute(newattr[0], this.functions(varname, attr));
        }
    },
    setData: function(item=undefined){
        var matches = this.default.innerHTML.match(/\{{.*?}\}/g);
        var text = this.clone.innerHTML;
        for (var i = 0; i < matches.length; i++) {
            var varname = matches[i].substring(2, matches[i].length - 2);
            text = text.replace(matches[i], this.functions(varname, item));
        }
        this.clone = text;
    }
}





