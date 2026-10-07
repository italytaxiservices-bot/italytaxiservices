import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'

const EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png', 'avif']

/** First existing public/<base>.<ext>, checked at build time. */
function findImage(base: string): string | null {
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(process.cwd(), 'public', `${base}.${ext}`))) return `/${base}.${ext}`
  }
  return null
}

/**
 * A photo slot for editorial pages. Drop a file at public/<file>.(webp|jpg|png)
 * and it is used automatically on the next build; until then a quiet
 * placeholder shows what belongs there and at what size, so the layout can
 * be reviewed before photography is ready.
 */
export default function ImageSlot({
  file,
  alt,
  brief,
  size,
  className = '',
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  tone = 'light',
  position = 'center',
}: {
  /** Path under public/ without extension, e.g. "images/milan-fusina/hero". */
  file: string
  alt: string
  /** What the photo should show — rendered only in the placeholder. */
  brief: string
  /** Recommended pixel size, e.g. "1600 × 2000". */
  size: string
  /** Must give the box a size/aspect ratio, e.g. "aspect-[4/5]". */
  className?: string
  priority?: boolean
  sizes?: string
  tone?: 'light' | 'dark'
  /** CSS object-position, to keep the subject in frame when the slot crops the photo. */
  position?: string
}) {
  const src = findImage(file)

  if (src) {
    return (
      <div className={`relative overflow-hidden group ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          style={{ objectPosition: position }}
        />
      </div>
    )
  }

  const dark = tone === 'dark'
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      style={{
        background: dark
          ? 'linear-gradient(160deg, #1d1914 0%, #12100c 100%)'
          : 'linear-gradient(160deg, #EFE9DF 0%, #E4DCCD 100%)',
      }}
    >
      {/* Fine diagonal hatching so it reads as "photo goes here", not as a design element. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `repeating-linear-gradient(135deg, ${dark ? 'rgba(201,168,76,0.08)' : 'rgba(139,115,64,0.10)'} 0 1px, transparent 1px 14px)`,
        }}
      />
      <div className="relative text-center px-6 max-w-xs" aria-hidden="true">
        <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-2" style={{ color: dark ? '#C9A84C' : '#8B7340' }}>
          Photo
        </p>
        <p className="text-sm leading-snug mb-2" style={{ color: dark ? 'rgba(250,247,242,0.75)' : '#5a5248' }}>
          {brief}
        </p>
        <p className="text-[11px] font-mono" style={{ color: dark ? 'rgba(250,247,242,0.4)' : '#9a8f83' }}>
          public/{file}.jpg · {size}
        </p>
      </div>
    </div>
  )
}
