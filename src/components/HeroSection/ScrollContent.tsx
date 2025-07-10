"use client"

export default function ScrollContent() {
  return (
    <section style={{ height: "200vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "110vh",
          left: "55%",
          transform: "translateX(-50%)",
          color: "#111",
          maxWidth: "400px",
        }}
      >
        <h2 className="text-4xl font-bold mb-4">About Zsideo</h2>
        <p>
          Zsideo turns your raw videos into viral-ready shorts and reels with AI-driven editing.
          Level up your content effortlessly!
        </p>
      </div>
    </section>
  )
}
