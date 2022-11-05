import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = <dataType>(url: string) => {
  // const [data, setData] = useState<dataType[]>([]);
  const [data, setData] = useState<dataType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
