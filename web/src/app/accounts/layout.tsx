import { NavigationMenu, NavigationMenuSection } from "@/components/navigation-menu";
import { ArrowDownToLine, AtSign, Ban, Bell, BellOff, ChartNoAxesColumn, CircleOff, HeartOff, ImagePlay, LifeBuoy, Lock, MessageCircle, MessagesSquare, MonitorSmartphone, Newspaper, RefreshCw, ShieldCheck, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const sections: { title: string, items: { href: string, label: string, icon: ReactNode }[] }[] = [
  {
    title: 'Como você usa o Instagram',
    items: [
      { href: '#', icon: <Image width={28} height={28} alt="avatar" src='/user.svg' />, label: 'Editar perfil' },
      { href: '#', icon: <Bell />, label: 'Notificações' },
    ]
  },
  {
    title: 'Quem pode ver seu conteúdo',
    items: [
      { href: '#', icon: <Lock />, label: 'Privacidade da conta' },
      { href: '#', icon: <div className="h-6 w-6 p-1 rounded-full border-2 border-black flex justify-center items-center"><Star /></div>, label: 'Amigos Próximos' },
      { href: '#', icon: <Ban />, label: 'Bloqueados' },
      { href: '#', icon: <CircleOff />, label: 'Ocultar story e transmissão ao vivo' },
    ]
  },
  {
    title: 'Como outros podem interagir com você',
    items: [
      { href: '#', icon: <Image height={24} width={24} alt="messager" src='/messager.svg' />, label: 'Mensagens e respostas ao story' },
      { href: '#', icon: <AtSign />, label: 'Marcações e menções' },
      { href: '#', icon: <MessageCircle />, label: 'Comentários' },
      { href: '#', icon: <RefreshCw />, label: 'Compartilhamento' },
      { href: '#', icon: <Image height={24} width={24} alt="block-user" src='/block-user.png' />, label: 'Contas restritas' },
      { href: '#', icon: <Image height={24} width={24} alt="words" src='/words.png' />, label: 'Palavras ocultas' },
    ]
  },
  {
    title: 'O que você vê',
    items: [
      { href: '#', icon: <BellOff />, label: 'Contas silenciadas' },
      { href: '#', icon: <ImagePlay />, label: 'Preferências de conteúdo' },
      { href: '#', icon: <HeartOff />, label: 'Número de curtidas e compartilhamentos' },
    ]
  },
  {
    title: 'Seu app e suas mídias',
    items: [
      { href: '#', icon: <ArrowDownToLine />, label: 'Arquivar e baixar' },
      { href: '#', icon: <MessagesSquare />, label: 'Idioma' },
      { href: '#', icon: <MonitorSmartphone />, label: 'Permissões do site' },
    ]
  },
  {
    title: 'Para famílias',
    items: [
      { href: '#', icon: <Image width={28} height={28} alt="family" src='/family.png' />, label: 'Central da Família' },
    ]
  },
  {
    title: 'Para profissionais',
    items: [
      { href: '#', icon: <ChartNoAxesColumn />, label: 'Tipo e ferramentas da conta' },
    ]
  },
  {
    title: 'Mais informações e suporte',
    items: [
      { href: '#', icon: <LifeBuoy />, label: 'Ajuda' },
      { href: '#', icon: <Image width={28} height={28} alt="shield-star" src='/shield-star.png' />, label: 'Central de Privacidade' },
      { href: '#', icon: <User />, label: 'Status da conta' },
    ]
  },
]

const links: { label: string }[] = [
  { label: 'Meta' },
  { label: 'Sobre' },
  { label: 'Blog' },
  { label: 'Carreiras' },
  { label: 'Ajuda' },
  { label: 'API' },
  { label: 'Privacidade' },
  { label: 'Termos' },
  { label: 'Localizações' },
  { label: 'Instagram Lite' },
  { label: 'Threads' },
  { label: 'Carregamento de contatos e não usuários' },
  { label: 'Meta Verified' },
]

export default function AccountsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 flex">
      <div className="h-screen overflow-auto py-10 w-83 border-r border-border">
        <h2 className="px-4 mx-auto w-60 mb-6 font-bold text-lg">Configurações</h2>
        <div className="cursor-pointer rounded-2xl bg-white hover:bg-zinc-100 shadow-custom shadow-zinc-200 mx-auto w-68 p-5">
          <Image width={60} height={60} alt="logo" src='/meta.svg' />

          <div className="mt-4 flex flex-col justify-start items-stretch leading-4">
            <span className="text-sm font-bold leading-4">Central de Contas</span>
          </div>

          <div className="mt-3 flex flex-col justify-start items-stretch">
            <span className="text-xs text-zinc-500">
              Gerencie suas experiências conectadas e configurações de contas nas tecnologias da Meta.
            </span>
          </div>

          <div className="mt-5">
            <div className="flex justify-start items-center text-xs text-zinc-500">
              <User className="size-5" />
              <div className="ml-3">
                <span>Detalhes pessoais</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-start items-center text-xs text-zinc-500">
              <ShieldCheck className="size-5" />
              <div className="ml-3">
                <span>Senha e segurança</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-start items-center text-xs text-zinc-500">
              <Newspaper className="size-5" />
              <div className="ml-3">
                <span>Preferências de anúncios</span>
              </div>
            </div>
          </div>

          <div className="mt-4 mb-1">
            <span className="text-xs text-blue-600">Ver mais na Central de Contas</span>
          </div>
        </div>
        <div>
          <div className="mx-auto w-64">
            <NavigationMenu>
              {
                sections.map(({ items, title }) => (
                  <NavigationMenuSection
                    key={title}
                    title={title}
                    items={items}
                  />
                ))
              }
            </NavigationMenu>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start items-stretch h-screen overflow-auto">
        <div className="flex-1 px-12 py-9 max-w-177 flex flex-col justify-start items-stretch self-center">
          {children}
        </div>

        <footer className="px-4">
          <div className="mb-14 flex flex-col justify-start items-stretch leading-4">
            <div className="mt-6 flex flex-wrap justify-center items-stretch">
              {
                links.map(({ label }) => (
                  <div key={label} className="mx-2 mb-3 flex flex-col justify-start items-stretch">
                    <Link className="text-xs text-zinc-500 hover:underline" href='#'><span>{label}</span></Link>
                  </div>
                ))
              }
            </div>

            <div className="my-3 flex items-stretch justify-center text-xs text-zinc-500">
              <span>
                Português (Brasil)
              </span>
              <div className="ml-4">
                <span>
                  © 2025 Instagram from Meta
                </span>
              </div>
            </div>
          </div>

        </footer>
      </div>
    </div>
  )
}