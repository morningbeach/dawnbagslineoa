export default {
  async fetch(request, env) {
    return new Response("PDF generator worker scaffold", { status: 200 });
  }
};
