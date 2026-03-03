export function Features() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Tempo real",
            desc: "Resultados atualizados instantaneamente com WebSocket.",
          },
          {
            title: "1 voto por pessoa",
            desc: "Sistema seguro impedindo votos duplicados.",
          },
          {
            title: "Link compartilhável",
            desc: "Crie a enquete e envie o link para qualquer pessoa.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
          >
            <h4 className="font-semibold text-lg mb-2">{f.title}</h4>
            <p className="text-slate-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
