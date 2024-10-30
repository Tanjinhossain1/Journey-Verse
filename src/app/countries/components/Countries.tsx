import { CountryType } from "@/types/countries";
import React, { Fragment } from "react";
import NameTable from "./CountriesTable";

export default async function Countries({ data }: { data?: CountryType[] }) {
  console.log("data  ", data);
  return <Fragment>{data ? <NameTable data={data} /> : null}</Fragment>;
}
