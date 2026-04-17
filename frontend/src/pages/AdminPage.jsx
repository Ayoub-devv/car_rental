import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api, { ADMIN_TOKEN_STORAGE_KEY, applyAdminToken } from '../api/client'
import { formatMoney, formatShortDate } from '../utils/formatters'

function AdminPage() {
  const [token, setToken] = useState(() => window.localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY) ?? '')
  const [credentials, setCredentials] = useState({
    email: 'admin@carrental.test',
    password: 'password',
  })
  const [reservations, setReservations] = useState([])
  const [statuses, setStatuses] = useState([])
  const [draftStatuses, setDraftStatuses] = useState({})
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(Boolean(token))
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    if (!token) {
      return undefined
    }

    let isMounted = true

    async function loadReservations() {
      try {
        setIsLoading(true)
        setError('')

        const { data } = await api.get('/admin/reservations')

        if (!isMounted) {
          return
        }

        setReservations(data.reservations)
        setStatuses(data.statuses)
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setError(
          loadError.response?.data?.message ??
            "Impossible de charger les reservations admin.",
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadReservations()

    return () => {
      isMounted = false
    }
  }, [token])

  async function handleLogin(event) {
    event.preventDefault()
    setIsAuthenticating(true)
    setError('')
    setFeedback('')

    try {
      const { data } = await api.post('/admin/login', credentials)
      applyAdminToken(data.token)
      setToken(data.token)
      setFeedback(`Bienvenue ${data.user.name}.`)
    } catch (loginError) {
      setError(
        loginError.response?.data?.errors?.email?.[0] ??
          loginError.response?.data?.message ??
          'Connexion admin impossible.',
      )
    } finally {
      setIsAuthenticating(false)
    }
  }

  async function handleLogout() {
    try {
      await api.post('/admin/logout')
    } catch {
      // Clear the local token even if the API call fails.
    } finally {
      applyAdminToken(null)
      setToken('')
      setReservations([])
      setStatuses([])
      setDraftStatuses({})
      setFeedback('Session admin fermee.')
    }
  }

  async function handleStatusUpdate(reservationId) {
    const currentReservation = reservations.find((reservation) => reservation.id === reservationId)
    const nextStatus = draftStatuses[reservationId] ?? currentReservation?.status

    if (!nextStatus) {
      return
    }

    setUpdatingId(reservationId)
    setError('')
    setFeedback('')

    try {
      const { data } = await api.put(`/admin/reservations/${reservationId}/status`, {
        status: nextStatus,
      })

      setReservations((currentReservations) =>
        currentReservations.map((reservation) =>
          reservation.id === reservationId ? data.reservation : reservation,
        ),
      )
      setDraftStatuses((currentDrafts) => {
        const nextDrafts = { ...currentDrafts }
        delete nextDrafts[reservationId]
        return nextDrafts
      })
      setFeedback('Statut mis a jour avec succes.')
    } catch (updateError) {
      setError(
        updateError.response?.data?.errors?.status?.[0] ??
          updateError.response?.data?.message ??
          'Mise a jour impossible.',
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const pendingCount = reservations.filter((reservation) => reservation.status === 'pending').length
  const confirmedCount = reservations.filter((reservation) => reservation.status === 'confirmed').length
  const cancelledCount = reservations.filter((reservation) => reservation.status === 'cancelled').length

  return (
    <div className="page-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand__mark">CR</span>
          <span>Admin reservations</span>
        </Link>

        <nav className="topbar__nav">
          <Link className="pill-link" to="/">
            Retour au site
          </Link>
        </nav>
      </header>

      <div className="admin-shell">
        <section className="admin-panel">
          <span className="section__eyebrow">Espace admin</span>
          <h1 className="admin-panel__title">Suivi des reservations et changement de statut</h1>
          <p className="admin-panel__text">
            Les endpoints admin sont proteges par Sanctum. Connectez-vous avec
            l utilisateur seed par le backend, puis pilotez les statuts :
            pending, confirmed, cancelled.
          </p>

          {feedback ? <div className="banner banner--success">{feedback}</div> : null}
          {error ? <div className="banner banner--danger">{error}</div> : null}

          {!token ? (
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-row">
                <label className="form-field">
                  <span>Email admin</span>
                  <input
                    name="email"
                    onChange={(event) =>
                      setCredentials((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    type="email"
                    value={credentials.email}
                  />
                </label>

                <label className="form-field">
                  <span>Mot de passe</span>
                  <input
                    name="password"
                    onChange={(event) =>
                      setCredentials((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    type="password"
                    value={credentials.password}
                  />
                </label>
              </div>

              <p className="field-help">
                Identifiants seedes par defaut : admin@carrental.test / password
              </p>

              <button className="button" disabled={isAuthenticating} type="submit">
                {isAuthenticating ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          ) : (
            <div className="admin-panel__actions">
              <button className="button--ghost" onClick={handleLogout} type="button">
                Fermer la session
              </button>
            </div>
          )}
        </section>

        {token ? (
          <>
            <section className="admin-metrics">
              <article className="metric">
                <span className="metric__label">Total</span>
                <div className="metric__value">{reservations.length}</div>
              </article>
              <article className="metric">
                <span className="metric__label">Pending</span>
                <div className="metric__value">{pendingCount}</div>
              </article>
              <article className="metric">
                <span className="metric__label">Confirmed</span>
                <div className="metric__value">{confirmedCount}</div>
              </article>
              <article className="metric">
                <span className="metric__label">Cancelled</span>
                <div className="metric__value">{cancelledCount}</div>
              </article>
            </section>

            <section className="admin-panel">
              <h2 className="admin-panel__title">Reservations recues</h2>
              {isLoading ? (
                <p className="admin-panel__text">Chargement des reservations...</p>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Voiture</th>
                        <th>Dates</th>
                        <th>Total</th>
                        <th>Statut</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((reservation) => {
                        const nextStatus = draftStatuses[reservation.id] ?? reservation.status

                        return (
                          <tr key={reservation.id}>
                            <td>
                              <div className="row-stack">
                                <strong>{reservation.customer_name}</strong>
                                <span>{reservation.customer_phone}</span>
                              </div>
                            </td>
                            <td>
                              <div className="row-stack">
                                <strong>{reservation.car.name}</strong>
                                <span>{formatMoney(reservation.car.price_per_day)} / jour</span>
                              </div>
                            </td>
                            <td>
                              <div className="row-stack">
                                <span>{formatShortDate(reservation.start_date)}</span>
                                <span>{formatShortDate(reservation.end_date)}</span>
                              </div>
                            </td>
                            <td>{formatMoney(reservation.total_price)}</td>
                            <td>
                              <div className="row-stack">
                                <span className={`status-pill status-pill--${reservation.status}`}>
                                  {reservation.status}
                                </span>
                                <select
                                  onChange={(event) =>
                                    setDraftStatuses((currentDrafts) => ({
                                      ...currentDrafts,
                                      [reservation.id]: event.target.value,
                                    }))
                                  }
                                  value={nextStatus}
                                >
                                  {statuses.map((status) => (
                                    <option key={status} value={status}>
                                      {status}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </td>
                            <td>
                              <button
                                className="status-button"
                                disabled={updatingId === reservation.id}
                                onClick={() => handleStatusUpdate(reservation.id)}
                                type="button"
                              >
                                {updatingId === reservation.id ? 'En cours...' : 'Mettre a jour'}
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default AdminPage
