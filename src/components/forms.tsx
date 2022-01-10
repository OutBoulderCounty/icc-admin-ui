import React from "react"
import { Link } from "react-router-dom"
import Loader from "./loader"
import { LOCAL_STORAGE_SESSION_TOKEN } from "../utils"
import Error from "./error"

type ActiveProps = {
  isActive: boolean
  className?: string
}

const Active: React.FC<ActiveProps> = ({ isActive, className, children }) => {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${className} ${
        isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {children}
    </span>
  )
}

type Form = {
  id: string
  name: string
  required: boolean
  live: boolean
}

type JSONResponse = {
  forms: Form[]
}

const Forms: React.FC = () => {
  const [forms, setForms] = React.useState<Form[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const sessionToken = localStorage.getItem(LOCAL_STORAGE_SESSION_TOKEN)
    if (sessionToken && !forms.length) {
      setIsLoading(true)
      const headers = new Headers()
      headers.append("Content-Type", "application/json")
      headers.append("Authorization", sessionToken ? sessionToken : "")
      fetch(process.env.REACT_APP_API_ENDPOINT + "/forms/all", {
        method: "GET",
        headers: headers,
      })
        .then((resp) => resp.json() as Promise<JSONResponse>)
        .then((data) => {
          setForms(data.forms)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err)
          setIsLoading(false)
        })
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error} />
  }

  return (
    <div>
      <div className="flex flex-col h-full">
        <div className="my-3 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div>
              <table className="divide-y divide-gray-200 max-w-xl mx-auto border border-gray-200 h-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Form Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Required
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Live
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody className="overflow-y-scroll">
                  {forms
                    ?.sort((a, b) => {
                      if (a.required < b.required) return 1
                      if (a.required > b.required) return -1
                      return 0
                    })
                    .map((form, formIdx) => (
                      <tr
                        key={form.id}
                        className={
                          formIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {form.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Active isActive={form.required}>
                            {form.required ? "Yes" : "No"}
                          </Active>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Active isActive={form.live}>
                            {form.live ? "Active" : "Inactive"}
                          </Active>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/form/${form.id}`}
                            className="text-violet hover:text-violet-darkest"
                          >
                            Update
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forms
