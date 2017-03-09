import uuid from 'uuid';
// TODO: Make it so the stardate is stored separate from the timestamp

const stardate = () => {
  var calculatedDate = new Date().getTime() / 1000 / 60 / 60 / 30 / 2;
  var subtraction = Math.floor(calculatedDate);
  var finalDate = (calculatedDate - subtraction) * 100000;
  return Math.floor(finalDate) / 10;
}

export default class LongRangeComm {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.type = 'LongRangeCommunications';
    this.class = 'LongRangeComm';
    this.power = params.power || {};
    this.name = params.name || 'Long Range Communications';
    this.messages = [];
    const messages = params.messages || [];
    messages.forEach(m => this.messages.push(new LRMessage(m)));
  }
  createMessage(message, crew, decoded, sender) {
    const params = { message, crew, sender, sent: false };
    if (decoded) {
      params.decodedMessage = message;
      params.a = (Math.round(Math.random() * 20 - 2) * 5 + 10);
      params.f = (Math.round(Math.random() * 10 - 1) * 5 + 5);
      if (params.a === 0) params.a = 10;
      if (params.f === 0) params.f = 5;
      params.ra = params.a;
      params.rf = params.rf;
    }
    this.messages.push(new LRMessage(params));
  }
  sendMessage(message){
    this.messages.find(m => m.id === message).sendMessage();
  }
  deleteMessage(message){
    this.messages.find(m => m.id === message).deleteMessage();
  }
  updateDecodedMessage(id, messageId, decodedMessage, a, f) {
    const m = this.messages.find(m => m.id === messageId);
    m.updateDecodedMessage(decodedMessage, a, f);
  }
}

class LRMessage {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.message = params.message || '';
    this.decodedMessage = params.decodedMessage || '';
    this.datestamp = params.datestamp || stardate();
    this.crew = params.crew || false;
    this.sender = params.sender || '';
    this.a = params.a || 20;
    this.f = params.f || 10;
    this.ra = params.ra || (Math.round(Math.random() * 20 - 2) * 5 + 10);
    this.rf = params.rf || (Math.round(Math.random() * 10 - 1) * 5 + 5);
    this.deleted = false;
    this.sent = params.sent || false;
    if (this.a === 0) this.a = 10;
    if (this.f === 0) this.f = 5;
    if (this.ra === 0) this.ra = 10;
    if (this.rf === 0) this.rf = 5;
  }
  sendMessage(){
    this.sent = true;
  }
  deleteMessage(){
    this.deleted = true;
  }
  updateDecodedMessage(decodedMessage, a, f) {
    if (decodedMessage) this.decodedMessage = decodedMessage;
    if (a) this.a = a;
    if (f) this.f = f;
  }
}