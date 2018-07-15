var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Some message';
    var message = generateMessage(from, text);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Jonny';
    var lat = 150;
    var long = 1000;
    var url = "https://www.google.com/maps?q=150,1000";
    var message = generateLocationMessage(from, lat, long);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({from, url});
  });
});
