import React, { useEffect } from 'react';
import ZumeLogo from 'Components/zume/ZumeLogo';
import ZumePersistButton from 'Components/zume/ZumePersistButton';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ZoomInFAB from 'Components/shared/ZoomInFAB';
import QuotaDisplay from 'Components/shared/QuotaDisplay';
import SessionDownloadList from 'Components/shared/session/SessionDownloadList';
import { selectSessionSizes, filterToDownloadableAssets } from 'Redux/sessions';
import { selectStorage } from 'Redux/downloads';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocalizedAssetMapper } from 'Components/zume/translationHooks';
import CloudDownloadIcon from '@material-ui/icons/CloudDownloadOutlined';
import {
  download,
  deleteDownload,
  cancelDownload,
  estimateUsage,
  persisted,
  persist
} from 'Redux/downloads/effects';

export default function Downloads() {
  const { t } = useTranslation();
  const lam = useLocalizedAssetMapper();
  const sessionsWithSizes = useSelector(state =>
    selectSessionSizes(state, lam)
  );
  const storageEstimate = useSelector(selectStorage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(estimateUsage());
    dispatch(persisted());
  }, [dispatch]);

  return (
    <Container component="main" maxWidth="sm">
      <Box display="flex" p={1}>
        <Box flexGrow={1}>
          <ZumeLogo size="small" />
        </Box>
        <Box>
          <QuotaDisplay
            data={storageEstimate}
            persistButton={
              <ZumePersistButton onClick={() => dispatch(persist())}>
                {t('downloads|tap_to_persist')}
              </ZumePersistButton>
            }
          />
        </Box>
      </Box>
      <Box pb={20} pt={0} ph={0}>
        <SessionDownloadList
          sessionsWithSizes={sessionsWithSizes}
          onDownload={assets =>
            filterToDownloadableAssets(assets).forEach(a =>
              dispatch(download(a))
            )
          }
          onDelete={assets =>
            filterToDownloadableAssets(assets).forEach(a =>
              dispatch(deleteDownload(a))
            )
          }
          onCancel={assets =>
            filterToDownloadableAssets(assets).forEach(a =>
              dispatch(cancelDownload(a))
            )
          }
        />
      </Box>
      <ZoomInFAB
        icon={CloudDownloadIcon}
        label={t('downloads|download_all')}
        onClick={() => {
          sessionsWithSizes.forEach(s => {
            if (!s.offlineAccess) {
              filterToDownloadableAssets(s.assetReferences).forEach(a =>
                dispatch(download(a))
              );
            }
          });
        }}>
        {t('downloads|download_all')}
      </ZoomInFAB>
    </Container>
  );
}
