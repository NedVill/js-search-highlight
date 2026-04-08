const MINIMAL_VIEWPORT_WIDTH = 1280;

const MINIMAL_ITEM_WIDTH = 400;

export const getTextWithHighLight = (color: string = "blue") =>
  `It has survived not only five centuries, but also <span style="color:${color}">the</span> leap into electronic typesetting, remaining essentially unchanged. It was popularised in <span style="color:${color}">the</span> 1960s with <span style="color:${color}">the</span> release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

export const getTextWrapperWidth = (windowWidth: number) =>
  (windowWidth * MINIMAL_ITEM_WIDTH) / MINIMAL_VIEWPORT_WIDTH;
