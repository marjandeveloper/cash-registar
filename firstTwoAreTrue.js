const CURRENCY_UNIT = [
  ['ONE HUNDRED', 10000],
  ['TWENTY', 2000],
  ['TEN', 1000],
  ['FIVE', 500],
  ['ONE', 100],
  ['QUARTER', 25],
  ['DIME', 10],
  ['NICKEL', 5],
  ['PENNY', 1],
]
/* ******************************************************************************* */
function checkCashRegister(price, cash, cid) {
  // save bill and how much money we must return to customer
  const CASH_TO_RETURN = Math.round(cash * 100) - Math.round(price * 100)

  // manoy we are giving to customer
  let moneyToBack = CASH_TO_RETURN

  //   current money in draw
  let moneyInDraw = 0
  const cidReverse = []
  let checkCid = []
  cid.map((money) => {
    checkCid.push([money[0], Math.round(money[1] * 100)])
    let moneyPowOneHundred = Math.round(money[1] * 100)
    cidReverse.push(moneyPowOneHundred)
    moneyInDraw += moneyPowOneHundred
  })
  cidReverse.reverse()
  // get change value and send it to message
  let sumMoney = 0
  let changeValue = []
  //   show message
  let message = {}

  if (moneyToBack > moneyInDraw) {
    message = { status: 'INSUFFICIENT_FUNDS', change: [] }
  } else {
    if (CASH_TO_RETURN - moneyInDraw < 0) {
      CURRENCY_UNIT.map((money) => {
        if (moneyToBack > money[1]) {
          let addChangeValue = []
          while (moneyToBack - money[1] >= 0) {
            moneyToBack -= money[1]
            sumMoney += money[1]
            addChangeValue = [money[0], sumMoney / 100]
            // console.log(message)
            // console.log(moneyToBack, money)
          }
          changeValue.push(addChangeValue)
          message = { status: 'OPEN', change: changeValue }
        }
      })
    }
  }

  console.log(message)
}
/* *************************************************************************** */
checkCashRegister(3.26, 100, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
])
