goog.require('helper');

describe('The helper.expandKeyValue_ function', function() {
  /**
   * Tests the expandKeyValue function by passing in a key value pair
   * and comparing the return value to an expected return value.
   * @param {string} key The key's path, where dots are the path separators.
   * @param {*} value The value to set on the given key path.
   * @param {Object} expected An object representing the given key/value which
   *     can be merged onto the dataLayer's model.
   * @param {string=} context More information about the test being ran.
   */
  function assertExpand(key, value, expected, context = '') {
    expect(helper.expandKeyValue_(key, value))
        .withContext(context)
        .toEqual(expected);
  }

  it('successfully converts key value pairs ' +
      'into objects when the key string is non dot-separated', function() {
    assertExpand('a', 1, {a: 1});
    assertExpand('a', 0, {a: 0});
    assertExpand('a', -1, {a: -1});
    assertExpand('a', null, {a: null});
    assertExpand('a', undefined, {a: undefined});
    assertExpand('a', true, {a: true});
    assertExpand('a', false, {a: false});
    assertExpand('a', [], {a: []});
    assertExpand('a', ['b', {}, 3], {a: ['b', {}, 3]});
    assertExpand('a', {b: {c: 3, d: 4}}, {a: {b: {c: 3, d: 4}}});
  });

  it('successfully converts key value pairs into nested objects ' +
      'when the key string is dot-separated', function() {
    assertExpand('a.b', 2, {a: {b: 2}});
    assertExpand('a.b', 0, {a: {b: 0}});
    assertExpand('a.b', -2, {a: {b: -2}});
    assertExpand('a.b', null, {a: {b: null}});
    assertExpand('a.b', undefined, {a: {b: undefined}});
    assertExpand('a.b', true, {a: {b: true}});
    assertExpand('a.b', false, {a: {b: false}});
    assertExpand('a.b', [], {a: {b: []}});
    assertExpand('a.b', [[1], [2, 3]], {a: {b: [[1], [2, 3]]}});
    assertExpand('a.b', {}, {a: {b: {}}});
    assertExpand('a.b', {b: {c: false, d: 4}}, {a: {b: {b: {c: false, d: 4}}}});
    assertExpand('a.b.c.d.e.f', 6, {a: {b: {c: {d: {e: {f: 6}}}}}});
  });

  it('correctly handles empty strings', function() {
    assertExpand(
        '', 1, {'': 1},
        'preserves explicit empty strings for keys'
    );
    assertExpand(
        'a', '', {a: ''},
        'preserves explicit empty strings for values'
    );
    assertExpand(
        'a..b', 2, {a: {'': {b: 2}}},
        'interprets a key with no characters between dots ' +
            'as being an empty string'
    );
  });

  it('does not interpret dot separated keys in value objects ' +
      'as object nesting', function() {
    assertExpand('a', {'b.c': 1}, {a: {'b.c': 1}});
    assertExpand('a.b', {'b.c': 1}, {a: {b: {'b.c': 1}}});
  });
});
