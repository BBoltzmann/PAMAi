document.getElementById('questionnaireForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const selectedProfile = determineProfile(formData);
    displayProfileChart(selectedProfile);
});

function determineProfile(formData) {
    const peakUsage = formData.get('peakUsage');
    const energyGeneration = parseFloat(formData.get('energyGeneration')) || 0;
    const conservation = formData.get('energyConservation');
    const pricingReaction = formData.get('pricingReaction');

    if (peakUsage === 'morning' && energyGeneration > 5) {
        return 'Sunrise Savers';
    } else if (peakUsage === 'night' && pricingReaction === 'notAtAll') {
        return 'Night Owls';
    } else if (conservation && energyGeneration > 10) {
        return 'Eco Warriors';
    } else if (peakUsage === 'daylight' && pricingReaction === 'veryLikely') {
        return 'Daylight Dynamos';
    } else if (peakUsage === 'evening' && pricingReaction === 'somewhatLikely') {
        return 'Twilight Guardians';
    } else {
        return 'Morning Gliders';
    }
}

function displayProfileChart(profileName) {
    const chartContainer = document.getElementById('profileChart');
    chartContainer.innerHTML = generateChartHtml(profileName);
    addHoverEffects();
}

function generateChartHtml(profileName) {
    let chartHtml = `<div class="chart ${profileName}">`;
    let totalGeneration = 0;

    for (let hour = 0; hour < 24; hour++) {
        const loadHeight = Math.random() * 100;
        const generationHeight = Math.random() * 100;
        totalGeneration += generationHeight;
        chartHtml += `<div class="time-slot">`;
        chartHtml += `<div class="load-bar" style="height: ${loadHeight}%;" data-value="${loadHeight}"></div>`;
        chartHtml += `<div class="generation-bar" style="height: ${generationHeight}%;" data-value="${generationHeight}"></div>`;
        chartHtml += `</div>`;
    }

    const averageGeneration = totalGeneration / 24;
    chartHtml += determineRates(averageGeneration);
    chartHtml += `</div>`;
    chartHtml += `<div class="axis-label-y">Energy (kWh)</div>`;
    chartHtml += `<div class="axis-label-x">Time (Hours)</div>`;
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

function addHoverEffects() {
    const bars = document.querySelectorAll('.load-bar, .generation-bar');
    bars.forEach(bar => {
        bar.addEventListener('mouseenter', (event) => {
            const value = event.target.dataset.value;
            alert('Value: ' + value);
        });
    });
}
