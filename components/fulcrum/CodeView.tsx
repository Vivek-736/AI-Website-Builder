"use client";
import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Needs from "@/data/Needs";

const CodeView = () => {
  const [active, setActive] = useState<"code" | "preview">("code");
  const [files, setFiles] = useState(Needs?.DEFAULT_FILE)

  return (
    <div>
      <div className="bg-[#181818] w-full flex flex-row-reverse p-2">
        <div className="relative flex items-center bg-black rounded-full p-1 w-48 h-10">
          <div className="absolute inset-0 flex items-center">
            <div
              className={`h-8 rounded-full transition-all duration-300 ${
                active === "code"
                  ? "w-1/2 left-1"
                  : "w-1/2 left-[calc(50%-4px)]"
              }`}
            />
          </div>

          <button
            onClick={() => setActive("code")}
            className={`flex-1 z-10 text-sm transition-colors ${
              active === "code"
                ? "text-blue-400 bg-blue-500/25 rounded-full p-2"
                : "text-gray-400"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setActive("preview")}
            className={`flex-1 z-10 text-sm transition-colors ${
              active === "preview"
                ? "text-blue-400 bg-blue-500/25 rounded-full p-2"
                : "text-gray-400"
            }`}
          >
            Preview
          </button>
        </div>
      </div>
      <SandpackProvider files={files} options={{externalResources: ['https://cdn.tailwindcss.com']}} customSetup={{
        dependencies: {
            ...Needs.DEPENDANCY
        }
      }} template="react" theme="dark">
        <SandpackLayout>
          {active == "code" ?<>
            <SandpackFileExplorer style={{ height: "71vh" }} />
            <SandpackCodeEditor style={{ height: "71vh" }} />
          </>:
          <>
            <SandpackPreview showNavigator={true} style={{ height: "71vh" }} />
          </>}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeView;
