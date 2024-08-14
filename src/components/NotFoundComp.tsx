import Link from "next/link";
import React from "react";

type Props = {
  name: string;
};

export default function NotFoundComp({ name }: Props) {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          {name} Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          We could not find the {name} you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
