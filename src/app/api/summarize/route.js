import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as cheerio from 'cheerio';

// 🕷️ Scrape blog content from URL
const scrapeBlogContent = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Grab paragraphs inside main content (you can improve selector based on blog)
    const paragraphs = $('article p').map((_, el) => $(el).text()).get();

    const text = paragraphs.join(' ').replace(/\s+/g, ' ').trim();
    return text || null;
  } catch (err) {
    console.error("❌ Scraping failed:", err.message);
    return null;
  }
};


// ✅ Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ✅ MongoDB (Mongoose)
const mongoUri = process.env.MONGODB_URI;
const connectToMongo = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri, {
      dbName: 'blogSummarizer',
    });
  }
};

const blogSchema = new mongoose.Schema({
  url: String,
  full_text: String,
  created_at: { type: Date, default: Date.now },
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

// 🔁 Simulated AI
const simulateAISummary = (text) =>
  text.split('.').slice(0, 2).join('.') + '. [AI summary simulated]';

// 🌐 Dictionary
const dictionary = {
  blog: 'بلاگ',
  summary: 'خلاصہ',
  ai: 'مصنوعی ذہانت',
  text: 'متن',
  article: 'مضمون',
  post: 'تحریر',
  example: 'مثال',
  is: 'ہے',
  this: 'یہ',
  a: '',
  about: 'کے بارے میں',
  explains: 'وضاحت کرتا ہے',
  generated: 'بنایا گیا',
  the: '',
  and: 'اور',
  or: 'یا',
  with: 'کے ساتھ',
  without: 'کے بغیر',
  how: 'کیسے',
  to: 'کرنے',
  use: 'استعمال',
  using: 'استعمال کرتے ہوئے',
  learn: 'سیکھیں',
  learning: 'سیکھنا',
  guide: 'رہنما',
  tutorial: 'سبق',
  simple: 'سادہ',
  advanced: 'اعلی',
  for: 'کے لیے',
  from: 'سے',
  by: 'کی طرف سے',
  user: 'صارف',
  data: 'ڈیٹا',
  system: 'نظام',
  function: 'فنکشن',
  coding: 'کوڈنگ',
  code: 'کوڈ',
  development: 'ترقی',
  web: 'ویب',
  application: 'ایپلیکیشن',
  design: 'ڈیزائن',
  security: 'سیکیورٹی',
  privacy: 'پرائیویسی',
  performance: 'کارکردگی',
  good: 'اچھا',
  best: 'بہترین',
  better: 'بہتر',
  fast: 'تیز',
  slow: 'سست',
  server: 'سرور',
  client: 'کلائنٹ',
  database: 'ڈیٹا بیس',
  backend: 'بیک اینڈ',
  frontend: 'فرنٹ اینڈ',
  internet: 'انٹرنیٹ',
  content: 'مواد',
  fetch: 'حاصل کریں',
  simulated: 'تقلید شدہ',
  fetches: 'حاصل کرتا ہے',
  render: 'ظاہر کریں',
  show: 'دکھائیں',
  hide: 'چھپائیں',
  loading: 'لوڈ ہو رہا ہے',
  error: 'خرابی',
  message: 'پیغام',
  request: 'درخواست',
  response: 'جواب',
  success: 'کامیابی',
  failed: 'ناکام',
  improve: 'بہتر کریں',
  feature: 'خصوصیت',
  important: 'اہم',
  introduction: 'تعارف',
  conclusion: 'نتیجہ',
  compare: 'موازنہ کریں',
  complex: 'پیچیدہ',
  update: 'اپ ڈیٹ',
  install: 'انسٹال کریں',
  download: 'ڈاؤن لوڈ',
  upload: 'اپ لوڈ',
  cloud: 'کلاؤڈ',
  local: 'مقامی',
  version: 'ورژن',
  support: 'مدد',
  device: 'آلہ',
  mobile: 'موبائل',
  desktop: 'ڈیسک ٹاپ',
  software: 'سافٹ ویئر',
  hardware: 'ہارڈ ویئر',
  tool: 'اوزار',
  framework: 'فریم ورک',
  library: 'لائبریری',
  platform: 'پلیٹ فارم',
  language: 'زبان',
  developer: 'ڈویلپر',
  engineer: 'انجینئر',
  write: 'لکھیں',
  read: 'پڑھیں',
  execute: 'چلائیں',
  run: 'چلائیں',
  start: 'شروع کریں',
  stop: 'روکیں',
  explain: 'وضاحت کریں',
  step: 'قدم',
  steps: 'اقدامات',
  benefit: 'فائدہ',
  drawback: 'نقصان',
  reason: 'وجہ',
  purpose: 'مقصد',
  goal: 'ہدف',
  result: 'نتیجہ',
  logic: 'منطق',
  process: 'عمل',
  memory: 'یادداشت',
  thread: 'تھریڈ',
  input: 'ان پٹ',
  output: 'آؤٹ پٹ',
  file: 'فائل',
  folder: 'فولڈر',
  directory: 'ڈائریکٹری',
  path: 'راستہ',
  syntax: 'نحو',
  debug: 'ڈیبگ',
  test: 'آزمائش',
  compile: 'مرتب کریں',
  loop: 'لوپ',
  condition: 'حالت',
  true: 'سچ',
  false: 'جھوٹ',
  null: 'خالی',
  undefined: 'غیر متعین',
  object: 'شے',
  array: 'صف',
  string: 'سلسلہ',
  number: 'نمبر',
  boolean: 'بولین',
  operator: 'آپریٹر',
  operand: 'آپریںڈ',
  parameter: 'پیرامیٹر',
  argument: 'دلیل',
  method: 'طریقہ',
  class: 'کلاس',
  instance: 'مثال',
  inheritance: 'وراثت',
  polymorphism: 'کثیر شکلی',
  encapsulation: 'احاطہ',
  abstraction: 'خلاصہ',
  api: 'اے پی آئی',
  rest: 'ریسٹ',
  graphql: 'گراف کیو ایل',
  json: 'جیسن',
  xml: 'ایکس ایم ایل',
  html: 'ایچ ٹی ایم ایل',
  css: 'سی ایس ایس',
  javascript: 'جاوا اسکرپٹ',
  typescript: 'ٹائپ اسکرپٹ',
  react: 'ری ایکٹ',
  vue: 'ویو',
  angular: 'اینگولر',
  node: 'نوڈ',
  express: 'ایکسپریس',
  controller: 'کنٹرولر',
  model: 'ماڈل',
  view: 'منظر',
  mvc: 'ایم وی سی',
  schema: 'سکیما',
  query: 'سوال',
  mutation: 'تبدیلی',
  subscription: 'سبسکرپشن',
  authentication: 'تصدیق',
  authorization: 'اجازت',
  token: 'ٹوکن',
  session: 'سیشن',
  cookie: 'کوکی',
  localstorage: 'لوکل اسٹوریج',
  deployment: 'نشر',
  hosting: 'میزبانی',
  docker: 'ڈوکر',
  kubernetes: 'کیوبرنیٹس',
  virtual: 'ورچوئل',
  machine: 'مشین',
  container: 'کنٹینر',
  repository: 'ریپوزٹری',
  commit: 'کمیٹ',
  push: 'پش',
  pull: 'پل',
  branch: 'برانچ',
  merge: 'ضم',
  conflict: 'تنازعہ',
  resolve: 'حل کریں',
  log: 'لاگ',
  monitor: 'نگرانی',
  alert: 'انتباہ',
  incident: 'واقعہ',
  bug: 'بگ',
  issue: 'مسئلہ',
  project: 'منصوبہ',
  team: 'ٹیم',
  collaboration: 'تعاون',
  agile: 'ایجائل',
  scrum: 'سکرم',
  sprint: 'سپرنٹ',
  meeting: 'اجلاس',
  deadline: 'آخری تاریخ',
  strategy: 'حکمت عملی',
  roadmap: 'روڈ میپ',
  optimize: 'بہتر بنائیں',
  scale: 'پیمانہ',
  availability: 'دستیابی',
  latency: 'تاخیر',
  throughput: 'بینڈوڈتھ',
  bandwidth: 'بینڈوڈتھ',
  protocol: 'پروٹوکول',
  port: 'پورٹ',
  firewall: 'فائر وال',
  encryption: 'خفیہ کاری',
  decryption: 'ڈی کرپشن',
  hash: 'ہیش',
  cipher: 'سائفر',
  key: 'کلید',
  algorithm: 'الگورتھم',
  vulnerability: 'کمزوری',
  attack: 'حملہ',
  defense: 'دفاع',
  risk: 'خطرہ',
  threat: 'دھمکی',
  mitigation: 'کمی',
  summarize: 'خلاصہ بنائیں',
  article: 'مضمون',
  writes: 'لکھتا ہے',
  generates: 'بناتا ہے',
  content: 'مواد',
  the: '',
  a: '',
};



const translateToUrdu = (text) => {
  return text
    .split(/\b/) // split by word boundaries
    .map((word) => {
      const clean = word.toLowerCase().replace(/[^a-z]/gi, '');
      const translation = dictionary[clean];
      return translation !== undefined ? translation : word;
    })
    .join('');
};


// 🚀 API
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Received Body:", body);

    const { url, text } = body;

    let blogText = text?.trim();
    if (url && !text) {
      blogText = await scrapeBlogContent(url);

      if (!blogText) {
        return NextResponse.json({ error: 'Failed to scrape blog content.' }, { status: 500 });
      }
    }


    if (!blogText) {
      return NextResponse.json({ error: 'No blog content to summarize.' }, { status: 400 });
    }

    const summary = simulateAISummary(blogText);
    const summaryUrdu = translateToUrdu(summary);

    // ✅ Save to Supabase
    const { error: supabaseError } = await supabase.from('summaries').insert([
      {
        original_text: blogText,
        summary_en: summary,
        summary_ur: summaryUrdu,
        url: url || null,
        created_at: new Date().toISOString(),
      },
    ]);
    if (supabaseError) throw supabaseError;

    // ✅ Save to MongoDB via Mongoose
    await connectToMongo();
    await Blog.create({
      url: url || null,
      full_text: blogText,
    });

    return NextResponse.json({ success: true, summary, summaryUrdu });
  } catch (err) {
    console.error("❌ API Error:", err);
    return NextResponse.json({ error: err.message || 'Something went wrong' }, { status: 500 });
  }
}
