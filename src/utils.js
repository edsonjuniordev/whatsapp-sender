export const removeSpecialCharacters = (text) => {
  const regex = /[^a-zA-Z0-9 ]? ?/g;
  return text.replace(regex, '');
};

export const verifyIfHaveBrazilDDD = (number) => {
  const numberSliced = number.slice(0, 2);
  if (numberSliced === '55') return true;

  return false;
};

export const getMessage = (name) => {
  return `Olá, ${name}!\n\nÉ um prazer entrar em contato! =)`;
};
