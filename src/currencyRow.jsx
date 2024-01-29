import React from 'react'

function currencyRow({currencyOptions, selectCurrency, onChangeCurrency, amount, onChangeAmount}) {
  return (
    <div>   
 
      <input type="number" value={amount} onChange={onChangeAmount} />
      
      <select value={selectCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, index)=>(

        <option key={index} value={option}>{option}</option>
        ))}
      </select>
      
    </div>
  )
}

export default currencyRow
