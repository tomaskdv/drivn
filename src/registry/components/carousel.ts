export const carousel = `'use client'

import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'

type CarouselApi = UseEmblaCarouselType[1]
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]
type CarouselPlugins = Parameters<typeof useEmblaCarousel>[1]

const styles = {
  root: 'relative focus-visible:outline-none',
  content: {
    viewport: 'overflow-hidden',
    container: 'flex',
    horizontal: '-ml-4',
    vertical: '-mt-4 flex-col h-full',
  },
  item: {
    base: 'min-w-0 shrink-0 grow-0 basis-full',
    horizontal: 'pl-4',
    vertical: 'pt-4',
  },
  arrow: cn(
    'absolute top-1/2 -translate-y-1/2',
    'w-8 px-0 bg-card/80 backdrop-blur-sm'
  ),
  dots: {
    wrapper: 'flex justify-center gap-1.5 mt-3',
    dot: cn(
      'w-2 h-2 rounded-full transition-colors',
      'bg-border cursor-pointer'
    ),
    active: 'bg-foreground',
  },
}

interface CarouselCtx {
  emblaRef: UseEmblaCarouselType[0]
  api: CarouselApi
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  scrollSnaps: number[]
  orientation: 'horizontal' | 'vertical'
}

interface CarouselRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  opts?: CarouselOptions
  plugins?: CarouselPlugins
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

function CarouselRoot({
  opts,
  plugins,
  orientation = 'horizontal',
  setApi,
  className,
  children,
  ...props
}: CarouselRootProps) {
  const [emblaRef, api] = useEmblaCarousel({ ...opts, axis: orientation === 'vertical' ? 'y' : 'x' }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])

  const onSelect = React.useCallback((emblaApi: NonNullable<CarouselApi>) => {
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [])

  React.useEffect(() => {
    if (!api) return
    setScrollSnaps(api.scrollSnapList())
    onSelect(api)
    api.on('reInit', onSelect)
    api.on('select', onSelect)
    return () => {
      api.off('reInit', onSelect)
      api.off('select', onSelect)
    }
  }, [api, onSelect])

  React.useEffect(() => {
    if (setApi && api) setApi(api)
  }, [api, setApi])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (!api) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      api.scrollPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      api.scrollNext()
    }
  }, [api])

  return (
    <Ctx.Provider
      value={{
        emblaRef,
        api,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnaps,
        orientation,
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={cn(styles.root, className)}
        {...props}
      >
        {children}
      </div>
    </Ctx.Provider>
  )
}

function Content({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { emblaRef, orientation } = useCarousel()
  return (
    <div className={cn(styles.content.viewport, className)} ref={emblaRef}>
      <div className={cn(styles.content.container, orientation === 'vertical' ? styles.content.vertical : styles.content.horizontal)}>
        {children}
      </div>
    </div>
  )
}

function Item({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { orientation } = useCarousel()
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(styles.item.base, orientation === 'vertical' ? styles.item.vertical : styles.item.horizontal, className)}
    >
      {children}
    </div>
  )
}

function Previous({
  className,
  variant = 'secondary',
  size = 'sm',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { api, canScrollPrev } = useCarousel()
  return (
    <Button
      variant={variant}
      size={size}
      aria-label="Previous slide"
      className={cn(styles.arrow, '-left-12', className)}
      disabled={!canScrollPrev}
      onClick={() => api?.scrollPrev()}
      {...props}
    >
      <ChevronLeft className="w-4 h-4" />
    </Button>
  )
}

function Next({
  className,
  variant = 'secondary',
  size = 'sm',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { api, canScrollNext } = useCarousel()
  return (
    <Button
      variant={variant}
      size={size}
      aria-label="Next slide"
      className={cn(styles.arrow, '-right-12', className)}
      disabled={!canScrollNext}
      onClick={() => api?.scrollNext()}
      {...props}
    >
      <ChevronRight className="w-4 h-4" />
    </Button>
  )
}

function Dots({
  className,
}: {
  className?: string
}) {
  const { api, scrollSnaps, selectedIndex } = useCarousel()
  return (
    <div className={cn(styles.dots.wrapper, className)}>
      {scrollSnaps.map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={\`Go to slide \${i + 1}\`}
          className={cn(styles.dots.dot, i === selectedIndex && styles.dots.active)}
          onClick={() => api?.scrollTo(i)}
        />
      ))}
    </div>
  )
}

const Ctx = React.createContext<CarouselCtx | null>(null)

function useCarousel() {
  const ctx = React.useContext(Ctx)
  if (!ctx) throw new Error('Carousel.* used outside <Carousel>')
  return ctx
}

export type { CarouselApi }

export const Carousel = Object.assign(CarouselRoot, {
  Content,
  Item,
  Previous,
  Next,
  Dots
})
`