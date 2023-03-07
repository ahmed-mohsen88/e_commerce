// update Qty increase or decrease
export function increaseCount(shoppingItem, addOrSub, selectorArray) {
  let items = selectorArray?.map((item) => {
    if (shoppingItem.id === item.id) {
      if (shoppingItem.quantity === 0 && addOrSub === 1) {
        item = { ...item };
      } else if (addOrSub === 1) {
        const plusCount = shoppingItem.count + addOrSub;
        const qty = shoppingItem.quantity - 1;
        item = { ...item, count: plusCount, quantity: qty };
      } else {
        const plusCount = shoppingItem.count + addOrSub;
        const qty = shoppingItem.quantity + 1;
        item = { ...item, count: plusCount, quantity: qty };
      }
    }
    return item;
  });
  return items;
}
// delete item
export function deleteItem(shoppingItem, selectorArray) {
  const filteredArray = selectorArray.filter((item) => {
    return shoppingItem.id !== item.id;
  });
  return filteredArray;
}

// check if item exist in cart or not
export const exist_Or_Not = (array, id) =>
  array.some((shoppingItems) => {
    return shoppingItems.id === id;
  });
