import { useEffect } from 'react';
import { useStore } from '../store/store';
import { useSearchParams } from 'react-router';

export const QueryParamHandler = () => {
  const [searchParams] = useSearchParams();
  const { setRunnerIds, setCategory } = useStore();

  useEffect(() => {
    const runnerIds = searchParams.getAll('runnerid');
    const category = searchParams.get('category') || '';

    setRunnerIds(runnerIds);
    setCategory(category);
  }, [searchParams, setRunnerIds, setCategory]);

  return null;
};
