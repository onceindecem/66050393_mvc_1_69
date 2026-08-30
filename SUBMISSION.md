# SUBMISSION - Exit Exam MVC 1/2569 (อาทิตย์เช้า)

## 1. วิธีเปิดโปรแกรม
- ภาษา/เฟรมเวิร์ก: Node.js + Express + EJS
- Entry point / คำสั่งเปิดโปรแกรม: `npm install` แล้ว `npm start`
- หมายเหตุที่จำเป็น (ถ้ามี): ระบบเก็บ state ไว้ใน memory ระหว่างการทำงานหนึ่งครั้ง และเริ่มจาก `data/seed_data.json` ทุกครั้งที่เปิดโปรแกรมใหม่

## 2. ตารางเชื่อมโยง Requirements

| Requirement | Model / Domain | Controller / Action | View / Screen |
|---|---|---|---|
| R1 | `Election`, `Candidate`, `Voter`, `Ballot`, `BallotGroup`; Service Layer: `VotingService`, `ElectionService`, `ScoreService` | `HomeController`, `VotingController`, `ElectionController`, `ReviewController`, `ResultController` | `home.ejs`, `voter.ejs`, `officer.ejs`, `review.ejs`, `error.ejs`, `result-officer.ejs`, `result-voter.ejs` |
| R2 | `Voter`, `Candidate`, `Ballot`, `Election`, `VotingService` | `VotingController` | `voter.ejs`, `error.ejs` |
| R3 | `Election`, `Ballot`, `BallotGroup`, `ElectionService`, `ScoreService` | `ElectionController` | `officer.ejs`, `error.ejs`  |
| R4 | `BallotGroup`, `Ballot`, `Election`, `ElectionService`, `ScoreService` | `ReviewController`, `ResultController` | `review.ejs` , `officer.ejs`, `result-officer.ejs`, `result-voter.ejs`, `error.ejs` |
| R5 | `Election`, `Voter`, `Ballot`, `BallotGroup` | `VotingController`, `ElectionController`, `ReviewController`, `ResultController` | `voter.ejs`, `officer.ejs`, `review.ejs`, `error.ejs`, `result-officer.ejs`, `result-voter.ejs` |

## 3. ผลการทดสอบ

| กรณี | ผ่าน/ไม่ผ่าน | หมายเหตุ (เฉพาะที่จำเป็น) |
|---|---|---|
| T1 | ผ่าน | |
| T2 | ผ่าน | V04 จะไม่สามารถกรอกฟอร์มได้ตั้งแต่แรก |
| T3 | ผ่าน | |
| T4 | ผ่าน | |
| T5 | ผ่าน | |
| T6 | ผ่าน | |

## 4. ความแตกต่างระหว่างแบบที่ออกกับโปรแกรมจริง (ถ้ามี)
ระบุไม่เกิน 3 ข้อ
1. ใช้ `ElectionRepository` เป็นชั้นจัดการ state/input จาก seed เพื่อให้ Controller ไม่จัดการไฟล์ JSON โดยตรง
2. รวม business logic การปิดรับคะแนน/จัดกลุ่ม/ตรวจกลุ่มไว้ใน `ElectionService` และคำนวณคะแนนใน `ScoreService`

## 5. บันทึกการใช้ Generative AI

| เวลาโดยประมาณ | เครื่องมือ | ใช้เพื่ออะไร | นำคำแนะนำไปใช้อย่างไร |
| 10.00 | ChatGPT | ขอคำแนะนำไวยากรณ์ในการดึงข้อมูลจากไฟล์ json มาใช้งาน | นำไวยากรณ์ที่ได้จากคำแนะนำมาใช้เขียนในส่วนของการดึงข้อมูลจากไฟล์ seed_data.json มาใช้ (ElectionRepository) |
