import { useState } from 'react'
import api from '../api/client'
import { calculateRentalDays, formatMoney, getTodayDateInput } from '../utils/formatters'

const initialForm = {
  start_date: '',
  end_date: '',
  customer_name: '',
  customer_phone: '',
}

function ReservationForm({ car, onReservationCreated }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState('')
  const [successReservation, setSuccessReservation] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const rentalDays = calculateRentalDays(form.start_date, form.end_date)
  const totalPreview = rentalDays * Number(car.price_per_day || 0)
  const today = getTodayDateInput()

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
    setFeedback('')
    setErrors({})
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setFeedback('')
    setErrors({})

    try {
      const { data } = await api.post('/reservations', {
        ...form,
        car_id: car.id,
      })

      setSuccessReservation(data.reservation)
      setForm(initialForm)
      onReservationCreated?.(data.reservation)
    } catch (error) {
      const message =
        error.response?.data?.message ??
        "La reservation n'a pas pu etre enregistree pour le moment."

      setFeedback(message)
      setErrors(error.response?.data?.errors ?? {})
      setSuccessReservation(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  function fieldError(name) {
    return errors[name]?.[0] ?? null
  }

  return (
    <section className="reservation-card" id={`reserve-${car.id}`}>
      <span className="detail-card__eyebrow">Reservation rapide</span>
      <h2>Reserve {car.name} sans compte client</h2>
      <p className="admin-panel__text">
        Choisissez vos dates, laissez votre nom et votre numero, puis nous
        confirmons la demande cote admin.
      </p>

      {successReservation ? (
        <div className="banner banner--success">
          Demande #{successReservation.id} enregistree. Statut initial :
          {' '}
          <strong>{successReservation.status}</strong>
          . Total estime :
          {' '}
          <strong>{formatMoney(successReservation.total_price)}</strong>
          .
        </div>
      ) : null}

      {feedback ? <div className="banner banner--danger">{feedback}</div> : null}

      <div className="reservation-summary">
        <span className="summary-pill">{formatMoney(car.price_per_day)} / jour</span>
        <span className="summary-pill">{rentalDays || 0} jour(s)</span>
        <span className="summary-pill">{formatMoney(totalPreview)} total</span>
      </div>

      <form className="reservation-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-field">
            <span>Date de debut</span>
            <input
              min={today}
              name="start_date"
              onChange={handleChange}
              type="date"
              value={form.start_date}
            />
            {fieldError('start_date') ? (
              <span className="field-error">{fieldError('start_date')}</span>
            ) : null}
          </label>

          <label className="form-field">
            <span>Date de fin</span>
            <input
              min={form.start_date || today}
              name="end_date"
              onChange={handleChange}
              type="date"
              value={form.end_date}
            />
            {fieldError('end_date') ? (
              <span className="field-error">{fieldError('end_date')}</span>
            ) : null}
          </label>
        </div>

        {fieldError('dates') ? (
          <span className="field-error">{fieldError('dates')}</span>
        ) : null}

        <label className="form-field">
          <span>Nom du client</span>
          <input
            name="customer_name"
            onChange={handleChange}
            placeholder="Ex: Ayoub El Idrissi"
            type="text"
            value={form.customer_name}
          />
          {fieldError('customer_name') ? (
            <span className="field-error">{fieldError('customer_name')}</span>
          ) : null}
        </label>

        <label className="form-field">
          <span>Telephone</span>
          <input
            name="customer_phone"
            onChange={handleChange}
            placeholder="Ex: +212 6 12 34 56 78"
            type="tel"
            value={form.customer_phone}
          />
          {fieldError('customer_phone') ? (
            <span className="field-error">{fieldError('customer_phone')}</span>
          ) : null}
        </label>

        <button className="button" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Envoi de la demande...' : 'Confirmer ma reservation'}
        </button>
      </form>
    </section>
  )
}

export default ReservationForm
