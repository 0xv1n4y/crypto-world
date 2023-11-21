import React, { Suspense } from "react";

import ErrorFallback from "../../components/ErrorBoundary/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";

const CoinsTable = React.lazy(() =>
  import("../../components/CoinsTable/CoinsTable")
);
const Banner = React.lazy(() => import("../../components/Banner/Banner"));
const HomePage = () => {
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback} >
        <Suspense fallback={<div>Loading...</div>}>
          <Banner />
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
