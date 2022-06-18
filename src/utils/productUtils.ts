const GRAMS_TO_KILOGRAMS = 1000;
const GRAMS_TO_POUNDS = 453.6;

export function estimateWeight(category: string, clothingType: string): number {
    if (category == 'Mens') {
      return 300;
    }
    if (category == 'Womens') {
      return 200;
    }
    if (category == 'Kids') {
      return 100;
    }
    if (category == 'Accessories') {
      return 50;
    }

    return 0
}

export function convertWeight(metric : string, weight: number): number {
  if (metric == 'kg') {
    return weight / GRAMS_TO_KILOGRAMS;
  }
  if (metric == 'lb') {
    return weight / GRAMS_TO_POUNDS;
  }

  return weight;
}