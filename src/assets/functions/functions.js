// please note that i get help in newFilter() function from github source and id did modifications for insert price filter
// Link to source "https://gist.github.com/jherax/f11d669ba286f21b7a2dcff69621eb72"
// i cant find any place in submit page to write that so i make this comment
export const newFilter = (products, filters) => {
  const filterKeys = Object.keys(filters);
  return products.filter((product) => {
    return filterKeys.every((key) => {
      if (!filters[key].length) return true;
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

export const trueKeyFilter = (filterStateSelector) => {
  let obj = { color: [], gender: [], type: [], price: [] };
  for (const [key, value] of Object.entries(filterStateSelector)) {
    for (const [prop, boolVal] of Object.entries(value)) {
      if (boolVal === true) {
        obj[key].push(prop);
      }
    }
  }
  return obj;
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
