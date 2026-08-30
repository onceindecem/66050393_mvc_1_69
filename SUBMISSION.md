# SUBMISSION - Exit Exam MVC 1/2569 (อาทิตย์เช้า)

## 1. วิธีเปิดโปรแกรม
- ภาษา/เฟรมเวิร์ก: Node.js + Express + EJS
- Entry point / คำสั่งเปิดโปรแกรม: `npm install` แล้ว `npm start`
- หมายเหตุที่จำเป็น (ถ้ามี): ระบบเก็บ state ไว้ใน memory ระหว่างการทำงานหนึ่งครั้ง และเริ่มจาก `data/seed_data.json` ทุกครั้งที่เปิดโปรแกรมใหม่

## 2. ตารางเชื่อมโยง Requirements

| Requirement | Model / Domain | Controller / Action | View / Screen |
|---|---|---|---|
| R1 | `Election`, `Candidate`, `Voter`, `Ballot`, `BallotGroup`; Service Layer: `VotingService`, `ElectionService`, `ScoreService` | `HomeController`, `VotingController`, `ElectionController`, `ReviewController` | `home.ejs`, `voter.ejs`, `officer.ejs`, `review.ejs` |
| R2 | `Voter`, `Candidate`, `Ballot`, `Election`, `VotingService` | `VotingController.submitVote()` | `VoterView` (`/voter`) |
| R3 | `Election`, `Ballot`, `BallotGroup`, `ElectionService`, `ScoreService` | `ElectionController.closeVoting()` | `OfficerView` (`/officer`) |
| R4 | `BallotGroup`, `Ballot`, `Election`, `ElectionService`, `ScoreService` | `ReviewController.decideGroup()` | `ReviewView` (`/review`), `OfficerView` |
| R5 | `Election`, `Voter`, `Ballot`, `BallotGroup` + validation rules | ทุก Controller ที่รับ action | `VoterView`, `OfficerView`, `ReviewView` |

## 3. ผลการทดสอบ

| กรณี | ผ่าน/ไม่ผ่าน | หมายเหตุ (เฉพาะที่จำเป็น) |
|---|---|---|
| T1 | ผ่าน | V04 รับบัตร C01 > C02 > C03 และถูก mark ว่าใช้สิทธิ์แล้ว |
| T2 | ผ่าน | ปฏิเสธเพราะ V04 เคยลงคะแนนแล้ว |
| T3 | ผ่าน | ปฏิเสธเพราะผู้สมัครซ้ำ และ V05 ยังมีสิทธิ์ลงคะแนน |
| T4 | ผ่าน | V05 รับบัตร C04 > C05 > C01 สำเร็จ |
| T5 | ผ่าน | กลุ่ม C01 > C02 > C03 มี 3 ใบเป็น PENDING_REVIEW และ temporary score = C01 1, C02 3, C03 2, C04 4, C05 2 |
| T6 | ผ่าน | รับรองกลุ่มแล้ว FINALIZED และคะแนน C01=10, C02=9, C03=5, C04=4, C05=2 |

## 4. ความแตกต่างระหว่างแบบที่ออกกับโปรแกรมจริง (ถ้ามี)
ระบุไม่เกิน 3 ข้อ
1. ใช้ `ElectionRepository` เป็นชั้นจัดการ state/input จาก seed เพื่อให้ Controller ไม่จัดการไฟล์ JSON โดยตรง
2. รวม business logic การปิดรับคะแนน/จัดกลุ่ม/ตรวจกลุ่มไว้ใน `ElectionService` และคำนวณคะแนนใน `ScoreService`

## 5. บันทึกการใช้ Generative AI

| เวลาโดยประมาณ | เครื่องมือ | ใช้เพื่ออะไร | นำคำแนะนำไปใช้อย่างไร |
|---|---|---|---|
|  |  |  |   |
