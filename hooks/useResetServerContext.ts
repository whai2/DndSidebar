import { useEffect } from "react";

import { resetServerContext } from 'react-beautiful-dnd';

export function useResetServerContext() {
  useEffect(() => {
    resetServerContext();
  }, []);
}