import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";

const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const FAQ = lazy(() => import("../pages/FAQ.js"));
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"));
const ProductsRouter = lazy(() => import("../pages/products/IndexPage"));
const MonthArtist = lazy(() => import("../pages/MonthArtistPage.js"));
const InquiryForm = lazy(() => import("../components/InquiryForm.js"));
const Goods = lazy(() => import("../pages/GoodsListPage.js"));

const Decorations = lazy(() => import("../pages/DecorationsPage.js"));
const Paintings = lazy(() => import("../pages/PaintingsPage.js"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.js"));

const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "/about",
    element: (
      <Suspense fallback={Loading}>
        <FAQ />
        <InquiryForm />
      </Suspense>
    ),
  },
  {
    path: "/monthArtist",
    element: (
      <Suspense fallback={Loading}>
        <MonthArtist />
      </Suspense>
    ),
  },
  {
    path: "todo",
    element: (
      <Suspense fallback={Loading}>
        <TodoIndex />
      </Suspense>
    ),
    children: todoRouter(),
  },
  {
    path: "products",
    element: (
      <Suspense fallback={Loading}>
        <ProductsRouter />
      </Suspense>
    ),
    children: productsRouter(),
  },
  {
    path: "member",
    children: memberRouter(),
  },
  {
    path: "goods",
    element: (
      <Suspense fallback={Loading}>
        <Goods />
      </Suspense>
    ),
  },

  {
    path: "decorations",
    element: (
      <Suspense fallback={Loading}>
        <Decorations />
      </Suspense>
    ),
  },
  {
    path: "paintings",
    element: (
      <Suspense fallback={Loading}>
        <Paintings />
      </Suspense>
    ),
  },
  {
    path: "forgot-password",
    element: (
      <Suspense fallback={Loading}>
        <ForgotPassword />
      </Suspense>
    ),
  },
]);

export default root;
