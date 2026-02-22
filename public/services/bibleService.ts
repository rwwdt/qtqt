
import { BibleVersion } from "../types";

// Comprehensive mapping for all 66 books of the Bible
const BIBLE_BOOKS_MAP: Record<string, string[]> = {
  "창세기": ["Genesis", "Gen", "창", "1", "Ge", "Gn"],
  "출애굽기": ["Exodus", "Exo", "출", "2", "Ex"],
  "레위기": ["Leviticus", "Lev", "레", "3", "Le", "Lv"],
  "민수기": ["Numbers", "Num", "민", "4", "Nu", "Nm", "Nb"],
  "신명기": ["Deuteronomy", "Deu", "신", "5", "Dt"],
  "여호수아": ["Joshua", "Jos", "여", "6", "Josh"],
  "사사기": ["Judges", "Jud", "사", "7", "Judg"],
  "룻기": ["Ruth", "Rut", "룻", "8", "Ru"],
  "사무엘상": ["1 Samuel", "1Sa", "삼상", "9", "1Sam", "1S"],
  "사무엘하": ["2 Samuel", "2Sa", "삼하", "10", "2Sam", "2S"],
  "열왕기상": ["1 Kings", "1Ki", "왕상", "11", "1Kin", "1K"],
  "열왕기하": ["2 Kings", "2Ki", "왕하", "12", "2Kin", "2K"],
  "역대상": ["1 Chronicles", "1Ch", "역대", "13", "1Chron", "1Chr"],
  "역대하": ["2 Chronicles", "2Ch", "역대", "14", "2Chron", "2Chr"],
  "에스라": ["Ezra", "Ezr", "스", "15", "Ez"],
  "느헤미야": ["Nehemiah", "Neh", "느", "16", "Ne"],
  "에스더": ["Esther", "Est", "에", "17", "Es"],
  "욥기": ["Job", "Job", "욥", "18", "Jb"],
  "시편": ["Psalms", "Psa", "시", "19", "Ps", "Pslm"],
  "잠언": ["Proverbs", "Pro", "잠", "20", "Pr", "Prov"],
  "전도서": ["Ecclesiastes", "Ecc", "전", "21", "Ec"],
  "아가": ["Song of Solomon", "Son", "아", "22", "Song", "So"],
  "이사야": ["Isaiah", "Isa", "이", "23", "Is"],
  "예레미야": ["Jeremiah", "Jer", "예", "24", "Je", "Jer"],
  "예레미야 애가": ["Lamentations", "Lam", "애", "25", "La"],
  "에스겔": ["Ezekiel", "Eze", "겔", "26", "Ek", "Ezk"],
  "다니엘": ["Daniel", "Dan", "단", "27", "Da", "Dl"],
  "호세아": ["Hosea", "Hos", "호", "28", "Ho"],
  "요엘": ["Joel", "Joe", "요", "29", "Jl"],
  "아모스": ["Amos", "Amo", "암", "30", "Am"],
  "오바댜": ["Obadiah", "Oba", "오", "31", "Ob"],
  "요나": ["Jonah", "Jon", "요나", "32", "Jon"],
  "미가": ["Micah", "Mic", "미", "33", "Mi"],
  "나훔": ["Nahum", "Nah", "나", "34", "Na"],
  "하박국": ["Habakkuk", "Hab", "하", "35", "Hb"],
  "스바냐": ["Zephaniah", "Zep", "습", "36", "Zp"],
  "학개": ["Haggai", "Hag", "학", "37", "Hg"],
  "스가랴": ["Zechariah", "Zec", "슥", "38", "Zc"],
  "말라기": ["Malachi", "Mal", "말", "39", "Ml"],
  "마태복음": ["Matthew", "Mat", "마", "40", "Mt"],
  "마가복음": ["Mark", "Mar", "막", "41", "Mk"],
  "누가복음": ["Luke", "Luk", "누", "42", "Lk"],
  "요한복음": ["John", "Joh", "요", "43", "Jn"],
  "사도행전": ["Acts", "Act", "사도", "44", "Ac"],
  "로마서": ["Romans", "Rom", "롬", "45", "Ro", "Rm"],
  "고린도전서": ["1 Corinthians", "1Co", "고전", "46", "1Cor", "1C"],
  "고린도후서": ["2 Corinthians", "2Co", "고후", "47", "2Cor", "2C"],
  "갈라디아서": ["Galatians", "Gal", "갈", "48", "Ga"],
  "에베소서": ["Ephesians", "Eph", "엡", "49", "Ep"],
  "빌립보서": ["Philippians", "Phi", "빌", "50", "Php", "Pp"],
  "골로새서": ["Colossians", "Col", "골", "51", "Co", "Cl"],
  "데살로니가전서": ["1 Thessalonians", "1Th", "살전", "52", "1Thess", "1Th"],
  "데살로니가후서": ["2 Thessalonians", "2Th", "살후", "53", "2Thess", "2Th"],
  "디모데전서": ["1 Timothy", "1Ti", "딤전", "54", "1Tim", "1T"],
  "디모데후서": ["2 Timothy", "2Ti", "딤후", "55", "2Tim", "2T"],
  "디도서": ["Titus", "Tit", "딛", "56", "Ti", "Tt"],
  "빌레몬서": ["Philemon", "Phm", "몬", "57", "Phm", "Pm"],
  "히브리서": ["Hebrews", "Heb", "히", "58", "He", "Hb"],
  "야고보서": ["James", "Jam", "약", "59", "Jas", "Jm"],
  "베드로전서": ["1 Peter", "1Pe", "벧전", "60", "1Pet", "1P"],
  "베드로후서": ["2 Peter", "2Pe", "벧후", "61", "2Pet", "2P"],
  "요한일서": ["1 John", "1Jo", "요일", "62", "1Jn", "1J"],
  "요한이서": ["2 John", "2Jo", "요이", "63", "2Jn", "2J"],
  "요한삼서": ["3 John", "3Jo", "요삼", "64", "3Jn", "3J"],
  "유다서": ["Jude", "Jud", "유", "65", "Jud"],
  "요한계시록": ["Revelation", "Rev", "계", "66", "Re", "Rv"]
};

const findElementsByTags = (parent: Document | Element, tags: string[]): HTMLCollectionOf<Element> | null => {
  for (const tag of tags) {
    const elements = parent.getElementsByTagName(tag);
    if (elements.length > 0) return elements;
  }
  return null;
};

export const fetchVerseFromLocalXml = async (version: BibleVersion, reference: string): Promise<string | null> => {
  const fileMap: Record<BibleVersion, string> = {
    [BibleVersion.KRV]: "krv.xml",
    [BibleVersion.URIMAN]: "uriman.xml",
    [BibleVersion.NIV]: "niv.xml"
  };

  try {
    const response = await fetch(fileMap[version]);
    if (!response.ok) {
      console.warn(`File ${fileMap[version]} not found.`);
      return null;
    }

    const xmlText = await response.text();
    return parseXml(xmlText, reference);
  } catch (error) {
    console.warn(`Local XML lookup failed for ${version}:`, error);
    return null;
  }
};

const parseXml = (xmlText: string, reference: string): string | null => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "text/xml");

  // Regex improved to handle both '-' and '~' separators and optional spaces
  const match = reference.match(/(.+?)\s*(\d+)\s*:\s*(\d+)(?:\s*[-~]\s*(\d+))?/);
  if (!match) return null;

  const [_, bookNameRaw, chapterStr, startVerseStr, endVerseStr] = match;
  const bookName = bookNameRaw.trim();
  
  // Robust book lookup: Find which key in BIBLE_BOOKS_MAP contains the alias or matches the key itself
  let aliases: string[] = [bookName];
  for (const [key, value] of Object.entries(BIBLE_BOOKS_MAP)) {
    if (key === bookName || value.some(v => v.toLowerCase() === bookName.toLowerCase())) {
      aliases = [key, ...value];
      break;
    }
  }

  const books = findElementsByTags(xmlDoc, ["book", "b", "B", "BOOK"]);
  if (!books) return null;

  let targetBook: Element | null = null;
  for (let i = 0; i < books.length; i++) {
    const b = books[i];
    const attrName = (b.getAttribute("name") || b.getAttribute("n") || b.getAttribute("bname") || b.getAttribute("id") || b.getAttribute("label") || "").toLowerCase();
    
    if (aliases.some(alias => 
      attrName === alias.toLowerCase() || 
      attrName.includes(alias.toLowerCase()) ||
      alias.toLowerCase().includes(attrName)
    )) {
      targetBook = b;
      break;
    }
  }

  if (!targetBook) {
    // Second pass: try position based if it's a number
    const bookNum = parseInt(bookName);
    if (!isNaN(bookNum) && bookNum > 0 && bookNum <= books.length) {
      targetBook = books[bookNum - 1];
    }
  }

  if (!targetBook) return null;

  const chapters = findElementsByTags(targetBook, ["c", "chapter", "C", "CHAPTER"]);
  if (!chapters) return null;

  let targetChapter: Element | null = null;
  const targetCNum = chapterStr;
  for (let i = 0; i < chapters.length; i++) {
    const c = chapters[i];
    const cNum = c.getAttribute("n") || c.getAttribute("cnumber") || c.getAttribute("id") || c.getAttribute("number");
    if (cNum === targetCNum) {
      targetChapter = c;
      break;
    }
  }

  // Fallback for chapter: check by index if numeric attribute lookup fails
  if (!targetChapter) {
    const cIndex = parseInt(targetCNum) - 1;
    if (cIndex >= 0 && cIndex < chapters.length) {
      targetChapter = chapters[cIndex];
    }
  }

  if (!targetChapter) return null;

  const verses = findElementsByTags(targetChapter, ["v", "verse", "V", "VERSE", "VERS"]);
  if (!verses) return null;

  const start = parseInt(startVerseStr);
  const end = endVerseStr ? parseInt(endVerseStr) : start;

  let resultText = "";
  for (let i = 0; i < verses.length; i++) {
    const v = verses[i];
    const vNumAttr = v.getAttribute("n") || v.getAttribute("vnumber") || v.getAttribute("id") || v.getAttribute("number") || (i + 1).toString();
    const vNum = parseInt(vNumAttr);
    if (!isNaN(vNum) && vNum >= start && vNum <= end) {
      // Some XMLs have the verse number inside textContent, some don't
      let content = v.textContent || "";
      // Strip leading verse numbers if they exist in text to avoid duplication like "1. 1 말씀..."
      content = content.replace(/^\s*\d+[\s\.]*/, '').trim();
      resultText += `${vNum}. ${content} `;
    }
  }

  return resultText.trim() || null;
};
