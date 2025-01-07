"use client";

import { useLocalStorage } from "../_hooks/useLocalStorage";

const LocalStorageView = () => {
  const [name, setName] = useLocalStorage("name", "John");
  const [user, setUser] = useLocalStorage("user", { fullName: "John Doe" });

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <div className="text-xl font-bold mb-4">Local Storage Data</div>
      <label className="block mb-2">
        <strong>String - </strong>Enter name to local storage:
      </label>
      <input
        className="border p-2 mb-4 w-full"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />
      <div className="text-lg">
        <strong>Name:</strong> {name}
      </div>
      <br />
      <label className="block mb-2">
        <strong>Object - </strong> Enter full name object to local storage:
      </label>
      <input
        className="border p-2 mb-4 w-full"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUser({ fullName: e.target.value })
        }
      />
      <div className="text-lg">
        <strong>Full Name:</strong> {user.fullName}
      </div>
    </div>
  );
};

export default LocalStorageView;
