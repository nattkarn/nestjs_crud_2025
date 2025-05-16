# 🛠️ NestJS + Prisma CRUD: ระบบจัดการสินค้า

โปรเจกต์นี้เป็นตัวอย่างการสร้าง RESTful API สำหรับจัดการสินค้า (`Product`) ด้วย NestJS และ Prisma ORM โดยเชื่อมต่อกับฐานข้อมูล (รองรับทั้ง PostgreSQL, MySQL, SQLite) และมีการตรวจสอบข้อมูลผ่าน `class-validator`

---

## ⚙️ เทคโนโลยีที่ใช้

- **NestJS** – Backend Framework ที่เขียนด้วย TypeScript
- **Docker Compose** – จัดการ container และ network
- **Prisma ORM** – จัดการฐานข้อมูลแบบ type-safe
- **PostgreSQL** – ตัวอย่างฐานข้อมูลที่ใช้งานได้ง่ายในเครื่อง
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
├── prisma/                   ← บริหารจัดการ PrismaService และ PrismaModule
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── products/                 ← โมดูลสำหรับจัดการสินค้า
│   ├── dto/                  ← DTO สำหรับ validate request
│   │   ├── create-product.dto.ts
│   │   └── update-product.dto.ts
│   │
│   ├── entities/             ← Entity class (ใช้ได้หรือไม่ใช้ก็ได้ ถ้าใช้ Prisma)
│   │   └── product.entity.ts
│   │
│   ├── products.controller.ts
│   ├── products.controller.spec.ts
│   ├── products.service.ts
│   ├── products.service.spec.ts
│   └── products.module.ts
│
├── app.module.ts             ← โมดูลหลักของแอป
├── app.controller.ts
├── app.controller.spec.ts
├── app.service.ts
└── main.ts                   ← Entry point, ตั้งค่า global pipe และ API prefix

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

// Start docker-compose
docker-compose up -d

npx prisma migrate dev --name init

// Start NestJS
npm run start:dev
```

API จะพร้อมใช้งานที่ `http://localhost:5000/api/v1`