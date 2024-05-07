import { useCallback } from "react";

import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

import { debounce, isEmpty, isNotVoid } from "@/shared";

import { createMeilisearchRequest } from "../api";
import { MeilisearchResponse } from "../models";

interface SearchForm {
  setData: (data: MeilisearchResponse<any>["results"]) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export const SearchForm: React.FC<SearchForm> = ({ setData, inputRef }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTest = useCallback(
    debounce(async (args: string[]) => {
      const response = await createMeilisearchRequest({ query: args[0] });

      if (isNotVoid(response.results)) {
        setData(response.results);

        return;
      }

      setData([]);
    }, 250),
    []
  );

  function onChange(value: string) {
    const omitSpaces = value.trim();

    if (isEmpty(omitSpaces) || omitSpaces.length < 2) {
      setData([]);
      return;
    }

    getTest(omitSpaces);
  }

  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="brand.gray" />
      </InputLeftElement>
      <Input
        ref={inputRef}
        size="lg"
        placeholder="Введите поисковый запрос"
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
};
