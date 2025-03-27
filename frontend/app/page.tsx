import Link from 'next/link'

const menus = [
  // {
  //   title: 'React Notes',
  //   label: 'React Notes',
  //   href: '/note'
  // },
  //  {
  //   title: 'Client Counter',
  //   label: 'Client Component',
  //   href: '/client-counter'
  // },

  {
    title: 'Zero Bundle Size',
    label: 'Zero Bundle Size Component',
    href: '/zero-bundle-size'
  },
  {
    title: 'Backend Access',
    label: 'Full Access to the Backend',
    href: '/backend-access'
  },
  {
    title: 'Inspired App',
    label: 'Component Boundary',
    href: '/inspiration'
  },
]

export default async function Counter() {
  return (
    <div className="menu">
      {menus.map(({ title, label, href }) => {
        return (
          <div key={href}>
            <span className="menu-label">{label}:&nbsp;&nbsp;</span>
            <Link href={href}>{title}</Link>
          </div>
        )
      })}
    </div>
  )
}
