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