import React from 'react';
import { storiesOf } from '@storybook/react';
import ListenPart from './ListenPart';

storiesOf('Live Views.ListenPart', module)
  .add('renders with no content', () => <ListenPart />)
  .add('renders with title', () => <ListenPart t="Hi" />)
  .add('renders with description', () => (
    <ListenPart d="A sound you can hear." />
  ))
  .add('renders with description and scriptLabel', () => (
    <ListenPart
      d="You will listen to a recording and discuss it."
      scriptLabel="Download the script"
    />
  ))
  .add('renders with audio', () => (
    <ListenPart
      t="A video"
      d="This is a sample sound"
      script="scriptkey"
      scriptLabel="Download script"
      audio="audioUrlKey"
    />
  ))
  .add('renders with audio and text', () => (
    <ListenPart
      t="A video"
      d="This is a sample sound"
      audio="audioUrlKey"
      text={[
        'As a follower of Jesus, we should be reading Scripture daily. A good guideline is to read through a minimum of 25-30 chapters in the Bible each week. Keeping a daily journal daily using the S.O.A.P.S. Bible Reading format will help you understand, obey and share even more. S.O.A.P.S. is:',
        [
          'Scripture: Write out one or more verses that are particularly meaningful to you, today.',
          'Observation: Rewrite those verses or key points in your own words to better understand.',
          'Application: Think about what it means to obey these commands in your own life.',
          'Prayer: Write out a prayer telling God what you’ve learned and how you plan to obey.',
          'Sharing: Ask God who He wants you to share with about what you’ve learned applied.'
        ],
        'Here’s an example of S.O.A.P.S. at work:',
        'S – “For my thoughts are not your thoughts, nor are your ways My ways,” declares the Lord. “For as the heavens are higher than the earth, so are My ways higher than your ways and My thoughts than your thoughts.” Isaiah 55:8-9',
        'O – As a human, I’m limited in what I know and what I know how to do. God is not limited in any way. He sees and knows EVERYTHING. He can do ANYTHING.',
        'A – Since God knows everything and His ways are best, I’ll have much more success in life if I follow Him instead of relying on my own way of doing things.',
        'P – Lord, I don’t know how to live a good life that pleases You and helps others. My ways lead to mistakes. My thoughts lead to hurt. Please teach me Your ways and Your thoughts, instead. Let your Holy Spirit guide me as I follow You.',
        'S – I will share these verses and this application with my friend, Steve, who is going through a difficult time and needs direction for important decisions he’s facing.'
      ]}
    />
  ));
