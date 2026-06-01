const PUBLISHED_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRcRMiOvoZBJsSxuEv-SJzW-AIne_JaS6xO2smUL8EWwUpOTJdpCiZEEc3Z5geX7dHtYM0U6DxJ4YBR/pub?gid=455762225&single=true&output=csv";

function parseCsvToList(csvText) {
  const rows = csvText.split(/\r?\n/).filter(r => r.trim() !== "");
  const out = [];
  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c => c.trim().replace(/"/g, ''));
    if (cols.length < 2) continue;
    const dateRaw = cols[0].trim();
    const reference = cols[1];
    const m = dateRaw.match(/(\d{4})[.\-\s]+(\d{1,2})[.\-\s]+(\d{1,2})/);
    if (!m) continue;
    const [, y, mo, d] = m;
    const iso = `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    out.push({ date: iso, reference });
  }
  return out;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // API 엔드포인트: 큐티 본문 참조 리스트 (Google Sheets CSV → JSON, 월간 캐싱)
    if (url.pathname === '/api/reference') {
      const cache = caches.default;
      const cacheKey = new Request(new URL('/api/reference', url.origin).toString());
      let cached = await cache.match(cacheKey);
      if (cached) return cached;

      const upstream = await fetch(PUBLISHED_CSV_URL);
      if (!upstream.ok) {
        return new Response(JSON.stringify({ error: "sheet fetch failed" }), { status: 502, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
      }
      const csvText = await upstream.text();
      const list = parseCsvToList(csvText);

      const response = new Response(JSON.stringify(list), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=2592000, stale-while-revalidate=86400"
        }
      });
      ctx.waitUntil(cache.put(cacheKey, response.clone()));
      return response;
    }

    // API 엔드포인트: 쿼리에 book 파라미터가 있으면 DB 쿼리 (기존 호환)
    if (url.searchParams.has('book') || url.pathname === '/api/bible') {
      const book = Number(url.searchParams.get('book')) || 40;
      const ch = Number(url.searchParams.get('ch')) || 8;
      const start = Number(url.searchParams.get('start')) || 14;
      const end = Number(url.searchParams.get('end')) || 15;

      if (!env.DB) {
        return new Response("데이터베이스 연결 설정(Binding)이 누락되었습니다.", { status: 500 });
      }

      try {
        const cache = caches.default;
        const cacheKey = new Request(url.toString(), request);
        const cached = await cache.match(cacheKey);
        if (cached) return cached;

        const { results } = await env.DB.prepare(
          "SELECT translation, verse, content FROM bible_verses WHERE book_id = ? AND chapter = ? AND verse BETWEEN ? AND ?"
        ).bind(book, ch, start, end).all();

        const response = new Response(JSON.stringify(results), {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "public, max-age=31536000, immutable"
          }
        });
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
        return response;
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
      }
    }

    // Static Assets 서빙
    if (env.ASSETS) {
      try {
        const response = await env.ASSETS.fetch(request);
        if (response.status !== 404) {
          return response;
        }
      } catch (e) {
        console.error('Assets fetch error:', e);
      }
    }

    return new Response("Not Found", { status: 404 });
  }
};
