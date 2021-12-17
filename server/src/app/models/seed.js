const prisma = require('../models/prisma');
const faker = require('faker');

async function main() {
   const floor1 = [101, 102, 103, 104, 105, 106, 107, 108];
   for (const room of floor1) {
      const imageURL = `${faker.image.business()}?random=${Math.round(
         Math.random() * 1000
      )}`;

      const isRoomType = (number) => {
         const parseNumber = Number(number);
         if (parseNumber <= 104) return 'single';
         if (parseNumber <= 106) return 'double';
         return 'vip';
      };

      const seedRoom = await prisma.room.create({
         data: {
            number: Number(room),
            floor: 1,
            roomStatusId: 6,

            roomDetail: {
               create: {
                  img: [imageURL, imageURL],
                  price: Number(faker.commerce.price()),
                  type: isRoomType(room),
               },
            },
         },
      });
      console.log('seeding... ', seedRoom);
   }
}

main()
   .catch((e) => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      await prisma.$disconnect();
   });
