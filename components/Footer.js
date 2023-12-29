import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { locales } from '@/config.js'
import { useTranslation } from "@/app/i18n/index.js"

export const Footer = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer')
  const data = 1
  return (
    <footer style={{ margin: 20 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{{lng}}</strong> to:{' '}
      </Trans>
      {locales.filter((l) => lng !== l).map((l, index) => {
        return (
          <span key={l}>
            {index > 0 && (' | ')}
            <Link href={`/${l}`}>
              {l}
            </Link>
          </span>
        )
      })}
    </footer>
  )
}