import { TextCropper } from "./TextCropper";
import { SearchHighLightProps, TextFieldProps, TextFields } from "./types";

export class SearchHighLighter<T extends string> extends TextCropper {
  constructor({
    textFields,
    searchValue = "",
    highLightColor = "blue",
    minLengthToHighLight = 2,
    wrapperWidth = Infinity,
  }: SearchHighLightProps<T>) {
    super({ wrapperWidth });
    this.searchValue = searchValue.trim();
    this.highLightColor = highLightColor;
    this.minLengthToHighLight = minLengthToHighLight;
    this.prepareFields(textFields);
  }

  static sanitizeForRegExp(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  public searchValue: string;

  public readonly highLightColor: string;

  public readonly minLengthToHighLight: number;

  private textFields: TextFields = {};

  private getHighLightedValueByField(field: T) {
    const matchedValues = this.getSearchedOriginalTextsByField(field);
    let result = this.getCroppedTextByTextField(this.textFields[field]);

    matchedValues.forEach((value) => {
      const regexp = new RegExp(
        SearchHighLighter.sanitizeForRegExp(value),
        "g",
      );

      const replaceValue = `<span style="color:${this.highLightColor}">${value}</span>`;

      result = result.replace(regexp, replaceValue);
    });

    return result;
  }

  private getSearchedOriginalTextsByField(field: T) {
    const { text } = this.textFields[field];

    const regexp = new RegExp(
      SearchHighLighter.sanitizeForRegExp(this.searchValue),
      "gi",
    );
    const allMatches = Array.from(text.matchAll(regexp));
    const allMatchesSet = new Set(allMatches.map((match) => match[0]));

    this.setFirstLetterIndex(allMatches[0]?.index || 0);

    return allMatchesSet;
  }

  public getFieldValue(field: T) {
    if (this.isForbiddenToHighlight)
      return this.textFields?.[field]?.text || "";

    return (
      this.textFields?.[field].result || this.textFields?.[field]?.text || ""
    );
  }

  private prepareFields(fields: TextFieldProps) {
    if (this.isForbiddenToHighlight) return;

    Object.entries(fields).forEach(([fieldKey, fieldValue]) => {
      this.textFields[fieldKey] = { ...fieldValue, result: "" };

      this.prepareFieldResult(fieldKey as T);
    });
  }

  public prepareFieldResult(field: T) {
    this.textFields[field].result = this.getHighLightedValueByField(field);
  }

  public setSearchValue(value: string) {
    this.searchValue = value.trim();

    this.prepareFields(this.textFields);
  }

  private get isForbiddenToHighlight() {
    return this.searchValue.length < this.minLengthToHighLight;
  }
}
