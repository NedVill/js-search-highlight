## JS Search Highlight

Подствечивает текст цветом и дополнительно обрезает начало текста для вывода подсветки в видимой части блока.

<p align="center">
  <img src="https://raw.githubusercontent.com/NedVill/js-search-highlight/main/demo/assets/images/image.png" width="200">
</p>

```
new SearchHighLighter({
    textFields: {
        field: {
            text: 'search value text',
            letterWidth: 5,
        },
        second_field: {
            text: 'search value text secondary',
            letterWidth: 7,
        }
    },
    searchValue: 'value',
    highLightColor: 'red',
    wrapperWidth: 500,
});

highLighted.getFieldValue("field")

highLighted.getFieldValue("second_field")
```

```
searchValue: string;
значение, которое будем подсвечивать

highLightColor: string | undefined;
цвет подсветки

minLengthToHighLight: number | undefined;
минимальное количество символов, для начала поиска (по умолчанию 2)

wrapperWidth: number | undefined;
ширина блока, в котором содержится текст (для высчитывания обрезки текста)

textFields: произвольное текстовое поле с натройками:

- text: string;
текстовое значение

- letterWidth: undifined | number;
ширина одного символа (для высчитывания обрезки текста)

```
