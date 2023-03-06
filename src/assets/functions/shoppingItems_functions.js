  // update Qty increase or decrease
  export function increaseCount(shoppingItem, addOrSub , selectorArray) {
    let items = selectorArray?.map((item) => {
      if (shoppingItem.id === item.id) {
        const plusCount = shoppingItem.count + addOrSub;
        item = { ...item, count: plusCount };
      }
      return item;
    });
    return items;
  }
  // delete item
 export function deleteItem(shoppingItem , selectorArray) {
    const filteredArray = selectorArray.filter((item) => {
      return shoppingItem.id !== item.id;
    });
    return filteredArray;
  }