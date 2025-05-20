"use client"

import { toaster } from "@/components/ui/toaster"

const useCustomToast = () => {
  const showSuccessToast = (description: string) => {
    toaster.create({
      title: "Sucesso!",
      description,
      type: "success",
    })
  }

  const showErrorToast = (description: string) => {
    toaster.create({
      title: "Algo deu errado!",
      description,
      type: "error",
    })
  }

  return { showSuccessToast, showErrorToast }
}

export default useCustomToast
