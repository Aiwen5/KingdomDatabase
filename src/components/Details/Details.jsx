import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Details.module.css';

export default function Details() {
  const { state } = useLocation();
  const country = state?.data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (country) {
      setLoading(true);
      fetch(`https://restcountries.com/v3.1/alpha/${country.cca2}`)
        .then((response) => response.json())
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    } else {
      setLoading(false);
      setError(null);
    }
  }, [country]);

  if (loading) {
    return <div className={styles.detailsContainer}><div className={styles.loading}>Loading country details...</div></div>;
  }

  if (error) {
    return <div className={styles.detailsContainer}><div className={styles.error}>Error fetching data: {error.message}</div></div>;
  }

  if (!country) {
    return <div className={styles.detailsContainer}><div className={styles.placeholder}>Please select a country from the dropdown above to view details.</div></div>;
  }

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.countryName}>Kingdom of {country.name.common}</h2>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className={styles.flag} />
      <p className={styles.detail}><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p className={styles.detail}><strong>Located in:</strong> {country.region}</p>
    </div>
  );
}