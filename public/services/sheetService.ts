
const REFERENCE_ENDPOINT = "https://qt-bible-api.junjunebug.workers.dev/api/reference";

export const getReferenceForDate = async (targetDate: Date): Promise<string> => {
  const y = targetDate.getFullYear();
  const m = targetDate.getMonth() + 1;
  const d = targetDate.getDate();

  const pad = (n: number) => String(n).padStart(2, '0');
  const iso = `${y}-${pad(m)}-${pad(d)}`;

  try {
    const res = await fetch(REFERENCE_ENDPOINT);
    if (!res.ok) return "";

    const list: { date: string; reference: string }[] = await res.json();
    const found = list.find(item => item.date === iso);
    return found?.reference ?? "";
  } catch (error) {
    console.error("Sheet Sync Error:", error);
    return "";
  }
};
