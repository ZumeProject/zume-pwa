import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ZumeInstallButton from 'Components/zume/ZumeInstallButton';
import ZumeLogo from 'Components/zume/ZumeLogo';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemLink from 'Components/shared/navigation/ListItemLink';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined';
import TranslateIcon from '@material-ui/icons/TranslateOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import HelpIcon from '@material-ui/icons/HelpOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExitToAppIcon from '@material-ui/icons/ExitToAppOutlined';
import BookIcon from '@material-ui/icons/BookOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  useAppTranslation,
  useLocalizedAsset
} from 'Components/zume/translationHooks';
import { RESET_STATE } from '@redux-offline/redux-offline/lib/constants';
import { reset } from 'Redux/store';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper
  }
}));

export default function Menu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const trans = useAppTranslation();
  const asset = useLocalizedAsset();
  const [resetting, setResetting] = useState(false);

  return (
    <div className={classes.root}>
      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <ZumeLogo size="small" />
        </Box>
        <Box>
          <ZumeInstallButton />
        </Box>
      </Box>
      <List
        subheader={<ListSubheader>{t('menu|settings')}</ListSubheader>}
        component="nav"
        aria-label={t('menu|settings')}>
        <ListItemLink href="/downloads">
          <ListItemIcon>
            <CloudDownloadIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu|downloads')} />
        </ListItemLink>
        <ListItemLink href="/language">
          <ListItemIcon>
            <TranslateIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu|language')} />
        </ListItemLink>
        <ListItem
          button
          onClick={() => {
            const shouldReset = window.confirm(t(t('menu|reset_app_warning')));
            if (shouldReset) {
              setResetting(true);
              dispatch(reset());
              dispatch({ type: RESET_STATE });
              setTimeout(() => {
                setResetting(false);
                window.location.reload();
              }, 500);
            }
          }}>
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu|reset_app')} />
          {resetting && (
            <ListItemSecondaryAction>
              <CircularProgress />
            </ListItemSecondaryAction>
          )}
        </ListItem>
      </List>
      <List
        subheader={<ListSubheader>{trans('About Zúme Project')}</ListSubheader>}
        component="nav"
        aria-label={trans('About Zúme Project')}>
        <ListItemLink href="/about">
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={t('navigation|about')} />
        </ListItemLink>
        <ListItemLink href="https://zume.training/" target="_blank">
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu|help')} />
        </ListItemLink>
        <ListItemLink href={asset('guidebook')} target="_blank">
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu|guidebook')} />
        </ListItemLink>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={t('menu|signout')} />
        </ListItem>
      </List>
    </div>
  );
}
