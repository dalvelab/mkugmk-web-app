import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Heading, Grid, Flex, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router';

import { getContactsPage } from '@/entities';
import { Link, isVoid, EmptyState, isEmpty, isNotEmpty, CustomContainer, Markdown, SEO } from '@/shared';
import type { ContactsPage } from '@/entities';
import type { ApiResponse } from '@/shared';
import { OrderCall } from '@/features';

export default function Events({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  const { locale } = useRouter();

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  const { title, description, contacts } = data;

  return (
    <>
      <SEO>
      <title>Контакты | Музейный комплекс - Верхняя Пышма</title>
      </SEO>
      <chakra.section
      pt={6}
      pb={10}
      minH="100vh"
      >
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{title}</Heading>
          <chakra.div maxW={["100%", "100%", "90%", "80%", "70%"]} mt={4} fontSize="lg" textAlign="justify">
            <Markdown>{description}</Markdown>
          </chakra.div>
          {isNotEmpty(contacts) ? (
            <Flex mt={8} w={["100%", "100%", "552px", "552px", "552px"]} flexDir="column" border="1px solid" borderColor="brand.border" borderRadius="8px">
              {contacts.map((contact, index) => (
                <Grid
                  p={5}
                  key={contact.id}
                  templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]} 
                  gap={[2, 2, 4, 4, 4]} 
                  justifyContent="space-between"
                  alignItems="flex-start"
                  borderTop={index !== 0 ? "1px solid": 'none'}
                  borderColor="brand.border"
                >
                  <Flex gap={1} flexDir="column">
                    <chakra.span fontSize="lg" fontWeight="medium">{contact.department}</chakra.span>
                    {isNotEmpty(contact?.caption) && <chakra.span fontSize="xs" color="brand.gray">{contact.caption}</chakra.span>}
                  </Flex>
                  <Flex
                    flexDir="column"
                    gap={[2, 2, 4, 4, 4]}
                    alignItems={["flex-start", "flex-start", "flex-end", "flex-end", "flex-end"]}
                    color="brand.gray"
                    fontSize="md"
                  >
                    {isNotEmpty(contact?.email) && <Link href={`mailto:${contact.email}`} target="_blank">{contact.email}</Link>}
                    {isNotEmpty(contact?.phone) && <Link href={`tel:${contact.phone}`} target="_blank">{contact.phone}</Link>}
                    {contact.enable_order_call_modal && (
                      // <Button
                      // variant="link"
                      // textDecor="underline"
                      // _hover={{color: "green.500"}}
                      // >
                      //   Заказать звонок
                      // </Button>
                      <OrderCall buttonStyles={{textDecor: 'underline', _hover: {'color': 'green.500'}}} />
                    )}
                  </Flex>
                </Grid>
              ))}
              {locale === 'ru' ? (
                <Grid
                  p={5}
                  templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]} 
                  gap={4} 
                  justifyContent="space-between"
                  alignItems="flex-start"
                  borderTop="1px solid"
                  borderColor="brand.border"
                >
                  <Flex gap={1} flexDir="column">
                    <chakra.span fontSize="lg" fontWeight="medium">Предложения по покупке техники для Музейного комплекса</chakra.span>
                    <chakra.span fontSize="xs" color="brand.gray">
                      Коммерческие предложения будут реализованы на договорной основе и по безналичному расчету
                    </chakra.span>
                  </Flex>
                  <Link 
                    href="https://airtable.com/app10ambf4PK4wk2P/shrzHsLRsgXpqdKBg" 
                    target="_blank"
                    justifySelf={["flex-start", "flex-start", "flex-end", "flex-end", "flex-end"]}
                  >
                    <Button
                      bgColor="brand.black"
                      color="white"
                      _hover={{bgColor: "brand.black"}} 
                    >
                      Связаться
                    </Button>
                  </Link>
                </Grid>
              ): null}
            </Flex>
          ) : null}
        </CustomContainer>
      </chakra.section>
    </>
  );
}

interface NewsProps {
  page: ApiResponse<ContactsPage, null>
}

export const getServerSideProps: GetServerSideProps<NewsProps> = async ({locale}) => {
  const page = await getContactsPage({locale});

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      page
     }
  }
};