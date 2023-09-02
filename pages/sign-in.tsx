import Button from "@/components/Button";
import Field from "@/components/Field";
import Input from "@/components/Input";
import Page from "@/components/Page";
import Title from "@/components/Title";
import { useSignIn } from "@/hooks/user";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";

const SignInPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const valid = await signIn(email, password);

    if (valid) router.push("/");
  };

  return (
    <Page title="Sign In">
      <Title>Sign in</Title>
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field>
        {signInError && <p className="text-red-700">Invalid credentials</p>}
        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
};

export default SignInPage;
