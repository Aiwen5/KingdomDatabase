import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styles from './Countries.module.css';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/name/kingdom')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => setError(error));
  }, []);

  const handleCountrySelect = (event) => {
    const selectedCca2 = event.target.value;
    const selectedCountry = countries.find((country) => country.cca2 === selectedCca2);

    if (selectedCountry) {
      navigate(`/countries/${selectedCca2}`, { state: { data: selectedCountry } });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>World Kingdoms</h1>
      <select onChange={handleCountrySelect} defaultValue="" className={styles.dropdown}>
        <option value="" disabled>Select a country</option>
        {countries.map((country) => (
          <option key={country.cca2} value={country.cca2}>
            {country.name.common}
          </option>
        ))}
      </select>
      <div className={styles.placeholder}>
        <Outlet context={{ error }} />
      </div>
    </div>
  );
}
