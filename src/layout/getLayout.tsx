import { ReactElement, ReactNode } from "react";
import { NextPageWithLayout } from "../types";

/**
 * Get the layout of a page
 * @param Component The page component
 * @param page The page
 */
export function getLayout(Component: NextPageWithLayout, page: ReactElement): ReactNode {
  if (Component.getLayout) return Component.getLayout(page);
  return page;
}