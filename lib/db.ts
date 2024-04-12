import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// async function test() {
//     const user = await db.user.create({
//         data: {
//             name: "test",
//             phone: "01044442222",
//         },
//     });
//     console.log(user);
// }

// async function test() {
//     const users = await db.user.findMany({
//         where: {
//             phone: {
//                 contains: "10",
//             },
//         },
//     });
//     console.log(users);
// }

// test();

// async function test() {
//     const token = await db.sMSToken.create({
//         data: {
//             token: "123456",
//             user: {
//                 connect: {
//                     id: 1,
//                 },
//             },
//         },
//     });
//     console.log(token);
// }

async function test() {
    const token = await db.sMSToken.findUnique({
        where: {
            id: 1,
        },
        include: { user: true },
    });
    console.log(token);
}

test();

export default db;
