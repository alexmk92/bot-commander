var Q = require('q');

module.exports = {
    debounce: function(fn, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    },
    /**
     * Makes an AJAX request to a given URL and calls back to the user
     * @param payload - Fields
     * contentType (String) : Defaults to "application/x-www-form-urlencoded"
     * cache (Boolean) : Defaults to false, we should only cache GET requests
     * data (Array<Object>) : An array object containing data to send.  Must be Key Value pairs { key : "", value : "" }
     * headers (Array<Object>) : Defaults to [], pass an array of objects { type : "", value : "" }
     * returnType (String) : Defaults to JSON, specifies the return type from our request, text/json etc.
     * type (String) : The type of request we are going to make, GET/PUT/POST/DELETE
     * url (String) : The URL that we will hit, returns a 400 error if no url is supplied
     */
    ajax: function ajax(payload) {
        var deferred = Q.defer();
        if (typeof payload.contentType === "undefined") payload.contentType = "application/x-www-form-urlencoded";
        if (typeof payload.cache === "undefined") payload.cache = true;
        if (typeof payload.data === "undefined") payload.data = [];
        if (typeof payload.headers === "undefined") payload.headers = [];
        if (typeof payload.returnType === "undefined") payload.returnType = "json";
        if (typeof payload.type === "undefined") payload.type = "GET";
        if (typeof payload.url === "undefined") deferred.reject();

        var httpRequest;
        var requestData = "";

        // Set up Parsers for our return type, this allows us to do a quick callback
        var parsers = new Map([["json", JSON.parse], ["text", function (text) {
                return text;
            }], ["_", function () {
                return null;
            }]]),
            t = payload.returnType.toLowerCase();
        if (!parsers.has(t)) t = "_";

        // Check if we don't want to cache this request, if a user sets cache to true
        // we check for false here as the internal block fires a nocache url.
        if (payload.type === "GET" && !payload.cache) {
            var symbol = payload.url.indexOf('?') > -1 ? '&' : '?';
            payload.url = payload.url + symbol + "_=" + new Date().getTime();
        }

        if (window.XMLHttpRequest) {
            httpRequest = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
        } else {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
        }

        // Set headers
        httpRequest.open(payload.type, payload.url, true);
        httpRequest.setRequestHeader("Content-type", payload.contentType);
        payload.headers.map(function (object) {
            Object.keys(object).forEach(function (key) {
                httpRequest.setRequestHeader(key, object[key]);
            });
        });

        // Build the payload to send
        if (payload.contentType.toLowerCase() === "application/x-www-form-urlencoded") {
            payload.data.map(function (object) {
                Object.keys(object).forEach(function (key) {
                    requestData += key + "=" + object[key] + "&";
                });
            });
            requestData = requestData.replace(/&\s*$/, "");
        } else if (payload.contentType.toLowerCase() === "application/json") {
            requestData = payload.data;
        }

        // Initialise the listener on request
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    if (httpRequest.responseText === null) {
                        deferred.reject(Error(httpRequest.statusText));
                    }
                    deferred.resolve({ data: parsers.get(t)(httpRequest.responseText) });
                } else {
                    deferred.reject(Error(httpRequest.statusText));
                }
            }
        };

        httpRequest.send(requestData);
        return deferred.promise;
    }
};