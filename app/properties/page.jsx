import PropertyCard from "@/components/PropertyCard";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import ErrorPage from "../error";
import { convertToObject } from "@/utils/convertToObject";

const PropertiesPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();
  const convertedProperties = convertToObject(properties);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <ErrorPage error={"No Properties Found"} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {convertedProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
