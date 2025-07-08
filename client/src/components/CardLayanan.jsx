import React, { memo } from "react";

const CardLayanan = ({ title, description, image, onClick }) => {
  return (
    <div className="card bg-base-500 shadow-lg max-w-xs mx-auto">
      <figure className="px-6 pt-6">
        <img
          src={image}
          alt={title}
          loading="eager"
          decoding="async"
          width={300}
          height={200}
          className="rounded-lg object-contain"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button
            onClick={onClick}
            className="btn bg-info text-white rounded-lg"
          >
            Daftar
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CardLayanan);
