export function AsterMark() {
  return (
    <svg className="aster-mark" viewBox="0 0 40 40" aria-hidden="true">
      <g fill="currentColor">
        {Array.from({ length: 8 }, (_, index) => (
          <ellipse
            key={index}
            cx="20"
            cy="10.5"
            rx="3.6"
            ry="8"
            transform={`rotate(${index * 45} 20 20)`}
          />
        ))}
      </g>
      <circle cx="20" cy="20" r="4" fill="var(--accent-secondary)" />
    </svg>
  );
}
