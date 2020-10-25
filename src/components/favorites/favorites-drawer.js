import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FavContext } from "./favorites-context";
import FavButton from "./favorites-button";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Heading,
  Box,
  Badge
} from "@chakra-ui/core";

export default function FavDrawer() {
  const {favs} = useContext(FavContext);
  let favItemCount = 0;

  for(let category in favs){
    if(favItemCount > 0) break;
    favItemCount += favs[category].length;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} variantColor="teal" onClick={onOpen}>
        Favorites
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>

        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Favorites</DrawerHeader>

          <DrawerBody overflow="scroll">
            {favItemCount ? getFavItems(favs) : "You don't have any favorites."}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function getFavItems(favs){
  return (
    Object.keys(favs).map((category)=>{

      let itemsInCategory = favs[category].map((item) => {
        return(
          <Box
            key = {item.uid}
            d="block"
            borderBottom="1px"
            borderColor="gray.300"
            overflow="hidden"
            p={2}
            position="relative">

            <Box
              as="h4"
              mt="1"
              fontWeight="semibold"
              lineHeight="tight"
              isTruncated
            >
              <Box as={Link} to={`/${category}/${item.url}`}>{item.name}</Box>
              <FavButton resource={category} item={item} uid={item.uid} drawer={true} />
            </Box>
            <Box d="flex" alignItems="baseline">
              {item.badge ? (
                <Badge px="2" variant="solid" variantColor="green">
                  {item.badge_text}
                </Badge>
              ) : (
                <Badge px="2" variant="solid" variantColor="red">
                  {item.badge_text}
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
                {item.other}
              </Box>
            </Box>
          </Box>
        );
      });

      return (favs[category].length ? [
          <Heading 
            textTransform="capitalize" 
            as="h2" 
            mt={5} 
            size="md" 
            key={category}> 
              {prettify(category)} ({favs[category].length}) 
          </Heading>,
          itemsInCategory
      ]: '');
    })
  )
}

function prettify(s){
  return s.split("-").join(" ");
}