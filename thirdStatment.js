const CURRENCY_UNIT = {
  'ONE HUNDRED': 10000,
  TWENTY: 2000,
  TEN: 1000,
  FIVE: 500,
  ONE: 100,
  QUARTER: 25,
  DIME: 10,
  NICKEL: 5,
  PENNY: 1,
}
function checkCashRegister(price, cash, cid) {
  let objCid = {}
  for (let i = cid.length - 1; i >= 0; i--) {
    objCid[cid[i][0]] = Math.round(cid[i][1] * 100)
  }

  let change = Math.round(cash * 100) - Math.round(price * 100)
  let originalChange = change

  let cashInDraw = 0
  cid.map((cash) => (cashInDraw += Math.round(cash[1] * 100)))

  let message = {
    status: '',
    change: [],
  }

  let cashToBack = 0

  if (change == cashInDraw) {
    message.status = 'CLOSED'
    cid.map((el) => message.change.push(el))
    console.log(message)
    return
  }
  for (let prop in objCid) {
    let currToBack = CURRENCY_UNIT[prop]
    if (objCid[prop] > 0 && change - CURRENCY_UNIT[prop] > 0) {
      // console.log(prop, objCid[prop], currToBack)
      cashToBack = 0
      while (change - currToBack >= 0 && objCid[prop] > 0) {
        cashToBack += currToBack
        change -= currToBack
        objCid[prop] -= currToBack
      }

      message.change.push([prop, cashToBack / 100])
    }
  }
  if (change === 0) {
    message.status = 'OPEN'
    // return message
    console.log(message)
  } else if (change > 0) {
    message.status = 'INSUFFICIENT_FUNDS'
    message.change = []
    // return message
    console.log(message)
  }
}

checkCashRegister(19.5, 20, [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
])
