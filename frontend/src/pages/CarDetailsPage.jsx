import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/client'
import ReservationForm from '../components/ReservationForm'
import { enrichCar, loadCatalogMetadata } from '../utils/catalog'
import { formatMoney, formatShortDate } from '../utils/formatters'

function CarDetailsPage() {
  const { carId } = useParams()
  const [car, setCar] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadCar() {
      try {
        setIsLoading(true)
        setError('')

        const [apiResponse, metadataMap] = await Promise.all([
          api.get(`/cars/${carId}`),
          loadCatalogMetadata(),
        ])

        if (!isMounted) {
          return
        }

        setCar(enrichCar(apiResponse.data.car, metadataMap))
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setError(
          loadError.response?.data?.message ??
            'Impossible de charger cette fiche voiture.',
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCar()

    return () => {
      isMounted = false
    }
  }, [carId])

  function handleReservationCreated(reservation) {
    setCar((currentCar) => {
      if (!currentCar) {
        return currentCar
      }

      return {
        ...currentCar,
        booked_ranges: [
          ...(currentCar.booked_ranges ?? []),
          {
            start_date: reservation.start_date,
            end_date: reservation.end_date,
            status: reservation.status,
          },
        ],
      }
    })
  }

  if (isLoading) {
    return (
      <div className="page-shell">
        <div className="state-panel">
          <h2>Chargement de la fiche voiture...</h2>
        </div>
      </div>
    )
  }

  if (error || !car) {
    return (
      <div className="page-shell">
        <div className="state-panel">
          <h2>Fiche indisponible</h2>
          <p className="banner banner--danger">{error || 'Voiture introuvable.'}</p>
          <Link className="button--soft" to="/">
            Retour au catalogue
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell">
      <Link className="back-link" to="/">
        Retour au catalogue
      </Link>

      <div className="detail-layout">
        <section className="detail-card">
          <span className="detail-card__eyebrow">Fiche voiture</span>
          <div className="detail-card__meta">
            <span>{car.segment}</span>
            <span>{formatMoney(car.price_per_day)} / jour</span>
          </div>
          <h1 className="detail-card__title">{car.name}</h1>
          <p className="detail-card__text">{car.description}</p>

          <div className="detail-card__media">
            {car.image ? <img src={car.image} alt={car.name} /> : <span>Image indisponible</span>}
          </div>

          <div className="detail-features">
            {car.features.map((feature) => (
              <span className="feature-pill" key={`${car.id}-${feature.label}`}>
                <img src={feature.icon} alt="" aria-hidden="true" />
                <span>{feature.label}</span>
              </span>
            ))}
          </div>

          <div className="detail-booked">
            {(car.booked_ranges ?? []).length ? (
              car.booked_ranges.map((range, index) => (
                <span className="booked-pill" key={`${range.start_date}-${range.end_date}-${index}`}>
                  {formatShortDate(range.start_date)} - {formatShortDate(range.end_date)}
                </span>
              ))
            ) : (
              <span className="booked-pill">Aucune indisponibilite visible pour le moment.</span>
            )}
          </div>

          {car.sourceLink ? (
            <div className="detail-card__actions">
              <a className="button--ghost" href={car.sourceLink} rel="noreferrer" target="_blank">
                Voir la source du modele
              </a>
            </div>
          ) : null}
        </section>

        <ReservationForm car={car} onReservationCreated={handleReservationCreated} />
      </div>
    </div>
  )
}

export default CarDetailsPage
