# EduAgentX — AI + RPA Administration with UiPath Agents

Centralized automation for schools/colleges built on **UiPath Agents**.
Automates **marksheet processing**, **email-based fee/leave workflows**, **query resolution**, and **attendance notifications**, backed by **DataFabric** and **Google Vision OCR**.
## 📽️ Demo

[![Watch the demo](https://img.youtube.com/vi/OgSyXBoDhXA/0.jpg)](https://www.youtube.com/watch?v=OgSyXBoDhXA)
> 🚀 Demo-ready: upload marks + answer sheets → AI insights & bias check → personalized reports → auto emails.
> 🤖 Agents: Fee Extension • Leave Approval • General Query.
> 📈 Admin view: requests, attendance, and class performance at a glance.

---
## ✨ Features

* **Marksheet Automation**

  * OCR (Google Vision) extracts marks & content from answer sheets.
  * **AI Score** + **Fairness/Bias Check** vs teacher marks.
  * Personalized improvement plan + peer comparison.
  * Auto emails to students/parents; summary to teachers/principal.
* **Email Agents (UiPath Agent Builder)**

  * **Fee Extension Agent:** sentiment/context check → escalate → update DataFabric → notify.
  * **Leave Approval Agent:** urgency/importance classification → escalate/decide → notify.
  * **Query Agent:** answers FAQs (attendance, fees, procedures, performance context).
* **Attendance Automation**

  * Teacher marks attendance in web app → DataFabric updated.
  * If absent without approved leave → instant parent email.
* **Dashboard**

  * Requests processed, approvals/rejections, fee extensions, attendance trends, class KPIs.

---

## 🛠️ Tech Stack

- **UiPath Tools:** Studio • Orchestrator • Agent Builder • Maestro • DataFabric • Integration Service  
- **AI/ML:** Google Cloud Vision OCR (answer sheet text extraction & analysis)  
- **Frontend:** React.js (Admin Dashboard & Teacher Portal)  
- **Backend:** Node.js + Express.js (API layer, workflow triggers)  
- **Storage:** AWS S3 (answer sheets, reports, email templates)  
---

## 🧪 How It Works (Flows)

### 1) Marksheet Automation

1. Teacher uploads **Excel + Answer Sheet links** (or PDFs).
2. Robot:

   * Parses Excel → queues per student.
   * OCRs answer sheets → extracts text.
   * Sends to AI analyzer (scoring + fairness vs teacher marks).
   * Generates:

     * **Student report** (AI Score, insights, improvement plan, class comparison).
     * **Teacher/Principal summary**.
3. Emails are dispatched via Integration Service; records stored in DataFabric.

### 2) Fee Extension Agent

1. Incoming email detected → parsed (student ID, reason, due date if present).
2. **Sentiment + genuineness** analysis → escalate if needed.
3. On approval → DataFabric fee status updated → auto reply with new due date.
4. On rejection → polite explanation email with next steps.

### 3) Leave Approval Agent

1. Email ingested → classify **urgency/importance**.
2. Check conflicts (exam dates, attendance history).
3. Decide or escalate → notify student, teacher, and DataFabric.

### 4) Attendance Automation

1. Teacher marks daily attendance in web app / UiPath Apps.
2. If **Absent** & **no approved leave** → trigger parent email immediately.
3. Log communication outcome.

---

## 🧠 AI & Scoring (At a Glance)

* OCR: **Google Vision** text extraction.
* AI Tasks:

  * **AI Score** generation from answer text.
  * **Fairness check**: compare `TeacherMarks` vs `AIScore` with tolerance band.
  * **Personalized plan**: targeted steps per weak concepts & writing feedback.
  * **Peer comparison**: percentile using class distribution.
---

## 🖥️ Dashboard

* **Today:** total emails processed; fee extensions (A/R); leaves (A/R).
* **Attendance:** present/absent counts; repeated absentee list.
* **Performance:** class average, fairness deviations, top improvements.
* **SLA:** avg handle time, escalation rate.


---

## 🧭 Roadmap

* Web portal for **appeal/re-evaluation** with human-in-the-loop.
* Multilingual email templates.
* Analytics on **bias drift** over time.
* SMS/WhatsApp notifications via Integration Service connectors.
* Plagiarism & similarity checks for answer sheets.

---

## 📜 License

[MIT](LICENSE)

---

## 🙌 Acknowledgements

* UiPath Community & Docs
* Google Vision API

---
## 👥 Team Members

- [Shiva Ganesh Reddy Linga](https://www.linkedin.com/in/shivaganeshlinga/) — Project Lead, UiPath Development and Integration
- [Vaishnavi Balla](https://www.linkedin.com/in/vaishnavi-balla-142630282/) — Google Cloud Vision and RPA Development 
- [Vardhan Ganugula](https://www.linkedin.com/in/vardhan-ganugula/) — Frontend (React.js) & Backend 
- [Anvesh Komuravelli](https://www.linkedin.com/in/komuravellianvesh/) — RPA Development

> Built as part of **UiPath AgentHack India – Student Edition** 🚀


## 📫 Contact

* **Project Lead:** 🔧 *Shiva Ganesh Reddy Linga* — *[shivaganeshlinga@gmail.com](mailto:shivaganeshlinga@gmail.com)*
* **Demo Video:** 🔧 [Link](https://youtu.be/OgSyXBoDhXA)
* **Live Instance:** 🔧 [Live link](https://eduagentx.vardhan.works/)
