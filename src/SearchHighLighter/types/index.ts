export type TextField = {
  text: string;
  letterWidth?: number;
  result?: string;
};

export type TextFields<T extends string = string> = {
  [key in T]: TextField;
};

export type TextFieldProps<T extends string = string> = {
  [key in T]: Omit<TextField, "result">;
};

export interface TextCropperProps {
  wrapperWidth?: number;
}

export interface SearchHighLightProps<
  T extends string,
> extends TextCropperProps {
  textFields: TextFieldProps<T>;
  searchValue: string;
  highLightColor?: string;
  minLengthToHighLight?: number;
}
