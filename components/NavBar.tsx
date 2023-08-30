import { fetchJson } from "@/lib/api";
import { User } from "@/lib/user";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    (async () => {
      try {
        const user = await fetchJson("/api/user");
        setUser(user);
      } catch (err) {
        //not signed in
      }
    })();
  }, []);

  const handleSignOut = async () => {
    await fetchJson("/api/logout");
    setUser(undefined);
  };

  return (
    <nav className="px-2 py-2 text-sm">
      <ul className="flex gap-2">
        <li className="text-lg font-extrabold">
          <Link href="/">Next Shop</Link>
        </li>
        <li role="separator" className="flex-1" />
        {user ? (
          <>
            <li>{user.name}</li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/sign-in">Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;