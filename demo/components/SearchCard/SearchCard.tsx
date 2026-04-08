import { useState } from "react";
import { Flex, Typography, Divider, Card, Input } from "antd";
import { SearchProps } from "antd/es/input";
import { SearchHighLighter } from "../../../src/SearchHighLighter";
import sanitizeHtml from "sanitize-html";
import styles from "./SearchCard.module.scss";

interface Props {
  text: string;
  cardTitle: string;
  defaultSearchValue: string;
  letterWidth?: number;
  highLightColor?: string;
}

export const SearchCard = ({
  text,
  cardTitle,
  defaultSearchValue,
  highLightColor,
  letterWidth,
}: Props) => {
  const [searchValue, setSearchValue] = useState(defaultSearchValue);

  const highLighted = new SearchHighLighter({
    textFields: {
      text: {
        text,
        letterWidth,
      },
    },
    searchValue,
    highLightColor,
    wrapperWidth: 500,
  });

  const highLightedText = highLighted.getFieldValue("text");

  const __html = highLightedText
    ? sanitizeHtml(highLightedText, {
        allowedAttributes: {
          "*": ["style"],
        },
      })
    : text;

  const onSearch: SearchProps["onSearch"] = (value) => setSearchValue(value);

  return (
    <Card title={cardTitle} className={styles.wrapper}>
      <Flex
        vertical
        justify="space-between"
        gap={10}
        className={styles.innerWrapper}
      >
        <Typography.Text>
          <div
            className={letterWidth ? styles.crop : ""}
            dangerouslySetInnerHTML={{
              __html,
            }}
          />
        </Typography.Text>
        <div>
          <Divider />
          <Input.Search defaultValue={searchValue} onSearch={onSearch} />
        </div>
      </Flex>
    </Card>
  );
};
