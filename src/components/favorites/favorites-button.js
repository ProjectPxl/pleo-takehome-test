import React, { useContext } from "react";
import { IconButton } from "@chakra-ui/core";
import { FavContext } from "./favorites-context";

export default function FavButton({ resource, item, uid, drawer=false }) {
  const {favs, toggleFav} = useContext(FavContext);
  const isFav = favs[resource].find( (item) => item.uid === uid );

  const resourceMap = {
    "launches": {
      "url": "flight_number",
      "name": "mission_name",
      "badge": "launch_success",
      "badge_text": item.launch_success ? "Successful" : "Failed",
      "other" : item.launch_site?.site_name
    },
    "launch-pads": {
      "url": "site_id",
      "name": "name",
      "badge": "status",
      "badge_text": item.status === "active" ? "Active" : "Retired",
      "other": item.vehicles_launched?.join(", ")
    }
  }

  const favClick = (item, resource) => event => {
    if(!drawer) event.preventDefault();
    toggleFav({ type:isFav?"remove":"add", resource: resource, item:{
      "url": item[resourceMap[resource]["url"]], 
      "name": item[resourceMap[resource]["name"]], 
      "badge": item[resourceMap[resource]["badge"]],
      "badge_text": resourceMap[resource]["badge_text"],
      "other" : resourceMap[resource]["other"],
      uid:uid}, uid: uid });
  };

  return (
    <IconButton aria-label="Add to favorites" variantColor={isFav ? "yellow" : "gray"} 
      variant="link" title={`${isFav ? "Remove from" : "Add to"} favorites`}
      icon="star" _hover={{ bg: "transparent" }} onClick={favClick(item, resource)} />
  );
}