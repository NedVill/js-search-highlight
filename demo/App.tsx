import { Flex, Layout } from "antd";
import { SearchCard } from "./components/SearchCard";
import { DEFAULT_TEXT, DEFAULT_TEXT_SEARCH_VALUE } from "./constants";

function App() {
  return (
    <div className="App">
      <Layout.Content>
        <Flex gap={20}>
          <SearchCard
            text={DEFAULT_TEXT}
            cardTitle="Подсветка текста"
            defaultSearchValue={DEFAULT_TEXT_SEARCH_VALUE}
            highLightColor="#d48806"
          />
          <SearchCard
            text={DEFAULT_TEXT}
            cardTitle="Подсветка текста с обрезкой"
            defaultSearchValue={DEFAULT_TEXT_SEARCH_VALUE}
            highLightColor="#f5222d"
            letterWidth={9}
          />
        </Flex>
      </Layout.Content>
    </div>
  );
}

export default App;
