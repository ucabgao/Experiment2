/* @flow */

/*jshint -W032 */
;
/*jshint +W032 */
(function(root, factory) {
  /* istanbul ignore next */
  if (typeof define === 'function') {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.ajaxer = factory();
  }
}(this, function() {
  var
    prepareData = function(data) {
      if (!data || typeof data !== "object") {
        return;
      }
      return Object.keys(data).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join("&");
    },
    setCallback = function(fn, request) {
      if (!isFunctionArray(fn)) {
        return;
      }
      var onYes,
        onBad;
      if (typeof fn == "function") {
        onYes = fn;
        onBad = null;
      } else {
        onYes = fn.onSuccess;
        onBad = fn.onFail;
      }
      request.onreadystatechange = (function() {
        if (request.readyState === 4) {
          if (request.status === 200) {
            onYes(request.response);
          } else {
            onBad(request.response);
          }
        }
      }).bind(request);
    },
    isFunctionArray = function(fnArray) {
      if (typeof fnArray == "function") {
        return true;
      } else if (fnArray === null || typeof fnArray != "object") {
        return false;
      } else {
        Object.keys(fnArray).forEach(function(x) {
          if (typeof fnArray[x] != "function") {
            return false;
          }
        });
        return true;
      }
    },
    isValidJson = function(tryJson) {
      try {
        var t = JSON.parse(tryJson);
        return t;
      } catch (e) {
        return false;
      }
    };

  return {
    post: function(url, data, callback, requestInfo) {
      this.connect("POST", url, data, callback, requestInfo);
    },

    get: function(url, data, callback, requestInfo) {
      this.connect("GET", url, data, callback, requestInfo);
    },

    connect: function(style, url, data, callback, requestInfo) {
      if (style !== 'POST' && style !== 'GET') {
        return;
      }
      if (isFunctionArray(data) && typeof callback === "undefined") {
        requestInfo = callback;
        callback = data;
        data = '';
      }

      var request = new XMLHttpRequest(),
        sendData = prepareData(data);

      if (style === "GET" && sendData) {
        var urlParams = "?" + sendData;
        url += urlParams;
        sendData = "";
      }

      setCallback(callback, request);

      request.open(style, url, true);

      if (requestInfo) {
        if (requestInfo.responseType) {
          request.responseType = requestInfo.responseType;
        }
      }

      if (style === "POST") {
        if (isValidJson(data)) {
          sendData = data;
          request.setRequestHeader("Content-type", "application/json");
        } else {
          request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
      }
      request.send(sendData);
    }
  };
}));
