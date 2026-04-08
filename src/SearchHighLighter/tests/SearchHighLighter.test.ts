import { describe, expect, it } from "vitest";
import { SearchHighLighter } from "../SearchHighLighter";
import { getTextWithHighLight, getTextWrapperWidth } from "./utils";

import {
  BASE_DATA,
  BASE_DATA_SEARCHED,
  BASE_COLOR,
  BASE_HIGHLIGHTER_PROPS,
  BASE_TEXT_FIELDS_PROPS,
  CROP_DATA,
} from "./constants";

const { minLengthToHighLight, searchValue, highLightColor, wrapperWidth } =
  BASE_HIGHLIGHTER_PROPS;

describe("Инициализация:", () => {
  it("С обязательными параметрами", () => {
    const highLighter = new SearchHighLighter({
      searchValue,
      textFields: { title: BASE_TEXT_FIELDS_PROPS.title },
      minLengthToHighLight,
      highLightColor,
      wrapperWidth,
    });

    expect(highLighter.searchValue).toBe(searchValue);
    expect(highLighter.getFieldValue("title")).toBe(BASE_DATA.title);
    expect(highLighter.minLengthToHighLight).toBe(minLengthToHighLight);
    expect(highLighter.highLightColor).toBe(highLightColor);
    expect(highLighter.wrapperWidth).toBe(wrapperWidth);
  });

  it("Необязательные параметры принимают значения по умолчанию", () => {
    const highLighter = new SearchHighLighter({
      searchValue,
      textFields: BASE_TEXT_FIELDS_PROPS,
    });

    expect(highLighter.minLengthToHighLight).toBe(2);
    expect(highLighter.highLightColor).toBe(BASE_COLOR);
    expect(highLighter.wrapperWidth).toBe(Infinity);
  });

  it("Изменение поля searchValue срабатывает корректно", () => {
    const changedSearchValue = "changed search value";

    const highLighter = new SearchHighLighter({
      searchValue,
      textFields: BASE_TEXT_FIELDS_PROPS,
    });

    expect(highLighter.searchValue).toEqual(searchValue);
    highLighter.setSearchValue(changedSearchValue);
    expect(highLighter.searchValue).toEqual(changedSearchValue);
  });
});

describe("Подсветка текста:", () => {
  it("Нельзя искать при searchValue < minLengthToHighLight", () => {
    const highLighter = new SearchHighLighter({
      searchValue: "1",
      textFields: { title: BASE_TEXT_FIELDS_PROPS.title },
    });

    expect(highLighter.getFieldValue("title")).toEqual("");
  });

  it("Нельзя искать при кастомном значении minLengthToSearch и searchValue < minLengthToHighLight", () => {
    const highLighter = new SearchHighLighter({
      searchValue: "test",
      minLengthToHighLight: 5,
      textFields: { title: BASE_TEXT_FIELDS_PROPS.title },
    });

    expect(highLighter.getFieldValue("title")).toEqual("");
  });

  it("Корректно работает при изменении поля title", () => {
    const highLighter = new SearchHighLighter({
      searchValue: "dummy",
      textFields: { title: BASE_TEXT_FIELDS_PROPS.title },
    });

    expect(highLighter.getFieldValue("title")).toEqual(
      BASE_DATA_SEARCHED.title,
    );

    highLighter.setSearchValue("DummY");

    expect(highLighter.getFieldValue("title")).toEqual(
      BASE_DATA_SEARCHED.title,
    );
  });

  it("Корректно работает при изменении поля text", () => {
    const highLighter = new SearchHighLighter({
      searchValue: "the",
      textFields: { text: BASE_TEXT_FIELDS_PROPS.text },
    });

    expect(highLighter.getFieldValue("text")).toEqual(BASE_DATA_SEARCHED.text);

    highLighter.setSearchValue("ThE");
    expect(highLighter.getFieldValue("text")).toEqual(BASE_DATA_SEARCHED.text);
  });

  it("Корректно работает при изменении поля с разным регистром", () => {
    const highLighter = new SearchHighLighter({
      searchValue: " tHe ",
      textFields: BASE_TEXT_FIELDS_PROPS,
    });

    expect(highLighter.getFieldValue("text")).toEqual(BASE_DATA_SEARCHED.text);

    highLighter.setSearchValue("DummY");

    expect(highLighter.getFieldValue("title")).toEqual(
      BASE_DATA_SEARCHED.title,
    );
  });

  it("Измененный цвет подсветки", () => {
    const customColor = "red";

    const highLighter = new SearchHighLighter({
      searchValue: "the",
      highLightColor: customColor,
      textFields: { text: BASE_TEXT_FIELDS_PROPS.text },
    });

    expect(highLighter.getFieldValue("text")).toEqual(
      getTextWithHighLight(customColor),
    );
  });

  it("Подсветка емоджи", () => {
    const highLighter = new SearchHighLighter({
      searchValue: "🙂",
      highLightColor: BASE_COLOR,
      textFields: { text: { text: BASE_DATA.withEmoji } },
    });

    expect(highLighter.getFieldValue("text")).toEqual(
      BASE_DATA_SEARCHED.withEmoji,
    );
  });
});

describe("Обрезка текста при подсветке в зависимости от ширины viewport:", () => {
  Object.entries(CROP_DATA.title).forEach(([viewPort, result]) => {
    it(`Title: ${viewPort}px`, () => {
      const highLighter = new SearchHighLighter({
        searchValue: "1500s",
        textFields: {
          title: {
            text: BASE_DATA.title,
            letterWidth: BASE_HIGHLIGHTER_PROPS.letterWidthTitle,
          },
        },
        wrapperWidth: getTextWrapperWidth(Number(viewPort)),
      });

      expect(
        highLighter.getFieldValue("title").startsWith(result),
      ).toBeTruthy();
    });
  });

  Object.entries(CROP_DATA.text).forEach(([viewPort, result]) => {
    it(`Text: ${viewPort}px`, () => {
      const highLighter = new SearchHighLighter({
        searchValue: "PageMaker",
        textFields: {
          text: {
            text: BASE_DATA.text,
            letterWidth: BASE_HIGHLIGHTER_PROPS.letterWidthText,
          },
        },
        wrapperWidth: getTextWrapperWidth(Number(viewPort)),
      });

      expect(highLighter.getFieldValue("text").startsWith(result)).toBeTruthy();
    });
  });
});
