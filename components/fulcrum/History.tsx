"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

const History = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const convex = useConvex();
  const [workspaces, setWorkspaces] = useState<
    | {
        _id: Id<"workspace">;
        _creationTime: number;
        fileData?: any;
        messages: any;
        user: Id<"users">;
      }[]
    | undefined
  >(undefined);
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    if (userDetail) {
      GetAllWorkspaces();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail]);

  const GetAllWorkspaces = async () => {
    const result = await convex.query(api.workspace.GetAllWorkspaces, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userId: userDetail?._id,
    });
    setWorkspaces(result);
    console.log("Workspaces: ", result);
  };

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl text-white/90 mb-4 border-b border-white/10 pb-2">
        Chat History
      </h2>
      <div className="space-y-2">
        {workspaces &&
          workspaces?.map((workspace, index) => (
            <Link 
              onClick={toggleSidebar} 
              href={`/workspace/${workspace._id}`} 
              key={index}
              className="block group"
            >
              <div className="p-3 rounded-lg transition-all duration-300 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/10">
                <h2 className="text-sm text-white/80 group-hover:text-white font-medium truncate">
                  {workspace?.messages[0]?.content || "Untitled Chat"}
                </h2>
                <p className="text-xs text-white/40 mt-1">
                  {new Date(workspace._creationTime).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default History;
