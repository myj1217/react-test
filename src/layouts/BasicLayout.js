import BasicMenu from "../components/menus/BasicMenu";

const BasicLayout = ({ children }) => {
  return (
    <>
      <div
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
      >
        <BasicMenu />
      </div>
      <div style={{ paddingTop: "244px" }}>{children}</div>
    </>
  );
};

export default BasicLayout;
