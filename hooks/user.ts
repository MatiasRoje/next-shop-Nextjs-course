import { fetchJson } from "@/lib/api";
import { User } from "@/lib/user";
import Error from "next/error";
import { useMutation, useQuery, useQueryClient } from "react-query";

const USER_QUERY_KEY = "user";

export function useUser() {
  const query = useQuery<User>(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson("/api/user");
      } catch (err) {
        return undefined;
      }
    },
    {
      cacheTime: Infinity,
      staleTime: 30_000, // NOTE ms
    }
  );

  return query.data;
}

interface SignInVariables {
  email: string;
  password: string;
}

interface UseSignInResult {
  signIn: (email: string, password: string) => Promise<boolean>;
  signInError: boolean;
  signInLoading: boolean;
}

export function useSignIn(): UseSignInResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<User, Error, SignInVariables>(
    ({ email, password }) =>
      fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
  );
  return {
    signIn: async (email: string, password: string) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);
        return true;
      } catch (err) {
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  };
}

export function useSignOut(): () => Promise<void> {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => fetchJson("/api/logout"));
  return async () => {
    await mutation.mutateAsync();
    queryClient.setQueryData(USER_QUERY_KEY, undefined);
  };
}
