import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/store';
import ResultCard from './ResultCard';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

function ResultPage(): JSX.Element {
  const result: any = useAppSelector((store) => store.steps.result);
  const fin_result = Array.from(Object.values(result));
  const end_result = fin_result.join('').split(';');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // const fin_result = result;
  // const stroka_result = fin_result
  console.log(typeof result, result, 'ЭТО ответ апи !');
  console.log(typeof fin_result, fin_result, 'ЭТО РЕЗУЛЬТАТ преобразования');
  console.log(typeof end_result, end_result, 'ЭТО ФИНАЛЬНЫЙ РЕЗУЛЬТАТ');
  const navigate = useNavigate();
  return (
    <>
      <div className="result__page">
        <button
          className="buttons blob-btn"
          type="button"
          onClick={() => navigate('/')}
        >
          На главную
        </button>
        {loading ? (
          <BeatLoader color={'#0000FF'} loading={loading} size={50} />
        ) : end_result ? (
          end_result.map((res_end) => <ResultCard tovar={res_end} />)
        ) : (
          <p>ppjnbh</p>
        )}
      </div>
    </>
  );
}

export default ResultPage;
