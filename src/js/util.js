var Utils = (function () {

    var $ = function (select) {
        return document.querySelector(select)
    }

    var $$ = function (select) {
        return document.querySelectorAll(select)
    }


    //->hasClass:验证当前元素中是否包含className这个样式类名
    const hasClass = (curEle, className) => {
        var reg = new RegExp("(^| +)" + className + "( +|$)");
        return reg.test(curEle.className);
    }

    //->addClass:给元素增加样式类名
    var addClass = function (curEle, className) {
        var arr = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = arr.length; i < len; i++) {
            var curName = arr[i];
            if (!hasClass(curEle, curName)) {
                curEle.className += " " + curName;
            }
        }
    }

    //->removeClass:给元素移除样式类名
    var removeClass = function (curEle, className) {
        var arr = className.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = arr.length; i < len; i++) {
            var curName = arr[i];
            if (hasClass(curEle, curName)) {
                var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                curEle.className = curEle.className.replace(reg, " ");
            }
        }
    }

    var JSONclone = function (obj) {
        return JSON.parse(JSON.stringify(obj))
    }

    var ajax = function (option) {
        var type = option.type.toLocaleUpperCase()
        var url = option.url
        var success = option.success || function handleSuccess() { }
        var error = option.error || function handleError() { }

        var request = new XMLHttpRequest();
        var loadEvent = 'onreadystatechange';
        var xDomain = false;
        request.open(type, url, true)

        request[loadEvent] = function handleLoad() {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    var response = JSON.parse(request.response)
                    success(response)
                }
            }
        }
        request.onerror = function handleError() {
            error('Network Error')
        };


        request.send()
    }

    var addEvent = function (node, type, handler) {
        if (!node) return false;
        if (node.addEventListener) {
            node.addEventListener(type, handler, false);
            return true;
        }
        else if (node.addachEvent) {
            node['e' + type + handler] = handler;
            node[type + handler] = function () {
                node['e' + type + handler](window.event);
            };
            node.attachEvent('on' + type, node[type + handler]);
            return true;
        }
        return false;
    }

    var removeEvent = function (node, type, handler) {
        if (!node) return false;
        if (node, removeEventListener) {
            node.removeEventListener(type, handler, false);
            return true;
        }
        else if (node.datachEvent) {
            node.datachEvent('on' + type, node[type + handler]);
            node[type + handler] = null;
        }
        return false;
    }
    return {
        $: $,
        $$: $$,
        addClass: addClass,
        hasClass: hasClass,
        removeClass: removeClass,
        addEvent: addEvent,
        removeEvent: removeEvent,
        ajax: ajax,
        JSONclone: JSONclone
    }
}
)()
