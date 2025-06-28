import { getAuth } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

export const fetchClerkAuth = createServerFn({ method: "GET" }).handler(
  async () => {
    const request = getWebRequest();
    const { userId } = await getAuth(request);

    return {
      userId,
    };
  },
);
