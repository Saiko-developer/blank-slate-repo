/**
 * Renders Unit 11 (Thanakha) skills using the REAL textbook data in
 * `src/data/textbookUnit11.json` + `src/data/unit11Supplement.ts`, reusing the
 * shared ExerciseKit presentation. Fully sandboxed: nothing here reads or
 * changes Unit 1–10 data.
 */
import { useState } from "react";
import { BookOpen, Languages, ListChecks } from "lucide-react";

import { LessonAudioPlayer } from "@/components/LessonAudioPlayer";
import {
  AnswerTryBox,
  ExerciseGroup,
  OwlBadge,
  ParagraphBlock,
  ToggleReveal,
  VocabCard,
} from "@/components/lesson/ExerciseKit";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GrammarScriptView } from "@/components/lesson/GrammarScriptView";
import { UNIT11_GRAMMAR } from "@/data/grammar/unit11";
import unit11 from "@/data/textbookUnit11.json";
import {
  partA11A_translations,
  partB11A_translations,
  partC11A_translations,
  partA11C_translations,
  partB11C_translations,
  grammar11C,
  vocab11B,
} from "@/data/unit11Supplement";
import { getUnitAudio } from "@/lib/localData";
import type { PracticeSkill } from "@/lib/practice";

/* eslint-disable @typescript-eslint/no-explicit-any */

const UNIT11 = unit11 as any;

function getUnit11Lesson(code: string) {
  const all = [...(UNIT11.lessons ?? []), ...(UNIT11.sections ?? [])];
  return all.find((l: any) => l?.code === code) ?? null;
}

function getUnit11Section(prefix: string) {
  return (
    (UNIT11.sections ?? []).find((s: any) => String(s?.lesson ?? "").startsWith(prefix)) ?? null
  );
}

export function Unit11SkillView({ skill }: { skill: PracticeSkill }) {
  if (skill === "reading") return <ReadingView11 />;
  if (skill === "vocabulary") return <VocabularyView11 />;
  if (skill === "grammar") return <GrammarView11 />;
  if (skill === "listening" || skill === "speaking")
    return <ListeningSpeakingView11 skill={skill} />;
  return <WritingView11 />;
}

/* ------------------------------ Reading (11A) ---------------------------- */

function ReadingView11() {
  const data = getUnit11Section("11A") as any;
  const passage = data?.reading_passage;
  const comp = data?.comprehension;
  const [showFullMy, setShowFullMy] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">11A · Reading</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{data?.topic}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{passage?.title}</p>

        <Button
          size="sm"
          variant={showFullMy ? "default" : "outline"}
          className="mt-3 gap-1.5"
          onClick={() => setShowFullMy((v) => !v)}
        >
          <Languages className="h-3.5 w-3.5" />
          {showFullMy ? "Hide all Burmese" : "Translate Whole Passage to Burmese"}
        </Button>

        <div className="mt-4 space-y-5">
          {(passage?.paragraphs ?? []).map((p: any) => (
            <ParagraphBlock key={p.paragraph_id} block={p} forceShowMy={showFullMy} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <OwlBadge>
          <p className="font-semibold">မင်္ဂလာပါ! ဆရာ ဇီးကွက်ပါ 🦉</p>
          <p>
            ဘယ်ဘက်က သနပ်ခါးစာပိုဒ်ကို သေသေချာချာ ဖတ်ပါ။ ပြီးရင် လေ့ကျင့်ခန်း တစ်ခုချင်း
            ဖြေကြည့်ပါ။ <strong>အဖြေတွေကို မပြသေးပါဘူး</strong> — ကိုယ်တိုင် စဉ်းစားပြီး
            ကြိုးစားကြည့်ပါ။
          </p>
        </OwlBadge>

        {data?.pre_reading?.length ? (
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <ListChecks className="h-3.5 w-3.5" /> Pre-reading
            </div>
            <ol className="mt-3 space-y-3">
              {data.pre_reading.map((q: any) => (
                <li key={q.id} className="rounded-xl border border-border bg-background p-3">
                  <p className="text-sm font-medium leading-relaxed">
                    {q.id}. {q.question}
                  </p>
                  <ToggleReveal label="Show idea" tone="emerald">
                    {q.suggested_answer}
                  </ToggleReveal>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {comp?.part_A?.topics?.length ? (
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <ListChecks className="h-3.5 w-3.5" /> Topics (a–e)
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              အကြောင်းအရာ ရွေးချယ်စရာများ — Choose one topic for each paragraph below.
            </p>
            <ul className="mt-3 space-y-1.5">
              {comp.part_A.topics.map((t: string) => (
                <li
                  key={t}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium leading-relaxed"
                >
                  {t}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {comp?.part_A?.exercises?.length ? (
          <ExerciseGroup
            title="Exercise A — Topic of each paragraph"
            titleMy="လေ့ကျင့်ခန်း A — စာပိုဒ်တစ်ခုစီ၏ အကြောင်းအရာ"
            instructions={comp.part_A.instructions}
            placeholder="a–e…"
            items={comp.part_A.exercises.map((e: any) => ({
              id: e.question_number,
              text: e.question ?? e.text,
              translation: partA11A_translations[e.question_number] ?? "",
              answer: e.answer ?? "",
            }))}
          />
        ) : null}

        {comp?.part_B?.exercises?.length ? (
          <ExerciseGroup
            title="Exercise B — Words in bold"
            titleMy="လေ့ကျင့်ခန်း B — မှင်းထားသော စကားလုံးများ"
            instructions={comp.part_B.instructions}
            placeholder="a, b or c…"
            items={comp.part_B.exercises.map((e: any) => ({
              id: e.question_number,
              text: e.question ?? e.text,
              translation: partB11A_translations[e.question_number] ?? "",
              answer: e.answer ?? "",
            }))}
          />
        ) : null}

        {comp?.part_C?.exercises?.length ? (
          <ExerciseGroup
            title="Exercise C — Full-sentence answers"
            titleMy="လေ့ကျင့်ခန်း C — အဖြေအပြည့်အစုံ"
            instructions={comp.part_C.instructions}
            items={comp.part_C.exercises.map((e: any) => ({
              id: e.question_number,
              text: e.question ?? e.text,
              translation: partC11A_translations[e.question_number] ?? "",
              answer: e.answer ?? "",
            }))}
          />
        ) : null}
      </section>
    </div>
  );
}

/* ---------------------------- Vocabulary (11B) --------------------------- */

function VocabularyView11() {
  const data = getUnit11Section("11B") as any;
  const lesson = getUnit11Lesson("11B") as any;
  const partA = data?.part_A;
  const partC = data?.part_C;
  const partD = data?.part_D;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">11B · Vocabulary</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{data?.topic}</h2>
        <OwlBadge>
          {lesson?.titleMy ?? "Suffixes နှင့် Collocations များကို လေ့လာပါမယ်။"}{" "}
          <strong>အဖြေတွေကို မပြသေးပါဘူး</strong> — ကိုယ်တိုင် စဉ်းစားပြီး ကြိုးစားကြည့်ပါ။
        </OwlBadge>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <BookOpen className="h-3.5 w-3.5" /> Vocabulary — Word · Pronunciation · မြန်မာ အဓိပ္ပာယ်
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {vocab11B.map((v) => (
            <VocabCard key={v.word} item={v} />
          ))}
        </div>

        {partA?.noun_forming?.length || partA?.verb_forming?.length ? (
          <details className="mt-5">
            <summary className="cursor-pointer text-sm font-semibold text-primary">
              📋 Reference Tables (Exercise A — Noun-forming & Verb-forming suffixes)
            </summary>
            <p className="mt-2 text-xs text-muted-foreground">{partA.instructions}</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {[...(partA.noun_forming ?? []), ...(partA.verb_forming ?? [])].map((g: any) => (
                <div key={g.suffix} className="rounded-lg border border-border bg-background p-3">
                  <p className="text-xs font-bold text-primary">{g.suffix}</p>
                  <ul className="mt-1.5 space-y-1 text-xs">
                    {(g.entries ?? []).map((e: any) => (
                      <li key={e.root_word}>
                        {e.root_word} → <span className="font-semibold">{e.noun ?? e.verb}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        ) : null}
      </section>

      {partC?.exercises?.length ? (
        <ExerciseGroup
          title="Exercise C — Correct form of the word"
          titleMy="လေ့ကျင့်ခန်း C — စကားလုံး ပုံစံမှန် ဖြည့်စွက်ပါ"
          instructions={partC.instructions}
          enableStructure={false}
          placeholder="Type the correct form…"
          items={partC.exercises.map((e: any) => ({
            id: e.question_number,
            text: e.text,
            translation: "",
            answer: e.answer ?? "",
          }))}
        />
      ) : null}

      {partD?.exercises?.length ? (
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <ListChecks className="h-3.5 w-3.5" /> Exercise D — Collocations
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{partD.instructions}</p>
          {partD.word_box?.length ? (
            <p className="mt-2 rounded-lg border border-border bg-background px-3 py-2 text-xs">
              <span className="font-semibold">Word box: </span>
              {partD.word_box.join(" · ")}
            </p>
          ) : null}
          <ol className="mt-4 space-y-4">
            {partD.exercises.map((q: any) => (
              <li
                key={q.question_number}
                className="rounded-xl border border-border bg-background p-3"
              >
                <div className="flex gap-2">
                  <span className="text-sm font-bold text-primary">{q.question_number}.</span>
                  <p className="text-sm font-medium leading-relaxed">{q.text}</p>
                </div>
                <AnswerTryBox correct={q.answer ?? ""} placeholder="Type the collocation…" />
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}

/* ------------------------------ Grammar (11C) ---------------------------- */

function GrammarView11() {
  const data = getUnit11Section("11C") as any;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">11C · Grammar</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{data?.topic}</h2>
      </header>

      <GrammarScriptView grammar={UNIT11_GRAMMAR} />

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <BookOpen className="h-3.5 w-3.5" /> ဂရမ်မာ ရှင်းလင်းချက်
        </div>
        <div className="mt-3 space-y-3 text-sm leading-relaxed">
          <p>{grammar11C.whatMy}</p>
          <p>{grammar11C.whenMy}</p>
          <p>{grammar11C.whyMy}</p>
        </div>
        {grammar11C.examples?.length ? (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold text-primary">
              📋 ဥပမာများ (Examples)
            </summary>
            <ul className="mt-2 space-y-1.5 text-sm">
              {grammar11C.examples.map((ex: any) => (
                <li key={ex.en}>
                  {ex.en}{" "}
                  {ex.phrase ? <span className="text-muted-foreground">— {ex.phrase}</span> : null}
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </section>

      {data?.part_A?.exercises?.length ? (
        <ExerciseGroup
          title="Exercise A — Fill in with who / whom / whose"
          titleMy="လေ့ကျင့်ခန်း A — who / whom / whose ဖြည့်စွက်ပါ"
          instructions={data.part_A.instructions}
          enableStructure={false}
          placeholder="who, whom or whose…"
          items={data.part_A.exercises.map((e: any) => ({
            id: e.question_number,
            text: e.question ?? e.text,
            translation: partA11C_translations[e.question_number] ?? "",
            answer: e.answer ?? "",
          }))}
        />
      ) : null}

      {data?.part_B?.exercises?.length ? (
        <ExerciseGroup
          title="Exercise B — Combine the sentences"
          titleMy="လေ့ကျင့်ခန်း B — ဝါကျများ ပေါင်းစပ်ပါ"
          instructions={data.part_B.instructions}
          enableStructure={false}
          placeholder="Type the combined sentence…"
          items={data.part_B.exercises.map((e: any) => ({
            id: e.question_number,
            text: e.question ?? e.text,
            translation: partB11C_translations[e.question_number] ?? "",
            answer: e.answer ?? "",
          }))}
        />
      ) : null}
    </div>
  );
}

/* ----------------------- Listening / Speaking (11D) ---------------------- */

function ListeningSpeakingView11({ skill }: { skill: PracticeSkill }) {
  const data = getUnit11Section("11D") as any;
  const lesson = getUnit11Lesson("11D") as any;
  const audio = getUnitAudio(11);
  const partB = data?.part_B;
  const partC = data?.part_C;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">
            11D · {skill === "speaking" ? "Speaking" : "Listening"}
          </span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{lesson?.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{lesson?.titleMy}</p>
        <OwlBadge>{lesson?.intro}</OwlBadge>
      </header>

      <LessonAudioPlayer
        src={audio}
        script={lesson?.intro ?? ""}
        label={skill === "speaking" ? "Model pronunciation" : "Listening track"}
        hint={
          skill === "speaking"
            ? "နမူနာ အသံထွက်ကို နားထောင်ပြီး လိုက်ဆိုကြည့်ပါ။"
            : "နားထောင်ပြီး ကွက်လပ်တွေကို ဖြည့်ပါ။"
        }
      />

      {skill === "listening" && data?.part_A?.exercises?.length ? (
        <ExerciseGroup
          title="Exercise A — Listen and complete"
          titleMy="လေ့ကျင့်ခန်း A — နားထောင်ပြီး ဖြည့်စွက်ပါ"
          instructions={data.part_A.instructions}
          enableStructure={false}
          placeholder="Type what you hear…"
          items={data.part_A.exercises.map((e: any) => ({
            id: e.question_number,
            text: e.question ?? e.text,
            translation: "",
            answer: e.answer ?? "Listen to the dialogue to confirm your answer",
          }))}
        />
      ) : null}

      {skill === "speaking" && partB?.exercises?.length ? (
        <ExerciseGroup
          title="Exercise B — Complete the dialogue"
          titleMy="လေ့ကျင့်ခန်း B — စကားပြော ဖြည့်စွက်ပါ"
          instructions={partB.instructions}
          enableStructure={false}
          placeholder="Type the expression…"
          items={partB.exercises.map((e: any) => ({
            id: e.question_number,
            text: e.question ?? e.text,
            translation: "",
            answer: e.answer ?? "",
          }))}
        />
      ) : null}

      {skill === "speaking" && partC ? (
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <ListChecks className="h-3.5 w-3.5" /> Exercise C — Make suggestions
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{partC.instructions}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {[
              { label: "Making suggestions", items: partC.making_suggestions },
              { label: "Accepting", items: partC.accepting },
              { label: "Declining", items: partC.declining },
            ].map((g) => (
              <div key={g.label} className="rounded-lg border border-border bg-background p-3">
                <p className="text-xs font-bold text-primary">{g.label}</p>
                <ul className="mt-1.5 space-y-1 text-xs">
                  {(g.items ?? []).map((e: string) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ExerciseGroup
        title={skill === "speaking" ? "Speak — practise aloud" : "Comprehension check"}
        titleMy={
          skill === "speaking" ? "လေ့ကျင့်ခန်း — အသံထွက် လေ့ကျင့်ပါ" : "နားထောင်ခြင်း မေးခွန်းများ"
        }
        instructions={lesson?.intro ?? ""}
        enableStructure={false}
        placeholder={skill === "speaking" ? "Type what you would say…" : "Type your answer…"}
        items={(skill === "speaking"
          ? (lesson?.bonusQuestions ?? lesson?.questions ?? [])
          : (lesson?.questions ?? [])
        ).map((q: any) => ({
          id: q.id,
          text: q.question,
          translation: "",
          answer: q.suggested_answer ?? q.answer ?? "",
        }))}
      />
    </div>
  );
}

/* ------------------------------ Writing (11E) ---------------------------- */

function WritingView11() {
  const data = getUnit11Section("11E") as any;
  const lesson = getUnit11Lesson("11E") as any;
  const task = data?.writing_task;
  const [draft, setDraft] = useState("");

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">11E · Writing</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{lesson?.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{lesson?.titleMy}</p>
        <OwlBadge>{lesson?.intro}</OwlBadge>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <ListChecks className="h-3.5 w-3.5" /> Writing task
        </div>
        <p className="mt-2 text-sm leading-relaxed">{task?.instructions}</p>
        {task?.to ? (
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="font-semibold">To:</span> {task.to}
          </p>
        ) : null}
        {task?.opening ? (
          <div className="mt-3 rounded-lg border border-border bg-background p-3 text-sm leading-relaxed">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Opening
            </span>
            <p className="mt-1">{task.opening}</p>
          </div>
        ) : null}
        {lesson?.bonusQuestions?.length ? (
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            {lesson.bonusQuestions.map((q: any) => (
              <li key={q.id}>{q.question}</li>
            ))}
          </ul>
        ) : null}
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={10}
          placeholder="Start writing here… ဒီနေရာမှာ စရေးပါ။"
          className="mt-4 text-sm leading-relaxed"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {draft.trim() ? draft.trim().split(/\s+/).length : 0} words
        </p>
        {lesson?.bonusQuestions?.[0]?.suggested_answer ? (
          <ToggleReveal label="Show model answer" tone="emerald">
            {lesson.bonusQuestions[0].suggested_answer}
          </ToggleReveal>
        ) : null}
      </section>
    </div>
  );
}
