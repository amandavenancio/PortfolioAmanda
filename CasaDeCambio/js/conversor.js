async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
  const toCurrency = document.getElementById('toCurrency').value.toUpperCase();
  let myHeaders = new Headers();
  myHeaders.append("apikey", "qCj85sfTklZQlNQFWqC3HTMf3vKzME6v");

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  if (amount === '' || fromCurrency === '' || toCurrency === '') {
      alert('Por favor, preencha todos os campos.');
      return;
  }

  const url = `https://api.apilayer.com/exchangerates_data/latest?base=${fromCurrency}`;

  try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
          throw new Error('Erro ao buscar dados da API');
      }

      const data = await response.json();
      const rate = data.rates[toCurrency];

      if (!rate) {
          throw new Error('Moeda não encontrada');
      }

      const convertedAmount = amount * rate;
      document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
  } catch (error) {
      document.getElementById('result').innerText = `Erro: ${error.message}`;
  }
}