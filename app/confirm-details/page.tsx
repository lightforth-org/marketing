// import { Suspense } from 'react';
import { Suspense } from "react";
import VerificationPage from "./verifyPage";
// import Navbar from '@/components/navbar';

const ConfirmPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="">
        {/* <Navbar onClickScroll={() => console.log('')} /> */}
        <VerificationPage />
      </div>
    </Suspense>
  );
};

export default ConfirmPage;
