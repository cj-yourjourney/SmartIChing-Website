export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fdecd3'
      }}
    >
      <h1 style={{ color: '#7a2e1a', fontSize: '2.5rem', fontWeight: 'bold' }}>
        Smart I Ching
      </h1>
      <p style={{ color: '#7a2e1a', marginTop: '1rem' }}>
        Coming soon — an AI-powered guide to the I Ching.
      </p>
    </main>
  )
}
