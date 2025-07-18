import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start";

import { StrictMode } from "react";
import { createRouter } from "./router";

const router = createRouter();

hydrateRoot(
  document,
  <StrictMode>
    <StartClient router={router} />
  </StrictMode>,
);
