import { useDeferredValue, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'
import CarList from '../components/CarList'
import { enrichCar, loadCatalogMetadata, sortCars } from '../utils/catalog'

function HomePage() {
  const [cars, setCars] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const deferredSearch = useDeferredValue(searchTerm)

  useEffect(() => {
    let isMounted = true

    async function loadCars() {
      try {
        setIsLoading(true)
        setError('')

        const [apiResponse, metadataMap] = await Promise.all([
          api.get('/cars'),
          loadCatalogMetadata(),
        ])

        if (!isMounted) {
          return
        }

        const catalog = sortCars(
          apiResponse.data.cars.map((car) => enrichCar(car, metadataMap)),
        )

        setCars(catalog)
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setError(
          loadError.response?.data?.message ??
            'Impossible de charger les voitures pour le moment.',
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadCars()

    return () => {
      isMounted = false
    }
  }, [])

  const featuredCar = cars[0]
  const normalizedSearch = deferredSearch.trim().toUpperCase()
  const filteredCars = sortCars(
    cars.filter((car) => car.name.includes(normalizedSearch)),
  )

  return (
    <div className="page-shell">
      <header className="topbar">
        <Link className="brand" to="/">
          <span className="brand__mark">CR</span>
          <span>Car Rental MVP</span>
        </Link>

        <nav className="topbar__nav">
          <a className="pill-link" href="#nos-voitures">
            Nos voitures
          </a>
          <Link className="pill-link" to="/admin">
            Espace admin
          </Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">Reservation sans inscription</span>
          <h1 className="hero__title">Location de voitures simple, rapide et claire.</h1>
          <p className="hero__text">
            Un MVP React + Laravel pour afficher votre flotte, prendre des
            reservations immediates et laisser l admin confirmer chaque demande.
          </p>

          <div className="hero__actions">
            <a className="button" href="#nos-voitures">
              Parcourir le catalogue
            </a>
            <Link className="button--ghost" to="/admin">
              Voir le tableau admin
            </Link>
          </div>

          <div className="hero__metrics">
            <article className="metric">
              <span className="metric__label">Catalogue</span>
              <div className="metric__value">{cars.length || 34} modeles</div>
            </article>
            <article className="metric">
              <span className="metric__label">Process</span>
              <div className="metric__value">0 compte client</div>
            </article>
            <article className="metric">
              <span className="metric__label">Admin</span>
              <div className="metric__value">Statuts pilotables</div>
            </article>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__visual-badge">
            <span>Selection du moment</span>
          </div>
          {featuredCar?.image ? (
            <img src={featuredCar.image} alt={featuredCar.name} />
          ) : (
            <div className="state-panel">
              <h2>Chargement du visuel principal</h2>
            </div>
          )}
        </div>
      </section>

      <section className="section" id="nos-voitures">
        <div className="section__header">
          <div>
            <span className="section__eyebrow">Nos voitures</span>
            <h2 className="section__title">Toutes les images du parc sont integrees ici</h2>
            <p className="section__text">
              Les cartes reprennent les visuels fournis, le prix par jour et un
              acces direct a la page de reservation de chaque voiture.
            </p>
          </div>

          <label className="search-field">
            <span>Rechercher un modele</span>
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Ex: DACIA LOGAN, AUDI, RANGE ROVER..."
              type="search"
              value={searchTerm}
            />
          </label>
        </div>

        <CarList cars={filteredCars} error={error} isLoading={isLoading} />
      </section>
    </div>
  )
}

export default HomePage
