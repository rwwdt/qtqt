
const PUBLISHED_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRcRMiOvoZBJsSxuEv-SJzW-AIne_JaS6xO2smUL8EWwUpOTJdpCiZEEc3Z5geX7dHtYM0U6DxJ4YBR/pub?gid=455762225&single=true&output=csv";

export const getReferenceForDate = async (targetDate: Date): Promise<string> => {
  const y = targetDate.getFullYear();
  const m = targetDate.getMonth() + 1;
  const d = targetDate.getDate();
  
  const pad = (n: number) => String(n).padStart(2, '0');
  
  // 시트의 날짜 형식에 맞춘 다양한 비교용 포맷
  const targetDateStrings = [
    `${y}.${pad(m)}.${pad(d)}`,
    `${y}.${m}.${d}`,
    `${y}-${pad(m)}-${pad(d)}`,
    `${y}. ${pad(m)}. ${pad(d)}`,
    `${y}. ${m}. ${d}`
  ];

  try {
    const response = await fetch(PUBLISHED_CSV_URL);
    if (!response.ok) throw new Error("시트 로드 실패");

    const csvText = await response.text();
    const rows = csvText.split(/\r?\n/).filter(row => row.trim() !== "");
    
    for (let i = 1; i < rows.length; i++) {
      const columns = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.trim().replace(/"/g, ''));
      if (columns.length < 2) continue;

      const sheetDateRaw = columns[0].trim();
      const sheetRef = columns[1];

      if (targetDateStrings.some(target => sheetDateRaw === target)) {
        return sheetRef;
      }
    }

    return ""; 
  } catch (error) {
    console.error("Sheet Sync Error:", error);
    return ""; 
  }
};
