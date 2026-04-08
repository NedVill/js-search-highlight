import { TextCropperProps, TextField } from "./types";

export class TextCropper {
  constructor({ wrapperWidth = Infinity }: TextCropperProps) {
    this.wrapperWidth = wrapperWidth;
  }

  public readonly wrapperWidth: number;

  private firstLetterIndex: number = 0;

  protected getCroppedTextByTextField(field: TextField) {
    const { text, letterWidth } = field;

    if (!letterWidth) return text;

    if (this.wrapperWidth === Infinity) return text;

    const textWidth = this.firstLetterIndex * letterWidth;
    const ellipsisLength = 1;

    if (textWidth <= this.wrapperWidth) return text;

    return `…${text.slice(Math.ceil((textWidth - this.wrapperWidth - ellipsisLength) / letterWidth))}`;
  }

  protected setFirstLetterIndex(index: number) {
    this.firstLetterIndex = index;
  }
}
