"use client";

import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import { toast } from "react-toastify";

import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";

import { useState, useEffect, useTransition } from "react";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!userId) {
      setIsBookmarked(false);
      return;
    }

    startTransition(async () => {
      const res = await checkBookmarkStatus(property._id);
      if (res.error) return toast.error(res.error);

      setIsBookmarked(res.isBookmarked);
    });
  }, [checkBookmarkStatus, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to log in to bookmark a property");
      return;
    }

    const res = await bookmarkProperty(property._id);
    if (res.error) return toast.error(res.error);
    toast.success(res.message);

    setIsBookmarked(res.isBookmarked);
  };

  if (isPending || isBookmarked == null) {
    return (
      <button
        disabled
        className="bg-gray-300 text-gray-500 font-bold w-full py-2 px-4 rounded-full flex items-center justify-center cursor-not-allowed"
      >
        <FaBookmark className="mr-2" /> Checking...
      </button>
    );
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
