// Lightweight client-side sentence-structure analyzer for English questions.
// Used by Saya Owl to break down a question's grammatical pieces on demand,
// rendered visually as an "Inline Train" by the lesson UI.

export type Token = { text: string; role: string; roleMy: string; tag: string };

const WH: Record<string, { role: string; roleMy: string; tag: string }> = {
  what: { role: "asking for a thing / object", roleMy: "အရာ/ အကြောင်းအရာ မေးခြင်း", tag: "WH-Question Word" },
  when: { role: "asking for time", roleMy: "အချိန် မေးခြင်း", tag: "WH-Question Word" },
  where: { role: "asking for a place", roleMy: "နေရာ မေးခြင်း", tag: "WH-Question Word" },
  why: { role: "asking for a reason", roleMy: "အကြောင်းရင်း မေးခြင်း", tag: "WH-Question Word" },
  who: { role: "asking for a person", roleMy: "လူ မေးခြင်း", tag: "WH-Question Word" },
  whom: { role: "asking for a person (object)", roleMy: "လူ (ကံ) မေးခြင်း", tag: "WH-Question Word" },
  whose: { role: "asking for ownership", roleMy: "ပိုင်ဆိုင်မှု မေးခြင်း", tag: "WH-Question Word" },
  which: { role: "asking to choose", roleMy: "ရွေးချယ်ရန် မေးခြင်း", tag: "WH-Question Word" },
  how: { role: "asking for the way / manner", roleMy: "နည်းလမ်း မေးခြင်း", tag: "WH-Question Word" },
};

const AUX = new Set([
  "do", "does", "did",
  "is", "are", "am", "was", "were",
  "has", "have", "had",
  "can", "could", "will", "would", "should", "may", "might", "must", "shall",
]);

const BE = new Set(["is", "are", "am", "was", "were"]);
const ARTICLES = new Set(["a", "an", "the"]);
const PREPS = new Set([
  "of", "in", "on", "at", "to", "for", "with", "from", "by", "about",
  "into", "onto", "over", "under", "between", "through", "during", "before", "after",
]);

// Common adjectives in the Grade 10 textbook vocabulary.
const ADJ = new Set([
  "productive", "receptive", "active", "passive", "good", "bad", "big", "small",
  "important", "different", "same", "new", "old", "young", "happy", "sad",
  "beautiful", "easy", "hard", "difficult", "simple", "useful", "main", "basic",
  "english", "burmese", "myanmar", "daily", "best", "favourite", "favorite",
  "kind", "great", "long", "short", "high", "low", "fast", "slow",
]);

const AUX_MY: Record<string, string> = {
  do: "helping verb", does: "helping verb", did: "helping verb (past)",
  has: "helping verb", have: "helping verb", had: "helping verb (past)",
  can: "modal", could: "modal (past)", will: "modal (future)",
  would: "modal", should: "modal (should)", may: "modal (may)",
  might: "modal (might)", must: "modal (must)", shall: "modal",
};

function isNounish(w: string): boolean {
  const lw = w.toLowerCase();
  return !ARTICLES.has(lw) && !ADJ.has(lw) && !PREPS.has(lw) && !AUX.has(lw) && !WH[lw];
}

// Consume a noun phrase: optional article + adjectives + 1–3 nouns.
// Returns [endIndex, hadAdjective].
function consumeNounPhrase(words: string[], start: number): { end: number; hasAdj: boolean } {
  let i = start;
  let hasAdj = false;
  if (i < words.length && ARTICLES.has(words[i].toLowerCase())) i++;
  while (i < words.length && ADJ.has(words[i].toLowerCase())) {
    hasAdj = true;
    i++;
  }
  const nounStart = i;
  while (i < words.length && i < nounStart + 3 && isNounish(words[i])) {
    i++;
    if (i < words.length && (PREPS.has(words[i].toLowerCase()) || AUX.has(words[i].toLowerCase()))) break;
  }
  return { end: i, hasAdj };
}

export function analyzeQuestion(raw: string): { sentence: string; intro: string; introMy: string; tokens: Token[]; noteMy: string } {
  const cleaned = raw.trim().replace(/[?.!]+$/, "");
  const sentence = raw.trim();
  const isQuestion = /\?\s*$/.test(raw.trim());
  const words = cleaned.split(/\s+/);
  if (words.length === 0) {
    return { sentence, intro: "", introMy: "", tokens: [], noteMy: "" };
  }

  const first = words[0].toLowerCase();
  const tokens: Token[] = [];

  // ---------- WH-question ----------
  if (WH[first] && isQuestion) {
    const info = WH[first];
    tokens.push({ text: words[0], role: `WH-word — ${info.role}`, roleMy: `WH စကားလုံး — ${info.roleMy}`, tag: info.tag });

    let i = 1;
    let isBe = false;
    // helping / linking verb
    if (i < words.length && AUX.has(words[i].toLowerCase())) {
      const w = words[i].toLowerCase();
      isBe = BE.has(w);
      tokens.push({
        text: words[i],
        role: isBe ? "linking verb (be-form)" : "helping (auxiliary) verb",
        roleMy: isBe ? "ဆက်စပ်ကြိယာ" : AUX_MY[w] ?? "အကူကြိယာ",
        tag: isBe ? "Linking Verb" : "Helping Verb",
      });
      i++;
    }

    // Subject noun phrase
    const np = consumeNounPhrase(words, i);
    if (np.end > i) {
      const chunk = words.slice(i, np.end).join(" ");
      tokens.push({
        text: chunk,
        role: "Subject (who/what the question is about)",
        roleMy: "ကံတ္တား (ဘယ်သူ/ဘာအကြောင်းလဲ)",
        tag: "Noun Subject",
      });
      i = np.end;
    }

    // Prepositional phrase short-circuit
    if (i < words.length && PREPS.has(words[i].toLowerCase())) {
      tokens.push({
        text: words.slice(i).join(" "),
        role: "Prepositional phrase (adds detail)",
        roleMy: "ဝိဘတ်စကားစု (နောက်ထပ် အချက်အလက်)",
        tag: "Prepositional Phrase",
      });
      i = words.length;
    } else if (i < words.length) {
      if (isBe) {
        // After a be-verb: remainder is a Complement, never an Object.
        tokens.push({
          text: words.slice(i).join(" "),
          role: "Complement (completes the meaning of the be-verb)",
          roleMy: "ဖြည့်စွက်စာ (be-ကြိယာ၏ အဓိပ္ပါယ်ကို ဖြည့်ပေး)",
          tag: "Complement",
        });
      } else {
        // Find the first verb-like word (skip articles/adjectives — they fold into the next noun).
        let v = i;
        while (v < words.length && (ARTICLES.has(words[v].toLowerCase()) || ADJ.has(words[v].toLowerCase()))) v++;
        if (v < words.length) {
          tokens.push({
            text: words[v],
            role: "Main verb (the action)",
            roleMy: "မူရင်းကြိယာ (လုပ်ဆောင်ချက်)",
            tag: "Main Verb",
          });
          const rest = words.slice(v + 1).join(" ").trim();
          // If we skipped articles/adjectives before the verb, glue them onto the rest as object.
          const skipped = words.slice(i, v).join(" ").trim();
          const objText = [skipped, rest].filter(Boolean).join(" ").trim();
          if (objText) {
            tokens.push({
              text: objText,
              role: "Object / Complement (the rest)",
              roleMy: "ကံ / ဖြည့်စွက်အပိုင်း",
              tag: "Noun Object",
            });
          }
        } else {
          // No verb found — treat remainder as complement.
          tokens.push({
            text: words.slice(i).join(" "),
            role: "Complement (the rest)",
            roleMy: "ဖြည့်စွက်အပိုင်း",
            tag: "Complement",
          });
        }
      }
    }

    return {
      sentence,
      intro: `This is a Wh-question starting with "${words[0]}".`,
      introMy: `ဒီမေးခွန်းက "${words[0]}" နဲ့ စတဲ့ Wh-question မေးခွန်းပါ။`,
      tokens,
      noteMy: isBe
        ? "ပုံစံ: WH-word → be-ကြိယာ → ကံတ္တား → ဖြည့်စွက်စာ ။"
        : "ပုံစံ: WH-word → အကူကြိယာ → ကံတ္တား → မူရင်းကြိယာ → ကံ ။",
    };
  }

  // ---------- Yes/No question ----------
  if (AUX.has(first) && isQuestion) {
    const w = first;
    const isBe = BE.has(w);
    tokens.push({
      text: words[0],
      role: isBe ? "Linking verb (be-form) at start = Yes/No question" : "Auxiliary at start = Yes/No question",
      roleMy: isBe ? "ဝါကျရှေ့ be-ကြိယာ → ဟုတ်/မဟုတ် မေးခွန်း" : "ဝါကျရှေ့ အကူကြိယာ → ဟုတ်/မဟုတ် မေးခွန်း",
      tag: isBe ? "Linking Verb" : "Helping Verb",
    });
    let i = 1;
    const np = consumeNounPhrase(words, i);
    if (np.end > i) {
      tokens.push({ text: words.slice(i, np.end).join(" "), role: "Subject", roleMy: "ကံတ္တား", tag: "Noun Subject" });
      i = np.end;
    }
    if (i < words.length) {
      tokens.push({
        text: words.slice(i).join(" "),
        role: isBe ? "Complement" : "Predicate (main verb + rest)",
        roleMy: isBe ? "ဖြည့်စွက်စာ" : "ကြိယာပိုင်း",
        tag: isBe ? "Complement" : "Predicate",
      });
    }
    return {
      sentence,
      intro: "This is a Yes/No question.",
      introMy: "ဒီမေးခွန်းက ဟုတ်/မဟုတ် မေးခွန်းပါ။",
      tokens,
      noteMy: "ပုံစံ: အကူ/be-ကြိယာ → ကံတ္တား → ကြိယာပိုင်း ။",
    };
  }

  // ---------- Declarative / fill-in sentence ----------
  // Subject noun phrase
  let i = 0;
  const subj = consumeNounPhrase(words, i);
  if (subj.end > i) {
    tokens.push({
      text: words.slice(i, subj.end).join(" "),
      role: "Subject",
      roleMy: "ကံတ္တား",
      tag: "Noun Subject",
    });
    i = subj.end;
  }

  // Verb
  if (i < words.length && AUX.has(words[i].toLowerCase())) {
    const w = words[i].toLowerCase();
    const isBe = BE.has(w);
    tokens.push({
      text: words[i],
      role: isBe ? "Linking verb (be-form)" : "Helping verb",
      roleMy: isBe ? "ဆက်စပ်ကြိယာ" : AUX_MY[w] ?? "အကူကြိယာ",
      tag: isBe ? "Linking Verb" : "Helping Verb",
    });
    i++;
    if (i < words.length) {
      tokens.push({
        text: words.slice(i).join(" "),
        role: isBe ? "Complement (completes the be-verb)" : "Predicate (rest of the sentence)",
        roleMy: isBe ? "ဖြည့်စွက်စာ (be-ကြိယာ၏ အဓိပ္ပါယ်ကို ဖြည့်)" : "ကြိယာပိုင်း",
        tag: isBe ? "Complement" : "Predicate",
      });
    }
    return {
      sentence,
      intro: isBe ? "This is a declarative sentence with a linking (be) verb." : "This is a declarative sentence.",
      introMy: isBe ? "ဒါက be-ကြိယာသုံး ပြောကြားချက် ဝါကျပါ။" : "ဒါက ပြောကြားချက် ဝါကျ ဖြစ်ပါတယ်။",
      tokens,
      noteMy: isBe
        ? "ပုံစံ: ကံတ္တား (Subject) → ကြိယာ (Verb) → ဖြည့်စွက်စာ (Complement) ။"
        : "ပုံစံ: ကံတ္တား → အကူကြိယာ → ကြိယာပိုင်း ။",
    };
  }

  if (i < words.length) {
    // No be/aux verb found — treat next word as main verb.
    tokens.push({
      text: words[i],
      role: "Main verb",
      roleMy: "မူရင်းကြိယာ",
      tag: "Main Verb",
    });
    i++;
    if (i < words.length) {
      tokens.push({
        text: words.slice(i).join(" "),
        role: "Object / Complement",
        roleMy: "ကံ / ဖြည့်စွက်အပိုင်း",
        tag: "Noun Object",
      });
    }
  }

  if (tokens.length === 0) {
    tokens.push({ text: cleaned, role: "Sentence", roleMy: "ဝါကျ", tag: "Sentence" });
  }

  return {
    sentence,
    intro: "This looks like a statement to complete.",
    introMy: "ဒါက ဖြည့်စွက်ရမယ့် ဝါကျ ဖြစ်ပါတယ်။",
    tokens,
    noteMy: "ပုံစံ: ကံတ္တား (Subject) → ကြိယာ (Verb) → ကံ/ဖြည့်စွက်စာ ။",
  };
}

// ---------- Burmese phrase + word hints ----------

// Whole-chunk overrides (matched case-insensitively, punctuation stripped).
const PHRASE_MY: Record<string, string> = {
  "the productive": "စွမ်းရည်ပြည့်ဝသော",
  "the receptive": "လက်ခံစုပ်ယူသော",
  "productive skills": "ထုတ်လုပ်နိုင်တဲ့ ကျွမ်းကျင်မှုများ",
  "receptive skills": "လက်ခံစုပ်ယူတဲ့ ကျွမ်းကျင်မှုများ",
  "of language": "ဘာသာစကား၏",
  "of english": "အင်္ဂလိပ်ဘာသာ၏",
  "your name": "သင့်နာမည်",
  "your country": "သင့်နိုင်ငံ",
  "in english": "အင်္ဂလိပ်လို",
  // Add this exact block below for the dynamic question phrase:
  "to learn any other foreign language apart from English? Why": "သို့မဟုတ် အင်္ဂလိပ်ဘာသာစကားမှလွဲ၍ အခြားနိုင်ငံခြားဘာသာစကားကို သင်ယူလိုပါသလား။ ဘာကြောင့်လဲ။",
  "to learn any other foreign language apart from english why": "သို့မဟုတ် အင်္ဂလိပ်ဘာသာစကားမှလွဲ၍ အခြားနိုင်ငံခြားဘာသာစကားကို သင်ယူလိုပါသလား။ ဘာကြောင့်လဲ။",
  // ---- Unit 2 (Literature) reading exercises ----
  "the difference": "ကွာခြားချက်",
  "between a painter and a writer": "ပန်းချီဆရာနှင့် စာရေးဆရာ အကြား",
  "between a comedy and a tragedy": "ဟာသဇာတ်နှင့် ဝမ်းနည်းဖွယ်ဇာတ် အကြား",
};

const WORD_MY: Record<string, string> = {
  i: "ငါ", you: "သင်", he: "သူ", she: "သူမ", it: "ဒါ", we: "ကျွန်တော်တို့", they: "သူတို့",
  my: "ငါ့ရဲ့", your: "သင့်ရဲ့", his: "သူ့ရဲ့", her: "သူမရဲ့", our: "ကျွန်တော်တို့ရဲ့", their: "သူတို့ရဲ့",
  a: "တစ်ခု", an: "တစ်ခု", the: "ထို",
  is: "ဖြစ်သည်", are: "ဖြစ်ကြသည်", am: "ဖြစ်သည်", was: "ဖြစ်ခဲ့သည်", were: "ဖြစ်ခဲ့ကြသည်",
  do: "လုပ်", does: "လုပ်", did: "လုပ်ခဲ့", have: "ရှိ", has: "ရှိ", had: "ရှိခဲ့",
  can: "နိုင်", will: "မည်", would: "မည်", should: "သင့်", may: "ဖြစ်နိုင်", might: "ဖြစ်နိုင်", must: "မဖြစ်မနေ",
  what: "ဘာ", when: "ဘယ်အချိန်", where: "ဘယ်မှာ", why: "ဘာကြောင့်", who: "ဘယ်သူ", how: "ဘယ်လို", which: "ဘယ်ဟာ", whose: "ဘယ်သူ့",
  not: "မ", and: "နှင့်", or: "သို့မဟုတ်", but: "ဒါပေမယ့်",
  to: "သို့", in: "ထဲမှာ", on: "အပေါ်မှာ", at: "မှာ", of: "၏", for: "အတွက်", with: "နှင့်အတူ", from: "မှ", by: "ဖြင့်", about: "အကြောင်း",
  name: "နာမည်", country: "နိုင်ငံ", language: "ဘာသာစကား", school: "ကျောင်း",
  teacher: "ဆရာ", student: "ကျောင်းသား", book: "စာအုပ်", day: "နေ့", time: "အချိန်", year: "နှစ်",
  skill: "ကျွမ်းကျင်မှု", skills: "ကျွမ်းကျင်မှုများ",
  productive: "စွမ်းရည်ပြည့်ဝသော", receptive: "လက်ခံစုပ်ယူသော",
  active: "တက်ကြွသော", passive: "ငြိမ်သက်သော",
  english: "အင်္ဂလိပ်", burmese: "မြန်မာ", myanmar: "မြန်မာ",
  this: "ဒါ", that: "ဟိုဟာ", these: "ဒါတွေ", those: "ဟိုဟာတွေ",
  go: "သွား", come: "လာ", make: "လုပ်", take: "ယူ", give: "ပေး", see: "မြင်",
  say: "ပြော", get: "ရ", know: "သိ", think: "ထင်", want: "လို", like: "ကြိုက်",
  live: "နေ", work: "လုပ်ငန်း", speak: "ပြော", read: "ဖတ်", write: "ရေး", listen: "နားထောင်",
  // ---- Unit 2 (Literature) reading exercises ----
  there: "အဲဒီမှာ", line: "စာကြောင်း", lines: "စာကြောင်းများ",
  sonnet: "ဆွန်နက် ကဗျာ", limerick: "လင်မရစ် ကဗျာ", tragicomedy: "နှစ်မျိုးရောနှောဇာတ်",
  classics: "ဂန္တဝင် စာပေများ", difference: "ကွာခြားချက်", between: "အကြားရှိ",
  painter: "ပန်းချီဆရာ", writer: "စာရေးဆရာ", comedy: "ဟာသဇာတ်", tragedy: "ဝမ်းနည်းဖွယ်ဇာတ်",
};

export function translateChunkMy(chunk: string): string {
  const norm = chunk.toLowerCase().replace(/[.,!?;:"'`']/g, "").trim();
  if (!norm) return "—";
  if (PHRASE_MY[norm]) return PHRASE_MY[norm];

  const parts = norm.split(/\s+/).filter(Boolean);
  const mapped = parts.map((p) => WORD_MY[p] ?? p);
  return mapped.join(" ");
}

// Structured "train car" data for the visual sentence-structure breakdown.
export type TrainCar = {
  word: string;
  translation: string;
  tag: string;
};

export function buildTrainCars(sentence: string): { sentence: string; cars: TrainCar[]; introMy: string; noteMy: string } {
  // Hardcoded overrides for sentences the generic parser cannot split cleanly
  // (e.g. infinitive "to" inside the subject or predicate). Keys are normalized:
  // lowercased, blanks collapsed to "_", trailing punctuation removed.
  const override = SENTENCE_OVERRIDES[normalizeSentenceKey(sentence)];
  if (override) {
    return {
      sentence: sentence.trim(),
      cars: override.cars,
      introMy: override.introMy,
      noteMy: override.noteMy,
    };
  }

  const result = analyzeQuestion(sentence);
  const cars: TrainCar[] = result.tokens.map((t) => ({
    word: t.text,
    translation: translateChunkMy(t.text),
    tag: t.tag,
  }));
  return { sentence: result.sentence, cars, introMy: result.introMy, noteMy: result.noteMy };
}

function normalizeSentenceKey(s: string): string {
  return s
    .toLowerCase()
    .replace(/_+/g, "_")
    .replace(/\s+/g, " ")
    .replace(/[.?!]+$/, "")
    .trim();
}

type Override = { cars: TrainCar[]; introMy: string; noteMy: string };

const SENTENCE_OVERRIDES: Record<string, Override> = {
  "the first language skill to develop is _": {
    cars: [
      {
        word: "The first language skill to develop",
        translation: "ဘာသာစကားစွမ်းရည် တိုးတက်အောင် ပထမဆုံး လုပ်ဆောင်ရမည့်အရာမှာ",
        tag: "Noun Subject",
      },
      { word: "is", translation: "ဖြစ်သည်", tag: "Main Verb" },
      { word: "_______", translation: "_______", tag: "Complement" },
    ],
    introMy: "ဒါက Subject → Verb → Complement ပုံစံ ပြောကြားချက် ဝါကျပါ။",
    noteMy: "ပုံစံ: ကံတ္တား (Subject) → ကြိယာ (Verb \"is\") → ဖြည့်စွက်စာ (Complement) ။",
  },
  "a baby begins to speak at the age of _": {
    cars: [
      { word: "A baby", translation: "ကလေးငယ်တစ်ဦးသည်", tag: "Noun Subject" },
      { word: "begins", translation: "စတင်သည်", tag: "Main Verb" },
      {
        word: "to speak at the age of _______",
        translation: "_______ အသက်အရွယ်တွင် စကားပြောရန်",
        tag: "Noun Object",
      },
    ],
    introMy:
      "ဒါက Subject → Verb → Object ပုံစံ ပြောကြားချက် ဝါကျပါ။ \"begins to speak\" သည် ပေါင်းစပ်ကြိယာဖြစ်ပြီး \"begins\" သာ Main Verb ဖြစ်သည်။",
    noteMy:
      "ပုံစံ: ကံတ္တား (Subject) → ကြိယာ (Verb \"begins\") → ကံ (Object) ။ \"to\" ကို တစ်ခုတည်း Main Verb အဖြစ် မထုတ်ပါ။",
  },

  /* -------------------- Unit 2 (Literature) reading -------------------- */

  "a painter uses colours. a writer uses _": {
    cars: [
      { word: "A painter uses colours.", translation: "ပန်းချီဆရာတစ်ဦးသည် အရောင်များကို အသုံးပြုသည်။", tag: "Sentence" },
      { word: "A writer", translation: "စာရေးဆရာတစ်ဦးသည်", tag: "Noun Subject" },
      { word: "uses", translation: "အသုံးပြုသည်", tag: "Main Verb" },
      { word: "_______", translation: "_______", tag: "Noun Object" },
    ],
    introMy: "ဒါက ဝါကျနှစ်ခုပါတဲ့ ဖြည့်စွက်ရမယ့် စာကြောင်းပါ။ ပထမဝါကျက နမူနာဖြစ်ပြီး ဒုတိယဝါကျရဲ့ ကံ (Object) နေရာကို ဖြည့်ရမှာပါ။",
    noteMy: "ပုံစံ: ကံတ္တား (A writer) → ကြိယာ (uses) → ကံ (______) ။ ပထမဝါကျက \"painter ↔ writer\" နှိုင်းယှဉ်ချက်ကို ပြထားတာပါ။",
  },
  "the three subjects under literature are: _": {
    cars: [
      { word: "The three subjects under literature", translation: "စာပေ၏အောက်ရှိ အခန်းကဏ္ဍ သုံးခုမှာ", tag: "Noun Subject" },
      { word: "are", translation: "ဖြစ်ကြသည်", tag: "Linking Verb" },
      { word: "_______", translation: "_______", tag: "Complement" },
    ],
    introMy: "ဒါက be-ကြိယာသုံး ပြောကြားချက် ဝါကျပါ။ \"under literature\" သည် ဝိဘတ်စကားစုဖြစ်ပြီး ကံတ္တားထဲမှာ ပါဝင်နေပါတယ်။",
    noteMy: "ပုံစံ: ကံတ္တား (The three subjects under literature) → be-ကြိယာ (are) → ဖြည့်စွက်စာ (______) ။",
  },
  "the author or writer of pride and prejudice was _": {
    cars: [
      { word: "The author or writer of Pride and Prejudice", translation: "Pride and Prejudice ၏ စာရေးဆရာ (သို့မဟုတ်) ရေးသားသူမှာ", tag: "Noun Subject" },
      { word: "was", translation: "ဖြစ်ခဲ့သည်", tag: "Linking Verb" },
      { word: "_______", translation: "_______", tag: "Complement" },
    ],
    introMy: "ဒါက be-ကြိယာသုံး ပြောကြားချက် ဝါကျပါ။ \"of Pride and Prejudice\" သည် \"author\" ကို ဖော်ပြတဲ့ ဝိဘတ်စကားစုပါ။",
    noteMy: "ပုံစံ: ကံတ္တား → be-ကြိယာ (was) → ဖြည့်စွက်စာ (______) ။ \"Pride and Prejudice\" သည် ဝတ္ထုခေါင်းစဉ်ဖြစ်လို့ ဘာသာမပြန်ပါ။",
  },
  "for whom the bell tolls was written by _": {
    cars: [
      { word: "For Whom the Bell Tolls", translation: "For Whom the Bell Tolls (ဝတ္ထုခေါင်းစဉ်) သည်", tag: "Noun Subject" },
      { word: "was written", translation: "ရေးသားခံခဲ့ရသည် (passive)", tag: "Main Verb" },
      { word: "by _______", translation: "______ က", tag: "Prepositional Phrase" },
    ],
    introMy: "ဒါက passive voice (ကံပြုပုံစံ) ဝါကျပါ။ \"by ______\" က လုပ်ဆောင်သူ (agent) ကို ပြပါတယ်။",
    noteMy: "ပုံစံ: ကံ (ဝတ္ထုခေါင်းစဉ်) → passive ကြိယာ (was written) → by + လုပ်ဆောင်သူ ။",
  },
  "the three kinds of drama are: _": {
    cars: [
      { word: "The three kinds of drama", translation: "ပြဇာတ် အမျိုးအစား သုံးမျိုးမှာ", tag: "Noun Subject" },
      { word: "are", translation: "ဖြစ်ကြသည်", tag: "Linking Verb" },
      { word: "_______", translation: "_______", tag: "Complement" },
    ],
    introMy: "ဒါက be-ကြိယာသုံး ပြောကြားချက် ဝါကျပါ။ \"of drama\" သည် \"kinds\" ကို ဖော်ပြတဲ့ ဝိဘတ်စကားစုပါ။",
    noteMy: "ပုံစံ: ကံတ္တား (The three kinds of drama) → be-ကြိယာ (are) → ဖြည့်စွက်စာ (______) ။",
  },
  "a play that has a sad ending is a _": {
    cars: [
      { word: "A play that has a sad ending", translation: "ဝမ်းနည်းဖွယ် အဆုံးသတ်ရှိသော ပြဇာတ်တစ်ပုဒ်သည်", tag: "Noun Subject" },
      { word: "is", translation: "ဖြစ်သည်", tag: "Linking Verb" },
      { word: "a _______", translation: "______ တစ်မျိုး", tag: "Complement" },
    ],
    introMy: "\"that has a sad ending\" သည် \"play\" ကို ပြန်ဖော်ပြတဲ့ relative clause (ဆက်စပ်အခန်း) ဖြစ်ပြီး ကံတ္တားထဲမှာ ပါဝင်နေပါတယ်။",
    noteMy: "ပုံစံ: ကံတ္တား (A play + that has a sad ending) → be-ကြိယာ (is) → ဖြည့်စွက်စာ (a ______) ။",
  },
  "yatu., yagan, aye-gyin:, and baw-lai are different kinds of myanmar _": {
    cars: [
      { word: "Yatu., yagan, aye-gyin:, and baw-lai", translation: "ရတု၊ ရကန်၊ အေးချင်း နှင့် ဘောလယ် တို့သည်", tag: "Noun Subject" },
      { word: "are", translation: "ဖြစ်ကြသည်", tag: "Linking Verb" },
      { word: "different kinds of Myanmar _______", translation: "မြန်မာ ______ ၏ မတူညီသော အမျိုးအစားများ", tag: "Complement" },
    ],
    introMy: "\"Yatu, yagan, aye-gyin, baw-lai\" တို့သည် မြန်မာရိုးရာ ကဗျာအမျိုးအစားများ ဖြစ်ပြီး အဲဒါတွေအကုန်လုံးက ကံတ္တားပါ။",
    noteMy: "ပုံစံ: ကံတ္တား (ကဗျာအမည် လေးမျိုး) → be-ကြိယာ (are) → ဖြည့်စွက်စာ ။",
  },
  "who wrote wuthering heights": {
    cars: [
      { word: "Who", translation: "ဘယ်သူ", tag: "WH-Question Word" },
      { word: "wrote", translation: "ရေးသားခဲ့သနည်း", tag: "Main Verb" },
      { word: "Wuthering Heights", translation: "Wuthering Heights (ဝတ္ထုခေါင်းစဉ်) ကို", tag: "Noun Object" },
    ],
    introMy: "\"Who\" က ဒီမှာ ကံတ္တားအဖြစ် သုံးထားလို့ \"do/does/did\" လို အကူကြိယာ မလိုအပ်ပါဘူး။",
    noteMy: "ပုံစံ: Who (ကံတ္တား) → ကြိယာ (wrote) → ကံ (Wuthering Heights) ။",
  },
  "who wrote the play as you like it": {
    cars: [
      { word: "Who", translation: "ဘယ်သူ", tag: "WH-Question Word" },
      { word: "wrote", translation: "ရေးသားခဲ့သနည်း", tag: "Main Verb" },
      { word: "the play As You Like It", translation: "As You Like It ပြဇာတ်ကို", tag: "Noun Object" },
    ],
    introMy: "\"As You Like It\" သည် ပြဇာတ်ခေါင်းစဉ်ဖြစ်လို့ တစ်လုံးချင်း ဘာသာမပြန်ရပါ — တစ်ခုလုံးကို ခေါင်းစဉ်အဖြစ် ကိုင်တွယ်ပါ။",
    noteMy: "ပုံစံ: Who (ကံတ္တား) → ကြိယာ (wrote) → ကံ (the play As You Like It) ။",
  },
  "can a news article be regarded as literature? why": {
    cars: [
      { word: "Can", translation: "…နိုင်ပါသလား", tag: "Helping Verb" },
      { word: "a news article", translation: "သတင်းဆောင်းပါးတစ်ပုဒ်ကို", tag: "Noun Subject" },
      { word: "be regarded as literature", translation: "စာပေအဖြစ် သတ်မှတ်ခံရ", tag: "Predicate" },
      { word: "Why?", translation: "အဘယ်ကြောင့်နည်း", tag: "WH-Question Word" },
    ],
    introMy: "မေးခွန်းနှစ်ခု တွဲထားပါတယ် — ပထမတစ်ခုက passive ပုံစံ \"be regarded as\" သုံး ဟုတ်/မဟုတ် မေးခွန်း၊ ဒုတိယတစ်ခုက \"Why\" အကြောင်းရင်း မေးခွန်းပါ။",
    noteMy: "ပုံစံ: အကူကြိယာ (Can) → ကံတ္တား → ကြိယာပိုင်း (be regarded as …) + Why? ။ \"be regarded as\" = …အဖြစ် သတ်မှတ်ခံရသည်။",
  },
  "when can a piece of writing be recognized as literature": {
    cars: [
      { word: "When", translation: "ဘယ်အချိန်တွင်", tag: "WH-Question Word" },
      { word: "can", translation: "နိုင်", tag: "Helping Verb" },
      { word: "a piece of writing", translation: "အရေးအသားတစ်ခုကို", tag: "Noun Subject" },
      { word: "be recognized as literature", translation: "စာပေအဖြစ် အသိအမှတ်ပြုခံရ", tag: "Predicate" },
    ],
    introMy: "\"be recognized as\" သည် passive ကြိယာဖြစ်ပြီး \"…အဖြစ် အသိအမှတ်ပြုခံရသည်\" ဟု အဓိပ္ပာယ်ရပါတယ်။",
    noteMy: "ပုံစံ: WH-word (When) → အကူကြိယာ (can) → ကံတ္တား → passive ကြိယာပိုင်း (be recognized as …) ။",
  },
  "what is drama meant for": {
    cars: [
      { word: "What … for", translation: "ဘာအတွက် … လဲ", tag: "WH-Question Word" },
      { word: "is drama meant", translation: "ပြဇာတ်ကို ရည်ရွယ် ရေးသားခြင်း ဖြစ်သနည်း", tag: "Predicate" },
    ],
    introMy: "\"What is … meant for?\" ဆိုတာက \"… ကို ဘာအတွက် ရည်ရွယ်တာလဲ\" လို့ မေးတဲ့ ပုံစံပါ။ \"for\" က \"What\" နဲ့ တွဲလုပ်နေတာပါ။",
    noteMy: "ပုံစံ: What … for + be-ကြိယာ + ကံတ္တား + meant ။ \"be meant for\" = ရည်ရွယ်ထားခြင်း ဖြစ်သည်။",
  },
  "which do you like: comedy, tragedy or tragicomedy? explain why you like it": {
    cars: [
      { word: "Which", translation: "ဘယ်တစ်ခုကို", tag: "WH-Question Word" },
      { word: "do you like", translation: "သင်ှစ်သက်သနည်း", tag: "Main Verb" },
      { word: "comedy, tragedy or tragicomedy", translation: "ဟာသဇာတ်၊ ဝမ်းနည်းဖွယ်ဇာတ် သို့မဟုတ် နှစ်မျိုးရောနှောဇာတ်", tag: "Noun Object" },
      { word: "Explain why you like it", translation: "သင် နှစ်သက်ရသည့် အကြောင်းရင်းကို ရှင်းပြပါ", tag: "Sentence" },
    ],
    introMy: "ဝါကျနှစ်ခုပါဝင်ပါတယ် — ပထမတစ်ခုက ရွေးချယ်ခိုင်း မေးခွန်း (Which do you like …)၊ ဒုတိယတစ်ခုက ရှင်းပြခိုင်းတဲ့ command ဝါကျ (Explain …) ပါ။",
    noteMy: "ပုံစံ: Which → အကူကြိယာ (do) → ကံတ္တား (you) → ကြိယာ (like) → ရွေးစရာများ ။",
  },
  "do you wish to be a famous author? why or why not": {
    cars: [
      { word: "Do", translation: "…ပါသလား", tag: "Helping Verb" },
      { word: "you", translation: "သင်", tag: "Noun Subject" },
      { word: "wish to be a famous author", translation: "နာမည်ကျော် စာရေးဆရာတစ်ဦး ဖြစ်လိုသည်", tag: "Predicate" },
      { word: "Why or why not?", translation: "ဘာကြောင့် ဖြစ်လို (သို့မဟုတ်) မဖြစ်လိုသနည်း", tag: "WH-Question Word" },
    ],
    introMy: "ဟုတ်/မဟုတ် မေးခွန်း (Do you wish …) နဲ့ အကြောင်းရင်း မေးခွန်း (Why or why not?) တွဲထားပါတယ်။",
    noteMy: "ပုံစံ: အကူကြိယာ (Do) → ကံတ္တား (you) → ကြိယာပိုင်း (wish to be …) ။ \"wish to be\" = …ဖြစ်လိုသည်။",
  },

  /* -------------------- Unit 3 (Zero) grammar -------------------- */

  "myanmar, our country, is often called the land of golden pagodas": {
    cars: [
      { word: "Myanmar, our country,", translation: "မြန်မာ၊ ကျွန်ုပ်တို့၏နိုင်ငံသည်", tag: "Noun Subject" },
      { word: "is often called", translation: "မကြာခဏ ခေါ်ဆိုခံရသည် (passive)", tag: "Main Verb" },
      { word: "the Land of Golden Pagodas", translation: "ရွှေစေတီများ၏ ပြည်ဟု", tag: "Complement" },
    ],
    introMy: "\"is called\" သည် passive (ကံပြု) ကြိယာဖြစ်ပြီး \"our country\" သည် Myanmar ကို ပြန်ဖော်ပြတဲ့ appositive ဖြစ်ပါတယ် — ကံတ္တားထဲမှာ ပါဝင်နေပါတယ်။",
    noteMy: "ပုံစံ: ကံတ္တား (Myanmar, our country) → passive ကြိယာ (is called) → ဖြည့်စွက်စာ ။",
  },
  "the english alphabet contains twenty-six letters": {
    cars: [
      { word: "The English alphabet", translation: "အင်္ဂလိပ် အက္ခရာစနစ်တွင်", tag: "Noun Subject" },
      { word: "contains", translation: "ပါဝင်သည်", tag: "Main Verb" },
      { word: "twenty-six letters", translation: "အက္ခရာ နှစ်ဆယ့်ခြောက်လုံး", tag: "Noun Object" },
    ],
    introMy: "ရိုးရှင်းတဲ့ Subject → Verb → Object ပုံစံ ပြောကြားချက် ဝါကျပါ။",
    noteMy: "ပုံစံ: ကံတ္တား (The English alphabet) → ကြိယာ (contains) → ကံ (twenty-six letters) ။",
  },
  "most trees in our country shed their leaves in the hot season": {
    cars: [
      { word: "Most trees in our country", translation: "ကျွန်ုပ်တို့နိုင်ငံရှိ သစ်ပင်အများစုသည်", tag: "Noun Subject" },
      { word: "shed", translation: "ကြွေကျစေသည်", tag: "Main Verb" },
      { word: "their leaves in the hot season", translation: "နွေရာသီတွင် ၎င်းတို့၏ အရွက်များကို", tag: "Noun Object" },
    ],
    introMy: "\"in our country\" သည် \"trees\" ကို ဖော်ပြတဲ့ ဝိဘတ်စကားစုဖြစ်ပြီး ကံတ္တားထဲမှာ ပါဝင်နေပါတယ်။",
    noteMy: "ပုံစံ: ကံတ္တား (Most trees in our country) → ကြိယာ (shed) → ကံ (their leaves) ။",
  },
  "many diseases these days are caused by different kinds of viruses": {
    cars: [
      { word: "Many diseases these days", translation: "ယနေ့ခေတ် ရောဂါများစွာသည်", tag: "Noun Subject" },
      { word: "are caused", translation: "ဖြစ်ပွားစေခြင်း ခံရသည် (passive)", tag: "Main Verb" },
      { word: "by different kinds of viruses", translation: "မတူညီသော ဗိုင်းရပ်စ် အမျိုးအစားများကြောင့်", tag: "Prepositional Phrase" },
    ],
    introMy: "\"are caused\" သည် passive ကြိယာဖြစ်ပြီး \"by …\" က ဖြစ်စေသူ (agent) ကို ပြပါတယ်။",
    noteMy: "ပုံစံ: ကံတ္တား → passive ကြိယာ (are caused) → by + ဖြစ်စေသူ ။",
  },
  "all those paintings in that gallery are done by famous myanmar artists": {
    cars: [
      { word: "All those paintings in that gallery", translation: "ထိုပြခန်းရှိ ပန်းချီကား အားလုံးကို", tag: "Noun Subject" },
      { word: "are done", translation: "ရေးဆွဲခြင်း ခံရသည် (passive)", tag: "Main Verb" },
      { word: "by famous Myanmar artists", translation: "နာမည်ကျော် မြန်မာ ပန်းချီဆရာများက", tag: "Prepositional Phrase" },
    ],
    introMy: "\"in that gallery\" သည် \"paintings\" ကို ဖော်ပြတဲ့ ဝိဘတ်စကားစုဖြစ်ပြီး ကံတ္တားထဲမှာ ပါဝင်နေပါတယ်။",
    noteMy: "ပုံစံ: ကံတ္တား (All those paintings in that gallery) → passive ကြိယာ (are done) → by + လုပ်ဆောင်သူ ။",
  },
  "pollution is causing lasting damage to our environment": {
    cars: [
      { word: "Pollution", translation: "ညစ်ညမ်းမှုသည်", tag: "Noun Subject" },
      { word: "is causing", translation: "ဖြစ်စေလျက်ရှိသည် (present continuous)", tag: "Main Verb" },
      { word: "lasting damage to our environment", translation: "ကျွန်ုပ်တို့ ပတ်ဝန်းကျင်ကို ရေရှည် ထိခိုက်ပျက်စီးမှု", tag: "Noun Object" },
    ],
    introMy: "\"is causing\" သည် present continuous ကြိယာဖြစ်ပြီး အခုလည်း ဖြစ်နေဆဲ ဖြစ်စေမှုကို ပြပါတယ်။",
    noteMy: "ပုံစံ: ကံတ္တား (Pollution) → ကြိယာ (is causing) → ကံ (lasting damage …) ။",
  },
  "little drops of water and little grains of sand make a mighty ocean and a pleasant land": {
    cars: [
      { word: "Little drops of water and little grains of sand", translation: "ရေစက်ငယ်လေးများနှင့် သဲမှုန်ငယ်လေးများသည်", tag: "Noun Subject" },
      { word: "make", translation: "ဖြစ်ပေါ်စေသည်", tag: "Main Verb" },
      { word: "a mighty ocean and a pleasant land", translation: "ကျယ်ပြန့်သော သမုဒ္ဒရာနှင့် သာယာသော မြေကို", tag: "Noun Object" },
    ],
    introMy: "ကံတ္တားက နာမ်နှစ်ခု \"and\" ဖြင့် ဆက်ထားတဲ့ compound subject ဖြစ်ပြီး ကံ (Object) မှာလည်း \"and\" ဖြင့် ဆက်ထားပါတယ်။",
    noteMy: "ပုံစံ: ကံတ္တား (ရေစက်ငယ်များ + သဲမှုန်များ) → ကြိယာ (make) → ကံ (ocean + land) ။",
  },
  "almost all the plays written by shakespeare are well known": {
    cars: [
      { word: "Almost all the plays written by Shakespeare", translation: "ရှိတ်စပီးယား ရေးသားခဲ့သော ပြဇာတ် နီးပါးအားလုံးသည်", tag: "Noun Subject" },
      { word: "are", translation: "ဖြစ်ကြသည်", tag: "Linking Verb" },
      { word: "well known", translation: "လူသိများ", tag: "Complement" },
    ],
    introMy: "\"written by Shakespeare\" သည် \"plays\" ကို ပြန်ဖော်ပြတဲ့ reduced relative clause ဖြစ်ပြီး ကံတ္တားထဲမှာ ပါဝင်နေပါတယ်။",
    noteMy: "ပုံစံ: ကံတ္တား (plays + written by Shakespeare) → be-ကြိယာ (are) → ဖြည့်စွက်စာ (well known) ။",
  },
  "according to one english pop song, the best things in life are free": {
    cars: [
      { word: "According to one English pop song,", translation: "အင်္ဂလိပ် ပေါ့ပ် သီချင်းတစ်ပုဒ်အရ", tag: "Prepositional Phrase" },
      { word: "the best things in life", translation: "ဘဝတွင် အကောင်းဆုံး အရာများသည်", tag: "Noun Subject" },
      { word: "are", translation: "ဖြစ်ကြသည်", tag: "Linking Verb" },
      { word: "free", translation: "အခမဲ့", tag: "Complement" },
    ],
    introMy: "\"According to …\" သည် ဝါကျအစမှာ လာတဲ့ ဝိဘတ်စကားစုဖြစ်ပြီး ကံတ္တား မဟုတ်ပါ — ကံတ္တားက \"the best things in life\" ပါ။",
    noteMy: "ပုံစံ: ဝိဘတ်စကားစု (According to …) → ကံတ္တား → be-ကြိယာ (are) → ဖြည့်စွက်စာ (free) ။",
  },
  "the injured person could not walk. he could not move": {
    cars: [
      { word: "The injured person", translation: "ဒဏ်ရာရသူသည်", tag: "Noun Subject" },
      { word: "could not walk", translation: "လမ်းလည်း မလျှောက်နိုင်ပါ", tag: "Predicate" },
      { word: "He could not move", translation: "သူ လှုပ်ရှားလည်း မလှုပ်ရှားနိုင်ပါ", tag: "Sentence" },
    ],
    introMy: "အငြင်းဝါကျ နှစ်ခုပါဝင်ပါတယ်။ \"neither … nor\" ဖြင့် ပေါင်းလျှင် \"The injured person could neither walk nor move.\" ဖြစ်သွားပါမယ်။",
    noteMy: "ပုံစံ: ကံတ္တား + could neither + ကြိယာ၁ (walk) + nor + ကြိယာ၂ (move) ။ \"neither\" နဲ့ \"not\" ကို တွဲမသုံးပါနဲ့။",
  },
  "our relatives do not know that we are buying a new house. our friends do not know that we are buying a new house": {
    cars: [
      { word: "Our relatives", translation: "ကျွန်ုပ်တို့၏ ဆွေမျိုးများလည်း", tag: "Noun Subject" },
      { word: "do not know that we are buying a new house", translation: "အိမ်သစ်ဝယ်နေကြောင်း မသိကြပါ", tag: "Predicate" },
      { word: "Our friends do not know that we are buying a new house", translation: "သူငယ်ချင်းများလည်း မသိကြပါ", tag: "Sentence" },
    ],
    introMy: "ကံတ္တားနှစ်ခု (relatives, friends) သည် လုပ်ဆောင်ချက် တူညီနေပါတယ်။ \"neither … nor\" ဖြင့် ပေါင်းလျှင် \"Neither our relatives nor our friends know that we are buying a new house.\" ဖြစ်ပါမယ်။",
    noteMy: "ပုံစံ: Neither + ကံတ္တား၁ + nor + ကံတ္တား၂ + ကြိယာ (အပြုသဘော) ။ ပေါင်းလျှင် \"do not\" မလိုတော့ပါ။",
  },
  "you can ring me up. you can send me an e-mail": {
    cars: [
      { word: "You", translation: "သင်", tag: "Noun Subject" },
      { word: "can ring me up", translation: "ကျွန်ုပ်ကို ဖုန်းဆက်ခေါ်၍ ရသည်", tag: "Predicate" },
      { word: "You can send me an e-mail", translation: "ကျွန်ုပ်ကို အီးမေးလ် ပို့၍လည်း ရသည်", tag: "Sentence" },
    ],
    introMy: "ရွေးချယ်စရာ နှစ်ခုပါဝင်ပါတယ်။ \"either … or\" ဖြင့် ပေါင်းလျှင် \"You can either ring me up or send me an e-mail.\" ဖြစ်ပါမယ်။",
    noteMy: "ပုံစံ: ကံတ္တား + can either + ကြိယာ၁ (ring me up) + or + ကြိယာ၂ (send me an e-mail) ။",
  },
  "according to the weather forecast, it may be cloudy today. it may be rainy today": {
    cars: [
      { word: "According to the weather forecast,", translation: "မိုးလေဝသ ခန့်မှန်းချက်အရ", tag: "Prepositional Phrase" },
      { word: "it may be cloudy today", translation: "ယနေ့ မိုးအုံ့နိုင်သည်", tag: "Sentence" },
      { word: "It may be rainy today", translation: "ယနေ့ မိုးရွာနိုင်သည်", tag: "Sentence" },
    ],
    introMy: "ဖြစ်နိုင်ခြေ နှစ်ခုပါဝင်ပါတယ်။ \"either … or\" ဖြင့် ပေါင်းလျှင် \"… it may be either cloudy or rainy today.\" ဖြစ်ပါမယ်။",
    noteMy: "ပုံစံ: may be either + နာမဝိသေသန၁ (cloudy) + or + နာမဝိသေသန၂ (rainy) ။",
  },
  "love cannot be bought. love cannot be sold": {
    cars: [
      { word: "Love", translation: "အချစ်ကို", tag: "Noun Subject" },
      { word: "cannot be bought", translation: "ဝယ်၍ မရပါ (passive)", tag: "Predicate" },
      { word: "Love cannot be sold", translation: "ရောင်း၍လည်း မရပါ", tag: "Sentence" },
    ],
    introMy: "passive အငြင်းဝါကျ နှစ်ခုပါဝင်ပါတယ်။ \"neither … nor\" ဖြင့် ပေါင်းလျှင် \"Love can neither be bought nor sold.\" ဖြစ်ပါမယ်။",
    noteMy: "ပုံစံ: ကံတ္တား + can neither + be + past participle၁ (bought) + nor + past participle၂ (sold) ။",
  },
  "the restaurant doesn't have fish on its menu. it doesn't have lobster on its menu": {
    cars: [
      { word: "The restaurant", translation: "ထိုစားသောက်ဆိုင်၏ မီနူးတွင်", tag: "Noun Subject" },
      { word: "doesn't have fish on its menu", translation: "ငါးလည်း မပါဝင်ပါ", tag: "Predicate" },
      { word: "It doesn't have lobster on its menu", translation: "ကျောက်ပုဇွန်လည်း မပါဝင်ပါ", tag: "Sentence" },
    ],
    introMy: "မပါဝင်တဲ့ အရာ နှစ်ခုပါဝင်ပါတယ်။ \"neither … nor\" ဖြင့် ပေါင်းလျှင် \"The restaurant has neither fish nor lobster on its menu.\" ဖြစ်ပါမယ်။",
    noteMy: "ပုံစံ: ကံတ္တား + has neither + နာမ်၁ (fish) + nor + နာမ်၂ (lobster) ။ ပေါင်းလျှင် \"doesn't\" မလိုတော့ပါ။",
  },
  "i want to talk to your parents. i want to talk to your guardian": {
    cars: [
      { word: "I", translation: "ကျွန်ုပ်", tag: "Noun Subject" },
      { word: "want to talk to your parents", translation: "သင့် မိဘများနှင့် စကားပြောလိုသည်", tag: "Predicate" },
      { word: "I want to talk to your guardian", translation: "သင့် အုပ်ထိန်းသူနှင့်လည်း စကားပြောလိုသည်", tag: "Sentence" },
    ],
    introMy: "ရွေးချယ်စရာ လူနှစ်ဦးပါဝင်ပါတယ်။ \"either … or\" ဖြင့် ပေါင်းလျှင် \"I want to talk to either your parents or your guardian.\" ဖြစ်ပါမယ်။",
    noteMy: "ပုံစံ: ကြိယာ + either + ကံ၁ (your parents) + or + ကံ၂ (your guardian) ။",
  },
  "we don't have banana juice. we don't have apple juice": {
    cars: [
      { word: "We", translation: "ကျွန်ုပ်တို့၌", tag: "Noun Subject" },
      { word: "don't have banana juice", translation: "ငှက်ပျောသီးဖျော်ရည်လည်း မရှိပါ", tag: "Predicate" },
      { word: "We don't have apple juice", translation: "ပန်းသီးဖျော်ရည်လည်း မရှိပါ", tag: "Sentence" },
    ],
    introMy: "မရှိတဲ့ အရာ နှစ်ခုပါဝင်ပါတယ်။ \"neither … nor\" ဖြင့် ပေါင်းလျှင် \"We have neither banana juice nor apple juice.\" ဖြစ်ပါမယ်။",
    noteMy: "ပုံစံ: ကံတ္တား + have neither + နာမ်၁ (banana juice) + nor + နာမ်၂ (apple juice) ။",
  },
  "i'll have my hair cut today. i'll have my hair cut tomorrow": {
    cars: [
      { word: "I", translation: "ကျွန်ုပ်", tag: "Noun Subject" },
      { word: "'ll have my hair cut today", translation: "ယနေ့ ဆံပင် ညှပ်မည်", tag: "Predicate" },
      { word: "I'll have my hair cut tomorrow", translation: "မနက်ဖြန်လည်း ဆံပင် ညှပ်မည်", tag: "Sentence" },
    ],
    introMy: "အချိန် ရွေးချယ်စရာ နှစ်ခုပါဝင်ပါတယ်။ \"either … or\" ဖြင့် ပေါင်းလျှင် \"I'll have my hair cut either today or tomorrow.\" ဖြစ်ပါမယ်။",
    noteMy: "ပုံစံ: ကြိယာပိုင်း + either + အချိန်၁ (today) + or + အချိန်၂ (tomorrow) ။ \"have my hair cut\" = ဆံပင်ညှပ်ခိုင်းသည်။",
  },
  "the boy didn't bring any book to the class. he didn't do his homework": {
    cars: [
      { word: "The boy", translation: "ထိုကောင်လေးသည်", tag: "Noun Subject" },
      { word: "didn't bring any book to the class", translation: "စာတန်းသို့ စာအုပ်လည်း မယူလာခဲ့ပါ", tag: "Predicate" },
      { word: "He didn't do his homework", translation: "အိမ်စာလည်း မလုပ်ခဲ့ပါ", tag: "Sentence" },
    ],
    introMy: "မလုပ်ခဲ့တဲ့ အရာ နှစ်ခုပါဝင်ပါတယ်။ \"neither … nor\" ဖြင့် ပေါင်းလျှင် \"The boy neither brought any book to the class nor did his homework.\" ဖြစ်ပါမယ်။",
    noteMy: "ပုံစံ: ကံတ္တား + neither + ကြိယာ၁ (brought …) + nor + ကြိယာ၂ (did his homework) ။ ပေါင်းလျှင် \"didn't\" မလိုတော့ပါ။",
  },
};

export const TAG_INFO: Record<string, { titleMy: string; bodyMy: string; example?: string }> = {
  "WH-Question Word": {
    titleMy: "WH-မေးခွန်းစကားလုံး (WH-Question Word)",
    bodyMy: "မေးခွန်းရဲ့ အစမှာ သုံးတဲ့ စကားလုံးပါ — what, when, where, why, who, how စသည်။ ဘာအကြောင်း မေးနေတယ်ဆိုတာကို ဖော်ပြပါတယ်။",
    example: "What is your name?",
  },
  "WH-Word": {
    titleMy: "WH-စကားလုံး (WH-Word)",
    bodyMy: "မေးခွန်းရဲ့ အစမှာ သုံးတဲ့ စကားလုံးပါ — what, when, where, why, who, how စသည်။",
    example: "Where do you live?",
  },
  "Helping Verb": {
    titleMy: "အကူကြိယာ (Helping / Auxiliary Verb)",
    bodyMy: "မူရင်းကြိယာကို ကူညီပေးတဲ့ ကြိယာ — do, does, did, have, has, had, will, can စသည်။ မေးခွန်းပြုလုပ်ရာ၊ အငြင်းပြုလုပ်ရာမှာ သုံးတယ်။",
    example: "Do you like tea?",
  },
  "Linking Verb": {
    titleMy: "ဆက်စပ်ကြိယာ (Linking / Be Verb)",
    bodyMy: "ကံတ္တားနဲ့ ဖြည့်စွက်စာကို ဆက်စပ်ပေးတဲ့ ကြိယာ — is, am, are, was, were။",
    example: "She is a doctor.",
  },
  "Adjective Phrase": {
    titleMy: "နာမဝိသေသန စကားစု (Adjective Phrase)",
    bodyMy: "နာမ်ကို ဖော်ပြတဲ့ စကားစု — အညွှန်း (a/an/the) + နာမဝိသေသန တစ်လုံး သို့မဟုတ် နှစ်လုံး။",
    example: "the productive (skills)",
  },
  "Adjective": {
    titleMy: "နာမဝိသေသန (Adjective)",
    bodyMy: "နာမ်ကို ဖော်ပြတဲ့ စကားလုံး — big, small, productive, beautiful စသည်။",
  },
  "Article": {
    titleMy: "အညွှန်း (Article)",
    bodyMy: "နာမ်ရှေ့မှာ သုံးတဲ့ စကားလုံး — a, an, the။",
    example: "the book, a pen",
  },
  "Noun Subject": {
    titleMy: "ကံတ္တား (Noun Subject)",
    bodyMy: "ဝါကျရဲ့ အဓိက ပုဂ္ဂိုလ်/အရာ — ဘယ်သူ ဒါမှမဟုတ် ဘာအကြောင်းပြောနေတယ် ဆိုတာကို ဖော်ပြတယ်။",
    example: "The students study English.",
  },
  "Main Verb": {
    titleMy: "မူရင်းကြိယာ (Main Verb)",
    bodyMy: "ဝါကျရဲ့ အဓိက လုပ်ဆောင်ချက်ကို ပြောတဲ့ ကြိယာ — run, eat, study, read စသည်။",
    example: "They play football.",
  },
  "Noun Object": {
    titleMy: "ကံ (Noun Object)",
    bodyMy: "ကြိယာရဲ့ လုပ်ဆောင်ချက်ကို ခံရတဲ့ နာမ်/နာမ်စား — ဘာကို၊ ဘယ်သူ့ကို ဆိုတဲ့အပိုင်း။",
    example: "She reads a book.",
  },
  "Prepositional Phrase": {
    titleMy: "ဝိဘတ်စကားစု (Prepositional Phrase)",
    bodyMy: "of, in, on, at, with, from, by စတဲ့ ဝိဘတ်နဲ့ စတဲ့ စကားစု — ဆက်နွယ်မှု၊ နေရာ၊ အချိန် ပြောတယ်။",
    example: "of language, in the morning, on the table",
  },
  "Predicate": {
    titleMy: "ကြိယာပိုင်း (Predicate)",
    bodyMy: "ကံတ္တားအကြောင်း ပြောတဲ့ ဝါကျ၏ ကျန်အပိုင်း — ကြိယာနဲ့ ကံ/ဖြည့်စွက်စာ ပေါင်းထားတယ်။",
    example: "The boy [is running fast].",
  },
  "Complement": {
    titleMy: "ဖြည့်စွက်စာ (Complement)",
    bodyMy: "be-ကြိယာ (is/am/are/was/were) နောက်မှာ လာတဲ့ အပိုင်း — ကံတ္တားကို ပြန်ဖော်ပြ၊ ဖြည့်စွက်ပေးတယ်။ ('Object' မဟုတ်ပါ)",
    example: "She is a teacher. → 'a teacher' က Complement။",
  },
  "Adverb Clause": {
    titleMy: "ကြိယာဝိသေသန အခန်း (Adverb Clause)",
    bodyMy: "ကြိယာကို ဖြည့်စွက်ဖော်ပြတဲ့ အခန်း — when / where / because / if စတဲ့ စကားလုံးနဲ့ စတယ်။ 'ဘယ်အချိန်၊ ဘယ်နေရာ၊ ဘယ်လိုအခြေအနေမှာ' လုပ်ဆောင်ခဲ့လဲ ဆိုတာ ပြောပါတယ်။",
    example: "We use gestures when we speak.",
  },
  "Purpose Clause": {
    titleMy: "ရည်ရွယ်ချက် အခန်း (Purpose Clause)",
    bodyMy: "'to + verb' နဲ့ စတဲ့ အခန်း — 'ဘာအတွက် / ဘာရည်ရွယ်ချက်နဲ့' လုပ်တာလဲ ဆိုတာ ဖော်ပြပါတယ်။",
    example: "We use graphics to help the reader understand better.",
  },
  "Sentence": {
    titleMy: "ဝါကျ (Sentence)",
    bodyMy: "အပြည့်အစုံ အဓိပ္ပာယ်ရှိတဲ့ စကားစု — ကံတ္တား + ကြိယာ ပါဝင်တယ်။",
  },
};
