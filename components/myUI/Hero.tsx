/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { InputContext } from "@/context/InputContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import AuthDialog from "./AuthDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

const Hero = () => {
  const typedRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [floatingStyles, setFloatingStyles] = useState<
    {
      width: string;
      height: string;
      top: string;
      left: string;
      animation: string;
      animationDelay: string;
    }[]
  >([]);
  const [openDialog, setOpenDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { input, setInput } = useContext(InputContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const onGenerate = async (i: string) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }

    try {
      setIsLoading(true);
      const msg = {
        role: "user",
        content: i,
      };

      setInput(msg);

      if (!userDetail?._id) {
        console.error("User ID is undefined");
        return;
      }

      const id = await CreateWorkspace({
        user: userDetail._id,
        messages: [msg],
      });

      if (id) {
        router.push(`/workspace/${id}`);
      } else {
        console.error("Failed to create workspace");
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const styles = Array.from({ length: 10 }).map(() => ({
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animation: `float ${Math.random() * 10 + 10}s linear infinite`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setFloatingStyles(styles);
  }, []);

  useEffect(() => {
    const options = {
      strings: [
        "Ask Lovella anything...",
        "Build a todo app",
        "Make a social media app",
        "Create a fitness tracker",
        "An e-commerce site",
        "Make a recipe app",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: "",
      smartBackspace: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-6 text-3xl font-extrabold text-white md:text-5xl lg:text-7xl mt-28 md:mt-16">
          Build something <span className="text-pink-400">💖 Cherishable</span>
        </h1>

        <p className="mb-10 text-xl font-medium text-gray-300 md:text-2xl">
          Idea to app in seconds, with your personal full stack engineer
        </p>

        <div className="relative w-full max-w-2xl mx-auto bg-gray-800 border-2 border-gray-700 rounded-xl focus-within:ring-4 focus-within:ring-pink-500 focus-within:border-transparent transition-all duration-300 hover:border-gray-600">
          <div className="grid grid-cols-[1fr_auto] items-start">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-6 py-5 text-lg text-white bg-transparent border-none rounded-xl focus:outline-none focus:ring-0 placeholder-gray-500 resize-none overflow-hidden"
              placeholder=" "
              rows={1}
            />
            <button
              onClick={() => onGenerate(inputValue)}
              className="px-6 py-5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-r-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              disabled={!inputValue || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    />
                  </svg>
                  Building...
                </div>
              ) : (
                "Build It"
              )}
            </button>
          </div>
          <span
            ref={typedRef}
            className={`absolute top-1/2 left-6 -translate-y-1/2 text-gray-400 pointer-events-none text-lg ${
              inputValue ? "opacity-0" : ""
            }`}
          />
        </div>

        <div className="mt-8 text-gray-400 hidden md:flex flex-wrap gap-2 justify-center">
          {[
            "Create a weather app",
            "Build a Twitter clone",
            "Design a portfolio",
          ].map((prompt, index) => (
            <span
              onClick={() => onGenerate(prompt)}
              key={index}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-600 hover:transition-all bg-gray-800 border border-gray-700 rounded-full text-gray-300 transition-all"
            >
              {prompt}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {floatingStyles.map((style, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={style}
          />
        ))}
      </div>
      <AuthDialog
        openDialog={openDialog}
        closeDialog={(v: any) => setOpenDialog(v)}
      />
    </div>
  );
};

export default Hero;
