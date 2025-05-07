import { Suspense } from "react";
import SubComplete from "./components/subComplete";

const Subscription = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubComplete />
    </Suspense>
  );
};

export default Subscription;
