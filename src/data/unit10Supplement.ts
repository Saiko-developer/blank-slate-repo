// Supplementary Burmese translations, vocabulary, and grammar explanations
// for Unit 10 sections 10A / 10B / 10C. Keyed by section id, mirroring
// `unit1Supplement.ts`, `unit2Supplement.ts`, `unit3Supplement.ts`,
// `unit4Supplement.ts`, `unit5Supplement.ts`, `unit6Supplement.ts`,
// `unit7Supplement.ts`, `unit8Supplement.ts` and `unit9Supplement.ts`. Units 1, 2, 3, 4, 5, 6, 7, 8
// and 9 data are never touched by this module.

export type VocabItem = {
  word: string;
  pronunciation: string; // simple phonetic guide
  meaningMy: string;
  exampleEn?: string;
};

/* ----------------------------- 10A Reading ------------------------------ */

export const preReading10A_translations: Record<number, string> = {
  1: "သင်စားသောက်သော အစားအစာသည် အမြဲတမ်း ဘေးကင်းလုံခြုံပါသလား၊ အဘယ်ကြောင့်နည်း။",
  2: "သင်သည် မည်သည့်ကျန်းမာရေး အစားအစာများကို ပုံမှန် စားသုံးသနည်း။",
  3: "ဖော့စ်�ဖုဒ် (fast food) သည် ကျန်းမာရေးအတွက် ကောင်းပါသလား၊ အဘယ်ကြောင့်နည်း။",
};

export const readingPassage10A_translations: Record<number, string> = {
  1: "သက်ရှိသတ္တဝါအားလုံးသည် အစာအာဟာရ လိုအပ်ကြသည်။ အပင်များသည် အစာလိုအပ်သည်၊ တိရစ္ဆာန်များသည် အစာလိုအပ်သည်၊ လူသားများသည်လည်း အစာလိုအပ်ကြသည်။ သို့သော် အစားအစာဆိုသည်မှာ အဘယ်နည်း။ ကျွန်ုပ်တို့သည် အစားအစာကို အဘယ်အတွက်ကြောင့် လိုအပ်သနည်း။ မည်သည့်အစားအစာအမျိုးအစားက ကျွန်ုပ်တို့အတွက် ကောင်းမွန်သနည်း။ မည်သည့်အစားအစာအမျိုးအစားက ကျွန်ုပ်တို့အတွက် မကောင်းမွန်သနည်း။ အစားအသောက် ဘေးကင်းလုံခြုံမှုဆိုသည်မှာ အဘယ်နည်း။ ထိုအရေးကြီးသော မေးခွန်းများ၏ အဖြေကို သိရှိနိုင်ရန် ဆက်လက်ဖတ်ရှုပါ။",
  2: "အစားအစာဆိုသည်မှာ အဘယ်နည်း။ အစားအစာဆိုသည်မှာ ကျွန်ုပ်တို့ စားသောက်သည့် အရာဖြစ်သည်။ ထမင်းသည် အစားအစာဖြစ်သည်။ နို့သည် အစားအစာဖြစ်သည်။ ပေါင်မုန့်သည် အစားအစာဖြစ်သည်။ ထောပတ်၊ ဒိန်ချဉ်၊ ဟင်းသီးဟင်းရွက်၊ အမဲသား၊ သိုးသား။ ငါး၊ သစ်သီးဝလံများသည် အစားအစာများ ဖြစ်ကြသည်။ အမှန်စင်စစ် ရေသည်လည်း အစားအစာဖြစ်သည်။",
};

/* ---------------------------- 10B Vocabulary ---------------------------- */

export const vocab10B: VocabItem[] = [
  {
    word: "responsible",
    pronunciation: "/rɪˈspɒnsəbl/ — ရစ်ပေါ့စ်စန်ဘယ်",
    meaningMy: "တာဝန်ရှိသော၊ ထိန်းသိမ်းစောင့်ရှောက်ရသော",
    exampleEn: "The Food and Drug Administration (FDA) is responsible for the safety of food and drug in the country.",
  },
  {
    word: "balanced",
    pronunciation: "/ˈbælənst/ — ဘယ်လန့စ်",
    meaningMy: "မျှတသော၊ အရေအတွက် သင့်တင့်သော",
    exampleEn: "A balanced diet is a combination of the correct types and amounts of food.",
  },
  {
    word: "vital",
    pronunciation: "/ˈvaɪtl/ — ဗိုင်တယ်",
    meaningMy: "အလွန်အရေးကြီးသော၊ အဓိကကျသော",
    exampleEn: "It is vital that you follow the safety guidelines when handling food.",
  },
  {
    word: "supply",
    pronunciation: "/səˈplaɪ/ — စပလိုင်",
    meaningMy: "ပမာဏ၊ ထောက်ပံ့မှု",
    exampleEn: "We need a daily supply of essential nutrients like starch, sugar, proteins, fats, vitamins, and minerals.",
  },
  {
    word: "artificially",
    pronunciation: "/ˌɑːtɪˈfɪʃəli/ — အာတီဖီရှယ်လီ",
    meaningMy: "သဘာဝမဟုတ်ဘဲ၊ လုပ်ဖန်တီးသောနည်းဖြင့်",
    exampleEn: "Fruits picked and artificially ripened may contain harmful chemicals.",
  },
  {
    word: "allergy",
    pronunciation: "/ˈælədʒi/ — အယ်လာဂျီ",
    meaningMy: "ဓာတ်မတည့်မှု၊ အဖြစ်အပျက်",
    exampleEn: "When we have a food allergy, it can make us sick, causing us to vomit after eating certain foods.",
  },
  {
    word: "additive",
    pronunciation: "/ˈædətɪv/ — အဒတိဗ်",
    meaningMy: "ပေါင်းထည့်ပစ္စည်း၊ ဓာတုပစ္စည်း",
    exampleEn: "Food colouring is often an additive that is used to improve the appearance of food.",
  },
  {
    word: "colourants",
    pronunciation: "/ˈkʌlərənts/ — ကာလရန့စ်",
    meaningMy: "အရောင်ထည့်ပစ္စည်းများ",
    exampleEn: "Avoiding foods containing colourants can help reduce health risks.",
  },
  {
    word: "pesticides",
    pronunciation: "/ˈpestɪsaɪdz/ — ပက်စတိုက်ဆိုက်",
    meaningMy: "ပိုးသတ်ဆေးများ",
    exampleEn: "Farmers use pesticides to kill pests, especially insects, that destroy their produce.",
  },
  {
    word: "hygienically",
    pronunciation: "/haɪˈdʒiːnɪkli/ — ဟိုက်ဂျန်နစ်ကလီ",
    meaningMy: "သန့်ရှင်းစွာ၊ ကျန်းမာရေးနှင့် ညီညွတ်စွာ",
    exampleEn: "Food must be hygienically handled from production to our dining table.",
  },
];

/* ----------------------------- 10C Grammar ------------------------------ */

export const partA10C_translations: Record<number, string> = {
  1: "ပေါင်းစပ်ပါ- သူမသည် ဟာသစာရေးဆန်မှု (sense of humour) ကောင်းသည်။ သူမသည် ဆက်သွယ်ပြောဆိုမှု စွမ်းရည်လည်း ကောင်းသည်။",
  2: "ပေါင်းစပ်ပါ- ကျွန်ုပ်တို့သည် ဧည့်ခန်းကို ပြန်လည်တိုးချဲ့မည်။ ကျွန်ုပ်တို့သည် မီးဖိုခန်းကိုလည်း ပြန်လည်တိုးချဲ့မည်။",
  3: "ပေါင်းစပ်ပါ- အမေသည် ကျွန်ုပ်အတွက် ဆရာကောင်းတစ်ဦး ဖြစ်သည်။ သူမသည် ကျွန်ုပ်အတွက် သူငယ်ချင်းကောင်းလည်း ဖြစ်သည်။",
  4: "ပေါင်းစပ်ပါ- ရေလွှမ်းမိုးမှု၏ သက်ရောက်မှုများတွင် အိမ်ခြံမြေ ပျက်စီးမှုလည်း ပါဝင်သည်။ လူသေမှုလည်း ပါဝင်သည်။",
  5: "ပေါင်းစပ်ပါ- ကျွန်ုပ်၏ ကားသစ်တွင် ရှေ့ကင်မရာရှိသည်။ နောက်ကင်မရာလည်း ရှိသည်။",
  6: "ပေါင်းစပ်ပါ- ဆေးလိပ်သောက်ခြင်းသည် နှလုံးနှင့် အဆုတ်ရောဂါများကို ဖြစ်ပေါ်စေနိုင်သည်။ ကင်ဆာရောဂါကိုလည်း ဖြစ်ပေါ်စေနိုင်သည်။",
  7: "ပေါင်းစပ်ပါ- နန္ဒာသည် ကြက်တူရွေးကစားရင်း လဲခဲ့သည်။ သူမသည် ခြေထောက်ကိုလည်း ကျိုးခဲ့သည်။",
  8: "ပေါင်းစပ်ပါ- စန္ဒာသည် ပြိုင်ပွဲကို အနိုင်ရသည်။ သူမသည် ယခင်နှစ်၏ မှတ်တိုင်ကိုလည်း ချိုးဖောက်သည်။",
  9: "ပေါင်းစပ်ပါ- နယားဗလောက်အသစ်တွင် ရေကူးကန်ရှိသည်။ ဂျင်းလည်း ရှိသည်။",
  10: "ပေါင်းစပ်ပါ- သူသည် ကျောင်းအဆင့် ပြိုင်ပွဲတွင် ပထမဆုကို ရသည်။ အမျိုးသားအဆင့် ပြိုင်ပွဲတွင်လည်း ပထမဆုကို ရသည်။",
};

export const partB10C_translations: Record<number, string> = {
  1: "The more... ဖြင့် ပြန်ရေးပါ- (1) အသက်ကြီးလာသည်နှင့်အမှျ ငယ်ငယ်ကျန်းမာသည်",
  2: "The more... ဖြင့် ပြန်ရေးပါ- (2) ပိုမိုလေ့လာလျှင် ပိုမိုကောင်းသော အဆင့်သတ်မှတ်ချက်",
  3: "The more... ဖြင့် ပြန်ရေးပါ- (3) ကားများ ပိုမိုများပြားလျှင် ယာဉ်ကြော ပိုမိုဆိုးရွားလာမည်",
  4: "The more... ဖြင့် ပြန်ရေးပါ- (4) ပညာရေး ပိုမိုကောင်းလျှင် အခွင့်အလမ်း ပိုမိုကြီးမားလာမည်",
  5: "The more... ဖြင့် ပြန်ရေးပါ- (5) ကော်ဖီ ပိုမိုအားကောင်းလျှင် ပိုမိုအိပ်မပြည့်မည်",
  6: "The more... ဖြင့် ပြန်ရေးပါ- (6) သင် ပိုမိုချမ်းသာလျှင် စိုးရိမ်ပူပန်မှု ပိုမိုများပြားလာမည်",
  7: "The more... ဖြင့် ပြန်ရေးပါ- (7) လေ့ကျင့်သည်နှင့်အမှျ ပိုမိုတိုးတက်လာမည်",
  8: "The more... ဖြင့် ပြန်ရေးပါ- (8) ကျန်းမာရေးစောင့်ရှောက်မှု ပိုမိုကောင်းလျှင် အသက်တမ်း ပိုမိုရှည်လာမည်",
  9: "The more... ဖြင့် ပြန်ရေးပါ- (9) သင် ပိုမိုငယ်ရွယ်လျှင် ဘာသာစကား ပိုမိုလွယ်ကူစွာ သင်ယူနိုင်မည်",
  10: "The more... ဖြင့် ပြန်ရေးပါ- (10) အချိန် ပိုမိုပေးလျှင် စာကျက်ချိန် ပိုမိုနည်းလာမည်",
};

export const grammar10C = {
  whatMy:
    "'not only ... but also' သည် တူညီသော ဝါကျအစိတ်အပိုင်းများ (parallel structures) ကို ချိတ်ဆက်ရာတွင် အသုံးပြုသည်။ ဥပမာ- She has not only a great sense of humour but also good communication skills. 'The more / less / -er ..., the more / less / -er ...' သည် အကြောင်းအရာတစ်ခု ပြောင်းလဲမှုအပေါ် မူတည်၍ အခြားတစ်ခု လိုက်လျောညီထွေ ပြောင်းလဲပုံကို ဖော်ပြသည်။",
  whenMy:
    "'not only ... but also' ကို ကြိယာများ၊ နာမ်များ၊ နာမဝိသေသနများ သို့မဟုတ် ကြိယာဝိသေသနများကို ချိတ်ဆက်ရာတွင် အသုံးပြုသည်။ 'The more ..., the more ...' ကို အပြုအမူ၊ အခြေအနေ သို့မဟုတ် အရာဝတ္ထုတစ်ခု၏ ပမာဏ ပြောင်းလဲမှုကြောင့် အခြားတစ်ခု ပြောင်းလဲသွားခြင်းကို ဖော်ပြရန် အသုံးပြုသည်။",
  whyMy:
    "'not only ... but also' သည် ဝါကျအတွင်း အရေးကြီးသော အချက်အလက်များကို အလေးပေးဖော်ပြရန် သို့မဟုတ် နှစ်ခုနှင့်တပြိုင်နက် ဖြစ်ပေါ်လာသော အရာများကို ချိတ်ဆက်ရန် အသုံးပြုသည်။ 'The more ..., the more ...' သည် ဆက်စပ်မှုရှိသော ပြောင်းလဲမှုများကို ရှင်းလင်းစွာ ဖော်ပြရန် အသုံးပြုပြီး ပညာရပ်ဆိုင်ရာ၊ သိပ္ပံဆိုင်ရာ သို့မဟုတ် လူနေမှုဘဝဆိုင်ရာ အခြေအနေများကို ရှင်းပြရာတွင် အသုံးဝင်သည်။",
  examples: [
    { en: "She has not only a great sense of humour but also good communication skills.", phrase: "not only ... but also" },
    { en: "The more I study, the better grades I get.", phrase: "The more ..., the more ..." },
    { en: "The stronger the coffee is, the less I sleep.", phrase: "The more ..., the less ..." },
  ],
};