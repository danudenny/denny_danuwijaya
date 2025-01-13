import './globals.css'
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-grotesk',
})

export const metadata = {
  title: 'Denny Danuwijaya - Software Engineer',
  description: 'GIS Developer & API Engineer specializing in spatial data analysis and web development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  )
}
