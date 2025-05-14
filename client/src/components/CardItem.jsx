import React from "react";
import { Link } from "react-router-dom";

const CardItem = ({ title, description, image }) => {
  // Tentukan path tujuan login berdasarkan title
  const loginPath = title.toLowerCase() === "admin" ? "/login-admin" : "/login";

  return (
    <div className="card bg-base-500 shadow-lg max-w-xs mx-auto">
      <figure className="px-6 pt-6">
        <img src={image} alt={title} />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <Link to={loginPath}>
            <button className="btn bg-info text-white rounded-lg">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
