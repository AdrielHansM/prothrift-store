const GRAMS_TO_KILOGRAMS = 1000;
const GRAMS_TO_POUNDS = 453.6;

const WASTE_PER_PERSON = 33.53;
const WASTE_PER_HOUSEHOLD = 215;

//CLEARLY it returns grams(g) as its metric
export function estimateWeight(category: string, clothingType: string): number {
    if (category === 'Mens') {
      if (clothingType === 'Upperwear'){
        return 1239;
      }
      if (clothingType === 'Bottomwear'){
        return 599;
      }
    }
    if (category === 'Womens') {
      if (clothingType === 'Upperwear'){
        return 748;
      }
      if (clothingType === 'Bottomwear'){
        return 502;
      }
    }
    if (category === 'Kids') {
      if (clothingType === 'Upperwear'){
        return 568;
      }
      if (clothingType === 'Bottomwear'){
        return 361;
      }
    }
    if (category === 'Accessories') {
      return 550;
    }

    return 0
}

export function convertWeight(metric : string, weight: number): number {
  if (metric === 'kg') {
    return weight / GRAMS_TO_KILOGRAMS;
  }
  if (metric === 'lbs') {
    return weight / GRAMS_TO_POUNDS;
  }

  return weight;
}

export function convertTotalWastePerHousehold(totalWaste: number) {
  return (totalWaste / WASTE_PER_HOUSEHOLD)
}


export function convertTotalWastePerPerson(totalWaste: number) {
  return (totalWaste / WASTE_PER_PERSON)
}