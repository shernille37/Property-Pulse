import connectDB from "@/config/database";

import PropertyCard from "@/components/PropertyCard";
import ErrorPage from "@/app/error";

import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import { convertToObject } from "@/utils/convertToObject";

const SavedPropertiesPage = async () => {
  await connectDB();
  const { userId } = await getSessionUser();

  if (!userId) throw new Error("Session is required");

  // Populate (Join to the Property Model)
  const { bookmarks: properties } = await User.findById(userId)
    .populate("bookmarks")
    .lean();

  const convertedProperties = convertToObject(properties);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        {properties.length === 0 ? (
          <ErrorPage error={"No Saved Properties"} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {convertedProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                savedProperty={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
