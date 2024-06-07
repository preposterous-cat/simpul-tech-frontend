"use client";
import QuicksBar from "./quicks-bar";
import QuicksButton from "./quicks-button";
import QuicksContent from "./quicks-content";
import { QuicksProvider } from "./quicks-context";

const QuicksComponent = () => {
  return (
    <QuicksProvider>
      <QuicksContent />
      <QuicksBar />
    </QuicksProvider>
  );
};

export default QuicksComponent;
