import React from "react";
import BasicMenu from "../../components/menus/BasicMenu";
import FavoritesComponent from "../../components/member/FavoritesComponent";

const FavoritePage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />
      <div
        className="w-full overflow-auto"
        style={{ marginTop: "200px" }}
      ></div>
      <div className="w-full h-full overflow-auto p-5">
        <FavoritesComponent />
      </div>
    </div>
  );
};

export default FavoritePage;
