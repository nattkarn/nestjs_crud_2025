# 🛠️ NestJS + Prisma CRUD: ระบบจัดการสินค้า

โปรเจกต์นี้เป็นตัวอย่างการสร้าง RESTful API สำหรับจัดการสินค้า (`Product`) ด้วย NestJS และ Prisma ORM โดยเชื่อมต่อกับฐานข้อมูล (รองรับทั้ง PostgreSQL, MySQL, SQLite) และมีการตรวจสอบข้อมูลผ่าน `class-validator`

---

## ⚙️ เทคโนโลยีที่ใช้

- **NestJS** – Backend Framework ที่เขียนด้วย TypeScript
- **Prisma ORM** – จัดการฐานข้อมูลแบบ type-safe
- **SQLite** – ตัวอย่างฐานข้อมูลที่ใช้งานได้ง่ายในเครื่อง
- **class-validator / class-transformer** – ตรวจสอบและแปลงค่าจาก DTO

---

## 🚀 ขั้นตอนการใช้งาน

### 1. สร้างโปรเจกต์ใหม่ด้วย NestJS CLI
ติดตั้ง NestJS CLI และสร้างโปรเจกต์ใหม่ พร้อมติดตั้ง Prisma

### 2. ตั้งค่า Prisma ORM
- สร้างไฟล์ `schema.prisma` และกำหนด model ที่ต้องการ
- ใช้คำสั่ง `prisma migrate dev` และ `prisma generate` เพื่อสร้างฐานข้อมูลและ client

### 3. สร้างโมดูล PrismaService
เพื่อเชื่อมต่อ Prisma Client กับ NestJS แบบ Dependency Injection

### 4. สร้างโมดูล Product
แยก controller, service และ DTO ออกเป็นโฟลเดอร์อย่างเป็นระเบียบ

### 5. ติดตั้งและเปิดใช้งาน class-validator
เพิ่ม validation pipe ที่ระดับ global และกำหนด whitelist + transform

### 6. กำหนด Global API Prefix และ ValidationPipe
ใน `main.ts` เพิ่มโค้ดกำหนด prefix เป็น `api/v1` และเปิด `ValidationPipe` แบบ global เพื่อความปลอดภัยและความถูกต้องของข้อมูล

### 7. สร้าง DTO
กำหนดชนิดข้อมูลที่รับเข้าผ่าน API ด้วย `class-validator` และใช้ `PartialType` สำหรับการแก้ไขข้อมูล

### 8. เขียน Service และ Controller
เชื่อมต่อกับ Prisma เพื่อทำ CRUD ทั้งหมด ได้แก่:
- สร้างสินค้า (Create)
- ดึงสินค้าทั้งหมด (Read All)
- ดึงสินค้ารายตัว (Read One)
- แก้ไขสินค้า (Update)
- ลบสินค้า (Delete)

---

## 🧪 การทดสอบ API

คุณสามารถทดสอบ API ได้ด้วย Postman หรือ curl ผ่าน endpoint ต่อไปนี้:

| Method | Endpoint           | Description              |
|--------|--------------------|--------------------------|
| POST   | `/api/v1/products` | สร้างสินค้า              |
| GET    | `/api/v1/products` | ดึงสินค้าทั้งหมด         |
| GET    | `/api/v1/products/:id` | ดึงสินค้าตาม ID     |
| PATCH  | `/api/v1/products/:id` | แก้ไขสินค้า            |
| DELETE | `/api/v1/products/:id` | ลบสินค้า              |

---

## 📁 โครงสร้างโปรเจกต์ (โดยสังเขป)

<pre>
src/
├── main.ts
├── app.module.ts
├── prisma/
│ └── prisma.service.ts
├── products/
│ ├── products.module.ts
│ ├── products.controller.ts
│ ├── products.service.ts
│ └── dto/
│ ├── create-product.dto.ts
│ └── update-product.dto.ts
</pre>

---

## 📌 หมายเหตุ

- ทุกครั้งที่เปลี่ยนแปลง Prisma schema ต้องรัน `npx prisma generate`
- สามารถเปลี่ยน `SQLite` เป็นฐานข้อมูลอื่นได้โดยแก้ไข `schema.prisma` และ `DATABASE_URL`
- หากต้องการเพิ่ม feature เพิ่มเติม เช่น pagination, filter, soft delete ฯลฯ สามารถต่อยอดจากโครงสร้างนี้ได้ทันที

---
## ✅ ตัวอย่างการรันโปรเจกต์

```bash
npm install
npx prisma migrate dev --name init
npm run start:dev
```

API จะพร้อมใช้งานที่ `http://localhost:5000/api/v1`