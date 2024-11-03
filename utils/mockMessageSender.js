const mockMessageSender = async (type, message) => {
  const sendMessage = (message) => { return message }
  switch (type.toLowerCase()) {
    case 'email':
      sendMessage(message)
      return 'Email delivered';
    case 'sms':
      sendMessage(message)
      return 'SMS delivered';
    default:
      return "pending";
  }
  };
  
module.exports = { mockMessageSender };