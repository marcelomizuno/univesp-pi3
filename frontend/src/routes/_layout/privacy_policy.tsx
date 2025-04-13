import { createFileRoute } from "@tanstack/react-router";

//import useAuth from "@/hooks/useAuth"

export const Route = createFileRoute("/_layout/privacy_policy")({
  component: Privacy,
})

function Privacy() {
  //const { user: currentUser } = useAuth()

  return (
      <>
      </>   
  )
}
