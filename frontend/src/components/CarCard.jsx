import { Link } from 'react-router-dom'
import { formatMoney } from '../utils/formatters'

function CarCard({ car }) {
  return (
    <article className="car-card">
      <div className="car-card__media">
        {car.image ? (
          <img src={car.image} alt={car.name} loading="lazy" />
        ) : (
          <span>Image indisponible</span>
        )}
      </div>

      <div className="car-card__eyebrow">
        <span>{car.segment}</span>
        <span>{formatMoney(car.price_per_day)} / jour</span>
      </div>

      <div className="row-stack">
        <h3>{car.name}</h3>
        <p>{car.description}</p>
      </div>

      <div className="feature-row">
        {car.features.map((feature) => (
          <span className="feature-pill" key={`${car.id}-${feature.label}`}>
            <img src={feature.icon} alt="" aria-hidden="true" />
            <span>{feature.label}</span>
          </span>
        ))}
      </div>

      <div className="card-actions">
        <Link className="button" to={`/cars/${car.id}`}>
          Voir details
        </Link>
        <Link className="button--ghost" to={`/cars/${car.id}`}>
          Reserver
        </Link>
      </div>
    </article>
  )
}

export default CarCard
