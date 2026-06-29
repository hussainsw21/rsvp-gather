function SummaryCards({ summary }) {
  const cards = [
    { label: "Accepts", value: summary.yesCount },
    { label: "Declines", value: summary.noCount },
    { label: "Tentative", value: summary.maybeCount },
    { label: "Guests", value: summary.totalGuests },
  ];

  return (
    <section className="summary-grid" aria-label="Event summary">
      {cards.map((card) => (
        <article className="summary-card" key={card.label}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;
