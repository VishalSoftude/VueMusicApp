import translate from 'translate';

export const translateService = {
  async translateData(dataToTranslate, targetedLanguage) {
    console.log('dataToTranslate', dataToTranslate);

    translate.engine = 'google';
    translate.from = 'en';
    translate.to = targetedLanguage;

    for (const keyofParent in dataToTranslate) {
      for (const childKey in dataToTranslate[keyofParent]) {
        const translatedText = await translate(dataToTranslate[keyofParent][childKey]);
        dataToTranslate[keyofParent][childKey] = translatedText;
      }
    }
  }
};
