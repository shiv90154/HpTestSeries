import { COURT_CLERK_FREE_MOCK_SLUG } from "../pb-court-clerk";
import type { PostSeed } from "./types";

const FREE_MOCK = `/tests/${COURT_CLERK_FREE_MOCK_SLUG}`;

// pbtestseries.in posts for the Punjab District Court Clerk drive (SSSC, Advt. No. 37C/SSSC/PB/2026). The scheme and
// marks come from the 2026 notice as reported by exam portals; each post tells readers to confirm them on sssc.gov.in.
// The model answers are our own and are practice material, not official samples.

export const COURT_CLERK_POSTS: PostSeed[] = [
  {
    slug: "punjab-court-clerk-syllabus-exam-pattern-2026",
    site: "pb",
    seoTitle: "Punjab Court Clerk Syllabus & Exam Pattern 2026 (1,270 Posts)",
    seoDescription:
      "Punjab District Court Clerk 2026 syllabus and pattern: 50 GK, 20 English, 30 marks of typed English, 0.25 negative marking, cut-off rules and the computer test.",
    title: "Punjab District Court Clerk Syllabus and Exam Pattern 2026: 1,270 Posts, 100 Marks, Typed English",
    titleHi: "पंजाब जिला न्यायालय क्लर्क सिलेबस और परीक्षा पैटर्न 2026: 1,270 पद, 100 अंक, टाइप किया जाने वाला अंग्रेज़ी भाग",
    excerpt:
      "The written exam for Punjab District Court Clerk (Advt. 37C/SSSC/PB/2026) has 50 GK and 20 English objective questions plus 30 marks of typed English. Topic-wise syllabus, marks, cut-offs and a study plan.",
    category: "SYLLABUS",
    exams: ["punjab-courts/clerk"],
    content: `The **Society for Centralized Recruitment of Staff in Subordinate Courts (SSSC)** is filling **1,270 Clerk posts** in the district courts of Punjab under **Advertisement No. 37C/SSSC/PB/2026**. Online applications on **sssc.gov.in** close on **4 November 2026**. An exam date had not been announced when this was written, so the weeks between the form and the paper are your preparation window.

This post gives the exam scheme and the topics that usually come under each part. The marks and timings below are from the 2026 notice as reported by exam portals; **check them against the official notice on sssc.gov.in** before you finalise your plan.

## Exam pattern at a glance

| Part | Questions | Marks | Type |
|---|---|---|---|
| General Knowledge | 50 | 50 | Objective, online |
| English Composition (objective) | 20 | 20 | Objective, online |
| English Composition (subjective) | 4 tasks | 30 | Typed on screen |
| **Written exam total** | | **100** | **2 hours, online (CBT)** |

- **Negative marking:** 0.25 mark is deducted for every wrong objective answer. Unattempted questions carry no penalty.
- **Qualifying marks:** at least **33% in each subject** and **40% overall**.
- **Subjective part:** it is marked only if you score at least 33% in General Knowledge, so GK decides whether your 30 typed marks count at all.
- **After the written exam:** shortlisted candidates take a qualifying **Computer Proficiency Test**. Read our post on the [spreadsheet and typing test](/blog/punjab-court-clerk-computer-proficiency-test-spreadsheet-typing).
- **Merit:** the final list follows the written exam marks. The computer test only qualifies.

Our mocks cover the **70 objective marks** under the same negative marking. The 30 typed marks are practised through our post on [essay, letter, précis and translation](/blog/punjab-court-clerk-essay-letter-precis-translation-format).

## General Knowledge: 50 marks

Half the paper is GK, and it is also the gate for the typed marks. Spread your time like this.

### Indian history and the national movement
Ancient, medieval and modern India in outline: the Indus Valley, the Mauryas and Guptas, the Delhi Sultanate and the Mughals, the 1857 revolt, the Congress, Gandhi's movements and the road to Independence. Punjab's role gets repeated questions: Ghadar Party, Jallianwala Bagh, Bhagat Singh, Lala Lajpat Rai.

### Indian polity
The Constitution and its Preamble, Fundamental Rights and Duties, Directive Principles, Parliament, the President and Governor, the Supreme Court and High Courts, writs, and important Articles. For a court job, the **judiciary, writs and criminal law reform** (the Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita and Bharatiya Sakshya Adhiniyam) deserve extra attention.

### Geography
Indian and world physical geography, rivers, mountain passes, soils, climate and national parks, plus the geography of Punjab: rivers and doabs, districts, wetlands and crops.

### Economy
Banking and RBI, taxes and GST, Five Year Plans, budget terms and major government schemes.

### General science
Basic physics, chemistry and biology as in the school syllabus, health, nutrition and environment.

### Punjab GK
The Sikh Gurus, Maharaja Ranjit Singh and the Anglo-Sikh wars, districts and their new formations, fairs and festivals, folk dances and instruments, writers, universities, dams and canals. Our [Know Your Punjab](/punjab) page is a quick revision sheet and the [free Punjab Court Clerk mock test](${FREE_MOCK}) tests it.

### Current affairs, sports, awards and books
The last six to twelve months of national events, sports results, major awards, and important books and authors.

## English Composition: objective, 20 marks

- **Grammar:** tenses, subject-verb agreement, articles, prepositions, conjunctions.
- **Error spotting** and **sentence improvement**.
- **Active and passive voice**; **direct and indirect speech**.
- **Vocabulary:** synonyms, antonyms, one-word substitution, idioms and phrases, spellings.

## English Composition: subjective, 30 marks

| Task | Marks | What to expect |
|---|---|---|
| Essay | 10 | About 150 words on a social, administrative or current topic |
| Letter | 5 | Official or personal letter or application |
| Précis | 5 | Shorten a passage to about one-third of its length |
| Translation | 10 | A Punjabi passage translated into English |

These answers are typed on the screen, so practise **typing English with correct spelling and punctuation**, not just writing it on paper.

## A study plan for the weeks ahead

1. **Week 1 to 2:** finish GK in layers. Do one subject per day (history, polity, geography, economy, science), then Punjab GK on the weekend. Take one [sectional test](/punjab-courts/clerk) each evening.
2. **Every day:** 20 minutes of grammar and vocabulary. Keep a notebook of ten new words and two idioms.
3. **Three times a week:** write one subjective task and type it. Time the essay at about 20 minutes.
4. **Weekly:** one full mock with the clock on and negative marking on. Review every wrong answer and note why it was wrong.
5. **Last week:** revise your notebook, redo the questions you got wrong and sit two timed mocks.

Start with the [free Punjab Court Clerk mock test](${FREE_MOCK}), then read the full [Punjab Court Clerk exam page](/punjab-courts/clerk) for the mocks and sectionals.`,
    faqs: [
      {
        q: "What is the exam pattern of the Punjab District Court Clerk written exam?",
        a: "According to the 2026 notice, it is an online exam of 100 marks in 2 hours: 50 General Knowledge and 20 English objective questions, plus 30 marks of typed English (essay, letter, précis and Punjabi to English translation). Wrong objective answers lose 0.25 mark.",
      },
      {
        q: "What are the qualifying marks for the Punjab Court Clerk exam?",
        a: "As reported from the 2026 notice, you need at least 33% in each subject and 40% overall, and the subjective English is checked only if you score 33% in General Knowledge. Confirm the exact rule on sssc.gov.in.",
      },
      {
        q: "Does the Punjab Court Clerk syllabus include Punjab GK?",
        a: "Yes. Punjab GK is a regular part of the 50-mark General Knowledge section: Sikh history, Gurus, districts, rivers, fairs and festivals, culture and administration.",
      },
      {
        q: "Is the computer test part of the merit list?",
        a: "No. The Computer Proficiency Test (spreadsheet and English typing) is qualifying. The final merit list follows the written exam marks, as per the 2026 notice.",
      },
    ],
  },
  {
    slug: "punjab-court-clerk-essay-letter-precis-translation-format",
    site: "pb",
    seoTitle: "Punjab Court Clerk Essay, Letter, Précis, Translation: Formats",
    seoDescription:
      "How to score the 30 typed marks in Punjab Court Clerk: essay, letter, précis and Punjabi to English translation formats with a model answer for each, plus typing tips.",
    title: "Punjab Court Clerk Essay, Letter, Précis and Punjabi-English Translation: Formats and Model Answers",
    titleHi: "पंजाब कोर्ट क्लर्क निबंध, पत्र, सार-लेखन और पंजाबी-अंग्रेज़ी अनुवाद: प्रारूप और आदर्श उत्तर",
    excerpt:
      "Thirty of the 100 marks in the Punjab District Court Clerk exam are for typed English: essay (10), letter (5), précis (5) and Punjabi to English translation (10). Formats, a model answer for each and the mistakes that cost marks.",
    category: "STRATEGY",
    exams: ["punjab-courts/clerk"],
    content: `In the Punjab District Court Clerk written exam, **30 of the 100 marks** are for English that you **type on screen**: an **essay (10), a letter (5), a précis (5) and a translation from Punjabi into English (10)**. Most candidates ignore this part until the last week. It is also where an average GK score becomes a selection, because the answers are marked by people and rewarded for clean, simple English.

Remember the rule reported from the 2026 notice: the subjective part is checked only if you score **33% in General Knowledge**. Do not give up GK for English, but do not skip this part either. The model answers below are our own practice material, not official samples.

## 1. Essay (10 marks, about 150 words)

**Structure that works in 150 words**

1. **Introduction (2 to 3 lines):** define the topic or state why it matters.
2. **Body (3 short paragraphs or 5 to 6 lines):** causes or importance, effects or examples, and one fact or figure.
3. **Conclusion (2 lines):** a solution or a hopeful line.

**Topics that suit an administrative exam:** digital India, cleanliness and public hygiene, the importance of the judiciary, saving water in Punjab, road safety, women's education, paperless offices, the effect of social media, crop residue and air pollution.

**Model essay: Importance of Punctuality in Public Offices** (about 150 words)

> Punctuality means doing the right work at the right time. In a public office it is not a habit alone; it is a duty towards the citizen. A person who comes to a court or a government office often travels far and loses a day's wages. When a clerk is late or a file is delayed, that loss grows.
>
> Punctuality improves work. When staff reach on time, files move on the same day, hearings begin as listed and records are kept up to date. It also builds trust: people believe in an office that keeps its word. Senior officers, too, find it easier to supervise a team that respects time.
>
> Delay breeds corruption, because people begin to pay for speed. Attendance on biometric machines, clear deadlines and daily work lists have helped many offices. Above all, each employee must feel responsible.
>
> In short, a punctual office is an honest and efficient office. As the saying goes, time and tide wait for none.

**What costs marks:** a long introduction, no paragraphs, spelling errors, and copying a memorised essay that does not match the topic.

## 2. Letter (5 marks)

Know the two formats. For an **official letter or application**:

\`\`\`
To
The Registrar,
District and Sessions Court,
Ludhiana.

Subject: Request for a copy of the judgment in Civil Suit No. 123 of 2024.

Sir,
With due respect, I state that I am the plaintiff in the above-mentioned suit... (state the request in 4 to 5 lines).

I shall be grateful if you kindly issue the certified copy at the earliest.

Yours faithfully,
Name
Address
Date
\`\`\`

For a **personal letter** use the sender's address and date at the top right, a salutation such as "Dear Rohan", the body in two short paragraphs, and "Yours affectionately" at the end.

**Tips:** write the **Subject** line in one sentence, keep the language formal ("I request you to...", "kindly"), and finish with your name. Do not add a made-up phone number or email.

## 3. Précis (5 marks)

A précis is a **shortened version in your own words**, about **one-third** of the original, in **one paragraph**, with **no opinion** added.

**Steps**

1. Read the passage twice; underline the main idea of each paragraph.
2. Note the central idea in one line.
3. Write the draft in indirect speech, in the past or present tense, with no examples or quotations.
4. Count the words and trim to the limit.
5. Give it a short **title** if the instructions ask for one.

**Example.** A 120-word passage says that a village had no road, so children missed school in the rains, a patient could not reach the hospital in time, and farmers sold their crops cheaply because trucks could not enter. The panchayat then asked the district office, a road was built, and life improved.

**Précis (about 40 words):** The lack of a road in a village disrupted schooling, health care and the sale of crops. When the panchayat approached the district administration, a road was built, which greatly improved the villagers' lives.

## 4. Punjabi to English translation (10 marks)

This is the highest-scoring subjective task, so give it the most practice.

**Method**

1. **Read the whole passage first** so you understand the idea before the words.
2. **Translate sentence by sentence**, not word by word. Punjabi puts the verb at the end ("ਉਸ ਨੇ ਕਿਤਾਬ ਪੜ੍ਹੀ"), English puts it after the subject ("He read the book").
3. **Fix tense**: Punjabi "ਹੈ / ਸੀ / ਹੋਵੇਗਾ" decide whether you use present, past or future.
4. **Do not skip** a word you do not know; use a simple English word that fits the context.
5. **Check** names, numbers and dates, and re-read for spelling.

**A small example:** the sentence about the village market in Punjabi becomes "The village market is held every Sunday, and farmers from nearby villages bring vegetables and grain to sell." Keep your English short and correct; the examiner marks accuracy, not fancy words.

## Typing it on the screen

- Type at least **200 words** in practice every day; speed matters because the whole exam is 2 hours.
- Learn to **use capital letters, full stops and commas** on a keyboard; there is no spell-check to save you.
- Practise the formats above in a plain text editor with spell-check turned off.

Next, try a [sectional test on English grammar](/punjab-courts/clerk) and the [free Punjab Court Clerk mock test](${FREE_MOCK}) to make sure your objective marks are secure. For the full scheme, read the [syllabus and exam pattern](/blog/punjab-court-clerk-syllabus-exam-pattern-2026).`,
    faqs: [
      {
        q: "How many marks are for essay, letter, précis and translation in Punjab Court Clerk?",
        a: "As per the 2026 notice reported by exam portals: essay 10 marks (about 150 words), letter 5 marks, précis 5 marks and Punjabi to English translation 10 marks, 30 marks in all, typed on screen.",
      },
      {
        q: "How long should the Punjab Court Clerk essay be?",
        a: "About 150 words. Use a short introduction, two or three compact body paragraphs and a two-line conclusion, and finish inside the time limit.",
      },
      {
        q: "How do I practise Punjabi to English translation for the Court Clerk exam?",
        a: "Take a short Punjabi newspaper paragraph every day, translate it sentence by sentence into English, type it and read it again for tense and spelling. Do this for ten days and your speed and accuracy improve.",
      },
    ],
  },
  {
    slug: "punjab-court-clerk-computer-proficiency-test-spreadsheet-typing",
    site: "pb",
    seoTitle: "Punjab Court Clerk Computer Test: Spreadsheet & 30 WPM Typing",
    seoDescription:
      "Punjab District Court Clerk Computer Proficiency Test: a 10-mark, 10-minute spreadsheet task (pass 4) and English typing at 30 wpm. Formulas and a practice plan.",
    title: "Punjab Court Clerk Computer Proficiency Test: Spreadsheet Tasks (10 Marks) and 30 WPM Typing",
    titleHi: "पंजाब कोर्ट क्लर्क कंप्यूटर प्रवीणता टेस्ट: स्प्रेडशीट (10 अंक) और 30 शब्द प्रति मिनट टाइपिंग",
    excerpt:
      "After the written exam, Punjab District Court Clerk candidates take a qualifying Computer Proficiency Test: a 10-minute spreadsheet task of 10 marks (4 to pass) and English typing at 30 words per minute. What to practise and how.",
    category: "EXAM_PATTERN",
    exams: ["punjab-courts/clerk"],
    content: `Passing the written exam is not the end of the Punjab District Court Clerk selection. Candidates shortlisted on the written marks must pass a **qualifying Computer Proficiency Test**. It is only a pass or fail step, since the final merit list follows the written exam marks, but a candidate who fails it is out. The test has two parts, as reported from the 2026 notice (**Advt. No. 37C/SSSC/PB/2026**; confirm on **sssc.gov.in**).

| Part | What you do | Time | Marks / standard |
|---|---|---|---|
| Spreadsheet | Complete tasks in a spreadsheet | 10 minutes | 10 marks, at least **4** to pass |
| English typing | Type a passage in English | As set in the notice | **30 words per minute** |

The notice does not need you to be an expert. It needs you to be **calm, accurate and fast with the basics**.

## Spreadsheet test: 10 marks in 10 minutes

You need only **4 out of 10** to pass, so aim for accuracy on the simple tasks rather than attempting everything.

**Basics to be sure of**

- **Entering data** in cells and moving with the arrow keys, Tab and Enter.
- **Formatting:** bold, italics, font size, cell colour, borders, number formats (currency, percentage, date).
- **Column and row handling:** widening columns, inserting and deleting rows, merging and centring cells.
- **Alignment and text wrap.**
- **Sorting** data in ascending or descending order and a simple **filter**.
- **Saving** the file with the name asked.

**Formulas that usually come**

| Task | Formula (example) |
|---|---|
| Total of a range | \`=SUM(B2:B10)\` |
| Average | \`=AVERAGE(B2:B10)\` |
| Highest / lowest | \`=MAX(B2:B10)\`, \`=MIN(B2:B10)\` |
| Count numbers | \`=COUNT(B2:B10)\` |
| Condition | \`=IF(B2>=40,"Pass","Fail")\` |
| Percentage | \`=B2/C2*100\` |

**Habits that save marks**

1. Read the task sheet fully before touching the keyboard.
2. Do the formula tasks first, because they are the easiest to score.
3. Check the **cell range** carefully; most mistakes come from a wrong range such as \`B2:B9\` instead of \`B2:B10\`.
4. Do not spend more than two minutes on one task.
5. Save the file before time is up.

Practise in any spreadsheet program for 20 minutes a day. If your exam centre uses a different program from the one you learned on, the menus differ, but the formulas and shortcuts are the same.

## Typing at 30 words per minute

In typing tests, one "word" is five keystrokes, so **30 wpm** means about **150 correct characters a minute**. This is an easy standard if you practise, but it needs **accuracy**: errors in spelling or punctuation reduce your net speed.

**How to reach 30 wpm in two weeks**

1. **Learn the home row** (A S D F, J K L ;) and keep your eyes on the screen, not the keys.
2. **Practise 15 to 20 minutes a day**, split into two sessions, rather than one long session.
3. **Type real passages**, such as news paragraphs and court notices, with capital letters and punctuation.
4. **Do not look at the keys.** The first few days will be slower, but your speed jumps after that.
5. **Measure net speed**: words typed minus errors. A free typing tutor shows this for you.
6. Before the test, **type your own name and address correctly**; a calm start saves minutes.

**Mistakes that cost marks:** adding extra spaces, forgetting capital letters at the start of sentences, leaving out words, and correcting too often. If you see a mistake, fix it quickly and move on.

## How this fits into your preparation

The computer test only qualifies you, so give it **about 20% of your daily time** in the weeks before it is held, and the rest to the written exam, which decides your merit. Typing practice also helps the **30 typed marks** of the written exam, so one habit does double duty. Read our posts on the [syllabus and exam pattern](/blog/punjab-court-clerk-syllabus-exam-pattern-2026) and on [essay, letter, précis and translation](/blog/punjab-court-clerk-essay-letter-precis-translation-format), and try the [free Punjab Court Clerk mock test](${FREE_MOCK}).`,
    faqs: [
      {
        q: "What is the Computer Proficiency Test in the Punjab Court Clerk exam?",
        a: "As reported from the 2026 notice, it is a qualifying test after the written exam: a 10-minute spreadsheet task of 10 marks, where at least 4 marks are needed, and English typing at 30 words per minute. It is not counted in the final merit.",
      },
      {
        q: "How many marks do I need in the spreadsheet test?",
        a: "At least 4 out of 10. Concentrate on the simple tasks such as formatting, SUM, AVERAGE and IF, and check your cell ranges.",
      },
      {
        q: "How fast do I need to type for the Punjab Court Clerk exam?",
        a: "English typing at 30 words per minute, which is about 150 correct characters a minute. Practise daily on real passages and measure net speed after removing errors.",
      },
    ],
  },
];
