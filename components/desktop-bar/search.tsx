"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { CiSearch } from "react-icons/ci";

export const Search = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="relative">
      <Input
        placeholder="Buscar por..."
        className="rounded-xl lg:min-w-96"
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        value={searchText}
      />
      <CiSearch className="absolute top-1.5 right-3 size-6 cursor-pointer text-muted-foreground hover:text-foreground" />
    </div>
  );
};
