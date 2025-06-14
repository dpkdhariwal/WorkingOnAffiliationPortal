import Dexie from "dexie";

const db = new Dexie("UserDB");

db.version(1).stores({
  users: "++id, userid, password, role, email", // define indexes
});

export const createDummyUsers = async () => {
  const roleList = [
    { role: "applicant", email: "applicant@gmail.com", password: "Abcd@123" },
    { role: "dgt", email: "dgt@gmail.com", password: "Abcd@123" },
    {
      role: "state_admin",
      email: "state_admin@gmail.com",
      password: "Abcd@123",
    },
    {
      role: "state_assessor",
      email: "state_assessor@gmail.com",
      password: "Abcd@123",
    },
  ];
  for (const u of roleList) {
    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
    await db.users.add({
      userid: uniqueId,
      password: u.password,
      role: u.role,
      email: u.email,
    });
  }
};

export const tryLogin = (userid, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users
        .where("email")
        .equals(userid)
        .filter((u) => u.password === password)
        .first();
      if (user) {
        console.log("Login successful:", user);
        resolve({ success: true, user });
      } else {
        console.log("Login failed: No matching user found.");
        reject({ success: false });
      }
    } catch (error) {
      console.error("Error while fetching user:", error);
      reject(error);
    }
  });
};

// Update
// await db.users.update(user.id, { password: '456' })

// Delete
// await db.users.delete(user.id)
