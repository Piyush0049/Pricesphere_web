"use client"

import Signup from "./_components/signup";
import React, { useState } from 'react'
import Verify from "./_components/VerifyForm";

const SignupPage = () => {
  const [isVerify, setIsVerify] = useState(false);
  return (
    <div>
      {!isVerify ? (
        <Signup isVerify={isVerify} setIsVerify={setIsVerify} />
      ) : (
        <Verify isVerify={isVerify} setIsVerify={setIsVerify} />
      )}
    </div>
  )
}

export default SignupPage


