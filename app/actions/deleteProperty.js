"use server";

import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property not found");

  // Verify if the property to be deleted is owned by the user

  if (property.owner.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  // Extract public ID from image URLS
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  // Delete Images from Cloudinary

  if (publicIds.length > 0) {
    publicIds.forEach(async (publicId) => {
      await cloudinary.uploader.destroy("propertypulse/" + publicId);
    });
  }

  await property.deleteOne();

  revalidatePath("/", "layout");
}

export default deleteProperty;
