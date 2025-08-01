"use client";
import { getCurrentUser } from "@/app/actions/actions";
import { createPostsForUser } from "@/app/actions/postsaction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function UploadInputField() {
  const [inputVal, setInput] = useState("");
  const [posting, setPosting] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  async function handleClick() {
    setPosting(true);
    const currentUserObj = await getCurrentUser();
    if (currentUserObj?.user) {
      const postObj = await createPostsForUser(
        currentUserObj?.user?.id,
        inputVal
      );
      if (postObj.success) {
        toast.success(
          "Post created successfully ..Please Refresh to see Posts",
          { duration: 5000 }
        );
        setPosting(false);
        setOpen(false);
      } else console.log(postObj.message);
    } else {
      console.error("ERROR");
      setPosting(false);
      alert("Something went wrong :/");
    }
  }
  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger className="h-14 w-full border border-gray-400 rounded-4xl text-sm text-gray-600 flex items-center justify-between px-4 cursor-text">
        <p>Whats on your mind....</p>
      </DialogTrigger>
      <DialogContent className="shadow-[2px_2px_10px_rgb(0,0,0,0.7)]">
        <DialogHeader>
          <DialogTitle>What do you want to post?</DialogTitle>
          <Textarea
            placeholder="Enter here..."
            className="h-100 w-full"
            value={inputVal}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button
            variant={"default"}
            className="cursor-pointer"
            onClick={() => {
              handleClick();
              router.refresh();
            }}
            disabled={posting}
          >
            {!posting ? <p>Post</p> : <p>Wait</p>}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
