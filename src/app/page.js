'use client'

import { useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'

import Landing from '@/components/Landing'
import Preloader from '@/components/Preloader'
import Service from '@/components/Service'

export default function Home() {
  const [loaderFinished, setLoaderFinished] = useState(false)
  const [timeline, setTimeline] = useState(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoaderFinished(true)
      })
      setTimeline(tl)
    })

    return () => context.revert()
  }, [])

  return (
    <main>
      {loaderFinished ? (
        <>
          <Landing />
          <Service />
        </>
      ) : (
        <Preloader timeline={timeline} />
      )}
    </main>
  )
}
