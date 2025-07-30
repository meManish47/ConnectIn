"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
export default function UploadInputField() {
  const [inputVal, setInputVal] = useState("");
  return (
    <Dialog modal={false}>
      <DialogTrigger className="h-14 w-full border border-gray-400 rounded-4xl text-sm text-gray-600 flex items-center justify-between px-4 cursor-text">
        <p>Whats on your mind....</p>
      </DialogTrigger>
      <DialogContent className="shadow-[2px_2px_10px_rgb(0,0,0,0.7)]">
        <DialogHeader>
          <DialogTitle>What do you want to post?</DialogTitle>
          <div className="w-full h-100 flex ">
            <Textarea
              placeholder="Enter here..."
              className="h-full w-full"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
