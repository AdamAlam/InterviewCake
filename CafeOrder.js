let isFirstComeFirstServed = (takeOutOrders, dineInOrders, servedOrders) => {
  let takeOutCheck = [];
  let dineInCheck = [];
  for (let i = 0; i < servedOrders.length; i++) {
    let curOrder = servedOrders[i];
    if (takeOutOrders.indexOf(curOrder) != -1) {
      takeOutCheck.push(curOrder);
    } else if (dineInOrders.indexOf(curOrder) != -1) {
      dineInCheck.push(curOrder);
    }
  }
  if (takeOutCheck == takeOutOrders && dineInOrders == dineInCheck) {
    return true;
  } else {
    return false;
  }
};
