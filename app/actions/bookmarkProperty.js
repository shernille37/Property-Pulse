"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  //   Check if it's bookmarked

  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  //   If already bookmarked => Remove
  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Bookmark Removed";
    isBookmarked = false;
  } else {
    // If not bookmarked => Add
    user.bookmarks.push(propertyId);
    message = "Bookmark Added";
    isBookmarked = true;
  }

  await user.save();

  revalidatePath("/properties/saved", "page");

  return {
    message,
    isBookmarked,
  };
}

export default bookmarkProperty;
