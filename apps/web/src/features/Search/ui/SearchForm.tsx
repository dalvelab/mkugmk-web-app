import { useCallback } from "react";

import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

import { debounce, isEmpty, isNotVoid } from "@/shared";

import { createMeilisearchRequest } from "../api";
import { MeilisearchResponse } from "../models";

interface SearchForm {
  setData: (data: MeilisearchResponse<any>["results"]) => void;
}

export const SearchForm: React.FC<SearchForm> = ({setData}) => {
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTest = useCallback(
    debounce(async (args: string[]) => {
      const response = await createMeilisearchRequest({query: args[0]});

      if (isNotVoid(response.results)) {
        setData(response.results)
        
        return;
      }

      setData([]);
    }, 250), 
    []
  );

  function onChange(value: string) {
    if (isEmpty(value)) {
      setData([]);
      return;
    }

    getTest(value)
  }

  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color="brand.gray" />
      </InputLeftElement>
      <Input size="lg" placeholder='Введите поисковый запрос' onChange={(e) => onChange(e.target.value)} />
    </InputGroup>
  )
} 