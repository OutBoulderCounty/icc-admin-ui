import { useEffect } from "react"
import Loader from "./loader"
import { authenticateUserToken, LOCAL_STORAGE_SESSION_TOKEN } from "../utils"
import AuthConsumer from "../context/authContext"
import { Navigate, useNavigate } from "react-router"

function LocalAuth() {
  const { authed, login, logout } = AuthConsumer()
  const existingSessionToken = localStorage.getItem(LOCAL_STORAGE_SESSION_TOKEN)
  const url = window.location.search
  const urlSearch = new URLSearchParams(url)
  const token = urlSearch.get("token")
  const navigate = useNavigate()

  useEffect(() => {
    if (existingSessionToken) {
      login()
    } else if (token) {
      ;(async () => {
        try {
          await authenticateUserToken(token, login)
        } catch (error) {
          alert(error)
          logout()
          navigate("/login")
        }
      })()
    }
  })

  return authed ? <Navigate to="/" /> : <Loader />
}

export default LocalAuth
