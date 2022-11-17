import { useState, useEffect, useRef } from 'react';

const useClickOutSide = (handler: any) => {
  const domNode: any = useRef();
  useEffect(() => {
    const maybeHandler = (event: any) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', maybeHandler);
    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });
  return domNode;
};
export default useClickOutSide;
