import I18n from 'react-native-i18n';
import en from './locales/en';
import fr from './locales/fr';  
import it from './locales/en';
import jp from './locales/fr';  
import ru from './locales/en';

I18n.fallbacks = true;

I18n.translations = {
    en,
    fr,
    it,
    jp,
    ru
  };

export default I18n; 