/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { usePathname } from "next/navigation";
import { Database, Github, Send } from "lucide-react";
import AuthDialog from "./AuthDialog";
import ActionDialog from "./ActionDialog";

const Header = () => {
  const { userDetail } = useContext(UserDetailContext);
  const pathname = usePathname();
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [openActionDialog, setOpenActionDialog] = useState<{
    type: "github" | "publish" | "supabase" | null;
    open: boolean;
  }>({ type: null, open: false });

  const onGenerate = () => {
    if (!userDetail?.name) {
      setOpenAuthDialog(true);
      return;
    }
  };

  const handleActionDialog = (type: "github" | "publish" | "supabase") => {
    setOpenActionDialog({ type, open: true });
  };

  return (
    <div
      className={`${pathname === "/" ? "p-6" : "pt-4 px-8"} flex justify-between items-center`}
    >
      <div className="flex gap-x-2">
        <Image src={"/logo.png"} alt="logo" width={40} height={40} />
        <div>
          {pathname === "/" && (
            <p className="font-extrabold text-3xl mt-0.5">Lovella</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        {pathname !== "/" && (
          <>
            <Button
              variant="default"
              className="cursor-pointer md:flex hidden bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleActionDialog("publish")}
            >
              <Send className="h-5 w-5 mr-2" />
              Publish
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer md:flex hidden border-gray-300 bg-gray-800 hover:bg-gray-700 text-white"
              onClick={() => handleActionDialog("github")}
            >
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="cursor-pointer md:flex hidden border-gray-300 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => handleActionDialog("supabase")}
            >
              <Database className="h-5 w-5 mr-2" />
              Supabase
            </Button>
          </>
        )}
        {!userDetail?.name ? (
          <div className="flex gap-x-4">
            <Button
              onClick={() => onGenerate()}
              variant="default"
              className="cursor-pointer"
            >
              Sign In
            </Button>
            <Button
              onClick={() => onGenerate()}
              style={{
                background: "linear-gradient(90deg, #FF0080 0%, #FF8C00 100%)",
                boxShadow: "0px 4px 20px rgba(255, 140, 0, 0.5)",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#fff",
                transition: "box-shadow 0.3s ease",
              }}
              className="cursor-pointer md:block hidden hover:shadow-lg hover:shadow-orange-500/50"
            >
              Get Started
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <Image
              src={userDetail.picture || "/vercel.svg"}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          </div>
        )}
      </div>
      <AuthDialog
        openDialog={openAuthDialog}
        closeDialog={(v: any) => setOpenAuthDialog(v)}
      />
      {openActionDialog.type && (
        <ActionDialog
          open={openActionDialog.open}
          onOpenChange={(open) => setOpenActionDialog({ type: null, open })}
          type={openActionDialog.type}
        />
      )}
    </div>
  );
};

export default Header;
