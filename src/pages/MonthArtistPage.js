import React from "react";
import MonthArtistComponent from "../components/MonthArtistComponent";
import BasicLayout from "../layouts/BasicLayout";

const MonthArtistPage = () => {
  return (
    <BasicLayout>
      <div className="w-full h-full overflow-auto">
        <MonthArtistComponent />
      </div>
    </BasicLayout>
  );
};

export default MonthArtistPage;
