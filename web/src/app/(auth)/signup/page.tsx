import SignupForm from "../ui/signup-form";

export default async function Signup() {
  return (
    <>
      <span className="flex text-center text-zinc-500 font-semibold">Cadastre-se para ver fotos e vídeos dos seus amigos.</span>
      <SignupForm />
    </>
  )
}