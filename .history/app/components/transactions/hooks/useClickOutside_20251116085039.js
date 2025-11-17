import { useEffect } from "react"


const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handler = (e) => {
        if(!ref.current.contains(e.target))
    }
  })

}

export default useClickOutside
