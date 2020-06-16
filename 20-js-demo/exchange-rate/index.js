//获取节点
const currencyOne = document.getElementById("currency-one");
const amountOne = document.getElementById("amount-one");
const currencyTwo = document.getElementById("currency-two");
const amountTwo = document.getElementById("amount-two");
const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

/**
 * 执行计算的主逻辑
 */
function calculate() {
  let currencyOneValue = currencyOne.value;
  let currencyTwoValue = currencyTwo.value;
  let amountOneValue = amountOne.value;
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOneValue}`)
    .then((res) => {
      console.log(res); //一个正常的http响应

      return res.json();
    })
    .then((res) => {
      console.log(res);

      let rateValue = res.rates[currencyTwoValue];
      rate.innerHTML = `1${currencyOneValue} = ${rateValue}${currencyTwoValue}`;
      amountTwo.value = (amountOneValue * rateValue).toFixed(3);
    });
}

currencyOne.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
currencyTwo.addEventListener("change", calculate);
amountTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  let temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculate();
});

calculate();
