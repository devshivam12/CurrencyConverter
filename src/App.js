import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './currencyRow'

function App() {

  const baseUrl = 'https://v6.exchangerate-api.com/v6/0ba733a01a28e392009d0706/latest/USD';

  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [exchangeRate, setExchangeRate] = useState()
  console.log(exchangeRate)
  console.log(currencyOptions)



  let fromAmount, toAmount

  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate;
  }
  else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then((data) => {

        const firstCurrency = Object.keys(data.conversion_rates)[1];
        setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(firstCurrency)
        setExchangeRate(data.conversion_rates[firstCurrency])
      })
  }, [])

  useEffect(() => {

    if (fromCurrency != null && toCurrency != null) {

      fetch(`${baseUrl}?base_code=${fromCurrency}&symbols${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.conversion_rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  return (
    <div className="App">
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange} />

      <p className='equal'>=</p>

      <CurrencyRow
        currencyOptions={currencyOptions}
        selectCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange} />
    </div>
  );
}

export default App;
