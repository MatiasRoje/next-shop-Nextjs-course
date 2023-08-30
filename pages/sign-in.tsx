import Button from "@/components/Button";
import Field from "@/components/Field";
import Input from "@/components/Input";
import Page from "@/components/Page";
import { fetchJson } from "@/lib/api";
import { FormEventHandler, useState } from "react";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: false });
    await sleep(2000);
    try {
      const res = await fetchJson("http://localhost:1337/auth/local", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });
      setStatus({ loading: false, error: false });
      console.log("sign-in:", res);
    } catch (err) {
      setStatus({ loading: false, error: true });
    }
  };

  return (
    <Page title="Sign In">
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
        {status.error && <p className="text-red-700">Invalid credentials</p>}
        {status.loading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
};

export default SignInPage;
