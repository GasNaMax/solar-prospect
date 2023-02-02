import { get, writable } from "svelte/store";

export const ROICalcState = writable({
	panelCount: 1, //  n of panels
	panelPrice: 1030, //  €
	generation: 3500.0, //  kWh per year
	elPrice: 0.12, //  €/kWh
	priceGrowth: 2, //  % per year
});

export const ROIResultState = writable({
	areaNeeded: 300, //  m^2 area for panels
	cost: 0.0, //  € cost
	roiInYears: 1, //  n of years to pay its cost
	generatedPower: { min: 10, max: 20 }, // kWh generated after ROI
	generatedValue: { min: 0, max: 0 }, //  € generated after ROI
	yearlyProfit: { min: 0, afterRoi: 0, max: 0 }, //  € generated after ROI
});

export function setCalcInput(name, value) {
	ROICalcState.update(s => {
		return { ...s, [name]: Number(value) };
	});
	setTimeout(() => {
		calculateROIInYears();
	}, 100);
}

export function calculateROIInYears() {
	const { panelCount, panelPrice, generation, elPrice, priceGrowth } =
		get(ROICalcState);

	const areaNeeded = 10 * panelCount;
	const cost = (panelPrice * panelCount).toFixed(1);
	const totalYearGeneration = generation * panelCount;

	const { roiInYears, extraPower, elPriceAfterRoi } =
		calcYearsNeededToROIWithGrowth(
			cost,
			totalYearGeneration,
			elPrice,
			priceGrowth
		);

	const powerAfterRoi = calcPowerGeneratedAfterRoi(
		totalYearGeneration,
		roiInYears,
		extraPower
	);

	const valueAfterRoi = calcCashValueGeneratedAfterRoi(
		totalYearGeneration,
		elPriceAfterRoi,
		extraPower,
		priceGrowth
	);

	const minYearlyProfit = totalYearGeneration * elPrice;
	const afterRoiYearlyProfit = totalYearGeneration * elPriceAfterRoi;
	const maxYearlyProfit = totalYearGeneration * valueAfterRoi.lastPrice;

	const fixD = (n, d = 0) => Number(n).toFixed(d);

	ROIResultState.update(r => {
		return {
			...r,
			areaNeeded,
			cost,
			roiInYears,
			generatedPower: {
				min: fixD(powerAfterRoi.min / 1000, 1),
				max: fixD(powerAfterRoi.max / 1000, 1),
			},
			generatedValue: {
				min: fixD(valueAfterRoi.min),
				max: fixD(valueAfterRoi.max),
			},
			yearlyProfit: {
				min: fixD(minYearlyProfit, 1),
				afterRoi: fixD(afterRoiYearlyProfit, 1),
				max: fixD(maxYearlyProfit, 1),
			},
		};
	});
}

export function calcPowerGeneratedAfterRoi(
	yearlyGen,
	roi,
	extraPower = 0,
	min = 25,
	max = 35
) {
	const calculatedPower = minOrMaxLifeTime =>
		((minOrMaxLifeTime - roi) * yearlyGen + extraPower).toFixed(1);

	return {
		min: calculatedPower(min),
		max: calculatedPower(max),
	};
}

export function calcCashValueGeneratedAfterRoi(
	yearlyGen,
	startingElPriceAfterRoi,
	extraPower = 0,
	priceGrowth = 2,
	min = 25,
	max = 35
) {
	const extraCash = extraPower * startingElPriceAfterRoi;
	let minCash = 0,
		maxCash = 0;
	let newPrice = startingElPriceAfterRoi;
	let lastPrice;

	for (let i = 0; i <= max; i++) {
		if (i === 0) {
			minCash += extraCash;
			maxCash += extraCash;
		}

		if (i <= min) minCash += yearlyGen * newPrice;
		maxCash += yearlyGen * newPrice;

		newPrice = calcNewPriceWithGrowth(newPrice, priceGrowth);

		if (i === max) {
			lastPrice = newPrice;
		}
	}

	return {
		min: minCash.toFixed(1),
		max: maxCash.toFixed(1),
		lastPrice,
	};
}

export function calcLifetimePowerGenerated(yearlyGen, min = 25, max = 35) {
	return { min: yearlyGen * min, max: yearlyGen * max };
}

export function calcYearsNeededToROIWithGrowth(
	cost,
	generation,
	elPrice,
	priceGrowth
) {
	let years = 0.0;
	let currentValue = 0;
	let lastElPrice = elPrice;
	let valueGenPerYear = generation * elPrice;

	for (
		currentValue = 0;
		currentValue <= cost;
		currentValue += valueGenPerYear
	) {
		if (currentValue === 0)
			valueGenPerYear = calcGeneratedValueWithPrice(generation, elPrice);

		if (currentValue !== 0) {
			lastElPrice = calcNewPriceWithGrowth(elPrice, priceGrowth);
			valueGenPerYear = calcGeneratedValueWithPrice(generation, lastElPrice);
		}

		let nextValue = currentValue + valueGenPerYear;

		if (nextValue >= cost) {
			let extraValue = nextValue - cost;
			let valueNeeded = valueGenPerYear - extraValue;

			const ratio = valueNeeded / valueGenPerYear;

			if (years === 0) years += ratio;
			if (years !== 0) years += years * ratio;
		} else {
			years += 1;
		}
	}

	return {
		roiInYears: years.toFixed(1),
		extraPower: (currentValue - cost) / lastElPrice,
		elPriceAfterRoi: lastElPrice,
	};
}

export function calcGeneratedValueWithPrice(generation, price) {
	return generation * price;
}

export function calcNewPriceWithGrowth(elPrice, priceGrowth) {
	return elPrice * (1 + priceGrowth / 100);
}
