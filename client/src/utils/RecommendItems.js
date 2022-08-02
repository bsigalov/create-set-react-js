export const recommendPantsUtils = (chosenShirt, availablePants) => {
  let recommendedPants = []
  let recommendedColors = availablePants.filter((pants) => {
    return pants.color === chosenShirt.color
  })
  let recommendedSizes = availablePants.filter((pants) => {
    if (chosenShirt.size === 'S') {
      return pants.size >= 30 && pants.size <= 36
    } else if (chosenShirt.size === 'M' || chosenShirt.size === 'L') {
      return pants.size >= 37 && pants.size <= 40
    } else if (chosenShirt.size === 'XL' || chosenShirt.size === 'XXL') {
      return pants.size >= 41 && pants.size <= 48
    }
  })
  recommendedPants = [...recommendedSizes, ...recommendedColors]
  return recommendedPants
}

export const recommendShoesUtils = (chosenShirt, availableShoes) => {
  let recommendedShoes = []
  let recommendedColors = availableShoes.filter((shoes) => {
    return shoes.color === chosenShirt.color
  })
  let recommendedSizes = availableShoes.filter((shoes) => {
    if (chosenShirt.size === 'S') {
      return shoes.size >= 36 && shoes.size <= 40
    } else if (chosenShirt.size === 'M' || chosenShirt.size === 'L') {
      return shoes.size >= 41 && shoes.size <= 43
    } else if (chosenShirt.size === 'XL' || chosenShirt.size === 'XXL') {
      return shoes.size >= 41 && shoes.size <= 48
    }
  })
  recommendedShoes = [...recommendedSizes, ...recommendedColors]
  return recommendedShoes
}
