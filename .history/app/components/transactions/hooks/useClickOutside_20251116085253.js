import { useEffect } from "react"


const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handler = (e) => {
        if(!ref.current.contains(e.target)){
            callback();
        }
    };

    document.Add
  })

}

export default useClickOutside
