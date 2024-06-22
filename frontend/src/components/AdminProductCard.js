import React from "react";
import { MdEdit } from "react-icons/md";

const AdminProductCard = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded">
      <img src={data.productImage[0]} width={120} height={120} />
      <h1>{data.productName}</h1>
      <div className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer">
      <MdEdit />
      </div>
    </div>
  );
};

export default AdminProductCard;
