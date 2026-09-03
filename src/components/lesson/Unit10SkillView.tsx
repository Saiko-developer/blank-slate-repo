/**
 * Renders Unit 10 (Food Safety) skills using the REAL textbook data in
 * `src/data/textbookUnit10.json` + `src/data/unit10Supplement.ts` +
 * `src/data/grammar/unit10.ts`, reusing the shared ExerciseKit presentation.
 * Fully sandboxed: nothing here reads or changes other units' data.
 */
import { useState } from "react";
import { BookOpen, Languages, ListChecks } from "lucide-react";

import { LessonAudioPlayer } from "@/components/LessonAudioPlayer";
import {
  ExerciseGroup,
  OwlBadge,
  ToggleReveal,
  VocabCard,
} from "@/components/lesson/ExerciseKit";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GrammarScriptView } from "@/components/lesson/GrammarScriptView";
import { UNIT10_GRAMMAR } from "@/data/grammar/unit10";
import unit10 from "@/data/textbookUnit10.json";
import {
  grammar10C,
  partA10C_translations,
  partB10C_translations,
  preReading10A_translations,
  readingPassage10A_translations,
  vocab10B,
} from "@/data/unit10Supplement";
import { getUnitAudio } from "@/lib/localData";
import type { PracticeSkill } from "@/lib/practice";

/* eslint-disable @typescript-eslint/no-explicit-any */

const UNIT10 = unit10 as any;

function getUnit10Lesson(code: string) {
  return (UNIT10.lessons ?? []).find((l: any) => l?.code === code) ?? null;
}

export function Unit10SkillView({ skill }: { skill: PracticeSkill }) {
  if (skill === "reading") return <ReadingView10 />;
  if (skill === "vocabulary") return <VocabularyView10 />;
  if (skill === "grammar") return <GrammarView10 />;
  if (skill === "listening" || skill === "speaking")
    return <ListeningSpeakingView10 skill={skill} />;
  return <WritingView10 />;
}

/* ------------------------------ Reading (10A) ---------------------------- */

function ReadingView10() {
  const lesson = getUnit10Lesson("10A") as any;
  const [showMy, setShowMy] = useState(false);
  const paragraphs = Object.entries(readingPassage10A_translations);
  const preReading = Object.entries(preReading10A_translations);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">10A · Reading</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{lesson?.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{lesson?.titleMy}</p>

        <Button
          size="sm"
          variant={showMy ? "default" : "outline"}
          className="mt-3 gap-1.5"
          onClick={() => setShowMy((v) => !v)}
        >
          <Languages className="h-3.5 w-3.5" />
          {showMy ? "Hide Burmese" : "Show Burmese explanation"}
        </Button>

        <p className="mt-4 text-sm leading-relaxed">{lesson?.intro}</p>
        {showMy ? (
          <div className="mt-4 space-y-3">
            {paragraphs.map(([id, text]) => (
              <p
                key={id}
                className="rounded-xl border border-border bg-background p-3 text-sm leading-relaxed"
              >
                <span className="mr-1 font-bold text-primary">{id}.</span>
                {text}
              </p>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xs text-muted-foreground">{lesson?.introMy}</p>
        )}
      </section>

      <section className="space-y-5">
        <OwlBadge>
          <p className="font-semibold">မင်္ဂလာပါ! ဆရာ ဇီးကွက်ပါ 🦉</p>
          <p>
            အစားအသောက် ဘေးကင်းလုံခြုံမှု စာပိုဒ်ကို ဖတ်ပြီး မေးခွန်းတွေကို ဖြေကြည့်ပါ။{" "}
            <strong>အဖြေတွေကို မပြသေးပါဘူး</strong> — ကိုယ်တိုင် စဉ်းစားပြီး ကြိုးစားကြည့်ပါ။
          </p>
        </OwlBadge>

        {preReading.length ? (
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <ListChecks className="h-3.5 w-3.5" /> Pre-reading
            </div>
            <ol className="mt-3 space-y-2">
              {preReading.map(([id, text]) => (
                <li key={id} className="rounded-xl border border-border bg-background p-3">
                  <p className="text-sm leading-relaxed">
                    {id}. {text}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {lesson?.questions?.length ? (
          <ExerciseGroup
            title="Exercise A — Comprehension questions"
            titleMy="လေ့ကျင့်ခန်း A — နားလည်မှု မေးခွန်းများ"
            instructions={lesson.intro}
            placeholder="Type your answer…"
            items={lesson.questions.map((q: any) => ({
              id: q.id,
              text: q.question,
              translation: "",
              answer: q.suggested_answer ?? "",
            }))}
          />
        ) : null}

        {lesson?.bonusQuestions?.length ? (
          <ExerciseGroup
            title="Exercise B — Further questions"
            titleMy="လေ့ကျင့်ခန်း B — ထပ်ဆောင်း မေးခွန်းများ"
            instructions="Answer in full sentences."
            placeholder="Type your answer…"
            items={lesson.bonusQuestions.map((q: any) => ({
              id: q.id,
              text: q.question,
              translation: "",
              answer: q.answer ?? "",
            }))}
          />
        ) : null}
      </section>
    </div>
  );
}

/* ---------------------------- Vocabulary (10B) --------------------------- */

function VocabularyView10() {
  const lesson = getUnit10Lesson("10B") as any;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">10B · Vocabulary</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{lesson?.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{lesson?.titleMy}</p>
        <OwlBadge>
          {lesson?.introMy}{" "}
          <strong>အဖြေတွေကို မပြသေးပါဘူး</strong> — ကိုယ်တိုင် စဉ်းစားပြီး ကြိုးစားကြည့်ပါ။
        </OwlBadge>
      </header>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <BookOpen className="h-3.5 w-3.5" /> Vocabulary — Word · Pronunciation · မြန်မာ အဓိပ္ပာယ်
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {vocab10B.map((v) => (
            <VocabCard key={v.word} item={v} />
          ))}
        </div>
      </section>

      {lesson?.questions?.length ? (
        <ExerciseGroup
          title="Exercise A — Match the words"
          titleMy="လေ့ကျင့်ခန်း A — စကားလုံးများ တွဲဖက်ပါ"
          instructions={lesson.intro}
          enableStructure={false}
          placeholder="1 -> b, 2 -> i …"
          items={lesson.questions.map((q: any) => ({
            id: q.id,
            text: q.question,
            translation: "",
            answer: q.suggested_answer ?? "",
          }))}
        />
      ) : null}

      {lesson?.bonusQuestions?.length ? (
        <ExerciseGroup
          title="Exercise B — Complete the sentences"
          titleMy="လေ့ကျင့်ခန်း B — ကွက်လပ်များ ဖြည့်စွက်ပါ"
          instructions="Complete the sentences with the appropriate words."
          enableStructure={false}
          placeholder="Type the missing words…"
          items={lesson.bonusQuestions.map((q: any) => ({
            id: q.id,
            text: q.question,
            translation: "",
            answer: q.answer ?? "",
          }))}
        />
      ) : null}
    </div>
  );
}

/* ------------------------------ Grammar (10C) ---------------------------- */

function GrammarView10() {
  const lesson = getUnit10Lesson("10C") as any;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">10C · Grammar</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{lesson?.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{lesson?.titleMy}</p>
      </header>

      <GrammarScriptView grammar={UNIT10_GRAMMAR} />

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <BookOpen className="h-3.5 w-3.5" /> ဂရမ်မာ ရှင်းလင်းချက်
        </div>
        <div className="mt-3 space-y-3 text-sm leading-relaxed">
          <p>{grammar10C.whatMy}</p>
          <p>{grammar10C.whenMy}</p>
          <p>{grammar10C.whyMy}</p>
        </div>
        {grammar10C.examples?.length ? (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-semibold text-primary">
              📋 ဥပမာများ (Examples)
            </summary>
            <ul className="mt-2 space-y-1.5 text-sm">
              {grammar10C.examples.map((ex) => (
                <li key={ex.en}>
                  {ex.en} <span className="text-muted-foreground">— {ex.phrase}</span>
                </li>
              ))}
            </ul>
          </details>
        ) : null}
      </section>

      {lesson?.questions?.length ? (
        <ExerciseGroup
          title="Exercise A — Combine with 'not only … but also'"
          titleMy="လေ့ကျင့်ခန်း A — 'not only … but also' ဖြင့် ပေါင်းစပ်ပါ"
          instructions={lesson.intro}
          enableStructure={false}
          placeholder="Type the combined sentence…"
          items={lesson.questions.map((q: any) => ({
            id: q.id,
            text: q.question,
            translation: partA10C_translations[q.id] ?? "",
            answer: q.suggested_answer ?? "",
          }))}
        />
      ) : null}

      {lesson?.bonusQuestions?.length ? (
        <ExerciseGroup
          title="Exercise B — Rewrite with 'The more …, the more …'"
          titleMy="လေ့ကျင့်ခန်း B — 'The more …, the more …' ဖြင့် ပြန်ရေးပါ"
          instructions="Rewrite the sentences using correlative comparatives."
          enableStructure={false}
          placeholder="Type the rewritten sentences…"
          items={lesson.bonusQuestions.map((q: any) => ({
            id: q.id,
            text: q.question,
            translation: partB10C_translations[q.id] ?? "",
            answer: q.answer ?? "",
          }))}
        />
      ) : null}
    </div>
  );
}

/* ----------------------- Listening / Speaking (10D) ---------------------- */

function ListeningSpeakingView10({ skill }: { skill: PracticeSkill }) {
  const lesson = getUnit10Lesson("10D") as any;
  const audio = getUnitAudio(10);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">
            10D · {skill === "speaking" ? "Speaking" : "Listening"}
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

      {skill === "listening" && lesson?.questions?.length ? (
        <ExerciseGroup
          title="Exercise A — Listen and complete the table"
          titleMy="လေ့ကျင့်ခန်း A — နားထောင်ပြီး ဇယားကို ဖြည့်ပါ"
          instructions={lesson.intro}
          enableStructure={false}
          placeholder="Type what you hear…"
          items={lesson.questions.map((q: any) => ({
            id: q.id,
            text: q.question,
            translation: "",
            answer: q.suggested_answer ?? "",
          }))}
        />
      ) : null}

      {skill === "speaking" && lesson?.bonusQuestions?.length ? (
        <ExerciseGroup
          title="Exercise B — Complete and practise the dialogue"
          titleMy="လေ့ကျင့်ခန်း B — စကားဝိုင်းကို ဖြည့်စွက်ပြီး လေ့ကျင့်ပါ"
          instructions={lesson.intro}
          enableStructure={false}
          placeholder="Type the expression…"
          items={lesson.bonusQuestions.map((q: any) => ({
            id: q.id,
            text: q.question,
            translation: "",
            answer: q.answer ?? "",
          }))}
        />
      ) : null}
    </div>
  );
}

/* ------------------------------ Writing (10E) ---------------------------- */

function WritingView10() {
  const lesson = getUnit10Lesson("10E") as any;
  const [draft, setDraft] = useState("");
  const model =
    lesson?.questions?.find((q: any) => q.suggested_answer?.length > 200)?.suggested_answer ??
    lesson?.questions?.[1]?.suggested_answer ??
    "";

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">10E · Writing</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold leading-tight">{lesson?.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{lesson?.titleMy}</p>
        <OwlBadge>{lesson?.intro}</OwlBadge>
      </header>

      {lesson?.questions?.length ? (
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <ListChecks className="h-3.5 w-3.5" /> Writing tasks
          </div>
          <ol className="mt-3 space-y-3">
            {lesson.questions.map((q: any) => (
              <li key={q.id} className="rounded-xl border border-border bg-background p-3">
                <p className="text-sm font-medium leading-relaxed">
                  {q.id}. {q.question}
                </p>
                <ToggleReveal label="Show model answer" tone="emerald">
                  {q.suggested_answer}
                </ToggleReveal>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
          <ListChecks className="h-3.5 w-3.5" /> Draft your complaint letter
        </div>
        <p className="mt-2 text-sm leading-relaxed">{lesson?.introMy}</p>
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
          rows={12}
          placeholder="Start writing here… ဒီနေရာမှာ စရေးပါ။"
          className="mt-4 text-sm leading-relaxed"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {draft.trim() ? draft.trim().split(/\s+/).length : 0} words
        </p>
        {model ? (
          <ToggleReveal label="Show model letter" tone="emerald">
            {model}
          </ToggleReveal>
        ) : null}
      </section>
    </div>
  );
}
