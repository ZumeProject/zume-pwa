import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomInFAB from './ZoomInFAB';
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined';

import { action } from '@storybook/addon-actions';

// We cannot test this programmatically
// because of animation
storiesOf('ZoomInFAB.DontTest', module)
  .add('renders a centered floating action button', () => (
    <ZoomInFAB>Hello</ZoomInFAB>
  ))
  .add('renders with an icon', () => (
    <ZoomInFAB icon={CloudDownloadIcon} onClick={action('clicked!')}>
      Download
    </ZoomInFAB>
  ));
