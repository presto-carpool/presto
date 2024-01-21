import React from "react";
import { Text } from "tamagui";

type PendingBodyProps = {
  route: any;
};

const PendingBody = (props: PendingBodyProps) => {
  return (
    <Text>
      Looking for a
      {props.route.created_by === "driver" ? "passenger" : "driver"}
    </Text>
  );
};

export default PendingBody;
