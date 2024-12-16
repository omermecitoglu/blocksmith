import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Playground from "~/components/Playground";

const Page = () => (
  <>
    <h1>
      Blocksmith is running
      {" "}
      <FontAwesomeIcon icon={faThumbsUp} />
    </h1>
    {process.env.NODE_ENV === "development" && (
      <>
        <hr />
        <Playground />
      </>
    )}
  </>
);

export default Page;
