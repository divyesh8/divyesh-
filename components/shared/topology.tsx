"use client";

import { motion } from "framer-motion";
import { TOPOLOGY_EDGES, TOPOLOGY_NODES } from "@/constants/content";
import { useReducedMotion } from "@/hooks/use-media-query";

/**
 * THE SIGNATURE ELEMENT.
 *
 * A cloud computing portfolio should open on a distributed system, not on
 * floating geometry. This is the stack these projects actually run on —
 * client, edge, API, model, Mongo, storage — drawn as a hairline node
 * graph. Packets of light travel the edges and nodes pulse continuously.
 *
 * All SVG + SMIL: no canvas, no requestAnimationFrame, no layout thrash.
 * Under prefers-reduced-motion the graph renders complete and still — the
 * information survives, only the movement stops.
 */

const NODE_BY_ID = Object.fromEntries(
  TOPOLOGY_NODES.map((n) => [n.id, n] as const),
);

export function Topology() {
  const reduced = useReducedMotion();

  return (
    <div className="relative aspect-square w-full max-w-[520px]">
      {/* Substrate the system sits on. */}
      <div className="grid-substrate mask-fade-b absolute inset-0 rounded-3xl opacity-70" />

      {/* Region boundaries. */}
      <div className="absolute inset-[6%] rounded-full border border-[var(--line)]" />
      <div className="absolute inset-[24%] rounded-full border border-[var(--line)] opacity-60" />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full overflow-visible"
        role="img"
        aria-label="Animated diagram of the stack: a client and edge routing into an API, which connects to an AI model, a database, and object storage."
      >
        <defs>
          <radialGradient id="packet-glow">
            <stop offset="0%" stopColor="#4F8CFF" stopOpacity="1" />
            <stop offset="60%" stopColor="#4F8CFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {TOPOLOGY_EDGES.map(([from, to], i) => {
          const a = NODE_BY_ID[from];
          const b = NODE_BY_ID[to];
          if (!a || !b) return null;
          const d = `M ${a.x} ${a.y} L ${b.x} ${b.y}`;

          return (
            <g key={`${from}-${to}`}>
              <motion.path
                d={d}
                fill="none"
                stroke="var(--line-strong)"
                strokeWidth={0.22}
                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 0.45 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />

              {!reduced && (
                <circle r={1.3} fill="url(#packet-glow)">
                  <animateMotion
                    dur={`${3.6 + i * 0.5}s`}
                    begin={`${0.8 + i * 0.7}s`}
                    repeatCount="indefinite"
                    path={d}
                    calcMode="spline"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    keySplines="0.45 0 0.55 1"
                  />
                </circle>
              )}
            </g>
          );
        })}

        {TOPOLOGY_NODES.map((node, i) => {
          const isCore = node.id === "api";
          return (
            <motion.g
              key={node.id}
              initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.25 + i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isCore ? 4.4 : 3}
                fill="var(--bg)"
                stroke={isCore ? "#4F8CFF" : "var(--line-strong)"}
                strokeWidth={isCore ? 0.4 : 0.25}
                strokeOpacity={isCore ? 0.5 : 1}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isCore ? 1.6 : 1}
                fill={isCore ? "#4F8CFF" : "var(--fg-muted)"}
              >
                {!reduced && (
                  <animate
                    attributeName="opacity"
                    values="1;0.3;1"
                    dur={`${2.8 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                )}
              </circle>
            </motion.g>
          );
        })}
      </svg>

      {/* Labels live in HTML so they stay crisp and selectable. */}
      {TOPOLOGY_NODES.map((node, i) => (
        <motion.span
          key={node.id}
          className="text-subtle pointer-events-none absolute -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-medium uppercase tracking-[0.16em]"
          style={{ left: `${node.x}%`, top: `calc(${node.y}% + 3.4%)` }}
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 + i * 0.07 }}
        >
          {node.label}
        </motion.span>
      ))}
    </div>
  );
}
