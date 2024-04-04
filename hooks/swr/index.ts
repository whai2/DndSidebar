'use client'

import useSWR from "swr";

import { getSidebarTree } from "@/lib/actions";

const LOCAL_API_URL = 'http://localhost:3000/api/sidebar/';

export function useSWRSidebarTree() {
  const { data, error, isValidating, mutate } = useSWR(LOCAL_API_URL, getSidebarTree);

  return { data, error, isValidating, mutate };
}