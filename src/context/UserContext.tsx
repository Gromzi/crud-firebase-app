import { User, onAuthStateChanged } from 'firebase/auth'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { auth } from '../config/firebase'

interface UserContextType {
  user: User | null
}

export const UserContext = createContext<UserContextType>({
  user: null,
})

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}
