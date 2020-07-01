import liveSlice, { selectCurrentSlideIndex } from './index';
const { reducer, actions } = liveSlice;
const { reset, sectionsLoaded, changed, slideIndexChanged } = actions;

const initialState = {
  sections: [],
  section: 0,
  part: 0
};

const sampleSections = [
  {
    t: 'Welcome to Zúme',
    parts: [
      {
        type: 'cta',
        t: 'Download',
        d:
          'You will be able to follow along on a digital PDF for this session, but please make sure that each member of your group has a printed copy of the materials for future sessions.',
        payload: {
          label: 'DOWNLOAD GUIDEBOOK',
          url:
            'https://zume.training/wp-content/themes/zume-project-multilingual/downloads/en/33_en_zume_guidebook.pdf'
        }
      }
    ]
  },
  {
    t: 'Group Prayer (5min)',
    info:
      'Begin with prayer. Spiritual insight and transformation is not possible without the Holy Spirit. Take time as a group to invite Him to guide you over this session.',
    duration: 5
  },
  {
    t: 'Watch and Discuss (15min)',
    duration: 15,
    parts: [
      {
        type: 'watch',
        d:
          'God uses ordinary people doing simple things to make a big impact. Watch this video on how God works.',
        payload: {
          url: 'https://player.vimeo.com/video/247062938',
          script:
            'https://zume.training/wp-content/themes/zume-project-multilingual/downloads/en/34_en_welcome_to_zume.pdf',
          scriptLabel: 'Zúme Video Scripts: Welcome'
        }
      },
      {
        type: 'discuss',
        d:
          'If Jesus intended every one of His followers to obey His Great Commission, why do so few actually make disciples?'
      }
    ]
  }
];

const stateWithSections = {
  sections: sampleSections,
  section: 0,
  part: 0
};

describe('Live session reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should load sections', () => {
    expect(reducer(initialState, sectionsLoaded(sampleSections))).toEqual(
      stateWithSections
    );
  });

  const example = {
    section: 1,
    part: 0
  };

  it('should support being changed by section & part', () => {
    expect(reducer(stateWithSections, changed(example))).toEqual({
      ...stateWithSections,
      ...example
    });
  });

  it('should support being changed to out of bounds indices by simply not changing', () => {
    const outOfBoundsExample1 = { section: 10, part: 0 };
    const outOfBoundsExample2 = { section: 0, part: 2 };
    expect(reducer(stateWithSections, changed(outOfBoundsExample1))).toEqual(
      stateWithSections
    );
    expect(reducer(stateWithSections, changed(outOfBoundsExample2))).toEqual(
      stateWithSections
    );
  });

  it('should support being reset', () => {
    expect(reducer(stateWithSections, reset())).toEqual(initialState);
  });

  it('should support being changed by index', () => {
    const expectations = [
      { section: 0, part: 0 },
      { section: 1, part: 0 },
      { section: 2, part: 0 },
      { section: 2, part: 1 }
    ];
    for (let i in expectations) {
      expect(reducer(stateWithSections, slideIndexChanged(i))).toEqual({
        ...stateWithSections,
        ...expectations[i]
      });
    }
  });

  it('should support deriving an index from its current state of section & part', () => {
    const changedState = reducer(stateWithSections, slideIndexChanged(3));
    expect(selectCurrentSlideIndex({ live: changedState })).toBe(3);
  });
});
