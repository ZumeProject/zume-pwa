import sectionLength, {
  totalSectionLengths,
  listSectionsByAccumulatedLength,
  getSectionAndPartFromIndex,
  getIndexFromSectionAndPart,
  getContentForSectionAndPart
} from './sectionLength';

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
  },
  {
    t: 'Watch and Discuss (15min)',
    duration: 15,
    parts: [
      {
        type: 'watch',
        d:
          'What is a disciple? And how do you make one? How do you teach a follower of Jesus to do what He told us in His Great Commission – to obey all of His commands?',
        payload: {
          url: 'https://player.vimeo.com/video/247382094',
          script:
            'https://zume.training/wp-content/themes/zume-project-multilingual/downloads/en/35_en_teach_them_to_obey.pdf',
          scriptLabel: 'Zúme Video Scripts: Teach Them to Obey'
        }
      },
      {
        type: 'discuss',
        questions: [
          'When you think of a church, what comes to mind?',
          'What\'s the difference between that picture and what\'s described in the video as a "Simple Church"?',
          'Which one do you think would be easier to multiply and why?'
        ]
      }
    ]
  }
];

it('handles a section with parts', () => {
  const len = sectionLength(sampleSections[0]);
  expect(len).toBe(1);
});

it('handles a section with no parts', () => {
  const len = sectionLength(sampleSections[1]);
  expect(len).toBe(1);
});

it('handles a section with multiple parts', () => {
  const len = sectionLength(sampleSections[2]);
  expect(len).toBe(2);
});

it('computes total section length for an array of sections with various types', () => {
  const total = totalSectionLengths(sampleSections);
  expect(total).toBe(6);
});

it('creates a list of sections ordered by their accumulated length', () => {
  const list = listSectionsByAccumulatedLength(sampleSections);
  expect(list).toEqual([1, 2, 4, 6]);
});

describe('converting between index and section/part', () => {
  it('maps an index into a flattened array back to a section and part', () => {
    const total = totalSectionLengths(sampleSections);
    const pairs = [
      { section: 0, part: 0 },
      { section: 1, part: 0 },
      { section: 2, part: 0 },
      { section: 2, part: 1 },
      { section: 3, part: 0 },
      { section: 3, part: 1 }
    ];
    for (let i = 0; i < total; i++) {
      expect(getSectionAndPartFromIndex(sampleSections, i)).toEqual(pairs[i]);
    }
  });

  it('maps invalid indices to the lower and upper bound', () => {
    const total = totalSectionLengths(sampleSections);
    expect(getSectionAndPartFromIndex(sampleSections, -1)).toEqual({
      section: 0,
      part: 0
    });
    expect(getSectionAndPartFromIndex(sampleSections, total)).toEqual({
      section: 3,
      part: 1
    });
  });

  it('maps a section and part to an index into a flattened array', () => {
    const inputs = [
      { section: 0, part: 0 },
      { section: 1, part: 0 },
      { section: 2, part: 0 },
      { section: 2, part: 1 },
      { section: 3, part: 0 },
      { section: 3, part: 1 }
    ];
    const expectations = [0, 1, 2, 3, 4, 5];
    for (let i in inputs) {
      const { section, part } = inputs[i];
      expect(getIndexFromSectionAndPart(sampleSections, section, part)).toBe(
        expectations[i]
      );
    }
  });
});

describe('returning section and part content', () => {
  it('returns part content for a section with parts', () => {
    expect(getContentForSectionAndPart(sampleSections, 2, 0)).toEqual({
      ...sampleSections[2].parts[0],
      section: {
        duration: 15,
        t: 'Watch and Discuss (15min)',
        sectionIndex: 2
      }
    });
  });
  it('returns part content for a section without parts', () => {
    expect(getContentForSectionAndPart(sampleSections, 1, 0)).toEqual({
      ...sampleSections[1],
      sectionIndex: 1,
      type: 'section'
    });
  });
  it('returns null otherwise', () => {
    expect(getContentForSectionAndPart(sampleSections, 1, 3)).toBe(null);
  });
});
