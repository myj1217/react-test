import BasicMenu from "../components/menus/BasicMenu";

const BasicLayout = ({ children }) => {
  return (
    <>
      <BasicMenu />
      <div className="w-full mt-[200px]">
        {" "}
        <main className="max-w-7xl mx-auto px-5 py-5">{children}</main>
      </div>
    </>
  );
};

export default BasicLayout;
