import Dexie from "dexie";

const db = new Dexie("AffiliationDB");

db.version(1).stores({
  users: "++id, userid, password, role, email", // define indexes
  userRoles: "++id, userid, assignedRole", // define indexes
  portalInfo: "++id, is_open, startDate, endDate", // define indexes
});

export const createDummyUsers = async () => {
  const roleList = [
    {
      userType: "applicant",
      role: ["applicant"],
      email: "applicant@gmail.com",
      password: "12345678",
      total_applications: 0,
    },
    {
      userType: "dgt",
      role: ["dgt"],
      email: "dgt@gmail.com",
      password: "12345678",
    },
    {
      userType: "state_admin",
      role: ["state_admin", "state_assessor"],
      email: "state_admin@gmail.com",
      password: "12345678",
    },
    {
      userType: "state_assessor",
      role: ["state_assessor"],
      email: "state_assessor@gmail.com",
      password: "12345678",
    },
  ];
  console.log("creating dummy users.");
  for (const u of roleList) {
    const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
    await db.users.add({
      userid: uniqueId,
      password: u.password,
      role: u.role,
      email: u.email,
    });

    console.log("creating dummy roles.");
    for (const role of u.role) {
      await db.userRoles.add({
        userid: uniqueId,
        assignedRole: role,
      });
    }
  }

  // Adding a dummy portal info
  await db.portalInfo.add({
    is_open: true,
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-06-30"),
  });
};

export const tryLogin = (userid, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCount = await db.users.count();
      if (userCount === 0) {
        console.log("No users found, creating dummy users.");
        await createDummyUsers();
      }

      const user = await db.users
        .where("email")
        .equals(userid)
        .filter((u) => u.password == password)
        .first();
      if (user) {
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
