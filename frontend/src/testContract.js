import React, { useEffect } from "react";

const TestContract = () => {
  useEffect(() => {
    try {
      const ContractData = require("../src/contracts/Marketplace.json");
      console.log("ContractData loaded:", ContractData);
      console.log("ABI is array?", Array.isArray(ContractData.abi));
      console.log("ABI length:", ContractData.abi?.length);
      console.log("First ABI item:", ContractData.abi?.[0]);
    } catch (e) {
      console.error("Loading error:", e);
    }
  }, []);

  return <div>Check console for test results</div>;
};

export default TestContract;
