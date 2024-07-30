"use client";
import React, { useState } from "react";
import { AguaIcon } from "./agua-icon";

export const Agua = () => {
  const [waterAmount, setWaterAmount] = useState(0);

  const handleAddWater = (amount: number) => {
    setWaterAmount((prevAmount) => Math.min(100, prevAmount + amount));
  };
  return <AguaIcon fillLevel={waterAmount} color="#00aaff" />;
};
