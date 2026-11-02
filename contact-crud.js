use("contact");

if (db.getCollectionInfos({ name: "contactlist" }).length === 0) {
  db.createCollection("contactlist");
}
const contactlist = db.getCollection("contactlist");

const contacts = [
  {
    _id: ObjectId("672000000000000000000001"),
    lastName: "Ben",
    firstName: "Moris",
    email: "ben@gmail.com",
    age: 26,
  },
  {
    _id: ObjectId("672000000000000000000002"),
    lastName: "Kefi",
    firstName: "Seif",
    email: "kefi@gmail.com",
    age: 15,
  },
  {
    _id: ObjectId("672000000000000000000003"),
    lastName: "Emilie",
    firstName: "brouge",
    email: "emilie.b@gmail.com",
    age: 40,
  },
  {
    _id: ObjectId("672000000000000000000004"),
    lastName: "Alex",
    firstName: "brown",
    age: 4,
  },
  {
    _id: ObjectId("672000000000000000000005"),
    lastName: "Denzel",
    firstName: "Washington",
    age: 3,
  },
];

contacts.forEach((contact) => {
  contactlist.replaceOne({ _id: contact._id }, contact, { upsert: true });
});

print("\n1. All contacts after insertion");
printjson(contactlist.find().toArray());

print("\n2. Contact looked up by ID");
printjson(
  contactlist.findOne({
    _id: ObjectId("672000000000000000000002"),
  }),
);

print("\n3. Contacts older than 18");
printjson(contactlist.find({ age: { $gt: 18 } }).toArray());

print('\n4. Contacts older than 18 with a name containing "ah"');
printjson(
  contactlist
    .find({
      age: { $gt: 18 },
      $or: [{ firstName: /ah/i }, { lastName: /ah/i }],
    })
    .toArray(),
);

print('\n5. Change Kefi\'s first name from "Seif" to "Anis"');
printjson(
  contactlist.updateOne(
    { lastName: "Kefi", firstName: "Seif" },
    { $set: { firstName: "Anis" } },
  ),
);
printjson(contactlist.findOne({ lastName: "Kefi" }));

print("\n6. Delete contacts younger than 5");
printjson(contactlist.deleteMany({ age: { $lt: 5 } }));

print("\n7. Final contacts list");
printjson(contactlist.find().toArray());
