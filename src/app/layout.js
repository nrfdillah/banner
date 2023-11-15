import './globals.css'

export const metadata = {
  title: 'dillah-banner',
  description: 'W-12',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
