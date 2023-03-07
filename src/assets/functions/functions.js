export const newFilter = (products, filters) => {
  const filterKeys = Object.keys(filters);
  return products.filter((product) => {
    return filterKeys.every((key) => {
      if (!filters[key].length) return true;
      // Loops again if product[key] is an array (for material attribute).
      if (Array.isArray(product[key])) {
        return product[key].some((keyEle) => filters[key].includes(keyEle));
      }
      if (filters["price"].length) {
        if (
          filters[key].includes("250") &&
          filters[key].includes("450") &&
          filters[key].includes("451")
        ) {
          return product[key] > 0;
        } else if (
          filters[key].includes("250") &&
          filters[key].includes("450")
        ) {
          return product[key] <= 450;
        } else if (
          filters[key].includes("450") &&
          filters[key].includes("451")
        ) {
          return product[key] > 250;
        } else if (
          filters[key].includes("250") &&
          filters[key].includes("451")
        ) {
          return product[key] <= 250 || product[key] > 450;
        } else if (filters[key].includes("250")) {
          return product[key] <= 250;
        } else if (filters[key].includes("450")) {
          return product[key] > 250 && product[key] <= 450;
        } else if (filters[key].includes("451")) {
          return product[key] > 450;
        }
      }
      return filters[key].includes(product[key]);
    });
  });
};

export const filteredCollected = (filterStateClone) => {
  const collectedTrueKeys = {
    color: [],
    gender: [],
    type: [],
    price: [],
  };
  const { color: updatedColor } = filterStateClone;
  const { gender: updatedGender } = filterStateClone;
  const { type: updatedType } = filterStateClone;
  const { price: updatedPrice } = filterStateClone;

  for (let colorKey in updatedColor) {
    if (updatedColor[colorKey]) collectedTrueKeys.color.push(colorKey);
  }
  for (let genderKey in updatedGender) {
    if (updatedGender[genderKey]) collectedTrueKeys.gender.push(genderKey);
  }
  for (let typeKey in updatedType) {
    if (updatedType[typeKey]) collectedTrueKeys.type.push(typeKey);
  }
  for (let priceKey in updatedPrice) {
    if (updatedPrice[priceKey]) collectedTrueKeys.price.push(priceKey);
  }
  return collectedTrueKeys;
};

export const arrayName = (el) => {
  if (el === "Red" || el === "Blue" || el === "Black" || el === "Green") {
    return "color";
  } else if (el === "Men" || el === "Women") {
    return "gender";
  } else if (el === "Polo" || el === "Hoodie" || el === "Basic") {
    return "type";
  } else if (el === 250 || el === 450 || el === 451) {
    return "price";
  }
};
