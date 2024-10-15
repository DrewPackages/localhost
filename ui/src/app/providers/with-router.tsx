import { Suspense } from "react";
import { MemoryRouter } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <MemoryRouter>
      <Suspense fallback={"Loading ..."}>{component()}</Suspense>
    </MemoryRouter>
  );
