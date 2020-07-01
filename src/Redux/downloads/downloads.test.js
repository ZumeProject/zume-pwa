import downloadsSlice from './index';
const { reducer, actions } = downloadsSlice;
const {
  downloadQueued,
  downloadStarted,
  downloadProgressed,
  downloadCancelled,
  downloadCompleted,
  downloadDeleted,
  downloadErrored
} = actions;

const initialState = {
  queue: [],
  downloading: [],
  errors: {},
  offlineAssets: {},
  storage: {}
};
describe('Downloads reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  const example = { url: 'http://example.com', key: 'example' };
  const queuedExample = {
    queue: [example],
    downloading: [],
    errors: {},
    offlineAssets: {},
    storage: {}
  };
  it('should queue downloads', () => {
    expect(reducer(initialState, downloadQueued(example))).toEqual(
      queuedExample
    );
  });

  const downloadingExample = {
    queue: [],
    downloading: [example],
    errors: {},
    offlineAssets: {},
    storage: {}
  };
  it('should start downloads', () => {
    expect(reducer(queuedExample, downloadStarted(example))).toEqual(
      downloadingExample
    );
  });

  const exampleProgress = {
    queue: [],
    downloading: [
      {
        ...example,
        total: 1024,
        loaded: 512
      }
    ],
    errors: {},
    offlineAssets: {},
    storage: {}
  };
  it('should support updating download progress', () => {
    expect(
      reducer(
        downloadingExample,
        downloadProgressed({
          ...example,
          total: 1024,
          loaded: 512
        })
      )
    ).toEqual(exampleProgress);
  });

  it('should cancel downloads', () => {
    expect(reducer(downloadingExample, downloadCancelled(example))).toEqual(
      initialState
    );
  });

  const completedExample = {
    queue: [],
    downloading: [],
    errors: {},
    offlineAssets: {
      [example.url]: example
    },
    storage: {}
  };
  it('should complete downloads', () => {
    expect(reducer(downloadingExample, downloadCompleted(example))).toEqual(
      completedExample
    );
  });

  it('should delete downloads', () => {
    expect(reducer(completedExample, downloadDeleted(example))).toEqual(
      initialState
    );
  });

  const sampleError = {
    message: 'Failed to download',
    name: 'TypeError'
  };
  const errorExample = {
    queue: [],
    downloading: [],
    errors: {
      [example.url]: sampleError
    },
    offlineAssets: {},
    storage: {}
  };
  it('should support errored downloads', () => {
    expect(
      reducer(initialState, downloadErrored({ ...example, error: sampleError }))
    ).toEqual(errorExample);
  });
});
