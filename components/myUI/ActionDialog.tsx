import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Github, Database, Send } from "lucide-react";
import { Button } from "../ui/button";

interface ActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "github" | "publish" | "supabase";
}

const ActionDialog: React.FC<ActionDialogProps> = ({ open, onOpenChange, type }) => {
  const dialogContent = {
    github: {
      title: "Connect to GitHub",
      description: "Link your project to a GitHub repository or view the source code.",
      icon: <Github className="h-6 w-6" />,
    },
    publish: {
      title: "Publish Project",
      description: "Share your project with the world by publishing it.",
      icon: <Send className="h-6 w-6" />,
    },
    supabase: {
      title: "Supabase Integration",
      description: "Manage your Supabase database and authentication settings.",
      icon: <Database className="h-6 w-6" />,
    },
  };

  const { title, description, icon } = dialogContent[type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <div className="flex items-center gap-x-2">
            {icon}
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogDescription className="text-gray-300">{description}</DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex flex-col items-center">
          <div className="relative">
            <span className="text-2xl font-bold animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
              Coming Soon
            </span>
            <div className="absolute inset-0 animate-bounce">
              <div className="h-2 w-2 bg-pink-500 rounded-full mx-auto"></div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400">This feature is under development and will be available soon!</p>
        </div>
        <div className="flex justify-end gap-x-2 mt-6">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
        <style jsx>{`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-10px);
              opacity: 1;
            }
          }
          .animate-bounce {
            animation: bounce 1.5s infinite;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
