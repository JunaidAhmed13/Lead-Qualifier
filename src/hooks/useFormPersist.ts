import { useCallback } from 'react'

const KEY = 'leadiq_form_draft'

interface FormState {
  name: string
  email: string
  company: string
  budget: string
  timeline: string
  message: string
}

export function useFormPersist() {
  const savedForm = (() => {
    try {
      const raw = sessionStorage.getItem(KEY)
      return raw ? (JSON.parse(raw) as Partial<FormState>) : {}
    } catch {
      return {}
    }
  })()

  const saveForm = useCallback((form: FormState) => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(form))
    } catch {
      // sessionStorage might be blocked
    }
  }, [])

  const clearForm = useCallback(() => {
    try {
      sessionStorage.removeItem(KEY)
    } catch {
      // ignore
    }
  }, [])

  return { savedForm, saveForm, clearForm }
}
