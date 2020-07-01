import React from 'react';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CircularIntegration from './CircularIntegration';

function CircularIntegrationWrapper() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };
  const iconButton = (
    <IconButton edge="end" aria-label="save" onClick={handleButtonClick}>
      {success ? <CheckIcon /> : <SaveIcon />}
    </IconButton>
  );

  return (
    <CircularIntegration
      loading={loading}
      iconButton={iconButton}
      onClick={action('clicked again')}
    />
  );
}

storiesOf(
  'CircularIntegration',
  module
).add('renders an FAB with a wrapping circular progress indicator', () => (
  <CircularIntegrationWrapper />
));
