import {
  ButtonSka,
  DatePickerSka,
  FooterSka,
  HeaderSka,
  IconSka,
  LocalesSupportedTheme,
  SelectSka,
  StackSka,
  ThemeProviderSka,
  TranslateData,
  TypographySka,
  colorPalette,
  useTranslateSka,
} from "ska-studio-components";
import "./App.css";
import { useState } from "react";
import logoPokedex from "./assets/Pokedexska.png";
import { Register } from "./components/Register";
import { Pokedex } from "./components/Pokedex";

function App() {
  const { t } = useTranslateSka();
  const [locale, setLocale] = useState<LocalesSupportedTheme>("en_US");

  const translateDataPtBr = {
    locale: "pt_BR",
    translate: {
      "#title": "Título",
      "#button_text": "Texto do botão",
      "#portuguese": "Português",
      "#english": "Inglês",
    },
  } as TranslateData;

  const translateDataEnUs = {
    locale: "en_US",
    translate: {
      "#title": "Title",
      "#button_text": "Button text",
      "#portuguese": "Portuguese",
      "#english": "English",
    },
  } as TranslateData;

  const optionsTranslate = [
    { value: "pt_BR", label: t("#portuguese") },
    { value: "en_US", label: t("#english") },
  ];

  return (
    <>
      <ThemeProviderSka locale={locale} translateData={[translateDataPtBr, translateDataEnUs]}>
        <StackSka
          height={"100%"}
          maxWidth={"100%"}
          justifyContent="space-between"
          overflow="hidden"
        >
          <HeaderSka
            logo={<img src={logoPokedex} alt="log" style={{ height: 50 }} />}
            customSettings={
              <SelectSka
                defaultValue={"pt_BR"}
                width={"200px"}
                onChange={(value) => setLocale(value as LocalesSupportedTheme)}
                options={optionsTranslate}
              />
            }
          />
          <Pokedex />
          {/* <Register setUser={() => {}} /> */}
          <FooterSka
            itemLeft={<ButtonSka>algo</ButtonSka>}
            itemRight={new Date(Date.now()).toDateString()}
          />
        </StackSka>
      </ThemeProviderSka>
    </>
  );
}

export default App;
