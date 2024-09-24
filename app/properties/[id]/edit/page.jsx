import ErrorPage from "@/app/error";
import EditPropertyForm from "@/components/EditPropertyForm";

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToObject } from "@/utils/convertToObject";

const PropertyEditPage = async ({ params }) => {
  await connectDB();

  const property = await Property.findById(params.id).lean();
  const convertedProperty = convertToObject(property);

  if (!property) {
    return <ErrorPage error={"Property Not Found"} />;
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <EditPropertyForm property={convertedProperty} />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
