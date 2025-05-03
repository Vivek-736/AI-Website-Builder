import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { MessageCircleCode, LogOut } from "lucide-react";
import History from "./History";
import { UserDetailContext } from "@/context/UserDetailContext";
import { redirect } from "next/navigation";

const SideBar = () => {
  const { setUserDetail } = useContext(UserDetailContext);

  const handleSignOut = () => {
    setUserDetail(undefined);
    localStorage.removeItem("user");
    window.location.href = "https://accounts.google.com/Logout";
  };

  return (
    <Sidebar>
      <div className="bg-slate-900 h-full border-r-2 border-slate-900 flex flex-col">
        <SidebarHeader className="p-5">
          <Image src={"/logo.png"} alt="logo" width={35} height={35} />
        </SidebarHeader>
        <SidebarContent className="p-5 flex-1 overflow-y-auto">
          <Button onClick={redirect("/")} variant={"subtle"} className="cursor-pointer flex gap-2">
            <MessageCircleCode /> New Chat
          </Button>
          <SidebarGroup>
            <History />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-5">
          <Button
            variant="subtle"
            className="cursor-pointer flex gap-2 w-full bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
            onClick={handleSignOut}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </Button>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
};

export default SideBar;
