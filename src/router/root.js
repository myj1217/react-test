import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import todoRouter from "./todoRouter";
import productsRouter from "./productsRouter";
import memberRouter from "./memberRouter";
import cartRouter from "./cartRouter";
import LoadingSpinner from "./LoadingSpninner"; 


const Loading = <div>Loading....</div>;
const Main = lazy(() => import("../pages/MainPage"));
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"));
const ProductsRouter = lazy(() => import("../pages/products/IndexPage"));
const Cart = lazy(() => import("../pages/CartPage"));
const FAQ = lazy(() => import( "../pages/FAQ"));
const InquiryForm = lazy(() => import( "../components/InquiryForm"));
const MonthArtistPage = lazy(() => import( "../pages/MonthArtistPage"));
const Community = lazy(() => import( "../pages/CommunityPage"));


const root = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "todo",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <TodoIndex />
      </Suspense>
    ),
    children: todoRouter(),
  },
  {
    path: "products",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
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
    path: "cart",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Cart />
      </Suspense>
    ),
    children: cartRouter(),
  },
  {
    path: "about",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <FAQ />
        <InquiryForm />
      </Suspense>
    ),
  },
  {
    path: "month",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <MonthArtistPage />
      </Suspense>
    ),
  },
  {
    path: "comunity",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Community />
      </Suspense>
    ),
  },
]);

export default root;
