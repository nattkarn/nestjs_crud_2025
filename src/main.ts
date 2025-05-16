import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // กำหนด prefix ที่จะใช้กับ API
  app.setGlobalPrefix('api/v1');

  // เปิดการใช้งาน global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ตัด field ที่ไม่มีใน DTO
      forbidNonWhitelisted: true, // ถ้ามี field เกินจะ throw error
      transform: true, // แปลงชนิดค่าตาม type ที่กำหนดใน DTO
    }),
  );

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
