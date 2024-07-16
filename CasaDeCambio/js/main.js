document.addEventListener("DOMContentLoaded", (event) => {
  // console.log("DOM fully loaded and parsed");
  const btnPesquisar = document.getElementById("btnPesquisar");
  // console.log("btnPesquisar:", btnPesquisar);
  // const tituloSection = document.getElementById("tituloDaSection");
  // console.log("tituloSection:", tituloSection);

  let myHeaders = new Headers();
  myHeaders.append("apikey", "qCj85sfTklZQlNQFWqC3HTMf3vKzME6v");

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  btnPesquisar.addEventListener("click", (event) => {
    event.preventDefault();

    const inputMoeda = document.getElementById("inputMoeda").value.toUpperCase(); // Convert to uppercase
    const API_MOEDAS = `https://api.apilayer.com/exchangerates_data/latest?base=${inputMoeda}`;

    console.log(`Fetching data from: ${API_MOEDAS}`); // Log da URL para verificação

    fetch(API_MOEDAS, requestOptions)
      .then((response) => {
        // // console.log(`HTTP status: ${response.status}`); // Log do status HTTP
        // if (!response.ok) {
        //   // throw new Error(`HTTP error! status: ${response.status}`);
        // }
        return response.json();
      })
      .then((data) => {
        // console.log("Data received:", data); // Log dos dados recebidos
        if (data.success && data.rates) {
          const taxas = data.rates;
          const taxasArredondadas = {};
          for (const currency in taxas) {
            if (Object.hasOwnProperty.call(taxas, currency)) {
              taxasArredondadas[currency] = taxas[currency].toFixed(3);
            }
          }
          
          displayExchangeRates(taxasArredondadas);
        } else {
          console.error("Invalid response structure:", data);
          throw new Error("Invalid response structure");
        }
      })
      
      .catch((error) => {
        console.error("Erro ao buscar taxas de câmbio:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo deu errado, tente novamente!",
        });
      });
  });

  // Função para exibir as taxas de câmbio na tela
  function displayExchangeRates(taxas) {
    const taxasSection = document.getElementById("moedas");
    taxasSection.innerHTML = ""; // Limpa as taxas anteriores

    // Adiciona as taxas de câmbio
    for (const [currency, rate] of Object.entries(taxas)) {
      const p = document.createElement("p");
      p.innerHTML = `<i class="fa-solid fa-coins"></i> ${currency} <span>${rate}</span>`;
      taxasSection.appendChild(p);
    }
  }


});

