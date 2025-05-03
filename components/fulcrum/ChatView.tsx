"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { InputContext } from "@/context/InputContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import { Loader2, SendHorizonal } from "lucide-react";
import axios from "axios";
import Prompt from "@/data/Prompt";
import ReactMarkdown from "react-markdown";

const ChatView = () => {
  const { id } = useParams();
  const convex = useConvex();
  const [inputValue, setInputValue] = useState("");
  const { userDetail } = useContext(UserDetailContext);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { input, setInput } = useContext(InputContext);
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);

  useEffect(() => {
    if (id) GetWorkspaceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const GetWorkspaceData = async () => {
    try {
      const result = await convex.mutation(api.workspace.GetWorkspace, {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        workspaceId: id as string,
      });
      setInput(result?.messages || []);
    } catch (error) {
      console.error("Error fetching workspace:", error);
    }
  };

  useEffect(() => {
    if (input?.length > 0) {
      const role = input[input?.length - 1].role;
      if (role === "user") {
        GetAIResponse();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const GetAIResponse = async () => {
    setLoading(true);
    try {
      const PROMPT = JSON.stringify(input) + Prompt.CHAT_PROMPT;
      const result = await axios.post("/api/ai-chat", {
        prompt: PROMPT,
      });

      const aiRes = {
        role: "ai",
        content: result.data?.result || "No response from AI",
      };

      setInput((prev: any) => [...prev, aiRes]);

      await UpdateMessages({
        messages: [...input, aiRes],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        workspaceId: id,
      });
    } catch (error) {
      console.error("AI response error:", error);
      setInput((prev: any) => [
        ...prev,
        {
          role: "ai",
          content: "Error generating response",
        },
      ]);
    }
    setLoading(false);
  };

  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="flex h-[85vh] flex-col relative">
      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
        {Array.isArray(input) &&
          input.map((message: any, index: number) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 bg-gray-700 flex gap-2 items-start leading-7"
            >
              {message?.role === "user" && (
                <Image
                  src={userDetail?.picture || "/default-avatar.png"}
                  alt="user"
                  width={32}
                  height={32}
                  className="rounded-full min-w-[32px]"
                />
              )}
              <div className="text-white text-sm mt-1.5">
                <ReactMarkdown>
                  {message.content || "Empty response"}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        {loading && (
          <div className="p-3 rounded-lg mb-2 bg-gray-700 flex gap-2 items-start">
            <Loader2 className="animate-spin" />
            <h2>Processing your request.....</h2>
          </div>
        )}
      </div>

      <div className="px-2 pb-2 pt-1 sticky bottom-0 rounded-md">
        <div className="relative rounded-lg bg-gray-700 border border-gray-600 focus-within:border-pink-500 transition-all">
          <textarea
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              handleTextareaResize(e);
            }}
            className="w-full px-4 py-3 pr-12 text-white bg-transparent border-none pt-4 rounded-lg focus:outline-none placeholder-gray-400 resize-none overflow-hidden text-sm sm:text-base"
            placeholder="Type your message..."
            rows={1}
            style={{ minHeight: "44px" }}
          />
          <button
            onClick={async () => {
              if (inputValue) {
                setInput((prev: any) => [
                  ...prev,
                  { role: "user", content: inputValue },
                ]);
                setInputValue("");
              }
            }}
            className="absolute right-2 bottom-2 p-2 bg-pink-600 hover:bg-pink-500 mb-1.5 rounded-md transition-colors disabled:opacity-50"
            disabled={!inputValue}
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
