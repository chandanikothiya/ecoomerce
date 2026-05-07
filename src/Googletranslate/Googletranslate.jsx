import React, { useEffect } from "react";

function Googletranslate() {

  useEffect(() => {
    const addScript = document.createElement("script");

    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

    addScript.async = true;

    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          layout:
            window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, []);

  return <div id="google_translate_element"></div>;
}

export default Googletranslate;