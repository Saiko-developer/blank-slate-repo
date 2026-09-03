// Supplementary Burmese translations, vocabulary, and grammar explanations
// for Unit 11 sections 11A / 11B / 11C, keyed by exercise number — mirroring
// `unit9Supplement.ts` and the earlier unit supplements. No other unit's data
// is touched by this module.

export type VocabItem = {
  word: string;
  pronunciation: string; // simple phonetic guide
  meaningMy: string;
  exampleEn?: string;
};

export type GrammarNote = {
  whatMy: string;
  whenMy: string;
  whyMy: string;
  examples: { en: string; phrase: string }[];
};

export type UnitSupplement = {
  partAReadingTranslations: Record<number, string>;
  partBReadingTranslations: Record<number, string>;
  partCReadingTranslations: Record<number, string>;
  vocab: VocabItem[];
  partCGrammarTranslations: Record<number, string>;
  partBGrammarTranslations: Record<number, string>;
  grammar: GrammarNote;
};

/* ----------------------------- 11A Reading ----------------------------- */

export const partA11A_translations: Record<number, string> = {
  1: "စာပိုဒ် ၁ — မြန်မာနိုင်ငံ၏ မယှဉ်နိုင်သော အလှအပပစ္စည်း",
  2: "စာပိုဒ် ၂ — သနပ်ခါးကို မည်သို့ အသုံးပြုသနည်း",
  3: "စာပိုဒ် ၃ — သနပ်ခါးဆိုသည်မှာ အဘယ်နည်း",
  4: "စာပိုဒ် ၄ — သနပ်ခါး၏ ပုံစံအမျိုးမျိုး",
  5: "စာပိုဒ် ၅ — သနပ်ခါး၏ အနာဂတ်",
};

export const partB11A_translations: Record<number, string> = {
  1: "စာပိုဒ် ၁ ရှိ booming — a. ပြောင်းလဲခြင်း; b. ကြီးထွားလာခြင်း; c. အောင်မြင်မှု",
  2: "စာပိုဒ် ၁ ရှိ unique — a. အလွန်ရှားပါးသော; b. အလွန်ထူးခြားသော; c. အလွန်အဖိုးတန်သော",
  3: "စာပိုဒ် ၂ ရှိ smears — a. ဖုံးအုပ်သည်; b. ထားသည်; c. လိမ်းကျံသည်",
  4: "စာပိုဒ် ၂ ရှိ cherished — a. တန်ဖိုးထားသော; b. ဂုဏ်ပြုသော; c. လေးစားသော",
  5: "စာပိုဒ် ၃ ရှိ bewildered — a. ရှုပ်ထွေးသော; b. ဝမ်းသာသော; c. လန့်သွားသော",
};

export const partC11A_translations: Record<number, string> = {
  1: "ယနေ့ခေတ်တွင် အလှအပပစ္စည်းများ ရွေးချယ်နိုင်စွမ်း အရင်ကထက် ပိုများလာရခြင်း အကြောင်းရင်း အဘယ်နည်း။",
  2: "အခြားနိုင်ငံများနှင့် မြန်မာနိုင်ငံတွင် သနပ်ခါးကို အဓိက မည်သို့ အသုံးပြုကြသနည်း။",
  3: "အလှအပကို ဂရုစိုက်သော မိန်းကလေးပျိုများ မည်သည့်ရည်ရွယ်ချက်ဖြင့် သနပ်ခါးကို မျက်နှာတွင် လိမ်းကျံကြသနည်း။",
  4: "ယောက်ျားလေးများ၏ မျက်နှာပေါ်တွင်က်မည်မျှရောက်မှ ဝက်ခြံများ ပေါ်ပေါက်လာသနည်း။",
  5: "နေလင်းက ကပ်နေရင်းတွင် မောပန်းရင်းလုပ်ရသူများကို နေလောင်ခြင်းမှ အဘယ်အရာက ကာကွယ်ပေးသနည်း။",
  6: "ဆေးကျွေးကျွမ်းကျင်သူများအတွက် သနပ်ခါးပင်၏ အမြစ်များ အဘယ်ကြောင့် အဖိုးတန်သနည်း။",
  7: "သနပ်ခါးကို မည်သည့်ပုံစံများဖြင့် ရနိုင်သနည်း။",
  8: "မြန်မာမိန်းကလေးများစွာက အဘယ်ကြောင့် သနပ်ခါးကို ဆက်လက် မှီခိုနေကြဆဲနည်း။",
  9: "မိမိသည် သနပ်ခါး လိမ်းကျံခြင်းကို နှစ်သက်ပါသလား။ အဘယ်ကြောင့် နှစ်သက်/ှစ်သက်သနည်း။",
  10: "အနာဂတ်တွင် သနပ်ခါးကို အလှကပ်အဖြစ် အသုံးပြုခြင်းက ပိုလူကြိုက်များလာမည်ဟု ထင်ပါသလား၊ သို့မဟုတ် လျော့နည်းလာမည်ဟု ထင်ပါသလား။ အဘယ်ကြောင့်နည်း။",
};

/* ---------------------------- 11B Vocabulary --------------------------- */

export const vocab11B: VocabItem[] = [
  {
    word: "booming",
    pronunciation: "/ˈbuːmɪŋ/ — ဘူးမင်း",
    meaningMy: "စည်ကားမြန်ဆန်နေသော / ကြီးထွားတိုးပွားလာနေသော",
    exampleEn: "With the booming of the beauty industry, there are more choices for beauty products.",
  },
  {
    word: "unique",
    pronunciation: "/juːˈniːk/ — ယူနစ်(ခ်)",
    meaningMy: "ထူးခြားသော / တစ်မူထူးသော",
    exampleEn: "Thanakha is a unique beauty product of Myanmar.",
  },
  {
    word: "inseparable",
    pronunciation: "/ɪnˈseprəbl/ — အင်ဆက်ပါရဘယ်",
    meaningMy: "ခွဲမရသော / ခွဲခြား၍မရသော",
    exampleEn: "It is inseparable from the daily life of most women in Myanmar.",
  },
  {
    word: "medicinal",
    pronunciation: "/məˈdɪsɪnl/ — မဒစ်ဆင်နယ်",
    meaningMy: "ဆေးဝါးနှင့် ဆိုင်သော / ရောဂါကုသရန် အသုံးပြုသော",
    exampleEn: "In other countries, it is used mostly for medicinal purposes.",
  },
  {
    word: "cosmetic",
    pronunciation: "/kɒzˈmetɪk/ — ကော့စ်မက်တစ်(ခ်)",
    meaningMy: "အလှကပ် / အလှအပဆိုင်ရာ ပစ္စည်း",
    exampleEn: "Only in Myanmar is it used mainly as a cosmetic.",
  },
  {
    word: "smear",
    pronunciation: "/smɪə/ — စမီးယား",
    meaningMy: "လိမ်းကျံသည် / သုတ်လိမ်းသည်",
    exampleEn: "To Myanmar children, it means just a paste their mothers smear on their faces and bodies after a bath.",
  },
  {
    word: "pimples and acne",
    pronunciation: "/ˈpɪmplz ənd ˈækni/ — ပင်ပယ်ဇ် အန် အက်နီ",
    meaningMy: "ဝက်ခြံများနှင့် မျက်နှာအဖုများ",
    exampleEn: "A thin layer of thanakha somewhat covers pimples and acne on their faces.",
  },
  {
    word: "sun block",
    pronunciation: "/sʌn blɒk/ — ဆန် ဘလော့(ခ်)",
    meaningMy: "နေလောင်မှုကို ကာကွယ်သော ပစ္စည်း",
    exampleEn: "A thick layer of thanakha definitely serves as a sun block.",
  },
  {
    word: "cherished",
    pronunciation: "/ˈtʃerɪʃt/ — ချဲရစ်ရှ်ထ်",
    meaningMy: "တန်ဖိုးထားသော / ချစ်မြတ်နိုးသော",
    exampleEn: "A sizable piece of thanakha serves as a cherished gift for his beloved.",
  },
  {
    word: "bewildered",
    pronunciation: "/bɪˈwɪldəd/ — ဘီဝီးလ်ဒဒ်",
    meaningMy: "ရှုပ်ထွေးသော / အံ့သြမောသော",
    exampleEn: "She is likely to be bewildered to see most local women with yellowish patches on their faces.",
  },
  {
    word: "kyauk pyin",
    pronunciation: "/tʃaʊʔ pjɪ̀ɴ/ — ကျောက်ပျဉ်",
    meaningMy: "သနပ်ခါး သွေးဖိကရန် အသုံးပြုသော ကျောက်ပြားပြား",
    exampleEn: "The paste is obtained by grinding the bark with a bit of water on a kyauk pyin.",
  },
  {
    word: "cultural heritage",
    pronunciation: "/ˈkʌltʃərəl ˈherɪtɪdʒ/ — ကယ်လ်ချာရယ် ဟဲရစ်တေ့ဂျ်",
    meaningMy: "ယဉ်ကျေးမှု အမွနှစ်",
    exampleEn: "This will surely help the world to recognize thanakha as a Myanmar cultural heritage.",
  },
];

/* ------------------------------ 11C Grammar ---------------------------- */

export const partA11C_translations: Record<number, string> = {
  1: "ကျွန်ုပ်တို့ ပြီးခဲ့သည့်နှစ် တိုကျိုတွင် တွေ့ဖူးသော မိန်းကလေးက ကျွန်ုပ်ထံ ပို့စ်ကတ် တစ်စောင် ပေးပို့သည်။ (whom)",
  2: "ဒေါ်နီလာသည် ကျွန်ုပ် Grade 3 တွင် အင်္ဂလိပ်စာ သင်ပေးခဲ့သော ဆရာမ ဖြစ်သည်။",
  3: "သူမသည် ကျွန်ုပ်တန်း၌ လက်ရေးအလှဆုံး ဖြစ်သော ကျောင်းသူ ဖြစ်သည်။",
  4: "သူမသည် အာရုံစူးစိုက်မှု၏ ဗဟိုဖြစ်လိုသော လူများထဲမှ တစ်ဦး ဖြစ်သည်။",
  5: "ဒေါ်နုသည် မိမိ၏ တာဝန်များကို အလေးထားလုပ်ဆောင်သူ ဖြစ်သည်။",
  6: "ရဲတပ်ဖွဲ့က မနေ့ညက အကြီးအကဲများ ဖမ်းဆီးခံရသော ကုမ္ပဏီကို စုံစမ်းစစ်ဆေးနေသည်။",
  7: "ကျွန်ုပ် ပန်းစည်းများ ပို့ပေးခဲ့သောမီးကို သင် သိပါသလား။",
  8: "ထိုကျောင်းကို ရောဂါကြောင့် ပညာရေး ချောင့်ချိုက်ခဲ့ရသော ကလေးများအတွက် အထူးထူးတည်ထောင်ထားသည်။",
  9: "ရထားပေါ်တွင် ကျွန်ုပ်တို့ တွေ့ခဲ့သော ပုဂ္ဂိုလ်က အလွန်အကူညီပေးပါသည်။",
  10: "မေးမြန်းရန် ရှက်သူသည် သင်ယူရန် ရှက်သင့်သည်။",
};

export const partB11C_translations: Record<number, string> = {
  1: "ကျွန်ုပ်၏ အိမ်ရှေ့တွင် မော်တော်ကား ပျက်စီးသွားသော မိန်းကလေးကို ကျွန်ုပ် ကူညီခဲ့သည်။",
  2: "ကျွန်ုပ်၏ ညီမမင်္ဂလာဆောင်သို့ လာသော ဝေးလံသော ဆွေမျိုးများကို ကျွန်ုပ် ခပ်ခွာခွာ လိုက်လံ သိမြင်မိခဲ့သည်။",
  3: "ကျွန်ုပ်တို့ကျောင်းသို့ လတ်တလော ပြောင်းရွေ့လာသော ညီညီသည် ဘောလုံး ကစားရာတွင် အလွန်ကျွမ်းကျင်သည်။",
  4: "လမ်းထဲတွင် ကစားနေသော ကလေးများသည် ကျွန်ုပ်တို့ကျောင်းမှ မဟုတ်ပါ။",
  5: "ကျွန်ုပ်တို့နှင့် အိမ်နီးနားချင်း နေထိုင်သော လူများက အလွန်ရင်းနှီးကြသည်။",
  6: "သကြီးရွယ်အိုများရုံသည် မိမိတို့ကို ပြုစုစောင့်ရှောက်စရာ မည်သူမျှ မရှိသော အသက်ကြီးရွယ်အိုများအတွက် ဖြစ်သည်။",
  7: "သူ၏အယ်လ်ဘမ်များကို ကျွန်ုပ် အမြဲဝယ်ယူနေကျ နာမည်ကြီး အဆိုတော်ကို မိတ်ဆွေ၏ မွေးနေ့ပွဲတွင် တွေ့ခဲ့သည်။",
  8: "တစ်နှစ်လုံး ကြိုးစားလေ့ကျင့်ခဲ့သော ဆိုင်ကယ်စီးသူက ပြိုင်ပွဲကို နိုင်ခဲ့သည်။",
  9: "ဧည့်သည်များက ရင်းနှီးပြီး အကူညီပေးတတ်သော အရောင်းဝန်ထမ်းများကို ကြှစ်သက်ကြသည်။",
  10: "လူတိုင်း ယုံကြည်ခဲ့သော အေးအေးကို ကျွန်ုပ်တို့ အဖွဲ့ခေါင်းဆောင်အဖြစ် ရွေးချယ်ခဲ့သည်။",
};

export const grammar11C: GrammarNote = {
  whatMy:
    "Relative Pronouns (ဆက်စပ်နာမ်စားများ) ဖြစ်သော who, whom နှင့် whose ကို လူများနှင့် ဆက်စပ်၍ အသုံးပြုသည်။ who ကို ဝါကျ၏ subject (ကတ္တား) အဖြစ် လူများကို ရည်ညွှန်းရာတွင် အသုံးပြုပြီး whom ကို object (ကံ) ဖြစ်သော လူများအတွက် အသုံးပြုသည်။ whose ကို လူများနှင့် တိရစ္ဆာန်များ၏ ပိုင်ဆိုင်မှုကို ဖော်ပြရာတွင် အသုံးပြုသည်။",
  whenMy:
    "who သည် ကြိယာ၏ subject ဖြစ်သောအခါ (e.g. Daw Nilar is my teacher, who taught me English ...)၊ whom သည် ကြိယာ၏ object ဖြစ်သောအခါ သို့မဟုတ် preposition ၏ object ဖြစ်သောအခါ (e.g. The girl, whom we met in Tokyo ... / the person to whom I sent flowers)၊ whose သည် ပိုင်ဆိုင်မှုကို ပြသောအခါ (e.g. She is the student whose handwriting is the best ...) အသုံးပြုသည်။",
  whyMy:
    "Relative pronoun များဖြင့် ဝါကျနှစ်ချောင်းကို ပေါင်းစပ်ရေးသားခြင်းက စာပေပိုမို ချက်ချင်းကျစေသည်။ ဥပမာ — 'I helped the girl. Her car had broken down.' ဆိုသော ဝါကျနှစ်ချောင်းကို 'I helped the girl whose car had broken down.' ဟု whose ဖြင့် ပေါင်းနိုင်သည်။ ရိုးရိုး ပြောဆိုရေးသားမှုတွင် object ဖြစ်၍လည်း who ကို whom အစား အသုံးပြုနိုင်သော်လည်း စာပေပုံစံ (formal writing) တွင် whom ကို သုံးသင့်သည်။",
  examples: [
    { en: "Daw Nilar is my teacher, who taught me English when I was in Grade 3.", phrase: "who taught" },
    { en: "Do you know the woman, whom I sent those flowers to?", phrase: "whom I sent" },
    { en: "She is the student, whose handwriting is the best in my class.", phrase: "whose handwriting" },
  ],
};

/* ------------------------- Aggregated supplement ----------------------- */

export const unit11Supplement: UnitSupplement = {
  partAReadingTranslations: partA11A_translations,
  partBReadingTranslations: partB11A_translations,
  partCReadingTranslations: partC11A_translations,
  vocab: vocab11B,
  partCGrammarTranslations: partA11C_translations,
  partBGrammarTranslations: partB11C_translations,
  grammar: grammar11C,
};
