import Playground from "@/app/playground/page";
import algorithms from "@/db/algorithms";
import problems from "@/db/problems";
import React from "react";

type Props = {
  params: { id: string };
};
export default function Algorithm({ params }: Props) {
  const problem = problems.find((prob) => prob.id === params.id);

  return (
    <Playground
      codeString={problem?.code}
      autoFrameCheckbox={problem?.autoFrame}
    />
  );
}
