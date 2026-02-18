export default defineEventHandler(async (event): Promise<any> => {
	const params = getQuery(event)

	const allCities = [
		{ id: 1, name: 'Osaka', country: 'Japan' },
		{ id: 2, name: 'New York', country: 'USA' },
		{ id: 3, name: 'Lyon', country: 'France' },
		{ id: 4, name: 'Manchester', country: 'England' },
		{ id: 5, name: 'Tokyo', country: 'Japan' },
		{ id: 6, name: 'Chicago', country: 'USA' },
		{ id: 7, name: 'Marseille', country: 'France' },
		{ id: 8, name: 'Birmingham', country: 'England' },
		{ id: 9, name: 'Kyoto', country: 'Japan' },
		{ id: 10, name: 'Los Angeles', country: 'USA' },
		{ id: 11, name: 'Nice', country: 'France' },
		{ id: 12, name: 'Liverpool', country: 'England' },
		{ id: 13, name: 'Yokohama', country: 'Japan' },
		{ id: 14, name: 'Houston', country: 'USA' },
		{ id: 15, name: 'Toulouse', country: 'France' },
		{ id: 16, name: 'Leeds', country: 'England' },
		{ id: 17, name: 'Nagoya', country: 'Japan' },
		{ id: 18, name: 'Phoenix', country: 'USA' },
		{ id: 19, name: 'Bordeaux', country: 'France' },
		{ id: 20, name: 'Bristol', country: 'England' },
		{ id: 21, name: 'Sapporo', country: 'Japan' },
		{ id: 22, name: 'San Francisco', country: 'USA' },
		{ id: 23, name: 'Strasbourg', country: 'France' },
		{ id: 24, name: 'Sheffield', country: 'England' },
		{ id: 25, name: 'Fukuoka', country: 'Japan' },
		{ id: 26, name: 'Seattle', country: 'USA' },
		{ id: 27, name: 'Nantes', country: 'France' },
		{ id: 28, name: 'Newcastle', country: 'England' },
		{ id: 29, name: 'Kobe', country: 'Japan' },
		{ id: 30, name: 'Boston', country: 'USA' },
		{ id: 31, name: 'Lille', country: 'France' },
		{ id: 32, name: 'Nottingham', country: 'England' },
		{ id: 33, name: 'Hiroshima', country: 'Japan' },
		{ id: 34, name: 'Miami', country: 'USA' },
		{ id: 35, name: 'Montpellier', country: 'France' },
		{ id: 36, name: 'Leicester', country: 'England' },
		{ id: 37, name: 'Sendai', country: 'Japan' },
		{ id: 38, name: 'Denver', country: 'USA' },
		{ id: 39, name: 'Rennes', country: 'France' },
		{ id: 40, name: 'Brighton', country: 'England' },
	]

	let filtered = allCities
	if (params.country && params.country !== 'all') {
		filtered = allCities.filter(c => c.country === params.country)
	}

	const start = params.skip ? Number(params.skip) : 0
	const end = params.limit ? Number(params.limit) + start : 10

	return {
		items: filtered.slice(start, end),
		count: filtered.length,
	}
})