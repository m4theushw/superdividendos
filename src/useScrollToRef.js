import { useRef } from 'react'

const useScrollToRef = () => {
  const ref = useRef()

  const click = () => {
    if (ref.current) {
      const top = $(ref.current).offset().top
      $('html, body').animate({ scrollTop: top }, 500)
    }
  }

  return [ref, click]
}

export default useScrollToRef
