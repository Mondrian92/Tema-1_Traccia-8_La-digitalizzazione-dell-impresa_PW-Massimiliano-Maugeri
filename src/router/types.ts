import { ROUTES_NAME } from "@/router/constants";
import { JSX } from "react";

export type RouteName = (typeof ROUTES_NAME)[number];

export type Route = {
  path: string;
  element?: JSX.Element;
  children?: Route[];
  name?: RouteName;
};