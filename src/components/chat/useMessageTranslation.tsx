
import { useState } from "react";

export function useMessageTranslation(text: string, targetLang: string) {
  const [translated, setTranslated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Dummy translate function (använd riktig översättning via API senare)
  const doTranslate = async () => {
    setIsLoading(true);
    // Här skulle du istället göra en API-call
    setTimeout(() => {
      if (targetLang === "sv") setTranslated("Detta är en översättning till svenska.");
      else if (targetLang === "es") setTranslated("Esta es una traducción al español.");
      else if (targetLang === "zh") setTranslated("这是中文翻译。");
      else if (targetLang === "ar") setTranslated("هذا ترجمة إلى العربية.");
      else setTranslated("This is a translation to English.");
      setIsLoading(false);
    }, 800);
  };

  return { translated, isLoading, doTranslate };
}
