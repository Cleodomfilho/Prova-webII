document.getElementById('searchBtn').addEventListener('click', async () => {
    const countryName = document.getElementById('countryInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "Carregando...";
  
    if (!countryName) {
      resultDiv.innerHTML = "Por favor, digite o nome de um país.";
      return;
    }
  
    try {
      // Requisição 1: Buscar dados do país
      const countryRes = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      if (!countryRes.ok) throw new Error("País não encontrado.");
  
      const countryData = await countryRes.json();
      const country = countryData[0];
      const name = country.name.common;
      const capital = country.capital?.[0];
      const population = country.population.toLocaleString();
      const flag = country.flags.svg;
      const [lat, lon] = country.capitalInfo.latlng;
  
      // Requisição 2: Buscar dados climáticos
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const weatherData = await weatherRes.json();
      const temperature = weatherData.current_weather?.temperature;
      const windspeed = weatherData.current_weather?.windspeed;
  
      resultDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="${flag}" alt="Bandeira de ${name}" width="100">
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>População:</strong> ${population}</p>
        <h3>🌤️ Clima Atual em ${capital}</h3>
        <p><strong>Temperatura:</strong> ${temperature}°C</p>
        <p><strong>Vento:</strong> ${windspeed} km/h</p>
      `;
    } catch (error) {
      resultDiv.innerHTML = `Erro: ${error.message}`;
    }
  });
  