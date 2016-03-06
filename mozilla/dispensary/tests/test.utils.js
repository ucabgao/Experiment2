import { urlFormat } from 'utils';

describe('urlFormat()', function() {

  it('should throw an error if missing arguments', () => {
    var url = 'http://download.com/$VERSION/$FILENAME';

    assert.throws(() => {
      urlFormat(url);
    }, Error, /ArgumentError/);

    assert.throws(() => {
      urlFormat(url, {filename: 'mylib.js'});
    }, Error, /ArgumentError/);

    assert.throws(() => {
      urlFormat(url, {version: '1.1.1'});
    }, Error, /ArgumentError/);
  });

  it('should process $FILENAME and $VERSIONS recursively (once)', () => {
    var result = urlFormat('http://download.net/$FILENAME', {
      filename: 'mylib-$VERSION.js',
      version: '1.1.1',
    });

    assert.equal(result, 'http://download.net/mylib-1.1.1.js');
  });

});
