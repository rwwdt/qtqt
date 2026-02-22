export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // API 엔드포인트: 쿼리에 book 파라미터가 있으면 DB 쿼리 (기존 호환)
    if (url.searchParams.has('book') || url.pathname === '/api/bible') {
      const book = url.searchParams.get('book') || 40;
      const ch = url.searchParams.get('ch') || 8;
      const start = url.searchParams.get('start') || 14;
      const end = url.searchParams.get('end') || 15;

      if (!env.DB) {
        return new Response("데이터베이스 연결 설정(Binding)이 누락되었습니다.", { status: 500 });
      }

      try {
        const { results } = await env.DB.prepare(
          "SELECT translation, verse, content FROM bible_verses WHERE book_id = ? AND chapter = ? AND verse BETWEEN ? AND ?"
        ).bind(book, ch, start, end).all();

        return new Response(JSON.stringify(results), {
          headers: { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*" 
          }
        });
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