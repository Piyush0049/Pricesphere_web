"use client"
import Login from "./_components/login";
import React from 'react'
import { useEffect } from "react";

const Loginpage = () => {
  useEffect(() => {
    fetch('/api/init');
  }, []);
  return (
    <div>
      <Login />
    </div>
  )
}

export default Loginpage


