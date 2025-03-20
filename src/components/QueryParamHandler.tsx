import { useEffect } from 'react';
import { useStore } from '../store/store';
import { useSearchParams } from 'react-router';

export const QueryParamHandler = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const store = useStore.getState();
    // URLパラメータから値を取得
    const runnerIds = searchParams.getAll('runnerid');
    const categoryNo = searchParams.get('categoryNo') || '';

    // デバッグログ
    // console.log('URL Parameters:', {
    //   runnerIds,
    //   category,
    //   rawParams: Object.fromEntries(searchParams.entries()),
    // });

    if (runnerIds.length > 0) {
      store.setRunnerIds(runnerIds);
    }
    if (categoryNo) {
      store.setCategoryNo(Number(categoryNo));
    }
  }, [searchParams]);

  return null;
};
