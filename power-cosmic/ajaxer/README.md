# ajaxer

[![Build Status Badge]][Build Status]
[![Coverage Status Badge]][Coverage Status]

## Overview

This is a small library to enable some basic ajax calls.

## Examples

```javascript
var ajaxer = require('ajaxer');
var userSettings = {
  name: 'eddie',
  favoriteColor: 'yellow'
};

ajaxer.post('a_server_page.php', userSettings);

var incoming;
ajaxer.get('a_totally_different_page.php', function(responseText) {
  incoming = JSON.parse(responseTest);
});

var someDifferentSettings = {
  type: 'settingsUpdate',
  content: JSON.stringify(userSettings)
};
ajaxer.connect('POST', 'probably_the_last_page.php', someDifferentSettings, function() {
  console.log('great success!');
});

var myFunctions = {
  onSuccess: function(response) {
    loadDataSomeWhere(JSON.parse(response));
  },
  onFail: function() {
    alert('ABSOLUTE FAIL!');
  }
};
ajaxer.get('fromSomewhere.asp', {content: 'request data'}, myFunctions, {'responseType': 'json'});
```

## Why-oh-why

This (along with a few other js modules), were created for use in a graduate class when we were encouraged to only use what we could develop ourselves.

Plus, what's the point of using something that someone else has written if I could write it myself?

## Installation

Probably going to try to get npm to work. No promises though.

## API

### get (*url*[, *data*[, *callback*]])

Perform an ajax GET request at the target `url`, optionally with the provided `data` (as an Object) and/or with a `callback` function that will operate on the response.

**Note**: `data` or `callback` or both may be left empty if desired

### post (*url*[, *data*[, *callback*]])

Perform an ajax POST request at the target `url`, optionally with the provided `data` (as an Object) and/or with a `callback` function that will operate on the response.

**Note**: `data` or `callback` or both may be left empty if desired

### connect (*method*, *url*[, *data*[, *callback*]])

Perform an ajax request at the target `url`, optionally with the provided `data` (as an Object) and/or with a `callback` function that will operate on the response. The first parameter can be either the string `'POST'` or `'GET'`, nothing else can be accepted.

**Note**: `data` or `callback` or both may be left empty if desired

## License

`ajaxer` is published under the MIT license.

[Build Status Badge]: https://travis-ci.org/power-cosmic/ajaxer.svg?branch=master
[Build Status]: https://travis-ci.org/power-cosmic/ajaxer
[Coverage Status Badge]: https://coveralls.io/repos/power-cosmic/ajaxer/badge.svg?branch=master&service=github
[Coverage Status]: https://coveralls.io/github/power-cosmic/ajaxer?branch=master
