"use client";

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InputContext } from "@/context/InputContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Typed from "typed.js";
import AuthDialog from "./AuthDialog";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

const Hero = () => {
  const typedRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
  // @ts-ignore
  const { input, setInput } = useContext(InputContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const workspaces = useQuery(
    api.workspace.GetAllWorkspaces,
    userDetail?._id ? { userId: userDetail._id } : "skip"
  );

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

    const msg = {
      role: "user",
      content: i,
    };

    setInput(msg);

    if (!userDetail?._id) {
      console.error("User ID is undefined");
      return;
    }

    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    console.log("Workspace ID:", workspaceId);
    router.push(`/workspace/${workspaceId}`);
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
    <div className="flex flex-col items-center justify-center px-4 text-center min-h-screen">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-10 w-10 text-pink-500"
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
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-6 text-3xl font-extrabold text-white md:text-5xl lg:text-7xl md:mt-16">
          Build something <span className="text-pink-400">💖 Cherishable</span>
        </h1>

        <p className="mb-10 text-xl font-medium text-gray-300 md:text-2xl">
          Idea to app in seconds, with your personal full stack engineer
        </p>

        {errorMessage && (
          <p className="mb-4 text-red-500 text-sm">{errorMessage}</p>
        )}

        <div
          className="relative w-full max-w-2xl mx-auto bg-gray-800 border-2 border-gray-700 rounded-xl focus-within:ring-4 focus-within:ring-pink-500 focus-within:border-transparent transition-all duration-300 hover:border-gray-600"
          style={{ transition: "all 0.3s ease" }}
        >
          <div className="grid grid-cols-[1fr_auto] items-start">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-6 py-5 text-lg text-white bg-transparent border-none rounded-xl focus:outline-none focus:ring-0 placeholder-gray-500 resize-none overflow-hidden"
              placeholder=" "
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={() => onGenerate(inputValue)}
              className="px-6 py-5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-r-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              disabled={!inputValue.trim() || isLoading}
              style={{
                transition: "opacity 0.3s ease, background-color 0.3s ease",
              }}
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
              style={{ pointerEvents: isLoading ? "none" : "auto" }}
            >
              {prompt}
            </span>
          ))}
        </div>
      </div>

      {workspaces && workspaces.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16 px-4">
          <h2 className="md:text-4xl text2xl font-bold text-pink-400 mb-12">
            Your Workspaces
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((workspace, index) => (
              <div
                key={index}
                onClick={() => router.push(`/workspace/${workspace._id}`)}
                className="group relative bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 cursor-pointer"
              >
                <div className="h-40 bg-gradient-to-r from-pink-500 to-purple-600">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                    alt="Workspace preview"
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">
                    {workspace?.messages[0]?.content || "Untitled Workspace"}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(workspace._creationTime).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="bottom-0 mt-20 w-full py-6 backdrop-blur-3xl bg-white/10 rounded-2xl">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-300 text-sm md:text-base">
            Made with <span className="text-pink-400">💖</span> by Vivek
          </p>
        </div>
      </footer>

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
