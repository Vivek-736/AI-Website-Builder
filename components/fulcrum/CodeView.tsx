"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Needs from "@/data/Needs";
import axios from "axios";
import { InputContext } from "@/context/InputContext";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { LoaderCircle, Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

const CodeView = () => {
  const { id } = useParams();
  const [active, setActive] = useState<"code" | "preview">("code");
  const [files, setFiles] = useState(Needs?.DEFAULT_FILE);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { input, setInput } = useContext(InputContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id && GetFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.mutation(api.workspace.GetWorkspace, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      workspaceId: id as string,
    });
    const mergedFiles = { ...Needs.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };

  useEffect(() => {
    if (input?.length > 0) {
      const role = input[input?.length - 1].role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const GenerateAiCode = async () => {
    setLoading(true);
    const PROMPT =
      input?.[input.length - 1]?.content + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai", {
      prompt: PROMPT,
    });
    console.log(result.data);
    const aiRes = result.data;

    const mergedFiles = { ...Needs.DEFAULT_FILE, ...aiRes?.files };
    setFiles(mergedFiles);
    await UpdateFiles({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      workspaceId: id,
      files: aiRes?.files,
    });
    setLoading(false);
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] border border-gray-400 w-full flex justify-between items-center rounded-lg p-2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full bg-black text-gray-400 hover:text-blue-400 hover:bg-blue-500/25 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
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
      <SandpackProvider
        files={files}
        options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
        customSetup={{
          dependencies: {
            ...Needs.DEPENDANCY,
          },
        }}
        template="react"
        theme="dark"
      >
        <SandpackLayout>
          {active === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "76vh" }} />
              <SandpackCodeEditor style={{ height: "76vh" }} />
            </>
          ) : (
            <SandpackPreview showNavigator={true} style={{ height: "76vh" }} />
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="p-10 bg-gray-900 opacity-75 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
          <LoaderCircle className="h-10 w-10 animate-spin text-white" />
          <h2>Generating code & spinning up preview...</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
