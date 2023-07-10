import { useRouter } from "wouter"

export const useNavigate = () => {
  const router = useRouter()
  return router.hook(router)[1]
}
