import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const { userDetail } = useContext(UserDetailContext);
  const pathname = usePathname();

  return (
    <div
      className={`${pathname === "/" ? "p-6" : "py-2 px-8"} flex justify-between items-center`}
    >
      <div className="flex gap-x-2">
        <Link href={"/"} className="cursor-pointer">
          <Image src={"/logo.png"} alt="logo" width={40} height={40} />
          {pathname === "/" && (
            <p className="font-extrabold text-3xl mt-0.5">Lovella</p>
          )}
        </Link>
      </div>
      {!userDetail?.name && (
        <div className="flex gap-x-4">
          <Button variant="default" className="cursor-pointer">
            Sign In
          </Button>
          <Button
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
      )}
    </div>
  );
};

export default Header;
