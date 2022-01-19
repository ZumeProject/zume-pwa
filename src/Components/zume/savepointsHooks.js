import { useEffect, useState } from 'react';
import store from 'Redux/store';
import { useSelector } from 'react-redux';
import savepoints, { selectSavepoints } from 'Redux/savepoints';

export const useBookmarks = () => {
  const { bookmarks } = useSelector(selectSavepoints);
  const [storedBookmarks, setStoredBookmarks] = useState(bookmarks);

  useEffect(() => {
    const { changeBookmarks } = savepoints.actions;
    store.dispatch(changeBookmarks({ bookmarks: storedBookmarks }));
  }, [storedBookmarks]);

  return {
    get: storedBookmarks,
    set: setStoredBookmarks,
  };
};

export const useCheckpoints = () => {
  const { checkpoint } = useSelector(selectSavepoints);
  const [storedCheckpoint, setStoredCheckpoint] = useState(checkpoint);

  useEffect(() => {
    const { changeCheckpoint } = savepoints.actions;
    store.dispatch(changeCheckpoint({ checkpoint: storedCheckpoint }));
  }, [storedCheckpoint]);

  return {
    checkpoint: storedCheckpoint,
    setCheckpoint: setStoredCheckpoint,
  };
};
