"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import markRead from "@/app/actions/markRead";

import deleteMessage from "@/app/actions/deleteMessage";

const MessageCard = ({ data }) => {
  const [isRead, setIsRead] = useState(data.read);

  const handleRead = async () => {
    const read = await markRead(data._id);

    setIsRead(read);
    toast.success(`Marked as ${read ? "read" : "new"}`);
  };

  const handleDelete = async () => {
    await deleteMessage(data._id);

    toast.success("Message deleted");
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {data.property.name}
      </h2>
      <p className="text-gray-700">{data.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {data.sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href="mailto:recipient@example.com" className="text-blue-500">
            {data.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href="tel:123-456-7890" className="text-blue-500">
            {data.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>{" "}
          {new Date(data.createdAt).toLocaleString("en-US")}
        </li>
      </ul>
      <button
        onClick={handleRead}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
