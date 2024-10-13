import connectDB from "@/config/database";
import Property from "@/models/Property";

import PropertyCard from "@/components/PropertyCard";
import ErrorPage from "@/app/error";

import { getSessionUser } from "@/utils/getSessionUser";
import User from "@/models/User";
import { convertToObject } from "@/utils/convertToObject";

const SavedPropertiesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser) throw new Error("Session is required");

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  const properties = await Property.find({
    _id: { $in: user.bookmarks },
  }).lean();

  const convertedProperties = convertToObject(properties);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
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
