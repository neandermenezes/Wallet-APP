const getCoins = async () => {
  const result = await fetch('https://economia.awesomeapi.com.br/json/all');
  return result.json();
};

export default getCoins;
