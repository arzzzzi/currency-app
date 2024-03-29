import React from 'react';
import { CurrencyCheckboxProps } from './types';

const CurrencyCheckbox: React.FC<CurrencyCheckboxProps> = ({
  currencies,
  handleCheckboxChange,
}) => {
  return (
    <div className="options__currency">
      {['eur', 'usd', 'cny'].map((currency) => (
        <label key={currency} className="options__checkbox">
          <input
            type="checkbox"
            checked={currencies.includes(currency)}
            onChange={() => handleCheckboxChange(currency)}
          />{' '}
          {currency === 'eur'
            ? 'Евро'
            : currency === 'usd'
            ? 'Доллар'
            : currency === 'cny'
            ? 'Юань'
            : currency}
        </label>
      ))}
    </div>
  );
};

export default CurrencyCheckbox;
