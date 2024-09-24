import { Types } from "mongoose"; // This imports Types.ObjectId to validate ObjectIds

export function convertToObject(leanDocument) {
  if (!leanDocument || typeof leanDocument !== "object") return leanDocument; // Return non-objects as is

  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key];

    // Check for null or undefined to avoid errors
    if (value == null) continue;

    // If it's a MongoDB ObjectId, convert to string
    if (Types.ObjectId.isValid(value)) {
      leanDocument[key] = value.toString();
    }
    // Recursively handle nested objects or arrays
    else if (typeof value === "object") {
      leanDocument[key] = convertToObject(value);
    }
  }

  return leanDocument;
}
