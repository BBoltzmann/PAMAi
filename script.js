document.getElementById('questionnaireForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const selectedProfile = determineProfile(formData);
    displayProfileChart(selectedProfile);
});

function determineProfile(formData) {
    const energyGeneration = parseFloat(formData.get('energyGeneration'));
    if (energyGeneration > 5) {
        return 'Eco Warriors';
    } else if (formData.get('peakUsage') === 'night') {
        return 'Night Owls';
    } else {
        return 'Sunrise Savers'; // Default profile
    }
}

function displayProfileChart(profileName) {
    const chartContainer = document.getElementById('profileChart');
    chartContainer.innerHTML = generateChartHtml(profileName);
}

function generateChartHtml(profileName) {
    let chartHtml = `<div class="chart-title">${profileName}</div>`;
    chartHtml += `<div class="chart ${profileName}">`;

    let totalGeneration = 0;
    for (let hour = 0; hour < 24; hour++) {
        const loadHeight = Math.random() * 100;
        const generationHeight = Math.random() * 100;
        totalGeneration += generationHeight;

        chartHtml += `<div class="time-slot">`;
        chartHtml += `<div class="load-bar" style="height: ${loadHeight}%;"></div>`;
        chartHtml += `<div class="generation-bar" style="height: ${generationHeight}%;"></div>`;
        chartHtml += `</div>`;
    }

    const averageGeneration = totalGeneration / 24;
    chartHtml += determineRates(averageGeneration);
    chartHtml += `</div>`;
    chartHtml += generateAxisLabels();
    return chartHtml;
}

function determineRates(averageGeneration) {
    let ratesHtml = '';
    for (let hour = 0; hour < 24; hour++) {
        const generationHeight = Math.random() * 100;
        let rateClass = '';

        if (generationHeight < averageGeneration * 0.5) {
            rateClass = 'more-expensive-line';
        } else if (generationHeight > averageGeneration * 1.3) {
            rateClass = 'less-expensive-line';
        } else {
            rateClass = 'normal-rate-line';
        }

        ratesHtml += `<div class="rate-line ${rateClass}" style="left: ${hour * (100 / 24)}%;"></div>`;
    }
    return ratesHtml;
}

function generateAxisLabels() {
    let yAxisHtml = '<div class="y-axis-labels">';
    for (let i = 0; i <= 100; i += 25) {
        yAxisHtml += `<div class="y-axis-marker">${i}</div>`;
    }
    yAxisHtml += '</div>';

    let xAxisHtml = '<div class="x-axis-labels">';
    for (let hour = 0; hour < 24; hour++) {
        let timeLabel = hour < 10 ? '0' + hour + ':00' : hour + ':00';
        xAxisHtml += `<div class="x-axis-label">${timeLabel}</div>`;
    }
    xAxisHtml += '</div>';

    return yAxisHtml + xAxisHtml;
}
