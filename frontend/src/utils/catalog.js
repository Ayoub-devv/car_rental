const defaultFeatures = [
  { label: 'GPS inclus', icon: '/assets/icons/gps.svg' },
  { label: 'Diesel', icon: '/assets/icons/diesel-150x150-removebg-preview-1.png' },
  { label: 'Climatisation', icon: '/assets/icons/air-condition.svg' },
  { label: 'Direction assistee', icon: '/assets/icons/power-steering.svg' },
]

function fileNameFromUrl(url = '') {
  return decodeURIComponent(url.split('/').pop() ?? '')
}

function segmentFromPrice(price) {
  if (price <= 300) {
    return {
      label: 'Economique',
      description: 'Souple pour les trajets urbains, les petits budgets et les reservations rapides.',
    }
  }

  if (price <= 800) {
    return {
      label: 'Confort',
      description: 'Equilibre ideal pour les week-ends, les familles et les departs business.',
    }
  }

  if (price <= 2000) {
    return {
      label: 'Premium',
      description: 'Plus d espace, plus de presence, et une experience plus haut de gamme.',
    }
  }

  return {
    label: 'Prestige',
    description: 'Une selection vitrine pour les transferts VIP, les evenements et les clients exigeants.',
  }
}

export function normalizeCarName(value = '') {
  return value.replace(/\s*-\s*A\s+PARTIR.*$/iu, '').replace(/\s+/g, ' ').trim().toUpperCase()
}

export async function loadCatalogMetadata() {
  const response = await fetch('/data/cars-source.json')

  if (!response.ok) {
    throw new Error('Impossible de charger la source du catalogue.')
  }

  const rows = await response.json()

  return rows.reduce((metadata, row, index) => {
    const name = normalizeCarName(row['Car Model and Price'] ?? '')

    if (!name) {
      return metadata
    }

    const imageName = fileNameFromUrl(row['Car Image'] ?? '')

    metadata[name] = {
      rank: Number(row.Position) || index + 1,
      image: imageName ? `/assets/cars/${imageName}` : null,
      sourceLink: row['Car Link'] ?? '',
      headline: row['Car Model and Price'] ?? name,
      features: defaultFeatures,
    }

    return metadata
  }, {})
}

export function enrichCar(car, metadataMap) {
  const key = normalizeCarName(car.name)
  const metadata = metadataMap[key] ?? {}
  const segment = segmentFromPrice(Number(car.price_per_day))

  return {
    ...car,
    rank: metadata.rank ?? car.id,
    image: metadata.image ?? null,
    sourceLink: metadata.sourceLink ?? null,
    headline: metadata.headline ?? car.name,
    segment: segment.label,
    description: `${segment.description} ${car.name} reste reservable sans creation de compte.`,
    features: metadata.features ?? defaultFeatures,
  }
}

export function sortCars(cars) {
  return [...cars].sort((left, right) => (left.rank ?? 999) - (right.rank ?? 999))
}
