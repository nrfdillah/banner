import '@components/navbar/navbar'
import '@styles/global.css'
import Navbar from '@components/navbar/navbar'

export const metadata = {
  title: 'dillah-banner',
  description: 'W-12',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Navbar/>{children}</body>
      
    </html>
  )
}
