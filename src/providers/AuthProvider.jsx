import { useMemo, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { DUMMY_USERS } from "@/constants/dummyUsers";
import { storage } from "@/utils/storage";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storage.getUser);

  const value = useMemo(
    () => ({
      user,
      login: (email, password, remember) => {
        const match = DUMMY_USERS.find(
          (item) => item.email === email.trim().toLowerCase() && item.password === password
        );
        if (!match) return null;
        const { password: _password, ...safeUser } = match;
        storage.setUser(safeUser, remember);
        setUser(safeUser);
        return safeUser;
      },
      logout: () => {
        storage.removeUser();
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
