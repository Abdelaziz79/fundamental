import Playground from "@/app/playground/page";
import algorithms from "@/db/algorithms";
import React from "react";

type Props = {
  params: { id: string };
};
export default function Algorithm({ params }: Props) {
  const algo = algorithms.find((algo) => algo.id === params.id);

  return (
    <Playground codeString={algo?.code} autoFrameCheckbox={algo?.autoFrame} />
  );
}
