import React from "react";
import { 
  RadioButtonGroup, 
  Text, 
  Box, 
  Badge,
  Spinner,
  Flex,
  Heading
} from "@chakra-ui/core";
import CustomRadio from "./custom-radio";
import { useField } from '@formiz/core';
import { useSpaceXPaginated } from "../../utils/use-space-x";
import Error from ".././error";


export default function LandPads(props) {
  const {
    errorMessage,
    id,
    resetKey,
    setValue,
    value,
    isValid,
    isPristine,
    isSubmitted
  } = useField(props);

  const showError = !isValid && isSubmitted;

  const { data, error } = useSpaceXPaginated(
    "/landpads", { limit: props.PAGE_SIZE }
  );

  if (!data) {
    return (
      <Flex justifyContent="center" alignItems="center" minHeight="50vh">
        <Spinner size="lg" />
      </Flex>
    );
  }


  return (
      <React.Fragment>
      <Heading as="h3" size="lg" mb="10px">Pick a Landing Pad</Heading>
      {showError && (
        <div id={`${id}-error`}>
          { errorMessage }
        </div>
      )}
      <RadioButtonGroup key={resetKey} id={id} onChange={val => setValue(val)} value={value}>
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((landPad) => (
              <CustomRadio key={landPad.id} value={landPad}>
                <LandPadItem landPad={landPad}/>
              </CustomRadio>
            ))}
      </RadioButtonGroup>
      </React.Fragment>
  );
}

function LandPadItem({ landPad }) {
  return (
    <Box
      as="span"
      overflow="hidden"
      position="relative"
    >
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {landPad.status === "active" ? (
            <Badge px="2" variant="solid" variantColor="green">
              Active
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Retired
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {landPad.attempted_landings} attempted &bull;{" "}
            {landPad.successful_landings} succeeded
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {landPad.full_name}
        </Box>
        <Text color="gray.500" fontSize="sm">
          {landPad.location.name} - {landPad.location.region}
        </Text>
      </Box>
    </Box>
  );
}
