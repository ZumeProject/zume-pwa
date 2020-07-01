import React from 'react';

import { storiesOf } from '@storybook/react';
import SessionSectionList from './SessionSectionList';

const sections = [
  {
    t: 'LOOKING BACK',
    d: 'Welcome back to Zúme Training!',
    parts: [
      {
        t: 'CHECK-IN',
        d: [
          'Before getting started, take some time to check-in.',
          'At the end of the last session, everyone in your group was challenged in two ways:',
          [
            'You were asked to prayerfully consider continuing as an ongoing spiritual family committed to multiplying disciples.',
            'You were encouraged to share Zúme Training by launching a Leadership Cell of future Zúme Training leaders.'
          ],
          "Take a few moments to see how your group has been doing with these items and their Three Month Plans since you've last met."
        ]
      },
      {
        t: 'PRAY',
        d:
          'Pray and thank God that He is faithful to complete His good work in us. Ask Him to give your group clear heads and open hearts to the great things He wants to do in and through you. Ask the Holy Spirit to lead your time together and thank Him for His faithfulness, too. He got you through!'
      },
      {
        t: 'OVERVIEW',
        d:
          'In this advanced training session, you’ll take a look at how you can level-up your Coaching Strengths with a quick checklist assessment. You’ll learn how Leadership in Networks allows a growing group of small churches to work together to accomplish even more. And you’ll learn how to develop Peer Mentoring Groups that take leaders to a whole new level of growth.'
      }
    ]
  },
  {
    t: 'Activity (10min)',
    d: 'Assess yourself using the coaching checklist.',
    duration: 10,
    parts: [
      {
        type: 'watch',
        t: 'ASSESS',
        d: [
          "The Coaching Checklist is a powerful tool you can use to quickly assess your own strengths and vulnerabilities when it comes to making disciples who multiply. It's also a powerful tool you can use to help others – and others can use to help you.",
          'Find the Coaching Checklist section in your Zúme Guidebook, and take this quick (5-minutes or less) self-assessment:',
          [
            'Read through the Disciple Training Tools in the far left column of the Checklist.',
            'Mark each one of the Training Tools, using the following method:',
            [
              "If you're unfamiliar or don't understand the Tool – check the BLACK column",
              "If you're somewhat familiar but still not sure about the Tool – check the RED column",
              'If you understand and can train the basics on the Tool – check the YELLOW column',
              'If you feel confident and can effectively train the Tool – check the GREEN column'
            ]
          ]
        ],
        payload: {
          video: '',
          script: '',
          scriptLabel: 'Zúme Video Scripts: Coaching Checklist'
        }
      },
      {
        type: 'discuss',
        questions: [
          'Which Training Tools did you feel you would be able to train well?',
          'Which ones made you feel vulnerable as a trainer?',
          'Are there any Training Tools that you would add or subtract from the Checklist? Why?'
        ]
      },
      {
        info:
          "REMEMBER – Be sure to share your Coaching Checklist results with training partner or other mentor. If you're helping coach or mentor someone, use this tool to help you assess which areas need your attention and training."
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
          'What happens to churches as they grow and start new churches that start new churches? How do they stay connected and live life together as an extended, spiritual family? They become a network!',
        payload: {
          video: '',
          script: '',
          scriptLabel: 'Zúme Video Scripts: Leadership in Networks'
        }
      },
      {
        type: 'discuss',
        questions:
          'Are there advantages when networks of simple churches are connected by deep, personal relationships? What are some examples that come to mind?'
      }
    ]
  },
  {
    t: 'Listen and Read Along (3min)',
    duration: 3,
    parts: [
      {
        type: 'read',
        d: [
          {
            t: 'Peer Mentoring Groups',
            d: [
              'Making disciples who make disciples means making leaders who make leaders. How do you develop stronger leaders? By teaching them how to love one another better. Peer Mentoring Groups help leaders love deeper.',
              'Find the Peer Mentoring Groups section in your Zúme Guidebook, and listen to the audio below.'
            ]
          }
        ]
      },
      {
        type: 'listen',
        payload: {
          audio: '',
          script: '',
          scriptLabel: 'Zúme Video Scripts: Peer Mentoring Groups'
        }
      }
    ]
  },
  {
    t: 'Practice (60min)',
    duration: 60,
    info:
      'Find the Peer Mentoring Groups section in your Zúme Training Guide, and follow these steps.',
    parts: [
      {
        t: 'GROUPS',
        d:
          'Break into groups of two or three and work through the 3/3 sections of the Peer Mentoring Group format. Peer Mentoring is something that happens once a month or once a quarter and takes some time for the whole group to participate, so you will not have time for everyone to experience the full mentoring process in this session.'
      },
      {
        type: 'practice',
        d: [
          'To practice, choose one person in your group to be the "mentee" for this session and have the other members spend time acting as Peer Mentors by working through the suggested questions list and providing guidance and encouragement for the Mentee\'s work.',
          "By the time you're finished, everyone should have a basic understanding of asking and answering."
        ]
      },
      {
        info:
          'REMEMBER – Spend time studying the Four Fields Diagnostic Diagram and Generational Map in the Peer Mentoring Groups section of your Zúme Training Guide. Make sure everyone in your group has a basic understanding of these tools before asking the suggested questions.'
      }
    ]
  },
  {
    t: 'CONGRATULATIONS ON COMPLETING ZÚME TRAINING!',
    duration: 3,
    parts: [
      {
        type: 'watch',
        d:
          'You and your group are now ready to take leadership to a new level! Here are a few more steps to help you KEEP growing!',
        payload: {
          video: '',
          script: '',
          scriptLabel: 'Zúme Video Scripts: Completion of Training'
        }
      },
      {
        t: 'ACT',
        d:
          "To help others become and make disciples, share this www.ZumeProject.com link today! It'll soon be in 37 languages."
      }
    ]
  }
];

storiesOf('Session/SessionSectionList', module)
  .add('renders with no section data', () => <SessionSectionList />)
  .add('renders with sections', () => (
    <SessionSectionList sections={sections} />
  ))
  .add('renders with a section that has no parts', () => {
    const sectionWithoutParts = [{ t: 'hi', d: 'world' }];
    return <SessionSectionList sections={sectionWithoutParts} />;
  })
  .add('renders with a selected section', () => (
    <SessionSectionList sections={sections} selectedId={2} />
  ));
