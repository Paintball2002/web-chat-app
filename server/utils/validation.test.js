var expect = require('expect');

var {isRealString,isRealNum} = require('./validation');

describe('isRealString', () => {
  it('should reject non strings', () => {
    var res = isRealString(98);
    expect(res).toBe(false);
  });
  it('should reject strings with only spaces', () => {
    var res = isRealString("      ");
    expect(res).toBe(false);
  });
  it('should allow strings with non-space characters', () => {
    var res = isRealString("  Hello  ");
    expect(res).toBe(true);
  });
});

describe('isRealNum', () => {
  it('should reject non numbers', () => {
    var res = isRealNum("room-98");
    expect(res).toBe(false);
  });
  it('should reject numbers with only spaces', () => {
    var res = isRealNum("      ");
    expect(res).toBe(false);
  });
  it('should allow numbers', () => {
    var res = isRealNum(98);
    expect(res).toBe(true);
  });
});
