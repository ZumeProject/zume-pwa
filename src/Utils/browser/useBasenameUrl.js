import { useNavigation } from 'react-navi';

/**
 * This hook is a helper that ensures we qualify relative links with the basename where the app is loaded.
 * It helps when we are hosted at a subdirectory instead of root.
 */
export default function useBasenameUrl(url) {
  const navigation = useNavigation();
  return navigation && navigation.basename
    ? `${navigation.basename}${url}`
    : url;
}
