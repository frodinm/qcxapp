import I18n from 'react-native-i18n';
import en from './locales/en';
import fr from './locales/fr';  
import it from './locales/it';

I18n.fallbacks = true;

I18n.translations = {
    en,
    fr,
    it
  };

export default I18n; 