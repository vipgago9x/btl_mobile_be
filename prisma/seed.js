const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const categories = [{
  name: "Tivi",
  description: "Tivi",
  type: 1,
  status: 1
}, {
  name: "Tủ lạnh",
  description: "Tủ Lạnh",
  type: 1,
  status: 1
},
{
  name: "Điều hoà",
  description: "",
  type: 1,
  status: 1
},
{
  name: "Bình nóng lạnh",
  description: "",
  type: 1,
  status: 1
},
{
  name: "Áo",
  description: "",
  type: 1,
  status: 1
},
{
  name: "Quần",
  description: "",
  type: 1,
  status: 1
},
{
  name: "Giày",
  description: "",
  type: 1,
  status: 1
},
{
  name: "Dép",
  description: "",
  type: 1,
  status: 1
},
{
  name: "Máy tính",
  description: "",
  type: 1,
  status: 1
}, {
  name: "Điện thoại",
  description: "",
  type: 1,
  status: 1
}, {
  name: "Tai nghe",
  description: "",
  type: 1,
  status: 1
}, {
  name: "Đồng hồ",
  description: "",
  type: 1,
  status: 1
}]
async function main() {
  console.log(`Start seeding ...`);
  await prisma.category.createMany({ data: categories })

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
