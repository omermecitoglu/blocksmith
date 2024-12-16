import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Page = () => (
  <h1>
    Blocksmith is running
    {" "}
    <FontAwesomeIcon icon={faThumbsUp} />
  </h1>
);

export default Page;
