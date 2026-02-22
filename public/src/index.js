export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const book = url.searchParams.get('book') || 40;
    const ch = url.searchParams.get('ch') || 8;
    const start = url.searchParams.get('start') || 14;
    const end = url.searchParams.get('end') || 22;

    try {
      const { results } = await env.DB.prepare(
        "SELECT translation, verse, content FROM bible_verses WHERE book_id = ? AND chapter = ? AND verse BETWEEN ? AND ? ORDER BY verse ASC"
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
};
