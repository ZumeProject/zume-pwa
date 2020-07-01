import { useTranslation } from 'react-i18next';

export function useAppTranslation() {
  const { t } = useTranslation('zume');
  return t;
}

const metaKey = 'meta';
const hasProtocol = /^https:/;
/**
 *
 * Normalizes an asset url. If it begins with https: we pass through, otherwise
 * we prepend the baseUrl specified in the meta key of the asset localization file.
 *
 * @param {string} url the url to normalize
 * @param {object} lam a result from useLocalizedAssetMapper so we can get the metaKey
 */
export function normalizeAssetUrl(url, lam) {
  // the url needs the basePath prepended
  const { baseUrl } = lam(metaKey) || '';
  if (hasProtocol.test(url)) {
    return url;
  } else {
    return baseUrl + url;
  }
}

export function useLocalizedAsset() {
  const t = useLocalizedAssetMapper();
  return key => {
    const { url } = t(key);
    return normalizeAssetUrl(url, t);
  };
}

export function useLocalizedAssetMapper() {
  const { i18n } = useTranslation();
  const fixedT = i18n.getFixedT(i18n.language, 'zume-assets');
  const t = key => fixedT(key, { returnObjects: true });
  return t;
}
