import Image from 'next/image';
import { chakra, Container, Heading, Flex, Text, Grid } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getPartnersPage } from '@/entities';
import { isVoid, EmptyState, isEmpty, isNotEmpty } from '@/shared';
import type { PartnerPage } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function Partners({ partners }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = partners;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  return (
    <>
      <chakra.section
        pt={8}
        pb={10} 
        pos="relative" 
        minH="100vh" 
        display="flex" 
        flexDir="column"
      >
        <Container
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>Партнеры</Heading>
          <Grid
            mt={7}
            gridTemplateColumns="auto auto auto auto"
            gap={10}
          >
            {isNotEmpty(data.partners) && data.partners.map((partner) => (
              <Flex
                key={partner.id}
                w='280px'
                flexDir="column"
                cursor="pointer"
                pos="relative"
                borderRadius="12px"
                boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.09)"
              >
                <chakra.div 
                  pos="relative" 
                  w='100%' 
                  h="220px" 
                  bgColor="brand.black"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  borderTopLeftRadius="12px"
                  borderTopRightRadius="12px"
                  overflow="hidden"
                >
                  <Image 
                    width={partner.image.width} 
                    height={partner.image.height} 
                    src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${partner.image.url}`} 
                    alt='Логотип партнера' 
                  />
                </chakra.div>
                <Flex p={4} gap={2} flexDir="column">
                  <Text fontSize="lg" fontWeight="medium">{partner.name}</Text>
                  <Text fontSize="sm" color='brand.gray' lineHeight="110%">{partner.short_description}</Text>
                </Flex>
              </Flex>
            ))}
          </Grid>
        </Container>
      </chakra.section>
    </>
  );
}

interface PartnerProps {
  partners: ApiResponse<PartnerPage, null>
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const partners = await getPartnersPage({locale});

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      partners
     }
  }
};