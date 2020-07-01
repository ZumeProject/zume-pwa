import React from 'react';
import { storiesOf } from '@storybook/react';
import Description from './Description';

const stringDescription = 'This is a string description';
const arrayOfStrings = [
  'A multiline description',
  'is specified through',
  'an array of strings'
];
const arrayOfStringsAndObjects = [
  'This first line is a string',
  { t: 'Followed by', d: 'An object' },
  'And another string',
  { t: 'And another', d: 'Object here!' }
];
const nestedArraysOfStrings = [
  ['The first line', 'is this absurd'],
  'For us to have multiple nested',
  'arrays of strings?'
];
const objectWithNestedArray = [
  {
    t: 'List of 100',
    d: [
      'God has already given us the relationships we need to “Go and make disciples.” These are our family, friends, neighbors, co-workers and classmates – people we’ve known all our lives or maybe just met.',
      'Being good stewards of these relationships is the first step in multiplying disciples. Start by making a list.'
    ]
  }
];

const nestedDescriptions = [
  {
    d: [
      'Nested descriptions',
      {
        t: 'LOOK BACK [1/3 of your time]',
        d: [
          'Care and Prayer: Take time to have each person share something they are thankful for. Then each person should share something they are struggling with. Have the person to their right pray for them about the items they share. If anyone is struggling with something that requires more attention, stay after to care for that person.',
          'Vision: Spend time singing together and tie the lyrics to the themes of loving God, loving others, sharing Jesus with others, starting new groups, and helping others do the same. Alternatively people could share Bible passages that communicate these themes.',
          'Check-in: Have each person share how they did regarding the commitments they wrote down from the previous week:',
          'How have you obeyed what you have learned?',
          'Who have you trained in what you have learned?',
          'With whom have you shared your story or God’s story?',
          'If they forgot to follow through on a commitment or did not have the opportunity to do so, then those commitments from the prior week should be added to this week’s commitments. If someone simply refuses to obey something they clearly heard from God then it should be treated as a church discipline issue.'
        ]
      },
      {
        t: 'LOOK UP [1/3 of your time]',
        d: [
          'Pray: Talk with God simply and briefly. Ask God to teach you this passage.',
          'Read and Discuss: Read this week’s passage. Discuss the following questions:',
          [
            'What did you like about this passage?',
            'What did you find challenging or hard to understand about this passage?'
          ],
          'Read this week’s passage again.',
          [
            'What can we learn about people from this passage?',
            'What can we learn about God from this passage?'
          ]
        ]
      },
      {
        t: 'LOOK FORWARD [1/3 of your time]',
        d: [
          'Obey. Train. Share. : Take at least five minutes in silent prayer. Have everyone in the group pray for the Holy Spirit to show them how to answer these questions, then make commitments. Everyone should write the commitments down so they can pray for people knowledgeably and hold them accountable. They may not hear something related to every question every week. They should note if they share a response which they are not sure they heard from God, but they think may be a good idea since the accountability will be handled at a different level in that case.',
          [
            'How will I apply and obey this passage?',
            'Who will I train or share with about this passage?',
            'Who does God want me to share my story [testimony] and/or God’s story with this week?'
          ],
          'Practice: In groups of two or three, practice what you have committed to do in question 5, 6 or 7. For example, role-play a difficult conversation or facing a temptation; practice teaching today’s passage, or practice sharing the Gospel.',
          'Talk With God: In the same groups of two or three, pray for every member individually. Ask God to prepare the hearts of the people who will be hearing about Jesus this week. Ask Him to give you the strength and wisdom to be obedient to your commitments. This is the conclusion of the meeting.'
        ]
      }
    ]
  }
];

storiesOf('Live Views.Description', module)
  .add('renders with no content', () => <Description />)
  .add('renders a simple string', () => <Description d={stringDescription} />)
  .add('renders with an array of strings', () => (
    <Description d={arrayOfStrings} />
  ))
  .add('renders with an array of strings and objects', () => (
    <Description d={arrayOfStringsAndObjects} />
  ))
  .add('renders with nested arrays', () => (
    <Description d={nestedArraysOfStrings} />
  ))
  .add('renders with object with nested array', () => (
    <Description d={objectWithNestedArray} />
  ))
  .add('renders a link', () => (
    <Description
      d={{
        type: 'link',
        payload: { href: 'about:blank', label: 'A link', color: 'textPrimary' }
      }}
    />
  ))
  .add('renders complex text', () => (
    <Description
      d={[
        'This is test text with a dash-in it as well as a:',
        [
          'Scripture: 1',
          'Observation: 2',
          'Application: 3',
          'Prayer: 4',
          'Sharing: 5'
        ],
        'Here’s an example of S.O.A.P.S. at work:',
        "S – “I've seen dashes cause problems” Isaiah 55:8-9",
        'O – He can do ANYTHING.',
        'A – instead of relying on my own way of doing things.',
        'P – My thoughts lead to hurt. Please teach me Your ways and Your thoughts, instead. Let your Holy Spirit guide me as I follow You.',
        'S – I will share this with someone who needs direction for important decisions he’s facing.'
      ]}
    />
  ))
  .add('renders with caption text', () => (
    <Description
      d={[
        'hi there',
        {
          type: 'caption',
          payload: {
            text: 'This is smaller caption text'
          }
        }
      ]}
    />
  ))
  .add('renders with an image', () => (
    <Description
      d={[
        'hello world',
        {
          type: 'image',
          payload: {
            image: 'exampleUrl'
          }
        }
      ]}
    />
  ))
  .add('renders with nested descriptions', () => (
    <Description d={nestedDescriptions} />
  ));
