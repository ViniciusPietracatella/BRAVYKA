document.addEventListener('DOMContentLoaded', function () {
    // Configuração dos gráficos
    const ctxConsumo = document.getElementById('graficoConsumo').getContext('2d');
    const graficoConsumo = new Chart(ctxConsumo, {
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
            datasets: [{
                label: 'Consumo de Água = 3,33L/M',
                backgroundColor: 'rgba(135, 206, 235, 0.2)',
                borderColor: 'rgba(0, 191, 255, 1)',
                data: [4000, 3000, 2500, 5000],
                fill: true,
            }]
        },
        options: { responsive: true }
    });

    const ctxUmidade = document.getElementById('graficoUmidade').getContext('2d');
    const graficoUmidade = new Chart(ctxUmidade, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
            datasets: [{
                label: 'Umidade do Solo = 60%',
                backgroundColor: 'rgba(34, 139, 34, 0.6)',
                borderColor: 'rgba(0, 100, 0, 1)',
                data: [20, 30, 45, 25]
            }]
        },
        options: { responsive: true }
    });

    const ctxAguaDisponivel = document.getElementById('graficoAguaDisponivel').getContext('2d');
    const graficoAguaDisponivel = new Chart(ctxAguaDisponivel, {
        type: 'bar',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
            datasets: [{
                label: 'Água Disponível = 10.035',
                backgroundColor: 'rgba(30, 144, 255, 0.6)',
                borderColor: 'rgba(25, 25, 112, 1)',
                data: [5000, 4500, 3000, 5500]
            }]
        },
        options: { responsive: true }
    });

    // API de previsão do tempo
    const apiKey = '644877b9f7121f49c8f7a0cec0c4dac7';
    const cityName = 'Sao Paulo';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tempoDiv = document.getElementById('tempo');
            let htmlContent = '<h4>Próximos Dias</h4>';
            data.list.forEach((item, index) => {
                if (index % 8 === 0) {  // A cada 8 entradas (aprox. cada 24 horas)
                    const date = new Date(item.dt_txt).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
                    const description = item.weather[0].description;
                    const chanceOfRain = (item.pop * 100).toFixed(0); // Convertendo a probabilidade em porcentagem
                    const iconCode = item.weather[0].icon;
                    const iconClass = `weather-icon ${iconCode.startsWith('01') ? 'weather-sun' :
                                       iconCode.startsWith('09') || iconCode.startsWith('10') ? 'weather-rain' :
                                       iconCode.startsWith('13') ? 'weather-snow' : 'weather-clouds'}`;
                    const weatherIconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

                    htmlContent += `
                    <div class="weather-forecast-item">
                        <img src="${weatherIconUrl}" class="${iconClass}" alt="${description}" title="${description}" style="width:30px; height:30px;">
                        <p>${date}: ${description}, Chance de chuva: ${chanceOfRain}%</p>
                    </div>`;
                }
            });
            tempoDiv.innerHTML = htmlContent;
        })
        .catch(error => console.error('Erro ao buscar dados da previsão do tempo:', error));
});
