import React from "react";
import { Text } from "tamagui";

type PendingBodyProps = {
  myRoute: any;
  foundRoute: any;
};

const MatchedBody = (props: PendingBodyProps) => {
  return (
    <Text>
      Found {props.foundRoute.full_name} {props.foundRoute.phone_number}!
    </Text>
  );
};

export default MatchedBody;
