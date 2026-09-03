// Supplementary Burmese translations, vocabulary, and grammar explanations
// for Unit 12 sections 12A / 12B / 12C. Keyed by section id, mirroring
// `unit1Supplement.ts`, `unit2Supplement.ts`, `unit3Supplement.ts`,
// `unit4Supplement.ts`, `unit5Supplement.ts`, `unit6Supplement.ts`,
// `unit7Supplement.ts`, `unit8Supplement.ts`, `unit9Supplement.ts`,
// `unit10Supplement.ts` and `unit11Supplement.ts`. Units 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
// and 11 data are never touched by this module.

export type VocabItem = {
  word: string;
  pronunciation: string; // simple phonetic guide
  meaningMy: string;
  exampleEn?: string;
};

/* ----------------------------- 12A Reading ------------------------------ */

export const partA12A_translations: Record<number, string> = {
  1: "စာပိုဒ်မှ (1) မှ (5) အထိ ဝါကျငါးခုကို ဖယ်ထုတ်ထားသည်။ ဝါကျများ (A-E) တွင် ကွက်လပ် (1-5) တစ်ခုချင်းစီနှင့် အကောင်းဆုံး ကိုက်ညီသော ဝါကျကို ရွေးပါ။",
};

export const partB12A_translations: Record<number, string> = {
  1: "ဆေးကုသမှု ဝန်ဆောင်မှု ပေးသူ",
  2: "ပညာရေး အဖွဲ့အစည်းများ",
  3: "မြို့ပြ သကျေးဇူးတော်များနှင့် အဆင်ပြေမှုများ",
  4: "မြို့ပြပြောင်းလဲမှုကြောင့် ဖြစ်ပေါ်လာသော မလိုလားအပ်သော ရလဒ်များ",
  5: "မြို့ပြ ရာဇဝတ်မှုများ",
};

export const partC12A_translations: Record<number, string> = {
  1: "ကျေးလက်ဒေသတွင် နေထိုင်သူများသည် မည့်သည့်အကြေင်းရင်းများကြောင့် မကြာခဏ ကျေးလက်အိမ်များကို စွန့်ခွာကြသနည်း။",
  2: "စာကြောင်း ၉ ရှိ 'greener pastures' ဟူသော စကားစုသည် အဘယ်နှင့် အဓိပ္ပာယ်တူသနည်း။",
  3: "လူသားများသည် ပိုမိုကောင်းမွန်လိုသောအခါ ၎င်းတို့သည် အဘယ်အရာ ပြုလုပ်ကြသနည်း။",
  4: "ကျေးလက်ဒေသတွင် ခေတ်မီ မွေးမြူရေးနှင့် နို့ထွက်ပစ္စည်း စိုက်ပျိုးရေးများ တည်ထောင်သောအခါ ထိုနေရာရှိ ကျေးလက်လယ်သမားများတွင် အဘယ်အရာ ဖြစ်ပေါ်သနည်း။",
  5: "ကမ္ဘာ့အချို့နေရာများတွင် စစ်ပွဲကြောင့် ရွာသားများသည် အဘယ်အရာ ပြုလုပ်ရသနည်း။",
  6: "မြို့ပြပြောင်းလဲမှုသည် မည်သို့သော မလိုလားအပ်သော ရလဒ်များကို ဖြစ်ပေါ်စေသနည်း။",
  7: "ဆူးပုန်းရွာများ တိုးပွားလာခြင်းနှင့်အတူ လူများသည် အဘယ်နေရာတွင် နေထိုင်ရမည်အဖြစ် အတင်းအကျပ် ဖြစ်ရသနည်း။",
  8: "အလုပ်အကိုင်အခွင့်အလမ်း ပိုမိုဖန်တီးနိုင်ပါက မည်သည့်ပြဿနာကို ဖြေရှင်းနိုင်သနည်း။",
  9: "ရဲတပ်ဖွဲ့ကို မည်မျှအထိ ချဲ့ထွင်သင့်သနည်း။",
  10: "သင်သည် ရွာတစ်ရွာတွင် နေထိုင်လျှင် မြို့ကြီးသို့ ရွှေ့ပြေားမည်လား၊ အဘယ်ကြောင့်နည်း။",
  11: "သင်သည် ရွာတစ်ရွာ သို့မဟုတ် မြို့ကြီးတစ်ခုတွင် နေထိုင်လိုပါသလား၊ အဘယ်ကြောင့်နည်း။",
};

/* ---------------------------- 12B Vocabulary ---------------------------- */

export const vocab12B: VocabItem[] = [
  {
    word: "urbanization",
    pronunciation: "/ˌɜːbənaɪˈzeɪʃn/ — အဘာနိုင်ဇေးရှန်",
    meaningMy: "မြို့ပြပြောင်းလဲမှု၊ မြို့ပြဖြစ်လာမှု ဖြစ်စဉ်",
    exampleEn: "Urbanization is the process by which more and more people leave the countryside to live in cities.",
  },
  {
    word: "infrastructure",
    pronunciation: "/ˈɪnfrəstrʌktʃə(r)/ — အင်ဖရစထရက်ချာ",
    meaningMy: "အခြေခံအဆောက်အအုံ",
    exampleEn: "Urbanization brings about an infrastructure more advanced than the one in the countryside.",
  },
  {
    word: "sanitation",
    pronunciation: "/ˌsænɪˈteɪʃn/ — ဆန်နီတေးရှန်",
    meaningMy: "တိုက်ခန်းသန့်ရှင်းရေး၊ ကျန်းမာရေးသန့်ရှင်းမှု",
    exampleEn: "In slums, sanitation is inadequate.",
  },
  {
    word: "congestion",
    pronunciation: "/kənˈdʒestʃən/ — ကန်ဂျက်ရှန်",
    meaningMy: "ပိတ်ဆို့ခြင်း၊ ရုန်းတိပ်ခြင်း",
    exampleEn: "Traffic congestion is one of the problems of urbanization.",
  },
  {
    word: "slum",
    pronunciation: "/slʌm/ — စလမ်",
    meaningMy: "ဆူးပုန်းရွာ၊ ဆင်းရဲသားရပ်ကွက်",
    exampleEn: "One of the undesirable results of urbanization is the growth of slums.",
  },
  {
    word: "shanty",
    pronunciation: "/ˈʃænti/ — ရှန်တီ",
    meaningMy: "တုတ်ခိုင်အိမ်ငယ်၊ ဆောက်လုပ်အိမ်",
    exampleEn: "In slums, people live in shanties and hovels.",
  },
  {
    word: "hovel",
    pronunciation: "/ˈhɒvl/ — ဟောဗယ်",
    meaningMy: "ပျက်စီးနေသော အိမ်ငယ်၊ ဆင်းရဲသော နေအိမ်",
    exampleEn: "In slums, people live in shanties and hovels.",
  },
  {
    word: "influx",
    pronunciation: "/ˈɪnflʌks/ — အင်ဖလက်စ်",
    meaningMy: "ဝင်ရောက်လာမှု၊ စီးဆင်းမှု",
    exampleEn: "Means to control the influx of people from the countryside may need to be adopted.",
  },
  {
    word: "livelihood",
    pronunciation: "/ˈlaɪvlihʊd/ — လိုင်ဗ်လီဟုဒ်",
    meaningMy: "အသက်မွေးဝမ်းကျွေးမှု၊ အသက်မွေးလမ်း",
    exampleEn: "They move to towns or cities to find new forms of livelihood.",
  },
  {
    word: "prostitution",
    pronunciation: "/ˌprɒstɪˈtjuːʃn/ — ပရော်စတီတူးရှန်",
    meaningMy: "ပြည့်တံဆောင်မှု သို့မဟုတ် လိင်လုပ်ငန်း",
    exampleEn: "Urban crime includes mugging, stealing, drug abusing, prostitution and murder.",
  },
];

/** 12B Exercise A — compound noun matching (Column A word → Burmese meaning). */
export const partA12B_translations: Record<number, string> = {
  1: "air pollution — လေထု ညစ်ညမ်းမှု",
  2: "beauty salon — အလှပြင်ဆိုင်",
  3: "dairy farms — နွားနို့ခြံများ",
  4: "drainage system — ရေဆင်းရေလမ်း စနစ်",
  5: "drug abusing — မူးယစ်ဆေးဝါး အလွဲအသုံးပြုမှု",
  6: "housing plan — အိမ်ရာ စီမံကိန်း",
  7: "recreation centre — အပန်းဖြေ စင်တာ",
  8: "root cause — အရင်းခံ အကြောင်းရင်း",
  9: "rural folks — ကျေးလက်နေ လူများ",
  10: "service provider — ဝန်ဆောင်မှု ပေးသူ",
  11: "traffic congestion — ယာဉ်ကြော ပိတ်ဆို့မှု",
  12: "unemployment problem — အလုပ်လက်မဲ့ ပြဿနာ",
};

/** 12B Exercise B — gap-fill sentences. */
export const partB12B_translations: Record<number, string> = {
  1: "မပျော်ရွှင်မှုသည်၊ သူ၏ဖျားနာမှု ဖြစ်ရခြင်း __________  ဖြစ်သည်။",
  2: "ကျေးလက်ဒေသများမှ မြောက်မြားစွာသော၊ __________ ကို စက်မှုဇုန်များအဖြစ် ပြောင်းလဲခဲ့သည်။",
  3: "ဤဒေသသည်၊ __________ မတပ်ဆင်မီက အလွန်ရွှံ့ဗွက်ထူထပ်ခဲ့သည်။",
  4: "__________ ကို ဖြေရှင်းရန်အတွက်၊ ငါတို့သည် အလုပ်အကိုင် အခွင့်အလမ်းသစ်များ ပိုမိုဖန်တီးရမည်။",
  5: "ဒီတစ်ပတ်ပိတ်ရက်မှာ ငါဟာ ကျေးလက်ရွာတစ်ရွာမှာ နေထိုင်တဲ့ ငါ့ရဲ့၊ __________ ဆီကို သွားရောက်လည်ပတ်ပါမယ်။",
  6: "မင်း ဆံပင်ညှပ်ဖို့၊ __________ ဆီကို ပုံမှန်သွားလေ့ရှိသလား။",
  7: "မြေညီထပ်မှာ၊ __________ တစ်ခုရှိတယ်။ မင်း အဲဒီမှာ စားပွဲတင်တင်းနစ် ကစားနိုင်တယ်။",
  8: "__________ ၏ အကြောင်းရင်းများထဲတွင် မော်တော်ကား အိတ်ဇောငွေ့များသည် အဆိုးဆုံး ဖြစ်သည်။",
  9: "ဗိသုကာပညာရှင်များသည် လက်ရှိတွင် ငါတို့မြို့အတွက် သစ်လွင်သော __________ ကို ရေးဆွဲနေကြသည်။",
  10: "ဤဒေသရှိ ရာဇဝတ်မှု အများစုသည် __________ နှင့် ဆက်စပ်နေသည်။",
  11: "__________ ကြီးမားသော မြို့ကြီးများတွင် ဖြေရှင်း၍မရနိုင်သော ပြဿနာတစ်ခု ဖြစ်ပုံရသည်။",
};

/** 12B Exercise C — 'as' vs 'like' as prepositions. */
export const partC12B_translations: Record<number, string> = {
  1: "ကျွန်ုပ်သည် အစည်းအရေးကို လေ့လာသူ အဖြစ် တက်ရောက်နေသည်။ (အခန်းကဏ္ဍ → as)",
  2: "ကလေးသည် အဖေထက် အမေနှင့် ပိုတူသည်။ (အသွင်အပြင် နှိုင်းယှဉ် → like)",
  3: "လန်ဒန်တွင် နယူးယော့ခ်နည်းတူ ယာဉ်ကြော အလွန်များသည်။ (တူညီသော အခြေအနေ → as)",
  4: "ရထား နောက်ကျနေသည်။ လေလိုမျှ အပြေးလိုက်ရမည်။ (နှိုင်းယှဉ်ခြင်း → like)",
  5: "ကျွန်ုပ်သည် သင့်မိတ်ဆွေ ဖြစ်ပြီး၊ မိတ်ဆွေ အဖြစ် ပြန်စဉ်းစားပါဟု အကြံပေးသည်။ (အခန်းကဏ္ဍ → as)",
  6: "ကျွန်ုပ်သည် တိုက်လေယာဉ် မောင်းသူ အဖြစ် လေတပ်တွင် ဝင်လိုသည်။ (အလုပ် → as)",
  7: "အဖေသည် ဤနာရီကို မွေးနေ့လက်ဆောင် အဖြစ် ပေးခဲ့သည်။ (အခန်းကဏ္ဍ → as)",
  8: "စိတ်မကောင်းပါ၊ ကျွန်ုပ်တို့ စီစဉ်ခဲ့သည့်အတိုင်း မနက်ဖန် မတွေ့နိုင်ပါ။ (အတိုင်း → as)",
  9: "သူသည် ၁၈ နှစ် ဖြစ်သော်လည်း တစ်ခါတစ်ရံ ကလေးလို ပြုမူသည်။ (အပြုအမူ → like)",
  10: "သူမသည် မိသားစုအများစုနည်းတူ ထူးခြားသော စာရေးဆရာ ဖြစ်သည်။ (တူညီမှု → as)",
};

/* ----------------------------- 12C Grammar ------------------------------ */

/** 12C Exercise A — joining sentences with 'that / which'. */
export const partA12C_translations: Record<number, string> = {
  1: "ဤအဆောက်အအုံ၊ __________ မုန်တိုင်းကြောင့် ပျက်စီးသွားခဲ့သော၊ ယခုအခါ ပြန်လည်တည်ဆောက်ပြီးစီးပြီ ဖြစ်သည်။",
  2: "သူငယ်ချင်းတစ်ယောက်က ငါတို့ကို အကြံပြုထားတဲ့၊ __________ အိပ်ဆဲလင့်ဟိုတယ် (Excellent Hotel) မှာ ငါတို့ တည်းခိုခဲ့ကြတယ်။",
  3: "နာရီဝက်တစ်ကြိမ်စီ ထွက်ခွာသော၊ __________ ဤဘတ်စ်ကားများသည် လေဆိပ်သို့ သွားကြသည်။",
  4: "ကိုတူးက သူအလွန်သဘောကျနေတဲ့၊ __________ သူခန့်အပ်ခံရတဲ့ အလုပ်အသစ်အကြောင်း ငါ့ကိုပြောပြခဲ့တယ်။",
  5: "ငါတို့ရွာကနေ ဆယ်မိုင်ပဲဝေးတဲ့၊ __________ ပဲခူးမြို့ကို ဆွေမျိုးတွေဆီ လည်ပတ်ဖို့ ငါတို့ခဏခဏ သွားလေ့ရှိကြတယ်။",
  6: "ရေကူးကန်သို့ ဦးတည်သွားသော၊ __________ ဤလှေကားများသည် အတော်လေး ချော်လဲလွယ်သည်။",
  7: "အမေက ဒီဆွယ်တာကို ငါ့ကိုပေးခဲ့တာ၊ __________ အမေကိုယ်တိုင် ရက်လုပ်ခဲ့တာ ဖြစ်သည်။",
  8: "အဝတ်လျှော်စက်၊ __________ ငါဂရုတစိုက် အသုံးပြုခဲ့သော၊ အခုထက်ထိ ကောင်းမွန်စွာ အလုပ်လုပ်နေဆဲ ဖြစ်သည်။",
};

/** 12C Exercise B — building sentences with relative clauses. */
export const partB12C_translations: Record<number, string> = {
  1: " ကမ္ဘာဂြိုဟ်/ တစ်ခုတည်းသော ကမ္ဘာ/ သက်ရှိများကို ထိန်းသိမ်းနိုင်သော",
  2: "တီထွင်မှု/ ခေတ်သစ်ကမ္ဘာကို ပြောင်းလဲပေးခဲ့သော/ကွန်ပျူတာ/ ",
  3: "လုပ်ရပ်/ရေကူးခြင်း/ ကျွန်ုပ် နှစ်သက်စွာ လုပ်သော",
  4: "အစီအစဉ်/ကျွန်ုပ် တီဗီတွင် ကြည့်ရ နှစ်သက်သော/  Master Chef အစီအစဉ်/",
  5: " လုပ်ရပ်/ စိတ်ဖိစီးမှုကို လျော့ချပေးသော /ပန်းခြံစိုက်ပျိုးခြင်း/ ",
};

/** 12C Exercise C — 'as ... as'. */
export const partC12C_translations: Record<number, string> = {
  1: "တောင်ပေါ်ကို တက်ခြင်းသည် ခက်ခဲသည်။ တောင်ပေါ်မှ ဆင်းခြင်းသည်လည်း ခက်ခဲသည်။",
  2: "ဒီနေ့လည်း ပူနွေးသည်။မနေ့ကလဲ ပူနွေးသည်။",
  3: "ဒီနေ့ စျေးဝယ်စင်တာတွင် လူစည်ကားသည်။ မနေ့ကလဲ လူစည်ကားသည်။",
  4: "မနေ့တွင် သူတို့သည် ကောင်းစွာ ကစားခဲ့သည်။သူတို့အမြဲကောင်းကောင်း ကစားကြသည်။",
  5: "အမေ အမြဲ အလုပ်များသည်။အဖေလည်း အမြဲ အလုပ်များသည်။",
};

/** 12C Exercise D — 'not as ... as'. */
export const partD12C_translations: Record<number, string> = {
  1: "ရိုဗော့များသည် လူလုပ်သားများထက် ပို၍ တိကျစွာ အလုပ်လုပ်နိုင်ကြသည်။",
  2: "လျှပ်စစ်မီးသည် ဖယောင်းတိုင်မီးထက် ပို၍လင်းသည်",
  3: "ကိုကိုသည် စာလေ့လာချိန်ထက် ကစားချိန်ကို  ပို၍သုံးသည်။",
  4: "နျူကလီးယား စွမ်းအင်သည် ကျောက်မီးသွေးထက်  ပို၍သန့်ရှင်းသည်။",
  5: "ကျေးလက်ဒေသ လေထုအရည်အသွေးသည်  မြို့ပြဒေသထက် ပို၍ ကောင်းသည်။",
};

export const grammar12C = {
  whatMy:
    "Unit 12C တွင် အဓိက သင်ခန်းစာ နှစ်ခု ရှိသည် — (၁) အရာဝတ္ထုများကို ရည်ညွှန်းသည့် relative pronouns 'that' နှင့် 'which'၊ (၂) နှိုင်းယှဉ်ခြင်းအတွက် 'as ... as' နှင့် 'not as ... as'။",
  whenMy:
    "အရာဝတ္ထု (things) များအကြောင်း ပြောသောအခါ relative clause တွင် 'that' သို့မဟုတ် 'which' ကို အသုံးပြုသည် (e.g. I do not like stories that / which have sad endings.)။ နှိုင်းယှဉ်သည့် အရာနှစ်ခု တူညီသောအခါ 'as + adjective / adverb + as' ကို အသုံးပြုပြီး (e.g. That cow is as big as a small elephant.)၊ တူညီမှု မရှိသောအခါ 'not as + adjective / adverb + as' ကို အသုံးပြုသည် (e.g. Thuta cannot run as fast as Thura.)။",
  whyMy:
    "Relative pronouns 'that / which' သည် ဝါကျနှစ်ခုကို ဝါကျတစ်ခုအဖြစ် ချိတ်ဆက်ပေးပြီး နာမ်ကို ပိုမို ရှင်းလင်းစွာ ဖော်ပြသည်။ 'as ... as' နှင့် 'not as ... as' သည် တူညီမှု သို့မဟုတ် ကွာခြားမှုကို တိတိကျကျ ဖော်ပြရန် အသုံးဝင်သည်။",
  examples: [
    { en: "I do not like stories that / which have sad endings.", phrase: "that / which" },
    { en: "Nandar works for a company that / which makes shoes.", phrase: "that / which" },
    { en: "That cow is as big as a small elephant.", phrase: "as ... as" },
    { en: "Ko Ko can play the piano as well as Mee Mee.", phrase: "as ... as" },
    { en: "Thuta cannot run as fast as Thura.", phrase: "not as ... as" },
    { en: "It was not as cold last year as it is this year.", phrase: "not as ... as" },
  ],
};

/* --------------------- 12D Listening and Speaking ----------------------- */

/** 12D Exercise A — urban / rural comparison table (per blank number). */
export const partA12D_translations: Record<number, string> = {
  1: "မြို့ပြဒေသရှိ ဘဝသည် အလုပ်များပြီး ရှုပ်ထွေးသည်။",
  2: "ကျေးလက်ဒေသရှိ ဘဝသည် ရိုးရှင်းပြီး နှေးကွေးသည်။",
  3: "မြို့ပြဒေသရှိ အခြေချမှုတွင် မြို့ကြီးများနှင့် မြို့ငယ်များ ပါဝင်သည်။",
  4: "ကျေးလက်ဒေသရှိ အခြေချမှုတွင် ရွာများနှင့် အိမ်အုပ်စုများ ပါဝင်သည်။",
  5: "မြို့ပြဒေသရှိ ပတ်ဝန်းကျင်သည် သဘာဝနှင့် ကွဲကွာနေသည်။",
  6: "ကျေးလက်ဒေသရှိ ပတ်ဝန်းကျင်သည် သဘာဝနှင့် တိုက်ရိုက် ထိစပ်နေသည်။",
  7: "မြို့ပြလူများသည် စိုက်ပျိုးရေးမဟုတ်သော အလုပ်များတွင် ပါဝင်သည်။",
  8: "ကျေးလက်လူများ၏ အဓိက အလုပ်သည် စိုက်ပျိုးရေး ဖြစ်သည်။",
  9: "မြို့ပြဒေသများသည် လူသိပ်သည်းစွာ နေထိုင်သည်။",
  10: "ကျေးလက်ဒေသများသည် လူနည်းပါးစွာ နေထိုင်သည်။",
  11: "မြို့ပြလူများသည် အလုပ်ကို မကြာခဏ ပြောင်းလဲသည်။",
  12: "ကျေးလက်လူများသည် အလုပ်ကို မကြာခဏ မပြောင်းလဲပါ။",
};

/** 12D Exercise B — doctor's appointment dialogue slots. */
export const partB12D_translations: Record<number, string> = {
  1: "ဆရာဝန်နှင့် ချိန်းဆိုချက် ယူလိုပါသည်။",
  2: "ကျွန်ုပ် ကျန်းမာရေး သိပ်မကောင်းပါ။",
  3: "ရပါသည် (မနက်ခင်း လာနိုင်ပါသည်)။",
  4: "ဟုတ်ကဲ့၊ ၁၀ နာရီ အဆင်ပြေပါသည်။",
  5: "နေအောင် (ကျွန်ုပ်၏ နာမည်)။",
  6: "ကျေးဇူးတင်ပါသည်။",
};

/** 12E — argumentative essay structure, in Burmese. */
export const writing12E_structureMy: Record<number, string> = {
  1: "အဖွင့် — ဖတ်သူ၏ အာရုံစိုက်မှုကို ဆွဲယူသော အဖွင့်စာနှင့် နောက်ခံ အချက်အလက်",
  2: "အဓိကအပိုင်း — မိမိ ထောက်ခံသော အဓိက အကြောင်းပြချက်များ",
  3: "ဆန့်ကျင်ဘက် အကြောင်းပြချက် — အခြားအမြင်ကို တင်ပြပြီး ပြန်လည် ရှင်းလင်းချေပခြင်း",
  4: "အနိဂုံ — အနှစ်ချုပ် နိဂုံးချုပ် သုံးသပ်ချက်",
};
