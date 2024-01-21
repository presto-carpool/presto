import React, { useMemo, useRef } from "react";
import { default as GorhomBottomSheet } from "@gorhom/bottom-sheet";
import MainBody from "./MainBody";

const BottomSheet = () => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  return (
    <GorhomBottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
      <MainBody />
    </GorhomBottomSheet>
  );
};

export default BottomSheet;
