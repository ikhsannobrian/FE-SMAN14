import React from "react";
import { Link } from "react-router-dom";

const CardLayanan = ({ title, description, image, onClick }) => {
  return (
    <div className="card bg-base-500 shadow-lg max-w-xs mx-auto">
      <figure className="px-6 pt-6">
        <img src={image} alt={title} />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link>
            <button
              onClick={onClick}
              className="btn bg-info text-white rounded-lg"
            >
              Daftar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardLayanan;
