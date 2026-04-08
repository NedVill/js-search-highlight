import { getTextWithHighLight } from "./utils";

export const BASE_COLOR = "blue";

export const BASE_DATA = {
  title:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer",

  text: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  withEmoji: "This is 🙂, but not 🥲",
};

export const BASE_DATA_SEARCHED = {
  title: `Lorem Ipsum is simply <span style="color:${BASE_COLOR}">dummy</span> text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard <span style="color:${BASE_COLOR}">dummy</span> text ever since the 1500s, when an unknown printer`,
  text: getTextWithHighLight(),
  withEmoji: `This is <span style="color:${BASE_COLOR}">🙂</span>, but not 🥲`,
};

export const BASE_HIGHLIGHTER_PROPS = {
  searchValue: "search value",
  minLengthToHighLight: 3,
  highLightColor: BASE_COLOR,
  wrapperWidth: 100,
  letterWidthText: 8,
  letterWidthTitle: 10,
};

export const BASE_TEXT_FIELDS_PROPS = {
  title: {
    text: BASE_DATA.title,
    letterWidth: BASE_HIGHLIGHTER_PROPS.letterWidthTitle,
  },
  text: {
    text: BASE_DATA.text,
    letterWidth: BASE_HIGHLIGHTER_PROPS.letterWidthText,
  },
};

export const CROP_DATA = {
  text: {
    1920: `…um passages, and more recently with`,
    1440: `…re recently with desktop publishing`,
    1280: `…ently with desktop publishing software`,
  },
  title: {
    1920: `… has been the industry's standard dummy`,
    1440: `…ndustry's standard dummy text`,
    1280: `…ry's standard dummy text`,
  },
};
