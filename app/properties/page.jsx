import PropertyCard from "@/components/PropertyCard";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import ErrorPage from "../error";
import Pagination from "@/components/Pagination";
import { convertToObject } from "@/utils/convertToObject";

const PropertiesPage = async ({ searchParams: { page = 1, limit = 9 } }) => {
  await connectDB();

  const total = await Property.countDocuments({});
  if (page <= 0) page = 1;
  const offset = (page - 1) * limit;

  const properties = await Property.find({}).skip(offset).limit(limit).lean();
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

        {total > limit && (
          <Pagination
            page={parseInt(page)}
            limit={parseInt(limit)}
            totalItems={total}
          />
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
