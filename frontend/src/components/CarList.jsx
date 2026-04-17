import CarCard from './CarCard'

function CarList({ cars, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="state-panel">
        <h2>Chargement du catalogue...</h2>
        <p className="section__text">
          Nous recuperons les voitures, les prix journaliers et leurs visuels.
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="state-panel">
        <h2>Catalogue indisponible</h2>
        <p className="banner banner--danger">{error}</p>
      </div>
    )
  }

  if (!cars.length) {
    return (
      <div className="state-panel">
        <h2>Aucune voiture ne correspond a votre recherche</h2>
        <p className="section__text">
          Essayez un autre modele ou revenez au catalogue complet.
        </p>
      </div>
    )
  }

  return (
    <div className="car-grid">
      {cars.map((car) => (
        <CarCard car={car} key={car.id} />
      ))}
    </div>
  )
}

export default CarList
