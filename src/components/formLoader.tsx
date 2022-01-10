import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Loader from './loader'
import { getForm } from '../utils'
import Form from './form'
import NotificationBanner from './notificationBanner'

type FormProps = {
  id: number;
  name: string;
  required: boolean;
  live: false;
  elements: any;
  updated: any;
}

const FormLoader = () => {
  const { id } = useParams()
  const [form, setForm] = React.useState<FormProps | undefined>()
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (!form?.name) {
      setIsLoading(true);
      (async () => {
        try {
          const form = await getForm(id)
          setForm(form)
        } catch (e) {
          alert(e)
        }
      })();
      setIsLoading(false);
    }
  }, [setIsLoading, form, id])

  if (isLoading) {
    return (
      <>
      <NotificationBanner />
      <Loader />
      </>
    )
  }

  if (form?.name) {
    return <Form form={form} setIsLoading={setIsLoading} />
  }

  return <Loader />
}

export default FormLoader;
export type { FormProps }
