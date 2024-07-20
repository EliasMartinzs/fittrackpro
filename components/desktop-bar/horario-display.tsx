"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const HorarioDisplay = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval);
  }, []);

  const formattedDateTime = format(currentDateTime, "dd | MMM | yyyy | HH:mm", {
    locale: ptBR,
  });

  return <p className="font-extralight">{formattedDateTime}</p>;
};
