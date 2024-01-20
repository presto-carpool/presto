import { default as GorhomBottomSheet } from "@gorhom/bottom-sheet";
import { useRef, useMemo } from "react";
import { Button, Input } from "tamagui";

const BottomSheet = () => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  return (
    <GorhomBottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
      <Input size="$4" borderWidth={2} />
      <Button>Go!</Button>
    </GorhomBottomSheet>
  );
};

export default BottomSheet;
