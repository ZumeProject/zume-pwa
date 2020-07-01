import React, { useState } from 'react';
import filesize from 'filesize.js';
import { useTranslation } from 'react-i18next';
import { useAppTranslation } from 'Components/zume/translationHooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined';
import StopIcon from '@material-ui/icons/Stop';
import CircularIntegration from 'Components/shared/CircularIntegration';
import AlertDialog from 'Components/shared/AlertDialog';
import Button from '@material-ui/core/Button';

export default function SessionDownloadList({
  sessionsWithSizes,
  onDownload,
  onDelete,
  onCancel
}) {
  const { t } = useTranslation();
  const trans = useAppTranslation();

  if (!sessionsWithSizes || !sessionsWithSizes.length) {
    return <div>{t('sessions|no_sessions')}</div>;
  }

  return (
    <List>
      {sessionsWithSizes.map(s => {
        let actionLabel = t('downloads|download');
        let iconButton = generateIconButton(
          <CloudDownloadIcon />,
          actionLabel,
          () => onDownload(s.assetReferences)
        );

        if (s.isDownloading) {
          actionLabel = t('downloads|downloading');
          let cancel = () => onCancel(s.assetReferences);
          let innerIconButton = generateIconButton(
            <StopIcon />,
            actionLabel,
            cancel
          );
          iconButton = (
            <CircularIntegration
              iconButton={innerIconButton}
              loading={true}
              onClick={cancel}
              variant="static"
              value={s.offlineProgress}
            />
          );
        }

        if (s.isQueued) {
          actionLabel = t('downloads|queued');
          let innerIconButton = generateIconButton(
            <StopIcon />,
            actionLabel,
            () => onCancel(s.assetReferences)
          );
          iconButton = <CircularIntegration iconButton={innerIconButton} />;
        }

        if (s.offlineAccess || s.offlineProgress === 100) {
          actionLabel = t('downloads|delete');
          iconButton = generateIconButton(<DeleteIcon />, actionLabel, () =>
            onDelete(s.assetReferences)
          );
        }

        return (
          <ListItem key={s.id}>
            <ListItemText
              primary={trans(s.t)}
              secondary={s.size ? filesize(s.size) : null}
            />
            {s.hasErrors && (
              <ErrorDialogWithButton
                onAccept={() => {
                  onDelete(s.assetReferences);
                }}
                errors={s.assetsInError}
              />
            )}
            <ListItemSecondaryAction title={actionLabel}>
              {iconButton}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

function generateIconButton(icon, actionLabel, onClick) {
  return (
    <IconButton edge="end" aria-label={actionLabel} onClick={onClick}>
      {icon}
    </IconButton>
  );
}

function ErrorDialogWithButton({ onAccept, errors }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const description = (
    <React.Fragment>
      <List>
        {errors &&
          errors.map((e, i) => (
            <ListItem key={`error-${i}`}>
              <ListItemText>
                <a href={e.url} target="_blank" rel="noopener noreferrer">
                  {e.url}
                </a>{' '}
                {e.error.message}
              </ListItemText>
            </ListItem>
          ))}
      </List>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ListItemIcon onClick={handleClickOpen}>
        <WarningIcon />
      </ListItemIcon>
      <AlertDialog
        title={t('downloads|clear_errors')}
        description={description}
        open={open}
        handleClose={handleClose}
        actions={
          <React.Fragment>
            <Button onClick={handleClose} color="primary">
              {t('general|no')}
            </Button>
            <Button
              onClick={() => {
                handleClose();
                onAccept();
              }}
              color="primary"
              autoFocus
            >
              {t('general|yes')}
            </Button>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}
