import React from 'react';
import '../App.css'
interface CountryFilterProps {
  countries: string[];
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
}

export const CountryFilter: React.FC<CountryFilterProps> = ({
  countries,
  selectedCountry,
  onSelectCountry,
}) => {
  return (
    <div className="tz-tabs-wrap">
      <label htmlFor="country-select" className="tz-country-label">
        País:
      </label>
      <select
        id="country-select"
        value={selectedCountry}
        onChange={(e) => onSelectCountry(e.target.value)}
        className="tz-country-select"
      >
        <option value="Todos">Todos los países</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};