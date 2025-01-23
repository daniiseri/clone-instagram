import Link from "next/link"

const links: { url: string, text: string }[] = [
  { text: 'Meta', url: '#' },
  { text: 'Sobre', url: '#' },
  { text: 'Blog', url: '#' },
  { text: 'Carreiras', url: '#' },
  { text: 'Ajuda', url: '#' },
  { text: 'API', url: '#' },
  { text: 'Privacidade', url: '#' },
  { text: 'Termos', url: '#' },
  { text: 'Localizações', url: '#' },
  { text: 'Instagram Lite', url: '#' },
  { text: 'Threads', url: '#' },
  { text: 'Carregamento de contatos e não usuários', url: '#' },
  { text: 'Meta Verified', url: '#' },
]

export function Footer() {
  return (
    <footer className="flex justify-center text-xs text-zinc-500 pb-16 pt-5">
      <div className="px-5 space-y-4">
        <ul className="flex flex-wrap justify-center gap-2">
          {
            links.map(({ text, url }) => (
              <li key={text}>
                <Link href={url} className="hover:underline">{text}</Link>
              </li>
            ))
          }
        </ul>

        <div className="flex justify-center gap-4">
          <div>Português (Brasil)</div>
          <div>© 2025 Instagram from Meta</div>
        </div>
      </div>
    </footer>
  )
}